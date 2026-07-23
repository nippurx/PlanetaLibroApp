<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Controllers;

use PlanetaLibro\Api\V1\Auth\SessionService;
use PlanetaLibro\Api\V1\Repositories\AudiobookBookmarksRepo;
use PlanetaLibro\Api\V1\Request;
use PlanetaLibro\Api\V1\Response;

final class AudiobookBookmarksController
{
    private const MAX_POSITION_SECONDS = 10000000;
    private const MAX_MEDIA_ID_LENGTH = 2048;
    private const MAX_NOTE = 10000;

    private SessionService $sessions;
    private AudiobookBookmarksRepo $bookmarks;

    public function __construct(SessionService $sessions, AudiobookBookmarksRepo $bookmarks)
    {
        $this->sessions = $sessions;
        $this->bookmarks = $bookmarks;
    }

    /** @param array<string,string> $params */
    public function index(Request $request, array $params): void
    {
        Response::preventPrivateCaching();
        $userId = $this->authenticatedUserId();
        $uri = $request->routeParamUri($params);
        if ($userId === null || $uri === null) { if ($userId !== null) Response::badRequest('Invalid book uri.'); return; }
        $media = $this->bookmarks->currentMedia($uri);
        if ($media === null) { Response::notFound('Book not found.', 'book_not_found'); return; }
        if ($media['media_id'] === null) { Response::notFound('Audiobook not found.', 'audiobook_not_found'); return; }
        Response::ok(['items' => $this->bookmarks->listCurrent($userId, $media['book_id'], $media['media_id']), 'media_id' => $media['media_id']]);
    }

    /** @param array<string,string> $params */
    public function create(Request $request, array $params): void
    {
        Response::preventPrivateCaching();
        $userId = $this->authorizeWrite($request);
        $uri = $request->routeParamUri($params);
        $position = $request->bodyInt('position_seconds', 0, self::MAX_POSITION_SECONDS);
        $mediaId = $request->bodyString('media_id', self::MAX_MEDIA_ID_LENGTH);
        $requestId = $request->bodyString('client_request_id', 36);
        if ($userId === null || $uri === null || $position === null || $mediaId === null || !$this->validUuid($requestId)) {
            if ($userId !== null) Response::badRequest('Invalid audiobook bookmark payload.');
            return;
        }
        $result = $this->bookmarks->create($userId, $uri, $mediaId, $position, strtolower((string) $requestId));
        if ($result['status'] === 'book_not_found') { Response::notFound('Book not found.', 'book_not_found'); return; }
        if ($result['status'] === 'audiobook_not_found') { Response::notFound('Audiobook not found.', 'audiobook_not_found'); return; }
        if ($result['status'] === 'media_changed') {
            Response::json(['error' => ['code' => 'audiobook_media_changed', 'message' => 'The audiobook media changed; reload before adding a bookmark.']], 409);
            return;
        }
        Response::json(['data' => ['bookmark' => $result['bookmark'], 'created' => $result['created']]], $result['created'] ? 201 : 200);
    }

    /** @param array<string,string> $params */
    public function update(Request $request, array $params): void
    {
        Response::preventPrivateCaching();
        $userId = $this->authorizeWrite($request);
        $id = $request->routeParamInt($params, 'id');
        $revision = $request->bodyInt('revision', 1, 2147483647);
        if ($userId === null || $id === null || $revision === null || !$request->bodyIsStringOrNull('note_text', self::MAX_NOTE)) {
            if ($userId !== null) Response::badRequest('Invalid audiobook bookmark update.');
            return;
        }
        if ($this->bookmarks->findOwned($userId, $id) === null) { Response::notFound('Bookmark not found.', 'audiobook_bookmark_not_found'); return; }
        $note = $request->bodyNullableString('note_text', self::MAX_NOTE);
        if (!$this->bookmarks->updateNote($userId, $id, $revision, $note)) {
            Response::json(['error' => ['code' => 'audiobook_bookmark_conflict', 'message' => 'The bookmark changed on another device.']], 409);
            return;
        }
        Response::ok($this->bookmarks->findOwned($userId, $id));
    }

    /** @param array<string,string> $params */
    public function delete(Request $request, array $params): void
    {
        Response::preventPrivateCaching();
        $userId = $this->authorizeWrite($request);
        $id = $request->routeParamInt($params, 'id');
        if ($userId === null || $id === null) { if ($userId !== null) Response::badRequest('Invalid audiobook bookmark id.'); return; }
        $this->bookmarks->delete($userId, $id);
        Response::ok(['deleted' => true]);
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
        if (!$this->sessions->allowAction('audiobook-bookmark-write', 60, 60)) {
            Response::json(['error' => ['code' => 'rate_limited', 'message' => 'Too many audiobook bookmark updates.']], 429);
            return null;
        }
        return $userId;
    }

    private function validUuid(?string $value): bool
    {
        return $value !== null && preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i', $value) === 1;
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
