## 1. Discovery and contract confirmation

- [x] 1.1 Inspect the API entrypoints and current session consumers in read-only mode; record the exact Legacy session function, prerequisites and existing public error behavior.
- [x] 1.2 Confirm the minimum application-level session context required by each affected API operation, including the stable user reference and required capabilities.
- [x] 1.3 Obtain owner review of the integration boundary and perform the required security/threat review before changing authentication-related code.

## 2. Session boundary implementation

- [x] 2.1 Implement the designated Legacy session resolver or adapter at the confirmed API integration point, translating Legacy data into the approved minimal application-level context.
- [x] 2.2 Migrate affected API consumers to use the resolver or adapter and remove their direct dependencies on Legacy session internals.
- [x] 2.3 Preserve each affected endpoint's verified public authentication and authorization response semantics without exposing internal session details.

## 3. Verification and documentation

- [x] 3.1 Add or execute reproducible validation for authenticated, anonymous, invalid-session and unauthorized cases applicable to each migrated endpoint.
- [x] 3.2 Verify that a substituted Legacy session implementation preserving the resolver contract does not require changes in API consumers.
- [x] 3.3 Run applicable PHP checks, `openspec validate legacy-session-boundary --strict`, `git diff --check`, and document any validation not executable locally.
