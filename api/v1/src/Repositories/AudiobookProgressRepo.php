<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Repositories;

use PDO;

final class AudiobookProgressRepo
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    /** @return array<string, mixed>|null */
    public function forUser(int $userId, string $bookUri): ?array
    {
        $statement = $this->pdo->prepare(
            'SELECT b.video_audiolibro, uv.id AS progress_id, uv.current_min, uv.max_min, '
            . 'uv.first_read, uv.last_read '
            . 'FROM ebooks_books b '
            . 'LEFT JOIN user_video_audiolibros uv '
            . 'ON uv.ebooks_books_id = b.ebooks_books_id AND uv.user_id = :user_id '
            . 'WHERE b.uri = :uri LIMIT 1'
        );
        $statement->execute(['user_id' => $userId, 'uri' => $bookUri]);
        $row = $statement->fetch();
        if (!is_array($row)) {
            return null;
        }

        $mediaId = $this->mediaId($row['video_audiolibro'] ?? null);
        if ($mediaId === null) {
            return ['has_audiobook' => false];
        }

        $hasProgress = $row['progress_id'] !== null;
        $position = $hasProgress ? max(0, (int) $row['current_min']) : 0;
        $furthest = $hasProgress ? max($position, max(0, (int) $row['max_min'])) : 0;

        return [
            'has_audiobook' => true,
            'has_progress' => $hasProgress,
            'position_seconds' => $position,
            'furthest_position_seconds' => $furthest,
            'media_id' => $mediaId,
            'progress_created_at' => $hasProgress ? $row['first_read'] : null,
            'last_playback_activity_at' => $hasProgress ? $row['last_read'] : null,
        ];
    }

    /** @return array<string, mixed> */
    public function record(int $userId, string $bookUri, int $positionSeconds, string $expectedMediaId): array
    {
        $this->pdo->beginTransaction();
        try {
            $bookStatement = $this->pdo->prepare(
                'SELECT ebooks_books_id, video_audiolibro '
                . 'FROM ebooks_books WHERE uri = :uri LIMIT 1 FOR UPDATE'
            );
            $bookStatement->execute(['uri' => $bookUri]);
            $book = $bookStatement->fetch();
            if (!is_array($book)) {
                $this->pdo->rollBack();
                return ['status' => 'book_not_found'];
            }

            $mediaId = $this->mediaId($book['video_audiolibro'] ?? null);
            if ($mediaId === null) {
                $this->pdo->rollBack();
                return ['status' => 'audiobook_not_found'];
            }
            if (!hash_equals($mediaId, $expectedMediaId)) {
                $this->pdo->rollBack();
                return ['status' => 'media_changed', 'media_id' => $mediaId];
            }

            $bookId = (int) $book['ebooks_books_id'];
            $progressStatement = $this->pdo->prepare(
                'SELECT id FROM user_video_audiolibros '
                . 'WHERE user_id = :user_id AND ebooks_books_id = :book_id LIMIT 1 FOR UPDATE'
            );
            $progressStatement->execute(['user_id' => $userId, 'book_id' => $bookId]);
            $created = $progressStatement->fetchColumn() === false;

            if ($created) {
                $statement = $this->pdo->prepare(
                    'INSERT INTO user_video_audiolibros '
                    . '(user_id, ebooks_books_id, current_min, max_min, first_read, last_read) '
                    . 'VALUES (:user_id, :book_id, :current_position, :furthest_position, NOW(), NOW())'
                );
            } else {
                $statement = $this->pdo->prepare(
                    'UPDATE user_video_audiolibros '
                    . 'SET current_min = :current_position, '
                    . 'max_min = GREATEST(COALESCE(max_min, 0), COALESCE(current_min, 0), :furthest_position), '
                    . 'last_read = NOW() '
                    . 'WHERE user_id = :user_id AND ebooks_books_id = :book_id'
                );
            }
            $statement->execute([
                'user_id' => $userId,
                'book_id' => $bookId,
                'current_position' => $positionSeconds,
                'furthest_position' => $positionSeconds,
            ]);

            $resultStatement = $this->pdo->prepare(
                'SELECT current_min, max_min, first_read, last_read '
                . 'FROM user_video_audiolibros '
                . 'WHERE user_id = :user_id AND ebooks_books_id = :book_id LIMIT 1'
            );
            $resultStatement->execute(['user_id' => $userId, 'book_id' => $bookId]);
            $result = $resultStatement->fetch();
            if (!is_array($result)) {
                throw new \RuntimeException('Audiobook progress could not be read after saving.');
            }

            $this->pdo->commit();
            $position = max(0, (int) $result['current_min']);
            return [
                'status' => 'ok',
                'created' => $created,
                'position_seconds' => $position,
                'furthest_position_seconds' => max($position, max(0, (int) $result['max_min'])),
                'media_id' => $mediaId,
                'progress_created_at' => $result['first_read'],
                'last_playback_activity_at' => $result['last_read'],
            ];
        } catch (\Throwable $exception) {
            if ($this->pdo->inTransaction()) {
                $this->pdo->rollBack();
            }
            throw $exception;
        }
    }

    private function mediaId($value): ?string
    {
        $mediaId = trim((string) $value);
        return $mediaId !== '' && strtolower($mediaId) !== 'sin-audiolibro' ? $mediaId : null;
    }
}
