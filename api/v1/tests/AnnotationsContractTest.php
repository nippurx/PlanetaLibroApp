<?php

declare(strict_types=1);

function assertContains(string $needle, string $haystack, string $message): void
{
    if (strpos($haystack, $needle) === false) throw new RuntimeException($message);
}

$root = dirname(__DIR__);
$controller = file_get_contents($root . '/src/Controllers/AnnotationsController.php');
$repository = file_get_contents($root . '/src/Repositories/AnnotationsRepo.php');
$routes = file_get_contents($root . '/public/index.php');

if (!is_string($controller) || !is_string($repository) || !is_string($routes)) {
    throw new RuntimeException('Annotation contract sources could not be read.');
}

assertContains("['all', 'highlights', 'notes', 'bookmarks']", $controller, 'Bookmarks filter is not accepted.');
assertContains("'annotation_type' => 'bookmark'", $controller, 'Bookmark payload is not explicitly typed.');
assertContains("'end_offset' => \$offset", $controller, 'Bookmark is not represented as a point anchor.');
assertContains("annotation_type = 'bookmark'", $repository, 'Repository does not query explicit bookmarks.');
assertContains('FOR UPDATE', $repository, 'Bookmark toggle does not lock the matching location.');
assertContains('DELETE FROM user_book_annotations WHERE user_id = ?', $repository, 'Bookmark toggle is not duplicate-tolerant on removal.');
assertContains("/books/{uri}/bookmarks/toggle", $routes, 'Bookmark toggle route is missing.');

echo "Annotation bookmark contract tests passed.\n";
