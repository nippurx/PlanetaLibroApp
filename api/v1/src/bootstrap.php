<?php

declare(strict_types=1);

use PlanetaLibro\Api\V1\Db\PdoFactory;
use PlanetaLibro\Api\V1\Repositories\AuthorsRepo;
use PlanetaLibro\Api\V1\Repositories\BooksRepo;
use PlanetaLibro\Api\V1\Repositories\SearchRepo;

function bootstrap(string $root): array
{
    spl_autoload_register(
        static function (string $class) use ($root): void {
            $prefix = 'PlanetaLibro\\Api\\V1\\';
            if (strpos($class, $prefix) !== 0) {
                return;
            }

            $relative = substr($class, strlen($prefix));
            $path = $root . '/src/' . str_replace('\\', '/', $relative) . '.php';
            if (is_file($path)) {
                require $path;
            }
        }
    );

    require_once $root . '/src/helpers.php';

    $config = require $root . '/config/config.php';
    $pdo = PdoFactory::create($config['db']);
    $logger = createLogger($root, $config);

    return [
        'config' => $config,
        'pdo' => $pdo,
        'logger' => $logger,
        'booksRepo' => new BooksRepo($pdo),
        'authorsRepo' => new AuthorsRepo($pdo),
        'searchRepo' => new SearchRepo($pdo),
    ];
}

function createLogger(string $root, array $config): callable
{
    $enabled = (bool) ($config['log_errors'] ?? true);
    $logDir = $root . '/storage/logs';
    $logFile = $logDir . '/api.log';

    return static function (Throwable $exception) use ($enabled, $logDir, $logFile): void {
        if (!$enabled) {
            return;
        }

        if (!is_dir($logDir)) {
            return;
        }

        $message = sprintf(
            "[%s] %s in %s:%d\n",
            date('c'),
            $exception->getMessage(),
            $exception->getFile(),
            $exception->getLine()
        );

        error_log($message, 3, $logFile);
    };
}
