<?php

declare(strict_types=1);

function assertAudiobookProgressContains(string $needle, string $haystack, string $message): void
{
    if (strpos($haystack, $needle) === false) {
        throw new RuntimeException($message);
    }
}

$root = dirname(__DIR__);
$controller = file_get_contents($root . '/src/Controllers/AudiobookProgressController.php');
$repository = file_get_contents($root . '/src/Repositories/AudiobookProgressRepo.php');
$routes = file_get_contents($root . '/public/index.php');
$client = file_get_contents(dirname($root, 2) . '/src/api/audiobookProgress.ts');

if (!is_string($controller) || !is_string($repository) || !is_string($routes) || !is_string($client)) {
    throw new RuntimeException('Audiobook progress contract sources could not be read.');
}

assertAudiobookProgressContains("validateCsrfToken(\$request->header('X-CSRF-Token'))", $controller, 'Writes do not validate CSRF.');
assertAudiobookProgressContains("allowAction('audiobook-progress-write'", $controller, 'Writes are not rate limited.');
assertAudiobookProgressContains("bodyInt('position_seconds', 0", $controller, 'Position is not validated as a non-negative integer.');
assertAudiobookProgressContains("'audiobook_media_changed'", $controller, 'Changed media is not reported explicitly.');
assertAudiobookProgressContains('FROM ebooks_books WHERE uri = :uri LIMIT 1 FOR UPDATE', $repository, 'Concurrent writes are not serialized by book.');
assertAudiobookProgressContains('INSERT INTO user_video_audiolibros', $repository, 'Missing progress is not created.');
assertAudiobookProgressContains('UPDATE user_video_audiolibros', $repository, 'Existing progress is not updated.');
assertAudiobookProgressContains('GREATEST(COALESCE(max_min, 0), COALESCE(current_min, 0), :furthest_position)', $repository, 'Furthest progress is not monotonic.');
assertAudiobookProgressContains("/audiobook-progress/{uri}", $routes, 'Audiobook progress routes are missing.');
assertAudiobookProgressContains('{ "X-CSRF-Token": csrfToken }', $client, 'The client does not send its CSRF token.');

echo "Audiobook progress contract tests passed.\n";
