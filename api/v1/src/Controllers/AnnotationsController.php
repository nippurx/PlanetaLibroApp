<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Controllers;

use PlanetaLibro\Api\V1\Auth\SessionService;
use PlanetaLibro\Api\V1\Repositories\AnnotationsRepo;
use PlanetaLibro\Api\V1\Reader\ReaderManifestException;
use PlanetaLibro\Api\V1\Reader\ReaderManifestService;
use PlanetaLibro\Api\V1\Request;
use PlanetaLibro\Api\V1\Response;

final class AnnotationsController
{
    private const MAX_EXACT = 4000;
    private const MAX_CONTEXT = 256;
    private const MAX_NOTE = 10000;
    private const MAX_FRAGMENT = 16777215;
    private const MAX_OFFSET = 2147483647;

    private SessionService $sessions;
    private AnnotationsRepo $annotations;
    private ReaderManifestService $manifests;

    public function __construct(SessionService $sessions, AnnotationsRepo $annotations, ReaderManifestService $manifests)
    {
        $this->sessions = $sessions;
        $this->annotations = $annotations;
        $this->manifests = $manifests;
    }

    /** @param array<string,string> $params */
    public function index(Request $request, array $params): void
    {
        Response::preventPrivateCaching();
        $userId = $this->authenticatedUserId();
        $uri = $request->routeParamUri($params);
        if ($userId === null || $uri === null) {
            if ($userId !== null) Response::badRequest('Invalid book uri.');
            return;
        }
        $bookId = $this->annotations->findBookId($uri);
        if ($bookId === null) {
            Response::notFound('Book not found.', 'book_not_found');
            return;
        }
        $filter = $request->queryString('filter', 'all');
        if (!in_array($filter, ['all', 'highlights', 'notes', 'bookmarks'], true)) {
            Response::badRequest('Invalid annotation filter.');
            return;
        }
        $limit = $request->queryInt('limit', 50, 1, 100);
        if ($limit === null) {
            Response::badRequest('Invalid page size.');
            return;
        }
        $cursor = $this->decodeCursor($request->queryString('cursor'));
        if ($request->queryString('cursor') !== '' && $cursor === null) {
            Response::badRequest('Invalid cursor.');
            return;
        }
        $rows = $this->annotations->listForBook($userId, $bookId, $filter, $limit + 1, $cursor);
        $hasMore = count($rows) > $limit;
        if ($hasMore) array_pop($rows);
        $last = end($rows);
        Response::ok([
            'items' => array_values($rows),
            'next_cursor' => $hasMore && is_array($last) ? $this->encodeCursor($last) : null,
        ]);
    }

    /** @param array<string,string> $params */
    public function create(Request $request, array $params): void
    {
        Response::preventPrivateCaching();
        $userId = $this->authorizeWrite($request);
        $uri = $request->routeParamUri($params);
        if ($userId === null || $uri === null) {
            if ($userId !== null) Response::badRequest('Invalid book uri.');
            return;
        }
        $bookId = $this->annotations->findBookId($uri);
        if ($bookId === null) {
            Response::notFound('Book not found.', 'book_not_found');
            return;
        }
        $data = $this->creationData($request);
        if ($data === null) {
            Response::badRequest('Invalid annotation payload.');
            return;
        }
        try {
            $manifest = $this->manifests->materialize($uri);
        } catch (ReaderManifestException $exception) {
            Response::json(['error' => ['code' => $exception->errorCode(), 'message' => $exception->getMessage()]], $exception->httpStatus());
            return;
        }
        $expectedVersion = trim((string) ($manifest['generated_at'] ?? ''));
        if ($expectedVersion === '') $expectedVersion = 'manifest-v2:' . $uri . ':' . (int) $manifest['pages'];
        if (
            $data['start_fragment'] > (int) $manifest['pages']
            || $data['end_fragment'] > (int) $manifest['pages']
            || !hash_equals($expectedVersion, (string) $data['content_version'])
        ) {
            Response::json(['error' => ['code' => 'stale_annotation_anchor', 'message' => 'The book content changed; select the passage again.']], 409);
            return;
        }
        $annotation = $this->annotations->create($userId, $bookId, $data);
        Response::json(['data' => $annotation], 201);
    }

