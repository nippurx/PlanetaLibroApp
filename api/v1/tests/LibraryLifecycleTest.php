<?php

declare(strict_types=1);

use PlanetaLibro\Api\V1\Library\LibraryLifecycle;

require dirname(__DIR__) . '/src/Library/LibraryLifecycle.php';

function assertLibraryState(string $expected, array $item, ?int $totalPages, string $message): void
{
    $actual = LibraryLifecycle::enrich(
        $item,
        $totalPages,
        new DateTimeImmutable('2026-07-23 12:00:00')
    );
    if (($actual['state'] ?? null) !== $expected) {
        throw new RuntimeException($message . ' Expected ' . $expected . ', got ' . ($actual['state'] ?? 'missing') . '.');
    }
}

function libraryItem(bool $readingStarted, int $page, bool $listeningStarted, ?string $lastActivity): array
{
    return [
        'reading' => ['started' => $readingStarted, 'current_page' => $page],
        'listening' => ['started' => $listeningStarted],
        'last_activity_at' => $lastActivity,
    ];
}

assertLibraryState(
    LibraryLifecycle::UNREAD,
    libraryItem(false, 0, false, '2026-07-20 10:00:00'),
    100,
    'A recent untouched membership must be unread.'
);
assertLibraryState(
    LibraryLifecycle::IN_PROGRESS,
    libraryItem(true, 40, false, '2026-07-20 10:00:00'),
    100,
    'A recent partial reading must be in progress.'
);
assertLibraryState(
    LibraryLifecycle::IN_PROGRESS,
    libraryItem(false, 0, true, '2026-07-20 10:00:00'),
    null,
    'Recent listening activity must be in progress.'
);
assertLibraryState(
    LibraryLifecycle::ABANDONED,
    libraryItem(true, 40, false, '2026-03-01 10:00:00'),
    100,
    'An incomplete membership inactive for more than three months must be abandoned.'
);
assertLibraryState(
    LibraryLifecycle::COMPLETED,
    libraryItem(true, 100, false, '2025-01-01 10:00:00'),
    100,
    'Completion must take precedence over inactivity.'
);
assertLibraryState(
    LibraryLifecycle::IN_PROGRESS,
    libraryItem(true, 999, false, '2026-07-20 10:00:00'),
    null,
    'A missing page total must not imply completion.'
);

$progress = LibraryLifecycle::enrich(
    libraryItem(true, 50, false, '2026-07-20 10:00:00'),
    100,
    new DateTimeImmutable('2026-07-23 12:00:00')
);
if (($progress['reading']['progress_percent'] ?? null) !== 50) {
    throw new RuntimeException('Reliable progress percentage was not calculated.');
}

echo "Library lifecycle tests passed.\n";
