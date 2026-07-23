<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Auth;

/** Application-level view of the current caller, without Legacy mechanics. */
final class SessionContext
{
    private ?int $userId;
    private ?string $username;
    private ?string $avatarUrl;

    /** @var array<string, bool> */
    private array $capabilities;

    /** @param array<string, bool> $capabilities */
    private function __construct(?int $userId, ?string $username, ?string $avatarUrl, array $capabilities)
    {
        $this->userId = $userId;
        $this->username = $username;
        $this->avatarUrl = $avatarUrl;
        $this->capabilities = $capabilities;
    }

    public static function anonymous(): self
    {
        return new self(null, null, null, []);
    }

    /** @param array<string, bool> $capabilities */
    public static function authenticated(int $userId, string $username, ?string $avatarUrl, array $capabilities): self
    {
        if ($userId <= 0) {
            throw new \InvalidArgumentException('Authenticated session contexts require a positive user id.');
        }

        return new self($userId, $username, $avatarUrl, $capabilities);
    }

    public function isAuthenticated(): bool
    {
        return $this->userId !== null;
    }

    public function userId(): ?int
    {
        return $this->userId;
    }

    public function username(): ?string
    {
        return $this->username;
    }

    public function avatarUrl(): ?string
    {
        return $this->avatarUrl;
    }

    public function hasCapability(string $capability): bool
    {
        return $this->capabilities[$capability] ?? false;
    }
}
