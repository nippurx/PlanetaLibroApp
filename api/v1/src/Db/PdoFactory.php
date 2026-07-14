<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Db;

use PDO;

final class PdoFactory
{
    /**
     * @param array<string, string|int> $config
     */
    public static function create(array $config): PDO
    {
        $dsn = sprintf(
            'mysql:host=%s;dbname=%s;charset=utf8mb4',
            $config['host'],
            $config['name']
        );

        return new PDO(
            $dsn,
            (string) $config['user'],
            (string) $config['pass'],
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]
        );
    }
}
