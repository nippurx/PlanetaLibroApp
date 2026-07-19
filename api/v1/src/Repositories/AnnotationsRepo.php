<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Repositories;

use PDO;

final class AnnotationsRepo
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function findBookId(string $uri): ?int
    {
        $statement = $this->pdo->prepare(
            'SELECT ebooks_books_id FROM ebooks_books WHERE uri = :uri LIMIT 1'
        );
        $statement->execute(['uri' => $uri]);
        $value = $statement->fetchColumn();
        return $value === false ? null : (int) $value;
    }

    /** @param array<string,mixed> $data @return array<string,mixed> */
    public function create(int $userId, int $bookId, array $data): array
    {
        $sql = <<<'SQL'
INSERT INTO user_book_annotations (
    user_id, ebooks_books_id, annotation_type, start_fragment, start_offset, end_fragment, end_offset,
    exact_text, prefix_text, suffix_text, content_version, anchor_version,
    note_text, color_code, client_request_id
) VALUES (
    :user_id, :book_id, :annotation_type, :start_fragment, :start_offset, :end_fragment, :end_offset,
    :exact_text, :prefix_text, :suffix_text, :content_version, :anchor_version,
    :note_text, :color_code, :client_request_id
)
ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)
SQL;
        $statement = $this->pdo->prepare($sql);
        $statement->execute([
            'user_id' => $userId,
            'book_id' => $bookId,
            'annotation_type' => $data['annotation_type'],
            'start_fragment' => $data['start_fragment'],
            'start_offset' => $data['start_offset'],
            'end_fragment' => $data['end_fragment'],
            'end_offset' => $data['end_offset'],
            'exact_text' => $data['exact_text'],
            'prefix_text' => $data['prefix_text'],
            'suffix_text' => $data['suffix_text'],
            'content_version' => $data['content_version'],
            'anchor_version' => $data['anchor_version'],
            'note_text' => $data['note_text'],
            'color_code' => $data['color_code'],
            'client_request_id' => $data['client_request_id'],
        ]);
        $id = (int) $this->pdo->lastInsertId();
        return $this->findOwned($userId, $id) ?? [];
    }

    /** @param array{fragment:int,offset:int,id:int}|null $cursor @return array<int,array<string,mixed>> */
    public function listForBook(int $userId, int $bookId, string $filter, int $limit, ?array $cursor): array
    {
        $conditions = ['user_id = :user_id', 'ebooks_books_id = :book_id'];
        $params = ['user_id' => $userId, 'book_id' => $bookId];
        if ($filter === 'notes') {
            $conditions[] = "annotation_type = 'note'";
        } elseif ($filter === 'highlights') {
            $conditions[] = "annotation_type = 'highlight'";
        } elseif ($filter === 'bookmarks') {
            $conditions[] = "annotation_type = 'bookmark'";
        }
        if ($cursor !== null) {
            $conditions[] = '(start_fragment > :cursor_fragment OR '
                . '(start_fragment = :cursor_fragment AND start_offset > :cursor_offset) OR '
                . '(start_fragment = :cursor_fragment AND start_offset = :cursor_offset AND id > :cursor_id))';
            $params['cursor_fragment'] = $cursor['fragment'];
            $params['cursor_offset'] = $cursor['offset'];
            $params['cursor_id'] = $cursor['id'];
        }
        $sql = 'SELECT ' . $this->columns() . ' FROM user_book_annotations WHERE '
            . implode(' AND ', $conditions)
            . ' ORDER BY start_fragment, start_offset, id LIMIT ' . (int) $limit;
        $statement = $this->pdo->prepare($sql);
        $statement->execute($params);
        return array_map([$this, 'normalize'], $statement->fetchAll());
    }

    /** @return array<string,mixed>|null */
    public function findOwned(int $userId, int $id): ?array
    {
        $statement = $this->pdo->prepare(
            'SELECT ' . $this->columns() . ' FROM user_book_annotations '
            . 'WHERE id = :id AND user_id = :user_id LIMIT 1'
        );
        $statement->execute(['id' => $id, 'user_id' => $userId]);
        $row = $statement->fetch();
        return is_array($row) ? $this->normalize($row) : null;
    }

    public function update(int $userId, int $id, int $revision, ?string $noteText, int $colorCode): bool
    {
        $statement = $this->pdo->prepare(
            "UPDATE user_book_annotations SET annotation_type = :annotation_type, note_text = :note_text, color_code = :color_code, "
            . 'revision = revision + 1 WHERE id = :id AND user_id = :user_id AND revision = :revision'
        );
        $statement->bindValue(':note_text', $noteText, $noteText === null ? PDO::PARAM_NULL : PDO::PARAM_STR);
        $statement->bindValue(':annotation_type', $noteText === null ? 'highlight' : 'note', PDO::PARAM_STR);
        $statement->bindValue(':color_code', $colorCode, PDO::PARAM_INT);
        $statement->bindValue(':id', $id, PDO::PARAM_INT);
        $statement->bindValue(':user_id', $userId, PDO::PARAM_INT);
        $statement->bindValue(':revision', $revision, PDO::PARAM_INT);
        $statement->execute();
        return $statement->rowCount() === 1;
    }

    public function delete(int $userId, int $id): void
    {
        $statement = $this->pdo->prepare(
            'DELETE FROM user_book_annotations WHERE id = :id AND user_id = :user_id'
        );
        $statement->execute(['id' => $id, 'user_id' => $userId]);
    }

    /** @param array<string,mixed> $data @return array{active:bool,bookmark:array<string,mixed>|null} */
    public function toggleBookmark(int $userId, int $bookId, array $data): array
    {
        $this->pdo->beginTransaction();
        try {
            $find = $this->pdo->prepare(
                "SELECT id FROM user_book_annotations WHERE user_id = :user_id AND ebooks_books_id = :book_id "
                . "AND annotation_type = 'bookmark' AND start_fragment = :fragment AND start_offset = :offset FOR UPDATE"
            );
            $find->execute([
                'user_id' => $userId,
                'book_id' => $bookId,
                'fragment' => $data['start_fragment'],
                'offset' => $data['start_offset'],
            ]);
            $ids = array_map('intval', $find->fetchAll(PDO::FETCH_COLUMN));
            if ($ids) {
                $placeholders = implode(',', array_fill(0, count($ids), '?'));
                $delete = $this->pdo->prepare('DELETE FROM user_book_annotations WHERE user_id = ? AND id IN (' . $placeholders . ')');
                $delete->execute(array_merge([$userId], $ids));
                $this->pdo->commit();
                return ['active' => false, 'bookmark' => null];
            }

            $bookmark = $this->create($userId, $bookId, $data + [
                'annotation_type' => 'bookmark',
                'note_text' => null,
                'color_code' => 1,
            ]);
            $this->pdo->commit();
            return ['active' => true, 'bookmark' => $bookmark];
        } catch (\Throwable $exception) {
            if ($this->pdo->inTransaction()) $this->pdo->rollBack();
            throw $exception;
        }
    }

    private function columns(): string
    {
        return 'id, ebooks_books_id, annotation_type, start_fragment, start_offset, end_fragment, end_offset, '
            . 'exact_text, prefix_text, suffix_text, content_version, anchor_version, note_text, '
            . 'color_code, revision, created_at, updated_at';
    }

    /** @param array<string,mixed> $row @return array<string,mixed> */
    private function normalize(array $row): array
    {
        foreach (['id', 'ebooks_books_id', 'start_fragment', 'start_offset', 'end_fragment', 'end_offset', 'anchor_version', 'color_code', 'revision'] as $key) {
            $row[$key] = (int) $row[$key];
        }
        return $row;
    }
}