    /** @param array<string,string> $params */
    public function toggleBookmark(Request $request, array $params): void
    {
        Response::preventPrivateCaching();
        $userId = $this->authorizeWrite($request);
        $uri = $request->routeParamUri($params);
        if ($userId === null || $uri === null) {
            if ($userId !== null) Response::badRequest('Invalid book uri.');
            return;
        }
        $bookId = $this->annotations->findBookId($uri);
        if ($bookId === null) {
            Response::notFound('Book not found.', 'book_not_found');
            return;
        }
        $data = $this->bookmarkData($request);
        if ($data === null) {
            Response::badRequest('Invalid bookmark payload.');
            return;
        }
        try {
            $manifest = $this->manifests->materialize($uri);
        } catch (ReaderManifestException $exception) {
            Response::json(['error' => ['code' => $exception->errorCode(), 'message' => $exception->getMessage()]], $exception->httpStatus());
            return;
        }
        $expectedVersion = trim((string) ($manifest['generated_at'] ?? ''));
        if ($expectedVersion === '') $expectedVersion = 'manifest-v2:' . $uri . ':' . (int) $manifest['pages'];
        if ($data['start_fragment'] > (int) $manifest['pages'] || !hash_equals($expectedVersion, (string) $data['content_version'])) {
            Response::json(['error' => ['code' => 'stale_annotation_anchor', 'message' => 'The book content changed; try again.']], 409);
            return;
        }
        Response::ok($this->annotations->toggleBookmark($userId, $bookId, $data));
    }

    /** @param array<string,string> $params */
    public function update(Request $request, array $params): void
    {
        Response::preventPrivateCaching();
        $userId = $this->authorizeWrite($request);
        $id = $request->routeParamInt($params, 'id');
        $revision = $request->bodyInt('revision', 1, 2147483647);
        $colorCode = $request->bodyInt('color_code', 1, 4);
        if ($userId === null || $id === null || $revision === null || $colorCode === null || !$request->bodyIsStringOrNull('note_text', self::MAX_NOTE)) {
            if ($userId !== null) Response::badRequest('Invalid annotation update.');
            return;
        }
        $noteText = $request->bodyNullableString('note_text', self::MAX_NOTE);
        $current = $this->annotations->findOwned($userId, $id);
        if ($current === null) {
            Response::notFound('Annotation not found.', 'annotation_not_found');
            return;
        }
        if (($current['annotation_type'] ?? '') === 'bookmark') {
            Response::badRequest('Bookmarks cannot be edited as text annotations.');
            return;
        }
        if (!$this->annotations->update($userId, $id, $revision, $noteText, $colorCode)) {
            Response::json(['error' => ['code' => 'annotation_conflict', 'message' => 'The annotation changed on another device.']], 409);
            return;
        }
        Response::ok($this->annotations->findOwned($userId, $id));
    }

    /** @param array<string,string> $params */
    public function delete(Request $request, array $params): void
    {
        Response::preventPrivateCaching();
        $userId = $this->authorizeWrite($request);
        $id = $request->routeParamInt($params, 'id');
        if ($userId === null || $id === null) {
            if ($userId !== null) Response::badRequest('Invalid annotation id.');
            return;
        }
        $this->annotations->delete($userId, $id);
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
        if (!$this->sessions->allowAction('annotations-write', 60, 60)) {
            Response::json(['error' => ['code' => 'rate_limited', 'message' => 'Too many annotation changes.']], 429);
            return null;
        }
        return $userId;
    }

