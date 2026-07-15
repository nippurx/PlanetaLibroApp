<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Reader;

use FilesystemIterator;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use Throwable;

final class ReaderManifestService
{
    private ReaderManifestRepositoryInterface $repository;
    private LegacyBookInfoParser $parser;
    private string $readerRoot;

    public function __construct(
        ReaderManifestRepositoryInterface $repository,
        LegacyBookInfoParser $parser,
        string $readerRoot
    ) {
        $this->repository = $repository;
        $this->parser = $parser;
        $this->readerRoot = rtrim($readerRoot, '/\\');
    }

    /**
     * @return array<string,mixed>
     */
    public function materialize(string $uri): array
    {
        $this->assertUri($uri);
        $bookId = $this->repository->findBookIdByUri($uri);
        if ($bookId === null) {
            throw new ReaderManifestException('book_not_found', 'Book not found.', 404);
        }

        $bookDirectory = $this->resolveBookDirectory($uri);
        $manifestPath = $bookDirectory . DIRECTORY_SEPARATOR . 'manifest.json';
        $lockPath = rtrim(sys_get_temp_dir(), '/\\') . DIRECTORY_SEPARATOR
            . 'planetalibro-reader-manifest-' . hash('sha256', $bookDirectory) . '.lock';
        $lock = @fopen($lockPath, 'c');
        if ($lock === false || !flock($lock, LOCK_EX)) {
            if (is_resource($lock)) {
                fclose($lock);
            }
            throw new ReaderManifestException('manifest_lock_failed', 'The compatibility manifest could not be locked.', 500);
        }

        $temporaryPath = null;
        try {
            if (is_file($manifestPath)) {
                return $this->readExistingManifest($manifestPath, $uri);
            }

            $legacyPath = $bookDirectory . DIRECTORY_SEPARATOR . 'libroinfo.php';
            if (!is_file($legacyPath)) {
                throw new ReaderManifestException('legacy_metadata_missing', 'Legacy book metadata was not found.', 404);
            }

            $legacy = $this->parser->parse($legacyPath);
            $this->assertContiguousFragments($bookDirectory, $legacy['pages']);
            $this->repository->enqueueLegacyRegeneration($bookId);

            $manifest = [
                'version' => 2,
                'uri' => $uri,
                'generated_at' => date(DATE_ATOM),
                'pages' => $legacy['pages'],
                'paginicio' => $legacy['paginicio'],
                'index' => $legacy['index'],
                'chapters' => [],
                'assets' => $this->collectAssets($bookDirectory),
                'warnings' => [
                    'Manifest temporal reconstruido desde libroinfo.php; el libro debe regenerarse con epub2html2.',
                ],
                'legacy_source' => [
                    'type' => 'libroinfo.php',
                    'compatibility_manifest' => true,
                    'modified_at' => ($modifiedAt = filemtime($legacyPath)) !== false
                        ? date(DATE_ATOM, $modifiedAt)
                        : null,
                ],
            ];

            $json = json_encode(
                $manifest,
                JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR
            ) . "\n";
            $temporaryPath = $manifestPath . '.tmp.' . getmypid() . '.' . bin2hex(random_bytes(6));
            if (@file_put_contents($temporaryPath, $json, LOCK_EX) !== strlen($json)) {
                throw new ReaderManifestException('manifest_write_failed', 'The compatibility manifest could not be written.', 500);
            }

            $this->readExistingManifest($temporaryPath, $uri);
            if (is_file($manifestPath)) {
                return $this->readExistingManifest($manifestPath, $uri);
            }
            if (!@rename($temporaryPath, $manifestPath)) {
                throw new ReaderManifestException('manifest_publish_failed', 'The compatibility manifest could not be published.', 500);
            }
            $temporaryPath = null;
            $this->repository->markCompatibilityManifestGenerated($bookId);

            return $manifest;
        } catch (ReaderManifestException $exception) {
            throw $exception;
        } catch (Throwable $exception) {
            throw new ReaderManifestException('manifest_generation_failed', 'The compatibility manifest could not be generated.', 500);
        } finally {
            if ($temporaryPath !== null && is_file($temporaryPath)) {
                @unlink($temporaryPath);
            }
            flock($lock, LOCK_UN);
            fclose($lock);
        }
    }

