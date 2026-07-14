<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1;

final class Router
{
    /** @var array<int, array{method:string, pattern:string, handler:callable}> */
    private array $routes = [];

    public function get(string $pattern, callable $handler): void
    {
        $this->routes[] = [
            'method' => 'GET',
            'pattern' => $pattern,
            'handler' => $handler,
        ];
    }

    public function dispatch(Request $request): void
    {
        foreach ($this->routes as $route) {
            if ($route['method'] !== $request->method()) {
                continue;
            }

            $matches = $this->match($route['pattern'], $request->path());
            if ($matches === null) {
                continue;
            }

            ($route['handler'])($request, $matches);
            return;
        }

        Response::notFound('Route not found.');
    }

    /**
     * @return array<string, string>|null
     */
    private function match(string $pattern, string $path): ?array
    {
        $paramNames = [];
        $regex = preg_replace_callback(
            '#\{([a-zA-Z_][a-zA-Z0-9_]*)\}#',
            static function (array $matches) use (&$paramNames): string {
                $paramNames[] = $matches[1];
                return '([^/]+)';
            },
            $pattern
        );

        $regex = '#^' . $regex . '$#';
        if (!preg_match($regex, $path, $values)) {
            return null;
        }

        array_shift($values);
        $params = [];
        foreach ($paramNames as $index => $name) {
            $params[$name] = $values[$index] ?? '';
        }

        return $params;
    }
}
