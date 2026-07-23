<?php

declare(strict_types=1);

namespace PlanetaLibro\Api\V1\Auth;

use PDO;

/**
 * The sole API class that knows the current PHP, cookie, and PDO compatibility
 * behavior of Legacy. It can be replaced without changing API consumers.
 */
final class LegacyPhpSessionResolver implements LegacySessionResolver
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function resolve(): SessionContext
    {
        $this->start();

        $userId = filter_var($_SESSION['userid'] ?? null, FILTER_VALIDATE_INT);
        if ($userId !== false && $userId !== null && $userId > 0) {
            return $this->contextFromUser($this->loadUser((int) $userId));
        }

        if (isset($_COOKIE['pl_logged_out'])) {
            return SessionContext::anonymous();
        }

        $token = (string) ($_COOKIE['remember_token'] ?? '');
        if (!preg_match('/^[a-f0-9]{64}$/', $token)) {
            return SessionContext::anonymous();
        }

        $statement = $this->pdo->prepare(
            'SELECT userid, username, img_url, paid, renew_date, valid FROM user_table WHERE remember_token = :token LIMIT 1'
        );
        $statement->execute(['token' => $token]);
        $user = $statement->fetch();
        if (!is_array($user)) {
            return SessionContext::anonymous();
        }

        session_regenerate_id(true);
        $this->storeSession($user);
        return $this->contextFromUser($user);
    }

    public function rememberReturnTo(string $returnTo): bool
    {
        $path = (string) parse_url($returnTo, PHP_URL_PATH);
        $query = (string) parse_url($returnTo, PHP_URL_QUERY);
        if ($path !== '/app' && strpos($path, '/app/') !== 0) {
            return false;
        }

        $this->start();
        $_SESSION['login_destino'] = ltrim($path . ($query !== '' ? '?' . $query : ''), '/');
        return true;
    }

    public function csrfToken(): string
    {
        $this->start();
        $token = (string) ($_SESSION['api_csrf_token'] ?? '');
        if (preg_match('/^[a-f0-9]{64}$/', $token) !== 1) {
            $token = bin2hex(random_bytes(32));
            $_SESSION['api_csrf_token'] = $token;
        }
        return $token;
    }

    public function validateCsrfToken(string $token): bool
    {
        $this->start();
        $expected = (string) ($_SESSION['api_csrf_token'] ?? '');
        return preg_match('/^[a-f0-9]{64}$/', $token) === 1
            && preg_match('/^[a-f0-9]{64}$/', $expected) === 1
            && hash_equals($expected, $token);
    }

    public function allowAction(string $bucket, int $limit, int $windowSeconds): bool
    {
        $this->start();
        $key = 'api_rate_' . preg_replace('/[^a-z0-9_-]/i', '', $bucket);
        $now = time();
        $timestamps = array_values(array_filter(
            is_array($_SESSION[$key] ?? null) ? $_SESSION[$key] : [],
            static fn($timestamp): bool => is_int($timestamp) && $timestamp > $now - $windowSeconds
        ));
        if (count($timestamps) >= $limit) {
            $_SESSION[$key] = $timestamps;
            return false;
        }
        $timestamps[] = $now;
        $_SESSION[$key] = $timestamps;
        return true;
    }

    private function start(): void
    {
        if (session_status() === PHP_SESSION_ACTIVE) {
            return;
        }

        $secure = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
        session_set_cookie_params([
            'path' => '/',
            'secure' => $secure,
            'httponly' => true,
            'samesite' => 'Lax',
        ]);
        ini_set('session.use_strict_mode', '1');
        session_start();
    }

    /** @return array<string, mixed>|null */
    private function loadUser(int $userId): ?array
    {
        $statement = $this->pdo->prepare(
            'SELECT userid, username, img_url, paid, renew_date, valid FROM user_table WHERE userid = :userid LIMIT 1'
        );
        $statement->bindValue(':userid', $userId, PDO::PARAM_INT);
        $statement->execute();
        $user = $statement->fetch();
        return is_array($user) ? $user : null;
    }

    /** @param array<string, mixed> $user */
    private function storeSession(array $user): void
    {
        $_SESSION['userid'] = (int) $user['userid'];
        $_SESSION['username'] = (string) $user['username'];
        $_SESSION['img_url'] = (string) ($user['img_url'] ?? '');
        $_SESSION['user_paid'] = (int) ($user['paid'] ?? 0);
    }

    /** @param array<string, mixed>|null $user */
    private function contextFromUser(?array $user): SessionContext
    {
        if ($user === null) {
            return SessionContext::anonymous();
        }

        return SessionContext::authenticated(
            (int) $user['userid'],
            (string) $user['username'],
            trim((string) ($user['img_url'] ?? '')) ?: null,
            ['premium' => (int) ($user['paid'] ?? 0) === 1]
        );
    }
}
