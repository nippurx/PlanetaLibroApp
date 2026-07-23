## ADDED Requirements

### Requirement: Repository-local OpenSpec overview
The system SHALL serve a local execution overview that lists every immediate active change under `openspec/changes/` and every archived change under `openspec/changes/archive/` for PlanetaLibroApp. Each listed change SHALL identify its slug, location state, planning artifact availability, and task progress without accepting a repository path from the browser.

#### Scenario: Active change is discovered
- **WHEN** an active change directory exists under `openspec/changes/`
- **THEN** the overview includes it with an `active` state and its derived artifact and task information

#### Scenario: Archived change is discovered
- **WHEN** a change directory exists under `openspec/changes/archive/`
- **THEN** the overview includes it with an `archived` state and does not present it as recommended next work

#### Scenario: Change has no task file
- **WHEN** a discovered change does not contain `tasks.md`
- **THEN** the overview reports task progress as unavailable rather than reporting zero tasks

### Requirement: Detailed task projection
The system SHALL derive each change's task list and completed and total counts from Markdown checkboxes in its `tasks.md`. It SHALL expose the task text, ordinal, and completion state in the local API and visual interface, while keeping the task artifact read-only through the interface.

#### Scenario: Completed and pending tasks are shown
- **WHEN** a task file contains checked and unchecked Markdown checkboxes
- **THEN** the change detail shows every detected task and the same completed and total counts as the derived overview

#### Scenario: Change header makes progress scannable
- **WHEN** a change has an available task file
- **THEN** its header shows percentage progress, completed-task count in green, and pending-task count in red

#### Scenario: Change description is available
- **WHEN** a change has a proposal with a `Why` section
- **THEN** its header shows the first meaningful paragraph from that section as its description

#### Scenario: Full proposal can be inspected
- **WHEN** the owner expands a change with an available proposal
- **THEN** the interface provides an expandable section with the complete `proposal.md` text

#### Scenario: Unsupported task lines do not create false tasks
- **WHEN** a task file contains prose or headings without Markdown checkboxes
- **THEN** those lines do not increase the detected task total

### Requirement: Persisted operational assessment
The system SHALL let the owner set a priority, urgency, importance, effort, blocked state, and optional decision note for each discovered change. It SHALL persist only validated values in a versioned repository-local assessment file and SHALL keep these values distinct from the OpenSpec-derived task state.

#### Scenario: Owner records an assessment
- **WHEN** the owner saves valid assessment values for a discovered change
- **THEN** a subsequent overview load shows those values for that same change without changing its `tasks.md`

#### Scenario: Invalid assessment is rejected
- **WHEN** a client submits an unknown enum, an unknown change slug, or an overlong note
- **THEN** the local API rejects the request and does not write the assessment file

### Requirement: Actionable work prioritization
The system SHALL summarize total active work and identify a deterministic recommended next change from active, unblocked changes with pending tasks and an explicitly assigned priority. The recommendation SHALL display its priority, urgency, importance, effort, remaining-task count, and the factors used to select it. Blocked active changes SHALL be visibly identified separately.

#### Scenario: Recommendation favors operational importance
- **WHEN** multiple active, unblocked changes have pending tasks and different assessments
- **THEN** the overview recommends the change with the higher documented operational score and exposes its selection factors

#### Scenario: Blocked work is not recommended
- **WHEN** the highest-scoring active change is marked blocked
- **THEN** it remains visible in the blocked-work summary and another eligible change is recommended when one exists

#### Scenario: No eligible next work exists
- **WHEN** no active change has pending unblocked tasks with an assigned priority
- **THEN** the overview states that there is no recommended next change, does not invent a ranking, and continues to show completed, unavailable, and blocked work accurately

### Requirement: OpenSpec apply guidance
The system SHALL expose, for each discovered change, the local OpenSpec apply instruction generated for that known slug and the suggested Codex command `/opsx:apply <slug>`. It SHALL never execute the Codex command or accept a change path or arbitrary OpenSpec arguments from the browser.

#### Scenario: Apply guidance is available
- **WHEN** OpenSpec returns a valid apply-instructions response for a discovered change
- **THEN** the expanded change shows the suggested Codex command and the returned instruction text

#### Scenario: Apply guidance is unavailable
- **WHEN** the local OpenSpec command fails or is unavailable for a discovered change
- **THEN** the expanded change reports that apply guidance is unavailable while preserving its task and proposal information

### Requirement: Accessible local dashboard
The system SHALL provide a responsive, keyboard-accessible local HTML interface with summary, filtering and sorting controls, change details, task completion visibility, assessment controls, loading feedback, empty states, and recoverable errors.

#### Scenario: Owner filters pending work
- **WHEN** the owner filters the dashboard for active changes with pending tasks
- **THEN** the visible change list and result count reflect that filter while the global summary remains available

#### Scenario: Owner expands a change
- **WHEN** the owner activates a change detail control by mouse or keyboard
- **THEN** its task list and operational assessment are available without navigating away from the dashboard

### Requirement: Portable installation
The system SHALL provide a command that installs the dashboard runtime and a Windows launcher into another explicitly named repository that contains `openspec/changes/`, without requiring a `package.json` change in that destination.

#### Scenario: Valid OpenSpec repository is installed
- **WHEN** the installer receives a different repository root that contains `openspec/changes/`
- **THEN** it creates `tools/feature-monitor/` with the dashboard runtime and `ABRIR_TABLERO_OPENSPEC.bat` in that root

#### Scenario: Existing installation is protected
- **WHEN** the destination already contains `tools/feature-monitor/` and force was not explicitly requested
- **THEN** the installer stops without overwriting the destination
