<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Repositories;

use PDO;
use PlanetaLibro\Api\V1\Reader\ReaderManifestRepositoryInterface;

final class ReaderManifestRepo implements ReaderManifestRepositoryInterface
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function findBookIdByUri(string $uri): ?int
    {
        $statement = $this->pdo->prepare(
            'SELECT ebooks_books_id FROM ebooks_books WHERE uri = :uri LIMIT 1'
        );
        $statement->bindValue(':uri', $uri, PDO::PARAM_STR);
        $statement->execute();
        $value = $statement->fetchColumn();

        return $value === false ? null : (int) $value;
    }

    public function enqueueLegacyRegeneration(int $bookId): void
    {
        $sql = <<<'SQL'
INSERT INTO ebook_regeneration_queue (
    ebooks_books_id,
    reason,
    status,
    target_generator
) VALUES (
    :book_id,
    'legacy_compatibility_manifest',
    'pending',
    'epub2html2'
)
ON DUPLICATE KEY UPDATE
    reason = VALUES(reason),
    updated_at = CURRENT_TIMESTAMP
SQL;
        $statement = $this->pdo->prepare($sql);
        $statement->bindValue(':book_id', $bookId, PDO::PARAM_INT);
        $statement->execute();
    }

    public function markCompatibilityManifestGenerated(int $bookId): void
    {
        $statement = $this->pdo->prepare(
            'UPDATE ebook_regeneration_queue
             SET compatibility_manifest_generated_at = CURRENT_TIMESTAMP,
                 updated_at = CURRENT_TIMESTAMP
             WHERE ebooks_books_id = :book_id
               AND target_generator = \'epub2html2\''
        );
        $statement->bindValue(':book_id', $bookId, PDO::PARAM_INT);
        $statement->execute();
    }
}
