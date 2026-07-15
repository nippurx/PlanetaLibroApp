<?php

declare(strict_types=1);

use PlanetaLibro\Api\V1\Reader\LegacyBookInfoParser;
use PlanetaLibro\Api\V1\Reader\ReaderManifestException;
use PlanetaLibro\Api\V1\Reader\ReaderManifestRepositoryInterface;
use PlanetaLibro\Api\V1\Reader\ReaderManifestService;

require dirname(__DIR__) . '/src/Reader/ReaderManifestException.php';
require dirname(__DIR__) . '/src/Reader/LegacyBookInfoParser.php';
require dirname(__DIR__) . '/src/Reader/ReaderManifestRepositoryInterface.php';
require dirname(__DIR__) . '/src/Reader/ReaderManifestService.php';

final class FakeReaderManifestRepository implements ReaderManifestRepositoryInterface
{
    /** @var array<string,int> */
    public array $books = ['test-book' => 7, 'test-missing' => 8];
    /** @var array<int,int> */
    public array $enqueued = [];
    /** @var array<int,int> */
    public array $generated = [];

    public function findBookIdByUri(string $uri): ?int
    {
        return $this->books[$uri] ?? null;
    }

    public function enqueueLegacyRegeneration(int $bookId): void
    {
        $this->enqueued[$bookId] = ($this->enqueued[$bookId] ?? 0) + 1;
    }

    public function markCompatibilityManifestGenerated(int $bookId): void
    {
        $this->generated[$bookId] = ($this->generated[$bookId] ?? 0) + 1;
    }
}

function assertTrue(bool $condition, string $message): void
{
    if (!$condition) {
        throw new RuntimeException($message);
    }
}

function createLegacyBook(string $root, string $uri, int $pages, bool $omitLast = false): string
{
    $author = explode('-', $uri, 2)[0];
    $directory = $root . '/' . $uri[0] . '/' . $uri[1] . '/' . $author . '/' . $uri;
    mkdir($directory, 0777, true);
    $metadata = <<<'PHP'
<?
$gvar["libro"]["npaginas"] = %PAGES%;
$gvar["libro"]["paginicio"] = 1;
$gvar["libro"]["indice"][0]["titulo"] = " Tapa ";
$gvar["libro"]["indice"][0]["pag"] = 1;
$gvar["libro"]["indice"][0]["nivel"] = 1;
$gvar["libro"]["indice"][1]["titulo"] = "\n Capítulo de prueba \n";
$gvar["libro"]["indice"][1]["pag"] = 2;
$gvar["libro"]["indice"][1]["nivel"] = 2;
?>
PHP;
    file_put_contents($directory . '/libroinfo.php', str_replace('%PAGES%', (string) $pages, $metadata));
    for ($page = 1; $page <= $pages; $page++) {
        if ($omitLast && $page === $pages) {
            continue;
        }
        file_put_contents($directory . '/pag-' . $page . '.html', '<p>Fragment ' . $page . '</p>');
    }

    return $directory;
}

function removeTree(string $path): void
{
    if (!is_dir($path)) {
        return;
    }
    $items = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($path, FilesystemIterator::SKIP_DOTS),
        RecursiveIteratorIterator::CHILD_FIRST
    );
    foreach ($items as $item) {
        $item->isDir() ? rmdir($item->getPathname()) : unlink($item->getPathname());
    }
    rmdir($path);
}

$root = sys_get_temp_dir() . '/planetalibro-reader-test-' . bin2hex(random_bytes(5));
mkdir($root, 0777, true);

try {
    $validDirectory = createLegacyBook($root, 'test-book', 3);
    createLegacyBook($root, 'test-missing', 3, true);
    $repository = new FakeReaderManifestRepository();
    $service = new ReaderManifestService($repository, new LegacyBookInfoParser(), $root);

    $manifest = $service->materialize('test-book');
    assertTrue($manifest['pages'] === 3, 'Expected three pages.');
    assertTrue($manifest['index'][1]['titulo'] === 'Capítulo de prueba', 'Expected normalized title.');
    assertTrue(is_file($validDirectory . '/manifest.json'), 'Manifest was not materialized.');
    assertTrue(($repository->enqueued[7] ?? 0) === 1, 'Regeneration was not queued exactly once.');
    assertTrue(($repository->generated[7] ?? 0) === 1, 'Generation timestamp was not recorded.');

    $second = $service->materialize('test-book');
    assertTrue($second['generated_at'] === $manifest['generated_at'], 'Existing manifest should be reused.');
    assertTrue(($repository->enqueued[7] ?? 0) === 1, 'Existing manifest must not enqueue twice.');

    try {
        $service->materialize('../test-book');
        throw new RuntimeException('Traversal URI was accepted.');
    } catch (ReaderManifestException $exception) {
        assertTrue($exception->errorCode() === 'invalid_book_uri', 'Unexpected traversal error.');
    }

    try {
        $service->materialize('test-missing');
        throw new RuntimeException('Missing fragment was accepted.');
    } catch (ReaderManifestException $exception) {
        assertTrue($exception->errorCode() === 'legacy_fragment_missing', 'Unexpected missing fragment error.');
    }

    echo "Reader manifest smoke tests passed.\n";
} finally {
    removeTree($root);
}
