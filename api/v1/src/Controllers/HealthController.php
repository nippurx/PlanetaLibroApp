<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Controllers;

use PlanetaLibro\Api\V1\Request;
use PlanetaLibro\Api\V1\Response;

final class HealthController
{
    private array $config;

    /**
     * @param array<string, mixed> $config
     */
    public function __construct(array $config)
    {
        $this->config = $config;
    }

    /**
     * @param array<string, string> $params
     */
    public function show(Request $request, array $params): void
    {
        Response::ok([
            'ok' => true,
            'version' => $this->config['version'] ?? 'v1',
        ]);
    }
}
