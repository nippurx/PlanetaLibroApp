<?php

declare(strict_types=1);

function assertReaderProgressContains(string $needle, string $haystack, string $message): void
{
    if (strpos($haystack, $needle) === false) throw new RuntimeException($message);
}

$root = dirname(__DIR__);
$controller = file_get_contents($root . '/src/Controllers/ReaderProgressController.php');
$repository = file_get_contents($root . '/src/Repositories/LibraryRepo.php');
$client = file_get_contents(dirname($root, 2) . '/src/api/readerProgress.ts');

if (!is_string($controller) || !is_string($repository) || !is_string($client)) {
    throw new RuntimeException('Reader progress contract sources could not be read.');
}

assertReaderProgressContains("validateCsrfToken(\$request->header('X-CSRF-Token'))", $controller, 'Progress writes do not validate CSRF.');
assertReaderProgressContains("Response::notFound('Book not found.', 'book_not_found')", $controller, 'Missing books are not reported explicitly.');
assertReaderProgressContains('FOR UPDATE', $repository, 'Concurrent reader openings are not serialized.');
assertReaderProgressContains('INSERT INTO user_books', $repository, 'A missing library membership is not created.');
assertReaderProgressContains('UPDATE user_books', $repository, 'Existing progress is not updated.');
assertReaderProgressContains("'created' => \$created", $repository, 'The repository does not expose whether membership was created.');
assertReaderProgressContains('{ "X-CSRF-Token": csrfToken }', $client, 'The reader client does not send its CSRF token.');

echo "Reader progress contract tests passed.\n";
