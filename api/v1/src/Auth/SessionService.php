<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Auth;

/** Application-facing boundary; controllers never inspect Legacy mechanics. */
final class SessionService
{
    private LegacySessionResolver $legacySessions;

    public function __construct(LegacySessionResolver $legacySessions)
    {
        $this->legacySessions = $legacySessions;
    }

    public function currentContext(): SessionContext
    {
        return $this->legacySessions->resolve();
    }

    public function rememberReturnTo(string $returnTo): bool
    {
        return $this->legacySessions->rememberReturnTo($returnTo);
    }

    public function csrfToken(): string
    {
        return $this->legacySessions->csrfToken();
    }

    public function validateCsrfToken(string $token): bool
    {
        return $this->legacySessions->validateCsrfToken($token);
    }

    public function allowAction(string $bucket, int $limit, int $windowSeconds): bool
    {
        return $this->legacySessions->allowAction($bucket, $limit, $windowSeconds);
    }
}
