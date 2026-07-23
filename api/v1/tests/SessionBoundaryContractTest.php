<?php

declare(strict_types=1);

use PlanetaLibro\Api\V1\Auth\LegacySessionResolver;
use PlanetaLibro\Api\V1\Auth\SessionContext;
use PlanetaLibro\Api\V1\Auth\SessionService;

require dirname(__DIR__) . '/src/Auth/SessionContext.php';
require dirname(__DIR__) . '/src/Auth/LegacySessionResolver.php';
require dirname(__DIR__) . '/src/Auth/SessionService.php';

final class FakeLegacySessionResolver implements LegacySessionResolver
{
    public SessionContext $context;
    public ?string $returnTo = null;

    public function __construct(SessionContext $context)
    {
        $this->context = $context;
    }

    public function resolve(): SessionContext
    {
        return $this->context;
    }

    public function rememberReturnTo(string $returnTo): bool
    {
        $this->returnTo = $returnTo;
        return true;
    }

    public function csrfToken(): string
    {
        return str_repeat('a', 64);
    }

    public function validateCsrfToken(string $token): bool
    {
        return true;
    }

    public function allowAction(string $bucket, int $limit, int $windowSeconds): bool
    {
        return true;
    }
}

function assertSessionBoundary(bool $condition, string $message): void
{
    if (!$condition) {
        throw new RuntimeException($message);
    }
}

$authenticatedResolver = new FakeLegacySessionResolver(
    SessionContext::authenticated(42, 'reader', null, ['premium' => true])
);
$service = new SessionService($authenticatedResolver);
$context = $service->currentContext();

assertSessionBoundary($context->isAuthenticated(), 'Authenticated context was not preserved.');
assertSessionBoundary($context->userId() === 42, 'Stable user reference was not preserved.');
assertSessionBoundary($context->hasCapability('premium'), 'Required entitlement was not preserved.');
assertSessionBoundary($service->csrfToken() === str_repeat('a', 64), 'CSRF behavior was not delegated.');
assertSessionBoundary($service->rememberReturnTo('/app/library'), 'Return-to behavior was not delegated.');
assertSessionBoundary($authenticatedResolver->returnTo === '/app/library', 'Resolver did not receive the return path.');

$anonymous = new SessionService(new FakeLegacySessionResolver(SessionContext::anonymous()));
assertSessionBoundary(!$anonymous->currentContext()->isAuthenticated(), 'Anonymous session was not preserved.');
assertSessionBoundary($anonymous->currentContext()->userId() === null, 'Anonymous context leaked a user reference.');

$controllers = [
    'SessionController.php',
    'LibraryController.php',
    'ReaderProgressController.php',
    'AnnotationsController.php',
    'AudiobookProgressController.php',
];
foreach ($controllers as $controller) {
    $source = file_get_contents(dirname(__DIR__) . '/src/Controllers/' . $controller);
    assertSessionBoundary(is_string($source), 'Could not read ' . $controller . '.');
    assertSessionBoundary(strpos($source, 'currentContext()') !== false, $controller . ' bypasses the session boundary.');
    foreach (['$_SESSION', '$_COOKIE', 'remember_token', 'user_table'] as $legacyDetail) {
        assertSessionBoundary(strpos($source, $legacyDetail) === false, $controller . ' exposes a legacy session detail.');
    }
}

echo "Session boundary contract tests passed.\n";
