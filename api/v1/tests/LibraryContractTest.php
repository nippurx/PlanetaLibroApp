<?php

declare(strict_types=1);

function assertLibraryContractContains(string $needle, string $haystack, string $message): void
{
    if (strpos($haystack, $needle) === false) {
        throw new RuntimeException($message);
    }
}

$root = dirname(__DIR__);
$controller = file_get_contents($root . '/src/Controllers/LibraryController.php');
$repository = file_get_contents($root . '/src/Repositories/LibraryRepo.php');
$service = file_get_contents($root . '/src/Library/LibraryService.php');
$manifest = file_get_contents($root . '/src/Reader/ReaderManifestService.php');
$routes = file_get_contents($root . '/public/index.php');

if (!is_string($controller) || !is_string($repository) || !is_string($service) || !is_string($manifest) || !is_string($routes)) {
    throw new RuntimeException('Library contract sources could not be read.');
}

assertLibraryContractContains('currentContext()', $controller, 'Library endpoints bypass the authenticated session boundary.');
assertLibraryContractContains("queryInt('limit', 20, 1, 50)", $controller, 'Library lists are not bounded.');
assertLibraryContractContains("['recent', 'oldest']", $controller, 'Library sort values are not allow-listed.');
assertLibraryContractContains('user_video_audiolibros', $repository, 'Audiobook memberships are not included.');
assertLibraryContractContains('LibraryLifecycle::enrich', $service, 'Server-authoritative lifecycle classification is not applied.');
assertLibraryContractContains("array_slice(\$items, \$offset, \$limit)", $service, 'Library list pagination is missing.');
assertLibraryContractContains('pageCountIfAvailable', $manifest, 'Read-only page count resolution is missing.');
assertLibraryContractContains("libroinfo.php", $manifest, 'Legacy page-count fallback is missing.');
assertLibraryContractContains("\$router->get('/library',", $routes, 'The compatible library route was removed.');
assertLibraryContractContains("\$router->get('/library/summary',", $routes, 'The library summary route is missing.');
assertLibraryContractContains("\$router->get('/library/items',", $routes, 'The library listing route is missing.');

echo "Library contract tests passed.\n";
