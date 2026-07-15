<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Reader;

final class LegacyBookInfoParser
{
    /**
     * @return array{pages:int,paginicio:int,index:array<int,array{titulo:string,pag:int,nivel:int}>}
     */
    public function parse(string $path): array
    {
        $source = @file_get_contents($path);
        if ($source === false) {
            throw new ReaderManifestException('legacy_metadata_unreadable', 'Legacy book metadata could not be read.', 422);
        }

        $pages = $this->requiredInteger($source, 'npaginas');
        $startPage = $this->requiredInteger($source, 'paginicio');
        if ($pages < 1 || $pages > 100000 || $startPage < 1 || $startPage > $pages) {
            throw new ReaderManifestException('legacy_metadata_invalid', 'Legacy page metadata is invalid.', 422);
        }

        $items = [];
        $this->captureIndexStrings($source, 'titulo', $items);
        $this->captureIndexIntegers($source, 'pag', $items);
        $this->captureIndexIntegers($source, 'nivel', $items);
        ksort($items, SORT_NUMERIC);

        $index = [];
        foreach ($items as $item) {
            if (!isset($item['titulo'], $item['pag'], $item['nivel'])) {
                throw new ReaderManifestException('legacy_index_invalid', 'Legacy index metadata is incomplete.', 422);
            }

            $title = preg_replace('/\s+/u', ' ', trim((string) $item['titulo']));
            $page = (int) $item['pag'];
            $level = (int) $item['nivel'];
            if ($title === null || $title === '' || $page < 1 || $page > $pages || $level < 1) {
                throw new ReaderManifestException('legacy_index_invalid', 'Legacy index metadata is invalid.', 422);
            }

            $index[] = [
                'titulo' => $title,
                'pag' => $page,
                'nivel' => min(6, $level),
            ];
        }

        return [
            'pages' => $pages,
            'paginicio' => $startPage,
            'index' => $index,
        ];
    }

    private function requiredInteger(string $source, string $field): int
    {
        $pattern = '~\$gvar\["libro"\]\["' . preg_quote($field, '~') . '"\]\s*=\s*(\d+)\s*;~';
        if (preg_match($pattern, $source, $matches) !== 1) {
            throw new ReaderManifestException('legacy_metadata_invalid', 'Required legacy metadata is missing.', 422);
        }

        return (int) $matches[1];
    }

    /**
     * @param array<int,array<string,string|int>> $items
     */
    private function captureIndexStrings(string $source, string $field, array &$items): void
    {
        $pattern = '~\$gvar\["libro"\]\["indice"\]\[(\d+)\]\["' . preg_quote($field, '~') . '"\]\s*=\s*"((?:\\\\.|[^"\\\\])*)"\s*;~s';
        preg_match_all($pattern, $source, $matches, PREG_SET_ORDER);
        foreach ($matches as $match) {
            $items[(int) $match[1]][$field] = stripcslashes($match[2]);
        }
    }

    /**
     * @param array<int,array<string,string|int>> $items
     */
    private function captureIndexIntegers(string $source, string $field, array &$items): void
    {
        $pattern = '~\$gvar\["libro"\]\["indice"\]\[(\d+)\]\["' . preg_quote($field, '~') . '"\]\s*=\s*(\d+)\s*;~';
        preg_match_all($pattern, $source, $matches, PREG_SET_ORDER);
        foreach ($matches as $match) {
            $items[(int) $match[1]][$field] = (int) $match[2];
        }
    }
}
