<?php

declare(strict_types=1);

/**
 * Build author photo metadata using file convention /img/authors/{author_uri}.jpg
 *
 * @return array{available: bool, url: ?string}
 */
function get_author_photo(string $author_uri): array
{
    $authorUri = trim($author_uri);
    if ($authorUri === '') {
        return [
            'available' => false,
            'url' => null,
        ];
    }

    $baseUrl = 'https://planetalibro.com/img/authors/';
    $basePath = rtrim((string) ($_SERVER['DOCUMENT_ROOT'] ?? ''), '/\\') . '/img/authors/';
    $filename = $authorUri . '.jpg';
    $filepath = $basePath . $filename;

    if (file_exists($filepath)) {
        return [
            'available' => true,
            'url' => $baseUrl . $filename,
        ];
    }

    // TODO(PRO): evaluate a CDN/client-side onerror strategy to avoid file_exists per response.
    return [
        'available' => false,
        'url' => null,
    ];
}
