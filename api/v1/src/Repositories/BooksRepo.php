<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Repositories;

use PDO;
use PlanetaLibro\Api\V1\Paths\AssetPaths;

final class BooksRepo
{
    private PDO $pdo;
    private AssetPaths $assetPaths;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
        $this->assetPaths = new AssetPaths('biblioteca');
    }

    public function findBookByUri(string $uri): ?array
    {
        $sql = <<<'SQL'
SELECT
    b.ebooks_books_id,
    b.uri,
    b.ebooks_books_title,
    b.ebooks_books_subtitle,
    b.ebooks_books_txt_inf,
    b.ebooks_books_cover,
    b.cover_link,
    b.ebooks_books_file,
    b.ebooks_books_file_alternative,
    b.ebooks_books_file_audiobook,
    b.ebooks_format_pdf,
    b.ebooks_format_epub,
    b.ebooks_format_mobi,
    b.external_pdf,
    b.video_audiolibro,
    b.read_online,
    b.descargar,
    b.url_amazon,
    b.link_p2p,
    b.link_hotmart,
    b.ebooks_books_lang,
    b.ebooks_books_updated,
    a.ebooks_authors_id,
    a.uri AS author_uri,
    a.ebooks_authors_name,
    a.ebooks_authors_surname
FROM ebooks_books b
LEFT JOIN ebooks_authors a
    ON a.ebooks_authors_id = b.ebooks_books_author
WHERE b.uri = :uri
LIMIT 1
SQL;

        $statement = $this->pdo->prepare($sql);
        $statement->bindValue(':uri', $uri, PDO::PARAM_STR);
        $statement->execute();
        $row = $statement->fetch();

        if ($row === false) {
            return null;
        }

        $book = $this->mapBookDetail($row);
        $book['tags'] = $this->getBookTags((int) $row['ebooks_books_id']);

        return $book;
    }

    /**
     * @return array<int, array{label: string, uri: string}>
     */
    public function getBookTags(int $bookId): array
    {
        $sql = <<<'SQL'
SELECT DISTINCT
    t.nombre_es AS label,
    t.uri
FROM books_tags bt
INNER JOIN tags t
    ON t.id = bt.tag_id
WHERE bt.book_id = :book_id
  AND t.uri <> ''
  AND t.nombre_es <> ''
ORDER BY t.nombre_es ASC
SQL;

        $statement = $this->pdo->prepare($sql);
        $statement->bindValue(':book_id', $bookId, PDO::PARAM_INT);
        $statement->execute();

        $tags = [];

        foreach ($statement->fetchAll() as $row) {
            $label = trim((string) ($row['label'] ?? ''));
            $uri = trim((string) ($row['uri'] ?? ''));

            if ($label === '' || $uri === '') {
                continue;
            }

            $tags[] = [
                'label' => $label,
                'uri' => $uri,
            ];
        }

        return $tags;
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function listBooks(int $limit, int $offset): array
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
ORDER BY b.ebooks_books_updated DESC, b.ebooks_books_id DESC
LIMIT :limit OFFSET :offset
SQL;

        $statement = $this->pdo->prepare($sql);
        $statement->bindValue(':limit', $limit, PDO::PARAM_INT);
        $statement->bindValue(':offset', $offset, PDO::PARAM_INT);
        $statement->execute();

        return array_map([$this, 'mapBookListItem'], $statement->fetchAll());
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function listBooksByAuthorId(int $authorId, int $limit, int $offset): array
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
WHERE b.ebooks_books_author = :author_id
ORDER BY b.views_last DESC, b.views DESC, b.ebooks_books_id DESC
LIMIT :limit OFFSET :offset
SQL;

        $statement = $this->pdo->prepare($sql);
        $statement->bindValue(':author_id', $authorId, PDO::PARAM_INT);
        $statement->bindValue(':limit', $limit, PDO::PARAM_INT);
        $statement->bindValue(':offset', $offset, PDO::PARAM_INT);
        $statement->execute();

        return array_map([$this, 'mapBookListItem'], $statement->fetchAll());
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function getBooksByTagUri(string $tagUri, int $limit = 20, int $offset = 0, ?string $lang = null): array
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
INNER JOIN books_tags bt
    ON bt.book_id = b.ebooks_books_id
INNER JOIN tags t
    ON t.id = bt.tag_id
LEFT JOIN ebooks_authors a
    ON a.ebooks_authors_id = b.ebooks_books_author
WHERE t.uri = :tag_uri
SQL;

        if ($lang !== null) {
            $sql .= "\n  AND b.ebooks_books_lang = :lang";
        }

        $sql .= "\nORDER BY b.views_last DESC, b.ebooks_books_id DESC";
        $sql .= "\nLIMIT :limit OFFSET :offset";

        $statement = $this->pdo->prepare($sql);
        $statement->bindValue(':tag_uri', $tagUri, PDO::PARAM_STR);
        if ($lang !== null) {
            $statement->bindValue(':lang', $lang, PDO::PARAM_STR);
        }
        $statement->bindValue(':limit', $limit, PDO::PARAM_INT);
        $statement->bindValue(':offset', $offset, PDO::PARAM_INT);
        $statement->execute();

        return array_map([$this, 'mapBookListItem'], $statement->fetchAll());
    }

    /**
     * Legacy equivalent of libro_funcs.php::show_list_libros_top(),
     * returning structured data for the API instead of HTML.
     *
     * @return array<int, array<string, mixed>>
     */
    public function getTopSearchedBooks(int $limit = 10, string $lang = 'es'): array
    {
        $sql = <<<'SQL'
SELECT
    b.ebooks_books_id,
    b.uri,
    b.ebooks_books_title,
    b.ebooks_books_cover,
    b.cover_link,
    b.video_audiolibro,
    b.read_online,
    a.uri AS author_uri,
    a.ebooks_authors_name,
    a.ebooks_authors_surname
FROM ebooks_books b
LEFT JOIN ebooks_authors a
    ON a.ebooks_authors_id = b.ebooks_books_author
WHERE b.ebooks_books_lang = :lang
ORDER BY b.views_last DESC
LIMIT :limit
SQL;

        $statement = $this->pdo->prepare($sql);
        $statement->bindValue(':lang', $lang, PDO::PARAM_STR);
        $statement->bindValue(':limit', $limit, PDO::PARAM_INT);
        $statement->execute();

        return array_map([$this, 'mapTopSearchedBookItem'], $statement->fetchAll());
    }

    /**
     * API equivalent of libro_funcs.php::show_list_libros_top_leidos().
     *
     * @return array<int, array<string, mixed>>
     */
    public function getTopReadBooks(int $limit = 10, string $lang = 'es'): array
    {
        $sql = <<<'SQL'
SELECT
    b.ebooks_books_id,
    b.uri,
    b.ebooks_books_title,
    b.ebooks_books_cover,
    b.cover_link,
    b.video_audiolibro,
    b.read_online,
    a.uri AS author_uri,
    a.ebooks_authors_name,
    a.ebooks_authors_surname,
    readers.total_readers
FROM ebooks_books b
INNER JOIN (
    SELECT
        ebooks_books_id,
        COUNT(DISTINCT user_id) AS total_readers
    FROM user_books
    GROUP BY ebooks_books_id
) readers
    ON readers.ebooks_books_id = b.ebooks_books_id
LEFT JOIN ebooks_authors a
    ON a.ebooks_authors_id = b.ebooks_books_author
WHERE b.ebooks_books_lang = :lang
ORDER BY readers.total_readers DESC, b.ebooks_books_id DESC
LIMIT :limit
SQL;

        $statement = $this->pdo->prepare($sql);
        $statement->bindValue(':lang', $lang, PDO::PARAM_STR);
        $statement->bindValue(':limit', $limit, PDO::PARAM_INT);
        $statement->execute();

        return array_map([$this, 'mapTopSearchedBookItem'], $statement->fetchAll());
    }
    /**
     * @param array<string, mixed> $row
     * @return array<string, mixed>
     */
    private function mapBookDetail(array $row): array
    {
        $bookUri = (string) $row['uri'];
        $authorUri = $this->resolveAuthorUri($row);
        $coverPath = $this->assetPaths->bookCoverPath($authorUri, $bookUri);

        return [
            'id' => (int) $row['ebooks_books_id'],
            'uri' => $bookUri,
            'author_uri' => $authorUri,
            'titulo' => $row['ebooks_books_title'],
            'subtitulo' => $row['ebooks_books_subtitle'],
            'descripcion' => $row['ebooks_books_txt_inf'],
            'cover_path' => $coverPath,
            'cover_url' => $coverPath,
            'book_dir_path' => $this->assetPaths->bookDirPath($authorUri, $bookUri),
            'cover_candidates' => $this->assetPaths->guessCoverCandidates($authorUri, $bookUri),
            'autor' => [
                'id' => $row['ebooks_authors_id'] !== null ? (int) $row['ebooks_authors_id'] : null,
                'uri' => $authorUri,
                'nombre' => $this->buildAuthorName($row),
                'photo' => $this->buildAuthorPhoto($authorUri),
            ],
            'cover' => [
                'available' => (int) $row['ebooks_books_cover'] === 1,
                'link' => $row['cover_link'],
            ],
            'recursos' => [
                'archivo' => $row['ebooks_books_file'],
                'archivo_path' => $this->assetPaths->bookFilePath($authorUri, $bookUri, $row['ebooks_books_file']),
                'archivo_alternativo' => $row['ebooks_books_file_alternative'],
                'archivo_alternativo_path' => $this->assetPaths->bookFilePath($authorUri, $bookUri, $row['ebooks_books_file_alternative']),
                'archivo_audiolibro' => $row['ebooks_books_file_audiobook'],
                'archivo_audiolibro_path' => $this->assetPaths->bookFilePath($authorUri, $bookUri, $row['ebooks_books_file_audiobook']),
                'external_pdf' => $row['external_pdf'],
                'read_online' => (int) $row['read_online'] === 1,
                'descargar' => (int) $row['descargar'] === 1,
                'video_audiolibro' => $row['video_audiolibro'],
                'url_amazon' => $row['url_amazon'],
                'link_p2p' => $row['link_p2p'],
                'link_hotmart' => $row['link_hotmart'],
            ],
            'formatos' => [
                'pdf' => (int) $row['ebooks_format_pdf'] === 1,
                'epub' => (int) $row['ebooks_format_epub'] === 1,
                'mobi' => (int) $row['ebooks_format_mobi'] === 1,
            ],
            'idioma' => $row['ebooks_books_lang'],
            'updated_at' => $row['ebooks_books_updated'],
            'tags' => [],
        ];
    }

    /**
     * @param array<string, mixed> $row
     * @return array<string, mixed>
     */
    private function mapBookListItem(array $row): array
    {
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
                'nombre' => $this->buildAuthorName($row),
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
     * @param array<string, mixed> $row
     * @return array<string, mixed>
     */
    private function mapTopSearchedBookItem(array $row): array
    {
        $bookUri = (string) $row['uri'];
        $authorUri = $this->resolveAuthorUri($row);

        return [
            'id' => (int) $row['ebooks_books_id'],
            'uri' => $bookUri,
            'titulo' => $row['ebooks_books_title'],
            'autor' => $this->buildAuthorName($row),
            'author_uri' => $authorUri,
            'cover_url' => $this->assetPaths->bookCoverPath($authorUri, $bookUri),
            'video_audiolibro' => $row['video_audiolibro'],
            'read_online' => (int) $row['read_online'] === 1,
        ];
    }

    /**
     * @param array<string, mixed> $row
     */
    private function buildAuthorName(array $row): ?string
    {
        $name = trim((string) ($row['ebooks_authors_name'] ?? ''));
        $surname = trim((string) ($row['ebooks_authors_surname'] ?? ''));
        $fullName = trim($name . ' ' . $surname);

        return $fullName !== '' ? $fullName : null;
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
