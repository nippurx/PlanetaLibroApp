<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Reader;

interface ReaderManifestRepositoryInterface
{
    public function findBookIdByUri(string $uri): ?int;

    public function enqueueLegacyRegeneration(int $bookId): void;

    public function markCompatibilityManifestGenerated(int $bookId): void;
}
