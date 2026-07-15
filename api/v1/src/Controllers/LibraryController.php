<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Controllers;

use PlanetaLibro\Api\V1\Auth\SessionService;
use PlanetaLibro\Api\V1\Repositories\LibraryRepo;
use PlanetaLibro\Api\V1\Request;
use PlanetaLibro\Api\V1\Response;

final class LibraryController
{
    private SessionService $sessions;
    private LibraryRepo $library;

    public function __construct(SessionService $sessions, LibraryRepo $library)
    {
        $this->sessions = $sessions;
        $this->library = $library;
    }

    /** @param array<string, string> $params */
    public function index(Request $request, array $params): void
    {
        Response::preventPrivateCaching();
        $user = $this->sessions->currentUser();
        if ($user === null) {
            Response::json(['error' => ['code' => 'unauthenticated', 'message' => 'Authentication required.']], 401);
            return;
        }

        Response::ok(['items' => $this->library->forUser((int) $user['id'])]);
    }
}
