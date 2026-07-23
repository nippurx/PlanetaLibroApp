<?php

declare(strict_types=1);

function assertAudiobookBookmarksContains(string $needle, string $haystack, string $message): void
{
    if (strpos($haystack, $needle) === false) throw new RuntimeException($message);
}

$root = dirname(__DIR__);
$controller = file_get_contents($root . '/src/Controllers/AudiobookBookmarksController.php');
$repository = file_get_contents($root . '/src/Repositories/AudiobookBookmarksRepo.php');
$routes = file_get_contents($root . '/public/index.php');
$client = file_get_contents(dirname($root, 2) . '/src/api/audiobookBookmarks.ts');

if (!is_string($controller) || !is_string($repository) || !is_string($routes) || !is_string($client)) {
    throw new RuntimeException('Audiobook bookmark contract sources could not be read.');
}

assertAudiobookBookmarksContains("validateCsrfToken(\$request->header('X-CSRF-Token'))", $controller, 'Writes do not validate CSRF.');
assertAudiobookBookmarksContains("allowAction('audiobook-bookmark-write'", $controller, 'Writes are not rate limited.');
assertAudiobookBookmarksContains("bodyInt('position_seconds', 0", $controller, 'Position is not bounded.');
assertAudiobookBookmarksContains("'audiobook_media_changed'", $controller, 'Media changes are not typed.');
assertAudiobookBookmarksContains("'audiobook_bookmark_conflict'", $controller, 'Optimistic conflicts are not typed.');
assertAudiobookBookmarksContains('WHERE id = :id AND user_id = :user_id', $repository, 'Owned mutations are not scoped by user.');
assertAudiobookBookmarksContains('client_request_id', $repository, 'Idempotency key is not persisted.');
assertAudiobookBookmarksContains('media_hash = UNHEX(SHA2(:media_id, 256))', $repository, 'Current media is not verified by hash and exact id.');
assertAudiobookBookmarksContains("'/books/{uri}/audiobook-bookmarks'", $routes, 'Book-scoped routes are missing.');
assertAudiobookBookmarksContains("'/audiobook-bookmarks/{id}'", $routes, 'Owned item routes are missing.');
assertAudiobookBookmarksContains('{ "X-CSRF-Token": csrfToken }', $client, 'Client does not send CSRF.');

echo "Audiobook bookmark contract tests passed.\n";
