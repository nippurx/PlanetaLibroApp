<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Repositories;

use PDO;
use PlanetaLibro\Api\V1\Paths\AssetPaths;

final class LibraryRepo
{
    private PDO $pdo;
    private AssetPaths $assets;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
        $this->assets = new AssetPaths('biblioteca');
    }

    /** @return array<int, array<string, mixed>> */
    public function forUser(int $userId): array
    {
        $sql = <<<'SQL'
SELECT ub.current_page, ub.first_read, ub.last_read,
       b.ebooks_books_id, b.uri, b.ebooks_books_title, b.ebooks_books_subtitle,
       b.ebooks_books_cover, b.cover_link, b.read_online, b.video_audiolibro,
       b.ebooks_format_pdf, b.ebooks_format_epub, b.ebooks_format_mobi,
       a.uri AS author_uri, a.ebooks_authors_name, a.ebooks_authors_surname
FROM user_books ub
JOIN ebooks_books b ON b.ebooks_books_id = ub.ebooks_books_id
LEFT JOIN ebooks_authors a ON a.ebooks_authors_id = b.ebooks_books_author
WHERE ub.user_id = :user_id
ORDER BY ub.last_read DESC
SQL;
        $statement = $this->pdo->prepare($sql);
        $statement->bindValue(':user_id', $userId, PDO::PARAM_INT);
        $statement->execute();

        return array_map(function (array $row): array {
            $authorUri = trim((string) ($row['author_uri'] ?? '')) ?: null;
            $name = trim((string) ($row['ebooks_authors_name'] ?? '') . ' ' . (string) ($row['ebooks_authors_surname'] ?? ''));
            $currentPage = max(1, (int) $row['current_page']);
            return [
                'id' => (int) $row['ebooks_books_id'],
                'uri' => (string) $row['uri'],
                'author_uri' => $authorUri,
                'titulo' => $row['ebooks_books_title'],
                'subtitulo' => $row['ebooks_books_subtitle'],
                'cover_url' => $this->assets->bookCoverPath($authorUri, (string) $row['uri']),
                'autor' => ['uri' => $authorUri, 'nombre' => $name !== '' ? $name : null],
                'recursos' => [
                    'read_online' => (int) $row['read_online'] === 1,
                    'video_audiolibro' => $row['video_audiolibro'],
                ],
                'formatos' => [
                    'pdf' => (int) $row['ebooks_format_pdf'] === 1,
                    'epub' => (int) $row['ebooks_format_epub'] === 1,
                    'mobi' => (int) $row['ebooks_format_mobi'] === 1,
                ],
                'reading' => [
                    'current_page' => $currentPage,
                    'first_read' => $row['first_read'],
                    'last_read' => $row['last_read'],
                ],
            ];
        }, $statement->fetchAll());
    }

    /** @return array{current_page:int}|null */
    public function readingProgress(int $userId, string $bookUri): ?array
    {
        $statement = $this->pdo->prepare(
            'SELECT ub.current_page FROM user_books ub '
            . 'JOIN ebooks_books b ON b.ebooks_books_id = ub.ebooks_books_id '
            . 'WHERE ub.user_id = :user_id AND b.uri = :uri LIMIT 1'
        );
        $statement->execute(['user_id' => $userId, 'uri' => $bookUri]);
        $row = $statement->fetch();
        return is_array($row) ? ['current_page' => max(1, (int) $row['current_page'])] : null;
    }

    public function updateReadingProgress(int $userId, string $bookUri, int $page): bool
    {
        $statement = $this->pdo->prepare(
            'UPDATE user_books ub JOIN ebooks_books b ON b.ebooks_books_id = ub.ebooks_books_id '
            . 'SET ub.current_page = :page, ub.last_read = NOW(), ub.leidas = ub.leidas + 1 '
            . 'WHERE ub.user_id = :user_id AND b.uri = :uri'
        );
        $statement->execute(['page' => $page, 'user_id' => $userId, 'uri' => $bookUri]);
        return $statement->rowCount() > 0;
    }
}
