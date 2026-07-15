<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1;

final class Response
{
    public static function preventPrivateCaching(): void
    {
        header('Cache-Control: private, no-store, max-age=0');
        header('Pragma: no-cache');
        header('Vary: Cookie, Origin');
    }

    public static function json(array $payload, int $status = 200): void
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');

        echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    public static function ok($data): void
    {
        self::json(['data' => $data], 200);
    }

    public static function badRequest(string $message): void
    {
        self::json([
            'error' => [
                'code' => 'bad_request',
                'message' => $message,
            ],
        ], 400);
    }

    public static function notFound(string $message, string $code = 'not_found'): void
    {
        self::json([
            'error' => [
                'code' => $code,
                'message' => $message,
            ],
        ], 404);
    }

    public static function internalError(): void
    {
        self::json([
            'error' => [
                'code' => 'internal_error',
            ],
        ], 500);
    }
}