    private function assertUri(string $uri): void
    {
        if (
            preg_match('/^[a-zA-Z0-9._-]+$/', $uri) !== 1
            || strpos($uri, '..') !== false
            || substr($uri, 0, 1) === '.'
            || strlen($uri) < 2
        ) {
            throw new ReaderManifestException('invalid_book_uri', 'Invalid book uri.', 400);
        }
    }

    private function resolveBookDirectory(string $uri): string
    {
        $root = realpath($this->readerRoot);
        if ($root === false || !is_dir($root)) {
            throw new ReaderManifestException('reader_root_unavailable', 'Reader storage is not available.', 500);
        }

        $author = explode('-', $uri, 2)[0];
        $candidate = $root . DIRECTORY_SEPARATOR . $uri[0] . DIRECTORY_SEPARATOR . $uri[1]
            . DIRECTORY_SEPARATOR . $author . DIRECTORY_SEPARATOR . $uri;
        $resolved = realpath($candidate);
        if ($resolved === false || !is_dir($resolved)) {
            throw new ReaderManifestException('legacy_book_not_found', 'Legacy book files were not found.', 404);
        }

        $rootPrefix = rtrim($root, '/\\') . DIRECTORY_SEPARATOR;
        if (strpos(rtrim($resolved, '/\\') . DIRECTORY_SEPARATOR, $rootPrefix) !== 0) {
            throw new ReaderManifestException('reader_path_forbidden', 'Resolved reader path is outside the configured root.', 400);
        }

        return $resolved;
    }

    /**
     * @return array<string,mixed>
     */
    private function readExistingManifest(string $path, string $expectedUri): array
    {
        $json = @file_get_contents($path);
        $manifest = $json === false ? null : json_decode($json, true);
        if (
            !is_array($manifest)
            || ($manifest['version'] ?? null) !== 2
            || ($manifest['uri'] ?? null) !== $expectedUri
            || !is_int($manifest['pages'] ?? null)
            || $manifest['pages'] < 1
        ) {
            throw new ReaderManifestException('manifest_invalid', 'An existing manifest is invalid.', 422);
        }

        return $manifest;
    }

    private function assertContiguousFragments(string $bookDirectory, int $pages): void
    {
        for ($page = 1; $page <= $pages; $page++) {
            $path = $bookDirectory . DIRECTORY_SEPARATOR . 'pag-' . $page . '.html';
            if (!is_file($path)) {
                throw new ReaderManifestException(
                    'legacy_fragment_missing',
                    sprintf('Legacy fragment %d of %d is missing.', $page, $pages),
                    422
                );
            }
        }
    }

    /**
     * @return array<int,string>
     */
    private function collectAssets(string $bookDirectory): array
    {
        $assets = [];
        foreach (['Images', 'images'] as $directoryName) {
            $assetDirectory = $bookDirectory . DIRECTORY_SEPARATOR . $directoryName;
            if (!is_dir($assetDirectory)) {
                continue;
            }

            $iterator = new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator($assetDirectory, FilesystemIterator::SKIP_DOTS)
            );
            foreach ($iterator as $file) {
                if (!$file->isFile()) {
                    continue;
                }
                $relative = substr($file->getPathname(), strlen($bookDirectory) + 1);
                $assets[] = str_replace(DIRECTORY_SEPARATOR, '/', $relative);
                if (count($assets) >= 5000) {
                    break 2;
                }
            }
        }

        sort($assets, SORT_STRING);
        return array_values(array_unique($assets));
    }
}
