<?php

declare(strict_types=1);


use PlanetaLibro\Api\V1\Controllers\AuthorsController;
use PlanetaLibro\Api\V1\Controllers\BooksController;
use PlanetaLibro\Api\V1\Controllers\HealthController;
use PlanetaLibro\Api\V1\Controllers\ReaderManifestController;
use PlanetaLibro\Api\V1\Controllers\SearchController;
use PlanetaLibro\Api\V1\Controllers\SessionController;
use PlanetaLibro\Api\V1\Controllers\LibraryController;
use PlanetaLibro\Api\V1\Controllers\ReaderProgressController;
use PlanetaLibro\Api\V1\Controllers\AnnotationsController;
use PlanetaLibro\Api\V1\Controllers\AudiobookProgressController;
use PlanetaLibro\Api\V1\Controllers\AudiobookBookmarksController;
use PlanetaLibro\Api\V1\Request;
use PlanetaLibro\Api\V1\Response;
use PlanetaLibro\Api\V1\Router;

//ini_set('display_errors', 1);
//error_reporting(E_ALL);

$root = dirname(__DIR__);

require $root . '/src/bootstrap.php';

$services = bootstrap($root);
header('Access-Control-Allow-Origin: ' . $services['config']['cors_allow_origin']);
header('Vary: Origin');
$request = Request::fromGlobals($services['config']['base_path']);
$router = new Router();

$healthController = new HealthController($services['config']);
$booksController = new BooksController($services['booksRepo']);
$authorsController = new AuthorsController($services['authorsRepo']);
$searchController = new SearchController($services['searchRepo']);
$readerManifestController = new ReaderManifestController($services['readerManifestService']);
$sessionController = new SessionController($services['sessionService']);
$libraryController = new LibraryController($services['sessionService'], $services['libraryRepo'], $services['libraryService']);
$readerProgressController = new ReaderProgressController($services['sessionService'], $services['libraryRepo']);
$annotationsController = new AnnotationsController($services['sessionService'], $services['annotationsRepo'], $services['readerManifestService']);
$audiobookProgressController = new AudiobookProgressController($services['sessionService'], $services['audiobookProgressRepo']);
$audiobookBookmarksController = new AudiobookBookmarksController($services['sessionService'], $services['audiobookBookmarksRepo']);

$router->get('/health', [$healthController, 'show']);
$router->get('/libro/{uri}', [$booksController, 'show']);
$router->get('/libros', [$booksController, 'index']);
$router->get('/libros/por-tag', [$booksController, 'byTag']);
$router->get('/libros/top', [$booksController, 'top']);
$router->get('/libros/top-leidos', [$booksController, 'topRead']);
$router->get('/autor/{uri}', [$authorsController, 'show']);
$router->get('/buscar', [$searchController, 'index']);
$router->get('/reader-manifest/{uri}', [$readerManifestController, 'show']);
$router->get('/session', [$sessionController, 'show']);
$router->get('/login-redirect', [$sessionController, 'redirectToLegacyLogin']);
$router->get('/library', [$libraryController, 'index']);
$router->get('/library/summary', [$libraryController, 'summary']);
$router->get('/library/items', [$libraryController, 'items']);
$router->get('/reader-progress/{uri}', [$readerProgressController, 'show']);
$router->post('/reader-progress/{uri}', [$readerProgressController, 'update']);
$router->get('/audiobook-progress/{uri}', [$audiobookProgressController, 'show']);
$router->post('/audiobook-progress/{uri}', [$audiobookProgressController, 'update']);
$router->get('/books/{uri}/audiobook-bookmarks', [$audiobookBookmarksController, 'index']);
$router->post('/books/{uri}/audiobook-bookmarks', [$audiobookBookmarksController, 'create']);
$router->patch('/audiobook-bookmarks/{id}', [$audiobookBookmarksController, 'update']);
$router->delete('/audiobook-bookmarks/{id}', [$audiobookBookmarksController, 'delete']);
$router->get('/books/{uri}/annotations', [$annotationsController, 'index']);
$router->post('/books/{uri}/annotations', [$annotationsController, 'create']);
$router->post('/books/{uri}/bookmarks/toggle', [$annotationsController, 'toggleBookmark']);
$router->patch('/annotations/{id}', [$annotationsController, 'update']);
$router->delete('/annotations/{id}', [$annotationsController, 'delete']);

try {
    $router->dispatch($request);
} catch (Throwable $exception) {
    if (isset($services['logger']) && is_callable($services['logger'])) {
        $services['logger']($exception);
    }

    Response::internalError();
}
