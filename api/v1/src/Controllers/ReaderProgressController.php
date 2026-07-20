<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Controllers;

use PlanetaLibro\Api\V1\Auth\SessionService;
use PlanetaLibro\Api\V1\Repositories\LibraryRepo;
use PlanetaLibro\Api\V1\Request;
use PlanetaLibro\Api\V1\Response;

final class ReaderProgressController
{
    private SessionService $sessions;
    private LibraryRepo $library;

    public function __construct(SessionService $sessions, LibraryRepo $library)
    {
        $this->sessions = $sessions;
        $this->library = $library;
    }

    /** @param array<string, string> $params */
    public function show(Request $request, array $params): void
    {
        Response::preventPrivateCaching();
        $uri = $request->routeParamUri($params);
        if ($uri === null) {
            Response::badRequest('Invalid book uri.');
            return;
        }
        $user = $this->sessions->currentUser();
        if ($user === null) {
            Response::json(['error' => ['code' => 'unauthenticated', 'message' => 'Authentication required.']], 401);
            return;
        }
        Response::ok($this->library->readingProgress((int) $user['id'], $uri));
    }

    /** @param array<string, string> $params */
    public function update(Request $request, array $params): void
    {
        Response::preventPrivateCaching();
        if (!$this->isSameOrigin()) {
            Response::json(['error' => ['code' => 'forbidden', 'message' => 'Invalid request origin.']], 403);
            return;
        }
        $uri = $request->routeParamUri($params);
        $page = $request->bodyInt('page', 1, 1000000);
        if ($uri === null || $page === null) {
            Response::badRequest('Invalid book uri or page.');
            return;
        }
        $user = $this->sessions->currentUser();
        if ($user === null) {
            Response::json(['error' => ['code' => 'unauthenticated', 'message' => 'Authentication required.']], 401);
            return;
        }
        if (!$this->sessions->validateCsrfToken($request->header('X-CSRF-Token'))) {
            Response::json(['error' => ['code' => 'forbidden', 'message' => 'Invalid CSRF token.']], 403);
            return;
        }
        $result = $this->library->recordReadingProgress((int) $user['id'], $uri, $page);
        if ($result === null) {
            Response::notFound('Book not found.', 'book_not_found');
            return;
        }
        Response::ok([
            'created' => $result['created'],
            'updated' => true,
            'current_page' => $result['current_page'],
        ]);
    }

    private function isSameOrigin(): bool
    {
        $origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
        if ($origin === '') {
            return true;
        }
        $originHost = strtolower((string) parse_url($origin, PHP_URL_HOST));
        $requestHost = strtolower((string) preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? ''));
        return $originHost !== '' && hash_equals($requestHost, $originHost);
    }
}
