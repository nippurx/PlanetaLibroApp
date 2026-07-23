## Implementation confirmation and threat review

### Observed Legacy contract

- The existing audit identifies `user_logged_check()` as the Legacy function that restores identity from the PHP session or persistent token. Its source and include path are outside this repository.
- To avoid including `user_funcs.php` or changing Legacy, `LegacyPhpSessionResolver` encapsulates the compatibility behavior the API already used. A future implementation can replace it through `LegacySessionResolver` without changing API consumers.
- The observed prerequisites are PHP sessions, same-origin cookies, and the configured Legacy `PDO` connection. The exact include path remains **NO CONFIRMADO**.

### Minimal application context

| API operation | Required context |
| --- | --- |
| `GET /session` | authentication state, stable id, display name, avatar, and `premium` capability |
| Library, progress, and annotations | stable user id |
| Progress and annotation writes | stable user id plus the existing CSRF and rate-limit checks |

The context excludes cookies, session ids, tokens, tables, global variables, and raw Legacy fields such as `paid`, `valid`, or `renew_date`.

### Security review

- This implementation was explicitly requested in the current task and is limited to the session read boundary.
- It does not change Legacy credentials, login, logout, cookies, tables, renewal, or invalidation.
- It preserves the `/app` return-path allowlist, private no-store responses, same-origin checks, CSRF, and rate limit behavior.
- Known risks in recovery, OAuth, and the Legacy `remember_token` lifecycle remain out of scope and are not corrected by this change.
