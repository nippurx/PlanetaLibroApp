<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Paths;

final class AssetPaths
{
    private string $repositoryRoot;
    private string $projectRoot;

    public function __construct(string $repositoryRoot = 'biblioteca')
    {
        $this->repositoryRoot = trim($repositoryRoot, '/');
        $this->projectRoot = dirname(__DIR__, 4);
    }

    /**
     * Legacy reference:
     * - uri.php::mp_std_file_url($uri, $raiz='libros')
     * - pl_funcs.php::libro_get_cover_path($libro, $local=0)
     */
    public function bookDirPath(?string $authorUri, string $bookUri): string
    {
        $bookUri = $this->normalizeSegment($bookUri);
        if ($bookUri === '') {
            return '/' . $this->repositoryRoot . '/';
        }

        $dir1 = substr($bookUri, 0, 1) ?: '_';
        $dir2 = substr($bookUri, 1, 1) ?: $dir1;
        $base = explode('.', $bookUri, 2)[0];
        $uriParts = explode('-', $base);
        $authorFromUri = $this->normalizeSegment((string) ($uriParts[0] ?? ''));
        $authorSegment = $authorFromUri !== '' ? $authorFromUri : $this->normalizeSegment((string) $authorUri);

        if ($authorSegment === '') {
            $authorSegment = '_';
        }

        return sprintf('/%s/%s/%s/%s/%s/', $this->repositoryRoot, $dir1, $dir2, $authorSegment, $bookUri);
    }

    public function bookCoverPath(?string $authorUri, string $bookUri): string
    {
        $candidates = $this->guessCoverCandidates($authorUri, $bookUri);
        $existing = $this->resolveExistingPublicPath($candidates);

        return $existing ?? $candidates[0];
    }

    /**
     * @return array<int, string>
     */
    public function guessCoverCandidates(?string $authorUri, string $bookUri): array
    {
        $bookUri = $this->normalizeSegment($bookUri);
        $bookDirPath = $this->bookDirPath($authorUri, $bookUri);
        $base = rtrim($bookDirPath, '/') . '/' . $bookUri;

        return [
            $base . '.webp',
            $base . '.jpg',
            $base . '.png',
        ];
    }

    public function bookFilePath(?string $authorUri, string $bookUri, ?string $fileName): ?string
    {
        if ($fileName === null) {
            return null;
        }

        $trimmed = trim($fileName);
        if ($trimmed === '') {
            return null;
        }

        if (preg_match('#^(?:https?:)?//#i', $trimmed) === 1 || substr($trimmed, 0, 1) === '/') {
            return $trimmed;
        }

        return rtrim($this->bookDirPath($authorUri, $bookUri), '/') . '/' . ltrim($trimmed, '/');
    }

    /**
     * @param array<int, string> $publicPaths
     */
    private function resolveExistingPublicPath(array $publicPaths): ?string
    {
        foreach ($publicPaths as $path) {
            $absolute = $this->publicPathToAbsolute($path);
            if ($absolute !== null && is_file($absolute)) {
                return $path;
            }
        }

        return null;
    }

    private function publicPathToAbsolute(string $path): ?string
    {
        $path = '/' . ltrim($path, '/');
        $docRoot = isset($_SERVER['DOCUMENT_ROOT']) ? rtrim((string) $_SERVER['DOCUMENT_ROOT'], '/\\') : '';

        if ($docRoot !== '') {
            return $docRoot . str_replace('/', DIRECTORY_SEPARATOR, $path);
        }

        if ($this->projectRoot !== '') {
            return rtrim($this->projectRoot, '/\\') . str_replace('/', DIRECTORY_SEPARATOR, $path);
        }

        return null;
    }

    private function normalizeSegment(string $value): string
    {
        return trim($value, " \t\n\r\0\x0B/");
    }
}


