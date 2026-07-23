## Validation

Executed locally on 2026-07-20:

- `php -l` completed successfully for the new boundary, its consumers, and its contract test.
- `php api/v1/tests/SessionBoundaryContractTest.php` passed. It verifies authenticated and anonymous contexts, delegation to a substitute `LegacySessionResolver`, and that controllers do not contain Legacy session internals.
- Existing reader-progress, annotation, and reader-manifest contract tests passed.
- `openspec validate legacy-session-boundary --strict` passed.
- `git diff --check` passed.

Verified in production on 2026-07-20:

- `https://planetalibro.net/app/home` recognized the active Legacy user session.
- The authenticated user's Legacy library remained available through PlanetaLibroApp.
- Without a valid session, the application presented the free-plan user state.

Not executable locally:

- Real HTTP validation against the Legacy runtime for valid, absent, and invalid persistent sessions. The Legacy source, its configured includes, its database, and production cookies are not available in this repository. Before deployment, execute those cases on a same-origin non-production environment and confirm the existing `200` session payload plus the preserved `401 unauthenticated` and `403 forbidden` responses for protected operations.
