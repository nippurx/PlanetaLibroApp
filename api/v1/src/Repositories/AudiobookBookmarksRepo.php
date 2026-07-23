<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Repositories;

use PDO;
use PDOException;

final class AudiobookBookmarksRepo
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    /** @return array<string,mixed>|null */
    public function currentMedia(string $bookUri): ?array
    {
        $statement = $this->pdo->prepare(
            'SELECT ebooks_books_id, video_audiolibro FROM ebooks_books WHERE uri = :uri LIMIT 1'
        );
        $statement->execute(['uri' => $bookUri]);
        $row = $statement->fetch();
        if (!is_array($row)) return null;
        return [
            'book_id' => (int) $row['ebooks_books_id'],
            'media_id' => $this->mediaId($row['video_audiolibro'] ?? null),
        ];
    }

    /** @return array<int,array<string,mixed>> */
    public function listCurrent(int $userId, int $bookId, string $mediaId): array
    {
        $statement = $this->pdo->prepare(
            'SELECT ' . $this->columns() . ' FROM user_audiobook_annotations '
            . 'WHERE user_id = :user_id AND ebooks_books_id = :book_id AND media_hash = UNHEX(SHA2(:media_id, 256)) '
            . 'AND media_id = :media_id_exact ORDER BY position_seconds, id LIMIT 500'
        );
        $statement->execute([
            'user_id' => $userId,
            'book_id' => $bookId,
            'media_id' => $mediaId,
            'media_id_exact' => $mediaId,
        ]);
        return array_map([$this, 'normalize'], $statement->fetchAll());
    }

    /** @return array{status:string,created?:bool,bookmark?:array<string,mixed>,media_id?:string|null} */
    public function create(int $userId, string $bookUri, string $expectedMediaId, int $position, string $requestId): array
    {
        $this->pdo->beginTransaction();
        try {
            $bookStatement = $this->pdo->prepare(
                'SELECT ebooks_books_id, video_audiolibro FROM ebooks_books WHERE uri = :uri LIMIT 1 FOR UPDATE'
            );
            $bookStatement->execute(['uri' => $bookUri]);
            $book = $bookStatement->fetch();
            if (!is_array($book)) return $this->rollbackStatus('book_not_found');

            $mediaId = $this->mediaId($book['video_audiolibro'] ?? null);
            if ($mediaId === null) return $this->rollbackStatus('audiobook_not_found');
            if (!hash_equals($mediaId, $expectedMediaId)) {
                $this->pdo->rollBack();
                return ['status' => 'media_changed', 'media_id' => $mediaId];
            }

            $bookId = (int) $book['ebooks_books_id'];
            $existing = $this->findLocation($userId, $bookId, $mediaId, $position);
            if ($existing !== null) {
                $this->pdo->commit();
                return ['status' => 'ok', 'created' => false, 'bookmark' => $existing];
            }

            try {
                $insert = $this->pdo->prepare(
                    'INSERT INTO user_audiobook_annotations '
                    . '(user_id, ebooks_books_id, media_id, position_seconds, note_text, client_request_id) '
                    . 'VALUES (:user_id, :book_id, :media_id, :position, NULL, :request_id)'
                );
                $insert->execute([
                    'user_id' => $userId,
                    'book_id' => $bookId,
                    'media_id' => $mediaId,
                    'position' => $position,
                    'request_id' => $requestId,
                ]);
                $id = (int) $this->pdo->lastInsertId();
            } catch (PDOException $exception) {
                if ($exception->getCode() !== '23000') throw $exception;
                $existing = $this->findLocation($userId, $bookId, $mediaId, $position)
                    ?? $this->findRequest($userId, $requestId);
                if ($existing === null) throw $exception;
                $this->pdo->commit();
                return ['status' => 'ok', 'created' => false, 'bookmark' => $existing];
            }

            $bookmark = $this->findOwned($userId, $id);
            $this->pdo->commit();
            return ['status' => 'ok', 'created' => true, 'bookmark' => $bookmark ?? []];
        } catch (\Throwable $exception) {
            if ($this->pdo->inTransaction()) $this->pdo->rollBack();
            throw $exception;
        }
    }

    /** @return array<string,mixed>|null */
    public function findOwned(int $userId, int $id): ?array
    {
        $statement = $this->pdo->prepare(
            'SELECT ' . $this->columns() . ' FROM user_audiobook_annotations '
            . 'WHERE id = :id AND user_id = :user_id LIMIT 1'
        );
        $statement->execute(['id' => $id, 'user_id' => $userId]);
        $row = $statement->fetch();
        return is_array($row) ? $this->normalize($row) : null;
    }

    public function updateNote(int $userId, int $id, int $revision, ?string $note): bool
    {
        $statement = $this->pdo->prepare(
            'UPDATE user_audiobook_annotations SET note_text = :note, revision = revision + 1 '
            . 'WHERE id = :id AND user_id = :user_id AND revision = :revision'
        );
        $statement->bindValue(':note', $note, $note === null ? PDO::PARAM_NULL : PDO::PARAM_STR);
        $statement->bindValue(':id', $id, PDO::PARAM_INT);
        $statement->bindValue(':user_id', $userId, PDO::PARAM_INT);
        $statement->bindValue(':revision', $revision, PDO::PARAM_INT);
        $statement->execute();
        return $statement->rowCount() === 1;
    }

    public function delete(int $userId, int $id): void
    {
        $statement = $this->pdo->prepare(
            'DELETE FROM user_audiobook_annotations WHERE id = :id AND user_id = :user_id'
        );
        $statement->execute(['id' => $id, 'user_id' => $userId]);
    }

    /** @return array<string,mixed>|null */
    private function findLocation(int $userId, int $bookId, string $mediaId, int $position): ?array
    {
        $statement = $this->pdo->prepare(
            'SELECT ' . $this->columns() . ' FROM user_audiobook_annotations '
            . 'WHERE user_id = :user_id AND ebooks_books_id = :book_id '
            . 'AND media_hash = UNHEX(SHA2(:media_id, 256)) AND media_id = :media_id_exact '
            . 'AND position_seconds = :position LIMIT 1 FOR UPDATE'
        );
        $statement->execute(['user_id' => $userId, 'book_id' => $bookId, 'media_id' => $mediaId, 'media_id_exact' => $mediaId, 'position' => $position]);
        $row = $statement->fetch();
        return is_array($row) ? $this->normalize($row) : null;
    }

    /** @return array<string,mixed>|null */
    private function findRequest(int $userId, string $requestId): ?array
    {
        $statement = $this->pdo->prepare(
            'SELECT ' . $this->columns() . ' FROM user_audiobook_annotations '
            . 'WHERE user_id = :user_id AND client_request_id = :request_id LIMIT 1'
        );
        $statement->execute(['user_id' => $userId, 'request_id' => $requestId]);
        $row = $statement->fetch();
        return is_array($row) ? $this->normalize($row) : null;
    }

    /** @return array{status:string} */
    private function rollbackStatus(string $status): array
    {
        $this->pdo->rollBack();
        return ['status' => $status];
    }

    private function columns(): string
    {
        return 'id, ebooks_books_id, media_id, position_seconds, note_text, revision, created_at, updated_at';
    }

    /** @param array<string,mixed> $row @return array<string,mixed> */
    private function normalize(array $row): array
    {
        foreach (['id', 'ebooks_books_id', 'position_seconds', 'revision'] as $key) $row[$key] = (int) $row[$key];
        return $row;
    }

    private function mediaId($value): ?string
    {
        $mediaId = trim((string) $value);
        return $mediaId !== '' && strtolower($mediaId) !== 'sin-audiolibro' ? $mediaId : null;
    }
}
