<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Controllers;

use PlanetaLibro\Api\V1\Auth\SessionService;
use PlanetaLibro\Api\V1\Repositories\AudiobookProgressRepo;
use PlanetaLibro\Api\V1\Request;
use PlanetaLibro\Api\V1\Response;

final class AudiobookProgressController
{
    private const MAX_POSITION_SECONDS = 10000000;
    private const MAX_MEDIA_ID_LENGTH = 2048;

    private SessionService $sessions;
    private AudiobookProgressRepo $progress;

    public function __construct(SessionService $sessions, AudiobookProgressRepo $progress)
    {
        $this->sessions = $sessions;
        $this->progress = $progress;
    }

    /** @param array<string, string> $params */
    public function show(Request $request, array $params): void
    {
        Response::preventPrivateCaching();
        $userId = $this->authenticatedUserId();
        $uri = $request->routeParamUri($params);
        if ($userId === null || $uri === null) {
            if ($userId !== null) Response::badRequest('Invalid book uri.');
            return;
        }

        $progress = $this->progress->forUser($userId, $uri);
        if ($progress === null) {
            Response::notFound('Book not found.', 'book_not_found');
            return;
        }
        if (($progress['has_audiobook'] ?? false) !== true) {
            Response::notFound('Audiobook not found.', 'audiobook_not_found');
            return;
        }
        unset($progress['has_audiobook']);
        Response::ok($progress);
    }

    /** @param array<string, string> $params */
    public function update(Request $request, array $params): void
    {
        Response::preventPrivateCaching();
        $userId = $this->authorizeWrite($request);
        $uri = $request->routeParamUri($params);
        $position = $request->bodyInt('position_seconds', 0, self::MAX_POSITION_SECONDS);
        $mediaId = $request->bodyString('media_id', self::MAX_MEDIA_ID_LENGTH);
        if ($userId === null || $uri === null || $position === null || $mediaId === null) {
            if ($userId !== null) Response::badRequest('Invalid audiobook progress payload.');
            return;
        }

        $result = $this->progress->record($userId, $uri, $position, $mediaId);
        if ($result['status'] === 'book_not_found') {
            Response::notFound('Book not found.', 'book_not_found');
            return;
        }
        if ($result['status'] === 'audiobook_not_found') {
            Response::notFound('Audiobook not found.', 'audiobook_not_found');
            return;
        }
        if ($result['status'] === 'media_changed') {
            Response::json([
                'error' => [
                    'code' => 'audiobook_media_changed',
                    'message' => 'The audiobook media changed; reload before saving progress.',
                    'media_id' => $result['media_id'],
                ],
            ], 409);
            return;
        }

        unset($result['status']);
        Response::json(['data' => $result], $result['created'] ? 201 : 200);
    }

    private function authenticatedUserId(): ?int
    {
        $session = $this->sessions->currentContext();
        $userId = $session->userId();
        if (!$session->isAuthenticated() || $userId === null) {
            Response::json(['error' => ['code' => 'unauthenticated', 'message' => 'Authentication required.']], 401);
            return null;
        }
        return $userId;
    }

    private function authorizeWrite(Request $request): ?int
    {
        $userId = $this->authenticatedUserId();
        if ($userId === null) return null;
        if (!$this->isSameOrigin() || !$this->sessions->validateCsrfToken($request->header('X-CSRF-Token'))) {
            Response::json(['error' => ['code' => 'forbidden', 'message' => 'Invalid request origin or CSRF token.']], 403);
            return null;
        }
        if (!$this->sessions->allowAction('audiobook-progress-write', 120, 60)) {
            Response::json(['error' => ['code' => 'rate_limited', 'message' => 'Too many audiobook progress updates.']], 429);
            return null;
        }
        return $userId;
    }

    private function isSameOrigin(): bool
    {
        $origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
        if ($origin === '') return true;
        $originHost = strtolower((string) parse_url($origin, PHP_URL_HOST));
        $requestHost = strtolower((string) preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? ''));
        return $originHost !== '' && hash_equals($requestHost, $originHost);
    }
}
