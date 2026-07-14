<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Controllers;

use PlanetaLibro\Api\V1\Repositories\SearchRepo;
use PlanetaLibro\Api\V1\Request;
use PlanetaLibro\Api\V1\Response;

final class SearchController
{
    private SearchRepo $searchRepo;

    public function __construct(SearchRepo $searchRepo)
    {
        $this->searchRepo = $searchRepo;
    }

    /**
     * @param array<string, string> $params
     */
    public function index(Request $request, array $params): void
    {
        $query = $request->queryString('q');
        if ($query === '') {
            Response::badRequest('Missing required query parameter: q.');
            return;
        }

        $limit = $request->queryInt('limit', 20, 1, 100);
        $offset = $request->queryInt('offset', 0, 0, 100000);

        if ($limit === null || $offset === null) {
            Response::badRequest('Invalid limit or offset.');
            return;
        }

        Response::ok([
            'items' => $this->searchRepo->searchBooks($query, $limit, $offset),
            'pagination' => [
                'q' => $query,
                'limit' => $limit,
                'offset' => $offset,
            ],
        ]);
    }
}
