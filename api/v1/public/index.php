<?php

declare(strict_types=1);


use PlanetaLibro\Api\V1\Controllers\AuthorsController;
use PlanetaLibro\Api\V1\Controllers\BooksController;
use PlanetaLibro\Api\V1\Controllers\HealthController;
use PlanetaLibro\Api\V1\Controllers\ReaderManifestController;
use PlanetaLibro\Api\V1\Controllers\SearchController;
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

$router->get('/health', [$healthController, 'show']);
$router->get('/libro/{uri}', [$booksController, 'show']);
$router->get('/libros', [$booksController, 'index']);
$router->get('/libros/por-tag', [$booksController, 'byTag']);
$router->get('/libros/top', [$booksController, 'top']);
$router->get('/libros/top-leidos', [$booksController, 'topRead']);
$router->get('/autor/{uri}', [$authorsController, 'show']);
$router->get('/buscar', [$searchController, 'index']);
$router->get('/reader-manifest/{uri}', [$readerManifestController, 'show']);

try {
    $router->dispatch($request);
} catch (Throwable $exception) {
    if (isset($services['logger']) && is_callable($services['logger'])) {
        $services['logger']($exception);
    }

    Response::internalError();
}