    /** @return array<string,mixed>|null */
    private function creationData(Request $request): ?array
    {
        $startFragment = $request->bodyInt('start_fragment', 1, self::MAX_FRAGMENT);
        $startOffset = $request->bodyInt('start_offset', 0, self::MAX_OFFSET);
        $endFragment = $request->bodyInt('end_fragment', 1, self::MAX_FRAGMENT);
        $endOffset = $request->bodyInt('end_offset', 0, self::MAX_OFFSET);
        $exactText = $request->bodyString('exact_text', self::MAX_EXACT);
        $contentVersion = $request->bodyString('content_version', 128);
        $anchorVersion = $request->bodyInt('anchor_version', 1, 65535);
        $colorCode = $request->bodyInt('color_code', 1, 4);
        $requestId = $request->bodyString('client_request_id', 36);
        if (
            $startFragment === null || $startOffset === null || $endFragment === null || $endOffset === null
            || $exactText === null || $contentVersion === null || $anchorVersion === null || $colorCode === null
            || $requestId === null || preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i', $requestId) !== 1
            || $endFragment < $startFragment || ($endFragment === $startFragment && $endOffset <= $startOffset)
            || !$request->bodyIsStringOrNull('prefix_text', self::MAX_CONTEXT)
            || !$request->bodyIsStringOrNull('suffix_text', self::MAX_CONTEXT)
            || !$request->bodyIsStringOrNull('note_text', self::MAX_NOTE)
        ) return null;
        return [
            'annotation_type' => $request->bodyNullableString('note_text', self::MAX_NOTE) === null ? 'highlight' : 'note',
            'start_fragment' => $startFragment,
            'start_offset' => $startOffset,
            'end_fragment' => $endFragment,
            'end_offset' => $endOffset,
            'exact_text' => $exactText,
            'prefix_text' => $request->bodyNullableString('prefix_text', self::MAX_CONTEXT),
            'suffix_text' => $request->bodyNullableString('suffix_text', self::MAX_CONTEXT),
            'content_version' => $contentVersion,
            'anchor_version' => $anchorVersion,
            'note_text' => $request->bodyNullableString('note_text', self::MAX_NOTE),
            'color_code' => $colorCode,
            'client_request_id' => strtolower($requestId),
        ];
    }

    /** @return array<string,mixed>|null */
    private function bookmarkData(Request $request): ?array
    {
        $fragment = $request->bodyInt('start_fragment', 1, self::MAX_FRAGMENT);
        $offset = $request->bodyInt('start_offset', 0, self::MAX_OFFSET);
        $contentVersion = $request->bodyString('content_version', 128);
        $anchorVersion = $request->bodyInt('anchor_version', 1, 65535);
        $requestId = $request->bodyString('client_request_id', 36);
        if ($fragment === null || $offset === null || $contentVersion === null || $anchorVersion === null || $requestId === null
            || preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i', $requestId) !== 1
            || !$request->bodyIsStringOrNull('prefix_text', self::MAX_CONTEXT)
            || !$request->bodyIsStringOrNull('suffix_text', self::MAX_CONTEXT)) return null;
        return [
            'annotation_type' => 'bookmark',
            'start_fragment' => $fragment,
            'start_offset' => $offset,
            'end_fragment' => $fragment,
            'end_offset' => $offset,
            'exact_text' => '',
            'prefix_text' => $request->bodyNullableString('prefix_text', self::MAX_CONTEXT),
            'suffix_text' => $request->bodyNullableString('suffix_text', self::MAX_CONTEXT),
            'content_version' => $contentVersion,
            'anchor_version' => $anchorVersion,
            'note_text' => null,
            'color_code' => 1,
            'client_request_id' => strtolower($requestId),
        ];
    }

    /** @return array{fragment:int,offset:int,id:int}|null */
    private function decodeCursor(string $cursor): ?array
    {
        if ($cursor === '') return null;
        $padding = strlen($cursor) % 4;
        if ($padding > 0) $cursor .= str_repeat('=', 4 - $padding);
        $json = base64_decode(strtr($cursor, '-_', '+/'), true);
        $data = is_string($json) ? json_decode($json, true) : null;
        if (!is_array($data)) return null;
        foreach (['fragment', 'offset', 'id'] as $key) {
            if (!isset($data[$key]) || !is_int($data[$key]) || $data[$key] < ($key === 'offset' ? 0 : 1)) return null;
        }
        return $data;
    }

    /** @param array<string,mixed> $row */
    private function encodeCursor(array $row): string
    {
        $json = json_encode(['fragment' => $row['start_fragment'], 'offset' => $row['start_offset'], 'id' => $row['id']]);
        return rtrim(strtr(base64_encode((string) $json), '+/', '-_'), '=');
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
