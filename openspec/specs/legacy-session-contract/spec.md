## Purpose

Define the stable application-level contract between PlanetaLibroApp and PlanetaLibro legacy session handling.

## Requirements

### Requirement: Encapsulated Legacy session resolution
The PlanetaLibroApp API SHALL obtain session-derived information through one designated Legacy session resolver or adapter, which encapsulates the Legacy session-management implementation.

#### Scenario: API operation needs session context
- **WHEN** an API operation needs to identify the caller or make an authorization decision
- **THEN** it obtains the required context through the designated resolver or adapter rather than directly accessing Legacy session internals

#### Scenario: Legacy session implementation changes
- **WHEN** the implementation used by Legacy to create, validate, renew, invalidate, or store sessions changes
- **THEN** the API consumers remain unchanged provided that the designated resolver or adapter preserves its application-level contract

### Requirement: Minimal application-level session context
The designated resolver or adapter SHALL return only the session state and the minimum user reference and authorization capabilities required by the calling API operation. It SHALL NOT expose raw cookies, session identifiers, tokens, storage names, tables, global variables, or unrelated personal data.

#### Scenario: Authenticated operation needs identity
- **WHEN** an authenticated API operation requires the caller identity
- **THEN** the resolver or adapter supplies the stable application-level user reference required for that operation without exposing Legacy session mechanics

#### Scenario: Anonymous operation
- **WHEN** no valid authenticated session is available
- **THEN** the resolver or adapter returns an unauthenticated application-level context without requiring consumers to inspect Legacy cookies or session state

### Requirement: Isolation of Legacy session internals
API controllers, repositories, DTOs, and frontend clients SHALL NOT depend on Legacy-specific session variables, cookie names, session-storage structures, table names, or session lifecycle rules.

#### Scenario: New authenticated endpoint
- **WHEN** a new API endpoint needs session-derived information
- **THEN** it consumes the application-level context through the designated resolver or adapter and does not add a direct dependency on Legacy session internals

### Requirement: Safe and compatible session failure handling
The API SHALL translate an absent, invalid, or insufficient session context into the authentication or authorization response defined by the affected API contract, without revealing Legacy implementation details or sensitive session information.

#### Scenario: Session cannot be authenticated
- **WHEN** the designated resolver or adapter cannot establish a valid authenticated context for an operation that requires one
- **THEN** the API returns the operation's defined unauthenticated or unauthorized response and does not disclose the internal reason or session data

#### Scenario: Session is authorized for operation
- **WHEN** the designated resolver or adapter returns a context with the capability required by the operation
- **THEN** the operation proceeds without requiring consumers to evaluate Legacy-specific authorization rules

### Requirement: Legacy session mechanism remains out of scope
The change that introduces this boundary SHALL NOT modify the internal session-management behavior of PlanetaLibro legacy unless a separate approved change explicitly authorizes it.

#### Scenario: Boundary implementation
- **WHEN** the API integration boundary is implemented
- **THEN** it invokes the existing Legacy-facing session function or adapter contract and leaves Legacy session creation, storage, renewal, invalidation, and persistence behavior unchanged
