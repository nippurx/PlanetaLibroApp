## ADDED Requirements

### Requirement: Versioned feature registry
The system SHALL maintain a versioned, human-readable feature registry with stable identifier, title, summary, status, priority, area, timestamps, optional OpenSpec change link, and notes for every entry.

#### Scenario: Record a new idea
- **WHEN** a product idea is accepted for tracking
- **THEN** the registry contains a uniquely identified entry without requiring an OpenSpec change

### Requirement: Controlled lifecycle values
The system SHALL restrict feature status and priority to documented enumerated values and SHALL reject invalid persisted or submitted values.

#### Scenario: Invalid priority is submitted
- **WHEN** an update contains a priority outside the documented set
- **THEN** the registry remains unchanged and the caller receives a validation error

### Requirement: Explicit OpenSpec promotion
The system SHALL allow a feature to reference one OpenSpec change and SHALL keep creation and implementation of that change as an explicit OpenSpec workflow.

#### Scenario: Feature is selected for development
- **WHEN** the owner decides to develop a tracked feature
- **THEN** its registry entry can be linked to the dedicated OpenSpec change without copying the change task list into the registry

### Requirement: Portfolio documentation
The repository SHALL document how ideas are captured, prioritized, promoted, developed, completed, and archived, including which artifact is authoritative at each stage.

#### Scenario: Contributor reviews the workflow
- **WHEN** a contributor reads the portfolio guide
- **THEN** they can distinguish backlog metadata from OpenSpec planning and task progress

### Requirement: Explicit project registry
The system SHALL maintain a machine-local registry of explicitly approved projects containing stable ID, display name, absolute root path, and enabled state, while each project's features remain in its own versioned backlog.

#### Scenario: Register a project
- **WHEN** the owner registers a project containing a valid feature backlog
- **THEN** the project becomes available to the global monitor without copying its features into the global configuration

#### Scenario: Reject duplicate project ID
- **WHEN** registration would reuse an existing project ID for a different root
- **THEN** the registry remains unchanged and reports the conflict
