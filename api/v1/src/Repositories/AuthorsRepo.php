<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Repositories;

use PDO;

final class AuthorsRepo
{
    private PDO $pdo;
    private BooksRepo $booksRepo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
        $this->booksRepo = new BooksRepo($pdo);
    }

    public function findAuthorByUri(string $uri): ?array
    {
        $sql = <<<'SQL'
SELECT
    ebooks_authors_id,
    uri,
    ebooks_authors_name,
    ebooks_authors_surname,
    ebooks_authors_htm_bio,
    ebooks_authors_organisation,
    ebooks_authors_fallecimiento,
    ebooks_authors_rank,
    dompub,
    dompubreal
FROM ebooks_authors
WHERE uri = :uri
LIMIT 1
SQL;

        $statement = $this->pdo->prepare($sql);
        $statement->bindValue(':uri', $uri, PDO::PARAM_STR);
        $statement->execute();
        $row = $statement->fetch();

        return $row === false ? null : $this->mapAuthor($row);
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function listBooksByAuthorUri(string $authorUri, int $limit, int $offset): array
    {
        $author = $this->findAuthorByUri($authorUri);
        if ($author === null) {
            return [];
        }

        return $this->booksRepo->listBooksByAuthorId((int) $author['id'], $limit, $offset);
    }

    /**
     * @param array<string, mixed> $row
     * @return array<string, mixed>
     */
    private function mapAuthor(array $row): array
    {
        $name = trim((string) ($row['ebooks_authors_name'] ?? ''));
        $surname = trim((string) ($row['ebooks_authors_surname'] ?? ''));
        $fullName = trim($name . ' ' . $surname);
        $authorUri = trim((string) ($row['uri'] ?? ''));

        return [
            'id' => (int) $row['ebooks_authors_id'],
            'uri' => $row['uri'],
            'nombre' => $fullName !== '' ? $fullName : null,
            'nombre_base' => $row['ebooks_authors_name'],
            'apellido' => $row['ebooks_authors_surname'],
            'bio_html' => $row['ebooks_authors_htm_bio'],
            'organizacion' => (int) $row['ebooks_authors_organisation'] === 1,
            'fallecimiento' => $row['ebooks_authors_fallecimiento'],
            'rank' => $row['ebooks_authors_rank'] !== null ? (int) $row['ebooks_authors_rank'] : null,
            'dompub' => (int) $row['dompub'] === 1,
            'dompubreal' => (int) $row['dompubreal'] === 1,
            'photo' => \get_author_photo($authorUri),
        ];
    }
}
