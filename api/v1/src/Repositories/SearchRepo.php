<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Repositories;

use PDO;
use PDOException;
use PlanetaLibro\Api\V1\Paths\AssetPaths;

final class SearchRepo
{
    private PDO $pdo;
    private AssetPaths $assetPaths;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
        $this->assetPaths = new AssetPaths('biblioteca');
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function searchBooks(string $query, int $limit, int $offset): array
    {
        $sql = <<<'SQL'
SELECT
    b.ebooks_books_id,
    b.uri,
    b.ebooks_books_title,
    b.ebooks_books_subtitle,
    b.ebooks_books_cover,
    b.cover_link,
    b.read_online,
    b.video_audiolibro,
    b.ebooks_format_pdf,
    b.ebooks_format_epub,
    b.ebooks_format_mobi,
    a.uri AS author_uri,
    a.ebooks_authors_name,
    a.ebooks_authors_surname
FROM ebooks_books b
LEFT JOIN ebooks_authors a
    ON a.ebooks_authors_id = b.ebooks_books_author
WHERE (
    b.ebooks_books_title LIKE ?
    OR b.uri LIKE ?
    OR a.ebooks_authors_name LIKE ?
    OR CONCAT(COALESCE(a.ebooks_authors_name, ''), ' ', COALESCE(a.ebooks_authors_surname, '')) LIKE ?
)
ORDER BY b.views_last DESC, b.views DESC, b.ebooks_books_id DESC
LIMIT ? OFFSET ?
SQL;

        try {
            return $this->runSearchQuery($sql, $query, $limit, $offset);
        } catch (PDOException $exception) {
            // Fallback compatible con schemas donde no exista views_last.
            $fallbackSql = <<<'SQL'
SELECT
    b.ebooks_books_id,
    b.uri,
    b.ebooks_books_title,
    b.ebooks_books_subtitle,
    b.ebooks_books_cover,
    b.cover_link,
    b.read_online,
    b.video_audiolibro,
    b.ebooks_format_pdf,
    b.ebooks_format_epub,
    b.ebooks_format_mobi,
    a.uri AS author_uri,
    a.ebooks_authors_name,
    a.ebooks_authors_surname
FROM ebooks_books b
LEFT JOIN ebooks_authors a
    ON a.ebooks_authors_id = b.ebooks_books_author
WHERE (
    b.ebooks_books_title LIKE ?
    OR b.uri LIKE ?
    OR a.ebooks_authors_name LIKE ?
    OR CONCAT(COALESCE(a.ebooks_authors_name, ''), ' ', COALESCE(a.ebooks_authors_surname, '')) LIKE ?
)
ORDER BY b.views DESC, b.ebooks_books_id DESC
LIMIT ? OFFSET ?
SQL;

            return $this->runSearchQuery($fallbackSql, $query, $limit, $offset);
        }
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function runSearchQuery(string $sql, string $query, int $limit, int $offset): array
    {
        $likeQuery = '%' . $query . '%';

        $statement = $this->pdo->prepare($sql);
        $statement->bindValue(1, $likeQuery, PDO::PARAM_STR);
        $statement->bindValue(2, $likeQuery, PDO::PARAM_STR);
        $statement->bindValue(3, $likeQuery, PDO::PARAM_STR);
        $statement->bindValue(4, $likeQuery, PDO::PARAM_STR);
        $statement->bindValue(5, $limit, PDO::PARAM_INT);
        $statement->bindValue(6, $offset, PDO::PARAM_INT);
        $statement->execute();

        return array_map([$this, 'mapBookListItem'], $statement->fetchAll());
    }

    /**
     * @param array<string, mixed> $row
     * @return array<string, mixed>
     */
    private function mapBookListItem(array $row): array
    {
        $name = trim((string) ($row['ebooks_authors_name'] ?? ''));
        $surname = trim((string) ($row['ebooks_authors_surname'] ?? ''));
        $fullName = trim($name . ' ' . $surname);

        $bookUri = (string) $row['uri'];
        $authorUri = $this->resolveAuthorUri($row);
        $coverPath = $this->assetPaths->bookCoverPath($authorUri, $bookUri);

        return [
            'id' => (int) $row['ebooks_books_id'],
            'uri' => $bookUri,
            'author_uri' => $authorUri,
            'cover_url' => $coverPath,
            'titulo' => $row['ebooks_books_title'],
            'subtitulo' => $row['ebooks_books_subtitle'],
            'autor' => [
                'uri' => $authorUri,
                'nombre' => $fullName !== '' ? $fullName : null,
                'photo' => $this->buildAuthorPhoto($authorUri),
            ],
            'cover' => [
                'available' => (int) $row['ebooks_books_cover'] === 1,
                'link' => $row['cover_link'],
            ],
            'recursos' => [
                'read_online' => (int) $row['read_online'] === 1,
                'video_audiolibro' => $row['video_audiolibro'],
            ],
            'formatos' => [
                'pdf' => (int) $row['ebooks_format_pdf'] === 1,
                'epub' => (int) $row['ebooks_format_epub'] === 1,
                'mobi' => (int) $row['ebooks_format_mobi'] === 1,
            ],
        ];
    }

    /**
     * @return array{available: bool, url: ?string}
     */
    private function buildAuthorPhoto(?string $authorUri): array
    {
        if ($authorUri === null || trim($authorUri) === '') {
            return [
                'available' => false,
                'url' => null,
            ];
        }

        return \get_author_photo($authorUri);
    }

    /**
     * @param array<string, mixed> $row
     */
    private function resolveAuthorUri(array $row): ?string
    {
        $authorUri = trim((string) ($row['author_uri'] ?? ''));
        if ($authorUri !== '') {
            return $authorUri;
        }

        $bookUri = (string) ($row['uri'] ?? '');
        if ($bookUri === '') {
            return null;
        }

        $parts = explode('-', $bookUri);
        $fallback = trim((string) ($parts[0] ?? ''));

        return $fallback !== '' ? $fallback : null;
    }
}
