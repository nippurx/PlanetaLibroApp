<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Controllers;

use PlanetaLibro\Api\V1\Reader\ReaderManifestException;
use PlanetaLibro\Api\V1\Reader\ReaderManifestService;
use PlanetaLibro\Api\V1\Request;
use PlanetaLibro\Api\V1\Response;

final class ReaderManifestController
{
    private ReaderManifestService $service;

    public function __construct(ReaderManifestService $service)
    {
        $this->service = $service;
    }

    /**
     * @param array<string,string> $params
     */
    public function show(Request $request, array $params): void
    {
        $uri = $request->routeParamUri($params);
        if ($uri === null) {
            Response::badRequest('Invalid book uri.');
            return;
        }

        try {
            header('Cache-Control: no-store');
            Response::ok($this->service->materialize($uri));
        } catch (ReaderManifestException $exception) {
            Response::json([
                'error' => [
                    'code' => $exception->errorCode(),
                    'message' => $exception->getMessage(),
                ],
            ], $exception->httpStatus());
        }
    }
}
