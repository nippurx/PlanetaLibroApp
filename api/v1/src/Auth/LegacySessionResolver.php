<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Auth;

/** Boundary for every Legacy session interaction used by the API. */
interface LegacySessionResolver
{
    public function resolve(): SessionContext;

    public function rememberReturnTo(string $returnTo): bool;

    public function csrfToken(): string;

    public function validateCsrfToken(string $token): bool;

    public function allowAction(string $bucket, int $limit, int $windowSeconds): bool;
}
