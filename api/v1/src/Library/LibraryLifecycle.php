<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Library;

use DateTimeImmutable;
use Throwable;

final class LibraryLifecycle
{
    public const UNREAD = 'unread';
    public const IN_PROGRESS = 'in_progress';
    public const COMPLETED = 'completed';
    public const ABANDONED = 'abandoned';

    /**
     * @param array<string,mixed> $item
     * @return array<string,mixed>
     */
    public static function enrich(array $item, ?int $totalPages, DateTimeImmutable $now): array
    {
        $reading = is_array($item['reading'] ?? null) ? $item['reading'] : [];
        $listening = is_array($item['listening'] ?? null) ? $item['listening'] : [];
        $currentPage = max(0, (int) ($reading['current_page'] ?? 0));
        $readingStarted = (bool) ($reading['started'] ?? false);
        $listeningStarted = (bool) ($listening['started'] ?? false);
        $hasReliableTotal = $totalPages !== null && $totalPages > 0;

        if ($hasReliableTotal && $readingStarted && $currentPage >= $totalPages) {
            $state = self::COMPLETED;
        } elseif (self::isOlderThanThreeMonths($item['last_activity_at'] ?? null, $now)) {
            $state = self::ABANDONED;
        } elseif ($readingStarted || $listeningStarted) {
            $state = self::IN_PROGRESS;
        } else {
            $state = self::UNREAD;
        }

        $percent = null;
        if ($hasReliableTotal && $readingStarted) {
            $percent = max(0, min(100, (int) round(($currentPage / $totalPages) * 100)));
        }

        $item['state'] = $state;
        $item['reading']['total_pages'] = $hasReliableTotal ? $totalPages : null;
        $item['reading']['progress_percent'] = $percent;

        return $item;
    }

    /** @param mixed $value */
    private static function isOlderThanThreeMonths($value, DateTimeImmutable $now): bool
    {
        if (!is_string($value) || trim($value) === '') {
            return false;
        }

        try {
            return new DateTimeImmutable($value) < $now->modify('-3 months');
        } catch (Throwable $exception) {
            return false;
        }
    }
}
