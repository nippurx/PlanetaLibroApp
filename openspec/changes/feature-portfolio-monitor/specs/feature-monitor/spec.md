## ADDED Requirements

### Requirement: Multi-project portfolio overview
The monitor SHALL aggregate all healthy enabled projects and present their registered features with project, search, status, priority, and area filters and deterministic priority-oriented sorting.

#### Scenario: Focus on high priority candidates
- **WHEN** the user filters candidates and selects high priority
- **THEN** only matching features are shown with their current metadata

#### Scenario: Filter one project
- **WHEN** the user selects a registered project
- **THEN** only features owned by that project are shown

### Requirement: Persisted manual updates
The monitor SHALL allow the user to update an existing feature's priority and status and SHALL persist valid changes only to the owning project's versioned registry.

#### Scenario: Change feature priority
- **WHEN** the user assigns a valid priority in the monitor
- **THEN** the registry is updated and the refreshed monitor displays that priority

### Requirement: Namespaced feature identity
The monitor SHALL identify an aggregated feature with the combination of registered project ID and local feature ID without changing the local ID stored by the project.

#### Scenario: Two projects use FEAT-001
- **WHEN** two registered projects both contain local feature `FEAT-001`
- **THEN** the monitor presents and updates them as distinct namespaced features

### Requirement: OpenSpec progress projection
The monitor SHALL derive completed and total task counts from the linked active OpenSpec change and SHALL communicate missing or archived change data without treating it as zero progress.

#### Scenario: Linked active change has tasks
- **WHEN** a feature references an active change with checkbox tasks
- **THEN** the monitor displays completed and total task counts derived from that tasks file

#### Scenario: Linked change is unavailable
- **WHEN** a referenced active change directory cannot be read
- **THEN** the monitor displays an unavailable state and does not fabricate task counts

### Requirement: Local-only bounded service
The monitor service SHALL bind to loopback by default, SHALL resolve filesystem paths only from its registered project allowlist, SHALL not accept arbitrary filesystem paths, and SHALL validate all mutations before writing.

#### Scenario: Monitor starts with defaults
- **WHEN** the monitor server starts without host configuration
- **THEN** it listens on a loopback address and serves only the portfolio tool and its bounded API

#### Scenario: Unknown project is submitted
- **WHEN** a mutation references a project ID absent from the loaded configuration
- **THEN** the service rejects the request without reading or writing a client-supplied path

### Requirement: Project failure isolation
The monitor SHALL report a disabled or invalid project independently and SHALL continue presenting data from other healthy projects.

#### Scenario: One backlog is invalid
- **WHEN** one registered project contains an invalid or unreadable backlog
- **THEN** the response identifies that project error and includes features from other healthy projects

### Requirement: Accessible responsive interface
The monitor SHALL be usable on mobile and desktop with semantic controls, keyboard navigation, visible focus, sufficient contrast, and explicit loading, empty, error, and success feedback.

#### Scenario: Keyboard user changes a filter
- **WHEN** a keyboard user focuses and changes a filter control
- **THEN** focus remains visible and the feature list updates with an announced result count
