<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Controllers;

use PlanetaLibro\Api\V1\Repositories\AuthorsRepo;
use PlanetaLibro\Api\V1\Request;
use PlanetaLibro\Api\V1\Response;

final class AuthorsController
{
    private AuthorsRepo $authorsRepo;

    public function __construct(AuthorsRepo $authorsRepo)
    {
        $this->authorsRepo = $authorsRepo;
    }

    /**
     * @param array<string, string> $params
     */
    public function show(Request $request, array $params): void
    {
        $uri = $request->routeParamUri($params);
        if ($uri === null) {
            Response::badRequest('Invalid author uri.');
            return;
        }

        $limit = $request->queryInt('limit', 20, 1, 100);
        $offset = $request->queryInt('offset', 0, 0, 100000);

        if ($limit === null || $offset === null) {
            Response::badRequest('Invalid limit or offset.');
            return;
        }

        $author = $this->authorsRepo->findAuthorByUri($uri);
        if ($author === null) {
            Response::notFound('Author not found.');
            return;
        }

        Response::ok([
            'author' => $author,
            'books' => $this->authorsRepo->listBooksByAuthorUri($uri, $limit, $offset),
            'pagination' => [
                'limit' => $limit,
                'offset' => $offset,
            ],
        ]);
    }
}
