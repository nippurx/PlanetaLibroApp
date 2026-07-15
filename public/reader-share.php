<?php
declare(strict_types=1);

header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: public, max-age=300');

$indexPath = __DIR__ . DIRECTORY_SEPARATOR . 'index.html';
$html = is_file($indexPath) ? file_get_contents($indexPath) : false;

if (!is_string($html)) {
    http_response_code(503);
    echo '<!doctype html><html lang="es"><head><meta charset="UTF-8"><title>PlanetaLibro</title></head><body></body></html>';
    exit;
}

$uri = isset($_GET['uri']) && is_string($_GET['uri']) ? $_GET['uri'] : '';
$page = isset($_GET['page']) && is_string($_GET['page']) ? filter_var($_GET['page'], FILTER_VALIDATE_INT) : false;

if (!preg_match('/\A[A-Za-z0-9][A-Za-z0-9._-]*\z/', $uri) || strpos($uri, '..') !== false || $page === false || $page < 1) {
    echo $html;
    exit;
}

function readerShareEncodePath(string $path): string
{
    return implode('/', array_map('rawurlencode', explode('/', str_replace('\\', '/', $path))));
}

function readerShareEscape(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function readerShareOrigin(): string
{
    $forwardedProto = isset($_SERVER['HTTP_X_FORWARDED_PROTO']) ? strtolower((string) $_SERVER['HTTP_X_FORWARDED_PROTO']) : '';
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $forwardedProto === 'https' ? 'https' : 'http';
    $host = isset($_SERVER['HTTP_HOST']) && preg_match('/\A[A-Za-z0-9.-]+(?::[0-9]+)?\z/', (string) $_SERVER['HTTP_HOST'])
        ? (string) $_SERVER['HTTP_HOST']
        : 'planetalibro.net';
    return $scheme . '://' . $host;
}

function readerShareCoverAsset(array $manifest, string $bookDirectory): ?string
{
    $assets = isset($manifest['assets']) && is_array($manifest['assets']) ? $manifest['assets'] : [];
    $candidates = [];

    foreach ($assets as $asset) {
        if (!is_string($asset)) continue;
        $normalized = ltrim(str_replace('\\', '/', $asset), '/');
        if ($normalized === '' || strpos($normalized, '..') !== false || !preg_match('/(^|\/)cover\.(?:jpe?g|png|webp)\z/i', $normalized)) continue;
        $fullPath = $bookDirectory . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $normalized);
        if (!is_file($fullPath)) continue;
        $priority = preg_match('/\AImages\/cover\./i', $normalized) ? 0 : 1;
        $candidates[] = [$priority, $normalized];
    }

    usort($candidates, static function (array $left, array $right): int {
        return $left[0] <=> $right[0];
    });
    if ($candidates) return $candidates[0][1];

    foreach (['Images/cover.jpg', 'Images/cover.jpeg', 'Images/cover.png', 'Images/cover.webp'] as $fallback) {
        if (is_file($bookDirectory . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $fallback))) return $fallback;
    }

    return null;
}

function readerShareImageMetadata(string $path): array
{
    $image = @getimagesize($path);
    if (!is_array($image)) return [];

    $metadata = [];
    if (isset($image[0]) && is_int($image[0])) $metadata['width'] = $image[0];
    if (isset($image[1]) && is_int($image[1])) $metadata['height'] = $image[1];
    if (isset($image['mime']) && is_string($image['mime'])) $metadata['type'] = $image['mime'];
    return $metadata;
}

$normalizedUri = strtolower($uri);
$tokens = explode('-', $normalizedUri);
$firstToken = $tokens[0] ?? '';
$first = $normalizedUri[0] ?? '';
$second = $normalizedUri[1] ?? '';
$siteRoot = getenv('PLANETALIBRO_PUBLIC_ROOT') ?: dirname(__DIR__);
$readerRelativePath = 'lector/' . $first . '/' . $second . '/' . $firstToken . '/' . $normalizedUri;
$bookDirectory = rtrim($siteRoot, '\\/') . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $readerRelativePath);
$manifestPath = $bookDirectory . DIRECTORY_SEPARATOR . 'manifest.json';
$manifest = [];

if (is_file($manifestPath)) {
    $decoded = json_decode((string) file_get_contents($manifestPath), true);
    if (is_array($decoded) && ($decoded['uri'] ?? null) === $uri) $manifest = $decoded;
}

$origin = readerShareOrigin();
$canonicalUrl = $origin . '/app/read/' . rawurlencode($uri) . '/' . $page;
$coverAsset = readerShareCoverAsset($manifest, $bookDirectory);
$coverUrl = $coverAsset === null ? null : $origin . '/' . readerShareEncodePath($readerRelativePath . '/' . $coverAsset);
$coverPath = $coverAsset === null ? null : $bookDirectory . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $coverAsset);
$coverMetadata = $coverPath === null ? [] : readerShareImageMetadata($coverPath);
$title = 'Continúa leyendo en PlanetaLibro';
$description = 'Abre el libro y continúa la lectura desde este punto.';

$metadata = [
    '<meta property="og:type" content="book">',
    '<meta property="og:site_name" content="PlanetaLibro">',
    '<meta property="og:title" content="' . readerShareEscape($title) . '">',
    '<meta property="og:description" content="' . readerShareEscape($description) . '">',
    '<meta property="og:url" content="' . readerShareEscape($canonicalUrl) . '">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<link rel="canonical" href="' . readerShareEscape($canonicalUrl) . '">',
];

if ($coverUrl !== null) {
    $metadata[] = '<meta property="og:image" content="' . readerShareEscape($coverUrl) . '">';
    $metadata[] = '<meta property="og:image:secure_url" content="' . readerShareEscape($coverUrl) . '">';
    if (isset($coverMetadata['type'])) $metadata[] = '<meta property="og:image:type" content="' . readerShareEscape((string) $coverMetadata['type']) . '">';
    if (isset($coverMetadata['width'])) $metadata[] = '<meta property="og:image:width" content="' . (int) $coverMetadata['width'] . '">';
    if (isset($coverMetadata['height'])) $metadata[] = '<meta property="og:image:height" content="' . (int) $coverMetadata['height'] . '">';
    $metadata[] = '<meta property="og:image:alt" content="Tapa del libro compartido en PlanetaLibro">';
    $metadata[] = '<meta name="twitter:image" content="' . readerShareEscape($coverUrl) . '">';
}

$injected = implode("\n    ", $metadata) . "\n  ";
$html = str_replace('</head>', '    ' . $injected . '</head>', $html);
header('X-PlanetaLibro-Share-Metadata: ' . ($coverUrl === null ? 'generic' : 'cover'));
echo $html;
