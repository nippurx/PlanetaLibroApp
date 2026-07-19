## ADDED Requirements

### Requirement: Multiple persistent bookmarks
The system SHALL allow an authenticated user to store multiple private bookmarks in the same book as point anchors in the unified annotations collection.

#### Scenario: Add a bookmark
- **WHEN** an authenticated reader activates the bookmark target at an unmarked visible location
- **THEN** the system persists one bookmark for that user, book and content location and displays its active state

#### Scenario: Remove a bookmark
- **WHEN** the reader activates the bookmark target at an already marked visible location
- **THEN** the system removes every equivalent bookmark at that location and displays its inactive state

#### Scenario: Persist across sessions
- **WHEN** the authenticated reader reopens a book containing bookmarks
- **THEN** the system loads those bookmarks and identifies whether the current visible location is marked

### Requirement: Exclusive ergonomic bookmark target
The reader SHALL provide a stable, finger-sized interactive target in the upper-right reading corner that only toggles bookmarks and never advances the page.

#### Scenario: Touch upper-right corner
- **WHEN** the user taps the bookmark target with no bookmark visible
- **THEN** the reader creates a bookmark and does not navigate to another visual page

#### Scenario: Touch right side below target
- **WHEN** the user taps the normal next-page region below the bookmark target in paged mode
- **THEN** the reader advances exactly one visual page

#### Scenario: Keyboard accessibility
- **WHEN** keyboard focus reaches the bookmark target
- **THEN** the control exposes an accessible add-or-remove name and can be activated without page navigation

### Requirement: Unified annotations notebook
The annotations notebook SHALL list bookmarks together with highlights and notes, distinguish their type, support a bookmarks filter and navigate to the saved location.

#### Scenario: View all annotations
- **WHEN** the user opens the notebook with the all filter
- **THEN** bookmarks, highlights and notes appear ordered by content location

#### Scenario: Filter bookmarks
- **WHEN** the user selects the bookmarks filter
- **THEN** only bookmark entries are shown

#### Scenario: Navigate to bookmark
- **WHEN** the user activates a bookmark entry
- **THEN** the reader closes or preserves the panel as designed and navigates to the saved content location

### Requirement: Single-color initial model
The system SHALL store `color_code` for bookmarks but SHALL use one fixed bookmark color without exposing color selection or semantic categories.

#### Scenario: Create initial bookmark
- **WHEN** a bookmark is created in this version
- **THEN** it is stored with the fixed initial color code and no color picker is presented

### Requirement: Compatibility and authorization
Bookmark reads and writes SHALL reuse authenticated private annotation protections and SHALL preserve existing highlight and note behavior.

#### Scenario: Anonymous activation
- **WHEN** a visitor without an authenticated session attempts to add a bookmark
- **THEN** the reader presents the contextual sign-in invitation and does not claim durable persistence

#### Scenario: Existing annotation clients
- **WHEN** highlights and notes are created, updated, listed or deleted
- **THEN** their established behavior remains compatible while responses include their explicit annotation type
