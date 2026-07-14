<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1;

final class Request
{
    private string $method;
    private string $path;

    /** @var array<string, mixed> */
    private array $query;

    private function __construct(
        string $method,
        string $path,
        array $query
    ) {
        $this->method = $method;
        $this->path = $path;
        $this->query = $query;
    }

    public static function fromGlobals(string $basePath = ''): self
    {
        $method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
        $uri = $_SERVER['REQUEST_URI'] ?? '/';
        $path = (string) parse_url($uri, PHP_URL_PATH);
        $path = self::stripBasePath($path, $basePath);
        $path = '/' . ltrim($path, '/');
        if ($path !== '/') {
            $path = rtrim($path, '/');
        }

        return new self($method, $path, $_GET);
    }

    public function method(): string
    {
        return $this->method;
    }

    public function path(): string
    {
        return $this->path;
    }

    public function queryString(string $key, string $default = ''): string
    {
        $value = $this->query[$key] ?? $default;
        return is_string($value) ? trim($value) : $default;
    }

    public function queryInt(string $key, int $default, int $min, int $max): ?int
    {
        if (!array_key_exists($key, $this->query)) {
            return $default;
        }

        $value = filter_var($this->query[$key], FILTER_VALIDATE_INT);
        if ($value === false || $value < $min || $value > $max) {
            return null;
        }

        return $value;
    }

    /**
     * @param array<string, string> $params
     */
    public function routeParamUri(array $params, string $name = 'uri'): ?string
    {
        if (!isset($params[$name])) {
            return null;
        }

        $decoded = rawurldecode($params[$name]);
        $decoded = trim($decoded);
        if ($decoded === '' || strpos($decoded, '/') !== false) {
            return null;
        }

        return $decoded;
    }

    private static function stripBasePath(string $path, string $basePath): string
    {
        $basePath = '/' . trim($basePath, '/');
        if ($basePath === '/') {
            return $path;
        }

        if (strpos($path, $basePath) === 0) {
            $path = substr($path, strlen($basePath));
        }

        return $path === '' ? '/' : $path;
    }
}
