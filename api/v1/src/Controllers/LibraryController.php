<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Controllers;

use PlanetaLibro\Api\V1\Auth\SessionService;
use PlanetaLibro\Api\V1\Library\LibraryLifecycle;
use PlanetaLibro\Api\V1\Library\LibraryService;
use PlanetaLibro\Api\V1\Repositories\LibraryRepo;
use PlanetaLibro\Api\V1\Request;
use PlanetaLibro\Api\V1\Response;

final class LibraryController
{
    private SessionService $sessions;
    private LibraryRepo $library;
    private LibraryService $libraryService;

    public function __construct(SessionService $sessions, LibraryRepo $library, LibraryService $libraryService)
    {
        $this->sessions = $sessions;
        $this->library = $library;
        $this->libraryService = $libraryService;
    }

    /** @param array<string, string> $params */
    public function index(Request $request, array $params): void
    {
        Response::preventPrivateCaching();
        $session = $this->sessions->currentContext();
        $userId = $session->userId();
        if (!$session->isAuthenticated() || $userId === null) {
            Response::json(['error' => ['code' => 'unauthenticated', 'message' => 'Authentication required.']], 401);
            return;
        }

        Response::ok(['items' => $this->library->forUser($userId)]);
    }

    /** @param array<string, string> $params */
    public function summary(Request $request, array $params): void
    {
        $userId = $this->authenticatedUserId();
        if ($userId === null) {
            return;
        }

        $previewLimit = $request->queryInt('preview_limit', 10, 1, 12);
        if ($previewLimit === null) {
            Response::badRequest('Invalid preview limit.');
            return;
        }

        Response::ok($this->libraryService->summary($userId, $previewLimit));
    }

    /** @param array<string, string> $params */
    public function items(Request $request, array $params): void
    {
        $userId = $this->authenticatedUserId();
        if ($userId === null) {
            return;
        }

        $state = strtolower($request->queryString('state', 'all'));
        $allowedStates = [
            'all',
            LibraryLifecycle::UNREAD,
            LibraryLifecycle::IN_PROGRESS,
            LibraryLifecycle::COMPLETED,
            LibraryLifecycle::ABANDONED,
        ];
        $sort = strtolower($request->queryString('sort', 'recent'));
        $query = $request->queryString('q');
        $limit = $request->queryInt('limit', 20, 1, 50);
        $offset = $request->queryInt('offset', 0, 0, 100000);

        if (
            !in_array($state, $allowedStates, true)
            || !in_array($sort, ['recent', 'oldest'], true)
            || strlen($query) > 300
            || $limit === null
            || $offset === null
        ) {
            Response::badRequest('Invalid library filters.');
            return;
        }

        Response::ok($this->libraryService->listing($userId, $state, $query, $sort, $limit, $offset));
    }

    private function authenticatedUserId(): ?int
    {
        Response::preventPrivateCaching();
        $session = $this->sessions->currentContext();
        $userId = $session->userId();
        if (!$session->isAuthenticated() || $userId === null) {
            Response::json(['error' => ['code' => 'unauthenticated', 'message' => 'Authentication required.']], 401);
            return null;
        }
        return $userId;
    }
}
