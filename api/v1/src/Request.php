<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1;

final class Request
{
    private string $method;
    private string $path;

    /** @var array<string, mixed> */
    private array $query;
    /** @var array<string, mixed> */
    private array $body;

    private function __construct(
        string $method,
        string $path,
        array $query,
        array $body
    ) {
        $this->method = $method;
        $this->path = $path;
        $this->query = $query;
        $this->body = $body;
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

        $body = [];
        $rawBody = file_get_contents('php://input');
        if (is_string($rawBody) && $rawBody !== '') {
            $decoded = json_decode($rawBody, true);
            if (is_array($decoded)) {
                $body = $decoded;
            }
        }

        return new self($method, $path, $_GET, $body);
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

    public function queryOptionalInt(string $key, int $min, int $max): ?int
    {
        if (!array_key_exists($key, $this->query) || $this->query[$key] === '') {
            return null;
        }
        $value = filter_var($this->query[$key], FILTER_VALIDATE_INT);
        return $value !== false && $value >= $min && $value <= $max ? (int) $value : null;
    }

    public function bodyInt(string $key, int $min, int $max): ?int
    {
        if (!array_key_exists($key, $this->body)) {
            return null;
        }
        $value = filter_var($this->body[$key], FILTER_VALIDATE_INT);
        return $value !== false && $value >= $min && $value <= $max ? $value : null;
    }

    public function bodyString(string $key, int $maxLength, bool $allowEmpty = false): ?string
    {
        if (!array_key_exists($key, $this->body) || !is_string($this->body[$key])) {
            return null;
        }
        $value = trim($this->body[$key]);
        if ((!$allowEmpty && $value === '') || $this->unicodeLength($value) > $maxLength) {
            return null;
        }
        return $value;
    }

    public function bodyNullableString(string $key, int $maxLength): ?string
    {
        if (!array_key_exists($key, $this->body) || $this->body[$key] === null) {
            return null;
        }
        if (!is_string($this->body[$key])) {
            return null;
        }
        $value = trim($this->body[$key]);
        if ($value === '') {
            return null;
        }
        return $this->unicodeLength($value) <= $maxLength ? $value : null;
    }

    public function bodyIsStringOrNull(string $key, int $maxLength): bool
    {
        if (!array_key_exists($key, $this->body)) {
            return false;
        }
        if ($this->body[$key] === null) {
            return true;
        }
        return is_string($this->body[$key])
            && $this->unicodeLength(trim($this->body[$key])) <= $maxLength;
    }

    public function header(string $name): string
    {
        $key = 'HTTP_' . strtoupper(str_replace('-', '_', $name));
        $value = $_SERVER[$key] ?? '';
        return is_string($value) ? trim($value) : '';
    }

    /** @param array<string, string> $params */
    public function routeParamInt(array $params, string $name, int $min = 1): ?int
    {
        if (!isset($params[$name])) {
            return null;
        }
        $value = filter_var($params[$name], FILTER_VALIDATE_INT);
        return $value !== false && $value >= $min ? (int) $value : null;
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

    private function unicodeLength(string $value): int
    {
        // JavaScript string offsets use UTF-16 code units. Keep server-side
        // limits in that same unit so astral characters cannot drift between
        // the reader anchor and API validation.
        if (function_exists('mb_convert_encoding')) {
            return intdiv(strlen(mb_convert_encoding($value, 'UTF-16LE', 'UTF-8')), 2);
        }

        preg_match_all('/[\x{10000}-\x{10FFFF}]|./us', $value, $matches);
        $length = 0;
        foreach ($matches[0] as $character) {
            $length += strlen($character) === 4 ? 2 : 1;
        }
        return $length;
    }
}
