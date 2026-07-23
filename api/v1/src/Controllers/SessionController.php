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
        $session = $this->sessions->currentContext();
        Response::ok([
            'authenticated' => $session->isAuthenticated(),
            'user' => !$session->isAuthenticated() ? null : [
                'id' => $session->userId(),
                'username' => $session->username(),
                'avatar_url' => $session->avatarUrl(),
            ],
            'entitlements' => ['premium' => $session->hasCapability('premium')],
            'csrf_token' => !$session->isAuthenticated() ? null : $this->sessions->csrfToken(),
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
