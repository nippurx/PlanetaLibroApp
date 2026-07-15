<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Controllers;

use PlanetaLibro\Api\V1\Auth\SessionService;
use PlanetaLibro\Api\V1\Request;
use PlanetaLibro\Api\V1\Response;

final class SessionController
{
    private SessionService $sessions;

    public function __construct(SessionService $sessions)
    {
        $this->sessions = $sessions;
    }

    /** @param array<string, string> $params */
    public function show(Request $request, array $params): void
    {
        Response::preventPrivateCaching();
        $user = $this->sessions->currentUser();
        Response::ok([
            'authenticated' => $user !== null,
            'user' => $user === null ? null : [
                'id' => $user['id'],
                'username' => $user['username'],
                'avatar_url' => $user['avatar_url'],
            ],
            'entitlements' => ['premium' => $user !== null && $user['premium']],
        ]);
    }

    /** @param array<string, string> $params */
    public function redirectToLegacyLogin(Request $request, array $params): void
    {
        Response::preventPrivateCaching();
        $returnTo = $request->queryString('return_to', '/app/');
        if (!$this->sessions->rememberReturnTo($returnTo)) {
            Response::badRequest('Invalid return path.');
            return;
        }

        header('Location: /login.php', true, 302);
    }
}
