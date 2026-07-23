<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Library;

use DateTimeImmutable;
use PlanetaLibro\Api\V1\Reader\ReaderManifestService;
use PlanetaLibro\Api\V1\Repositories\LibraryRepo;

final class LibraryService
{
    private LibraryRepo $repository;
    private ReaderManifestService $manifests;

    public function __construct(LibraryRepo $repository, ReaderManifestService $manifests)
    {
        $this->repository = $repository;
        $this->manifests = $manifests;
    }

    /**
     * @return array<string,mixed>
     */
    public function summary(int $userId, int $previewLimit): array
    {
        $allItems = $this->classifiedItems($userId);
        $items = $allItems;
        $sections = [];
        foreach ([LibraryLifecycle::IN_PROGRESS, LibraryLifecycle::UNREAD, LibraryLifecycle::COMPLETED] as $state) {
            $matching = array_values(array_filter($items, static function (array $item) use ($state): bool {
                return ($item['state'] ?? null) === $state;
            }));
            $sections[$state] = [
                'items' => array_slice($matching, 0, $previewLimit),
                'total' => count($matching),
            ];
        }

        return [
            'sections' => $sections,
            'total' => count($items),
            'counts' => $this->counts($items),
        ];
    }

    /**
     * @return array<string,mixed>
     */
    public function listing(
        int $userId,
        string $state,
        string $query,
        string $sort,
        int $limit,
        int $offset
    ): array {
        $allItems = $this->classifiedItems($userId);
        $items = $allItems;
        if ($state !== 'all') {
            $items = array_values(array_filter($items, static function (array $item) use ($state): bool {
                return ($item['state'] ?? null) === $state;
            }));
        }

        $normalizedQuery = $this->lower(trim($query));
        if ($normalizedQuery !== '') {
            $items = array_values(array_filter($items, function (array $item) use ($normalizedQuery): bool {
                $title = $this->lower((string) ($item['titulo'] ?? ''));
                $author = $this->lower((string) ($item['autor']['nombre'] ?? ''));
                return strpos($title, $normalizedQuery) !== false || strpos($author, $normalizedQuery) !== false;
            }));
        }

        $this->sortItems($items, $sort);
        $total = count($items);

        return [
            'items' => array_slice($items, $offset, $limit),
            'pagination' => [
                'limit' => $limit,
                'offset' => $offset,
                'total' => $total,
                'has_more' => $offset + $limit < $total,
            ],
            'filters' => [
                'state' => $state,
                'q' => $query,
                'sort' => $sort,
            ],
            'counts' => $this->counts($allItems),
        ];
    }

    /**
     * @return array<int,array<string,mixed>>
     */
    private function classifiedItems(int $userId): array
    {
        $now = new DateTimeImmutable();
        $items = array_map(function (array $item) use ($now): array {
            $uri = (string) ($item['uri'] ?? '');
            $totalPages = $uri !== '' ? $this->manifests->pageCountIfAvailable($uri) : null;
            return LibraryLifecycle::enrich($item, $totalPages, $now);
        }, $this->repository->membershipsForUser($userId));

        $this->sortItems($items, 'recent');
        return $items;
    }

    /**
     * @param array<int,array<string,mixed>> $items
     * @return array<string,int>
     */
    private function counts(array $items): array
    {
        $counts = [
            'all' => count($items),
            LibraryLifecycle::UNREAD => 0,
            LibraryLifecycle::IN_PROGRESS => 0,
            LibraryLifecycle::COMPLETED => 0,
            LibraryLifecycle::ABANDONED => 0,
        ];
        foreach ($items as $item) {
            $state = (string) ($item['state'] ?? '');
            if (array_key_exists($state, $counts)) {
                $counts[$state]++;
            }
        }
        return $counts;
    }

    /**
     * @param array<int,array<string,mixed>> $items
     */
    private function sortItems(array &$items, string $sort): void
    {
        usort($items, static function (array $left, array $right) use ($sort): int {
            $leftDate = (string) ($left['last_activity_at'] ?? $left['added_at'] ?? '');
            $rightDate = (string) ($right['last_activity_at'] ?? $right['added_at'] ?? '');
            $result = strcmp($rightDate, $leftDate);
            if ($result === 0) {
                $result = ((int) ($right['id'] ?? 0)) <=> ((int) ($left['id'] ?? 0));
            }
            return $sort === 'oldest' ? -$result : $result;
        });
    }

    private function lower(string $value): string
    {
        return function_exists('mb_strtolower') ? mb_strtolower($value, 'UTF-8') : strtolower($value);
    }
}
