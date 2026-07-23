## ADDED Requirements

### Requirement: Canonical library lifecycle states
The system SHALL classify every authenticated user's library membership with exactly one canonical state: unread, in progress, completed, or abandoned. The classification SHALL originate from server-authoritative data and SHALL NOT depend on the item's position in a response.

#### Scenario: In-progress membership
- **WHEN** a library membership has valid reading or listening activity and is neither completed nor abandoned
- **THEN** the system classifies it as in progress

#### Scenario: Unread membership
- **WHEN** a library membership has not been started and is neither completed nor abandoned
- **THEN** the system classifies it as unread

#### Scenario: Completed membership
- **WHEN** a reliable total page count exists, the membership has real reading progress, and its current page reaches or exceeds the final page
- **THEN** the system classifies it as completed

#### Scenario: Abandoned membership
- **WHEN** a non-completed membership's latest available reading or listening activity is older than three months
- **THEN** the system classifies it as abandoned

#### Scenario: Completed state has precedence
- **WHEN** a membership reached the final page more than three months ago
- **THEN** the system classifies it as completed rather than abandoned

#### Scenario: Missing total page count
- **WHEN** a membership has reading progress but no reliable total page count
- **THEN** the system does not infer completion from the current page alone

#### Scenario: Classification is independent of result order
- **WHEN** the same library items are returned in a different order or page
- **THEN** each item's lifecycle state remains unchanged

### Requirement: Library summary by user intent
The system SHALL present the authenticated library summary in the sections Continuar, Por leer, and Terminados, and SHALL provide access to Todos. Abandonados SHALL be available as a secondary filter and SHALL NOT be presented as a primary promotional block.

#### Scenario: Continue section
- **WHEN** the user has in-progress items
- **THEN** Continuar displays the most recently active items first

#### Scenario: Unread section
- **WHEN** the user has unread items
- **THEN** Por leer displays the most recently added unread items first

#### Scenario: Completed section
- **WHEN** the user has completed items
- **THEN** Terminados displays the most recently completed items first

#### Scenario: All view
- **WHEN** the user opens Todos
- **THEN** the system provides complete paginated access to all of that user's library memberships

#### Scenario: Abandoned filter
- **WHEN** the user selects Abandonados from the complete library view
- **THEN** the system displays only abandoned memberships and indicates that filter as active

### Requirement: Accurate section counts
The system SHALL display a server-authoritative total for each summarized or filtered lifecycle collection. A displayed total SHALL represent the complete matching collection rather than the number of preview cards currently rendered.

#### Scenario: Preview is smaller than total
- **WHEN** a section contains more items than its preview limit
- **THEN** the displayed count reflects every matching item and Ver todo provides access to the complete collection

#### Scenario: Count and complete view agree
- **WHEN** the user opens Ver todo for a section
- **THEN** the result total matches the count displayed in the library summary for the same filter

### Requirement: Functional navigation and controls
Every visible library control SHALL have implemented behavior and a verifiable destination or state change. The system SHALL NOT render placeholder links, static filter controls that do not filter, or action buttons without behavior.

#### Scenario: View all navigation
- **WHEN** the user activates Ver todo for a visible section
- **THEN** the system opens the complete view with the corresponding filter applied

#### Scenario: Filter selection
- **WHEN** the user selects a lifecycle filter in the complete view
- **THEN** the visible collection, active state, count, and URL or restorable navigation state reflect that filter

#### Scenario: Unsupported action
- **WHEN** an action has no implemented contract
- **THEN** the system does not render that action as an interactive control

### Requirement: Complete library search
The Todos view SHALL let the user search within books already in their personal library. This search SHALL be distinct from global catalog discovery in Buscar.

#### Scenario: Search matching owned books
- **WHEN** the user enters a title or author query in Todos
- **THEN** the system displays matching items from that user's library and preserves the active lifecycle filter

#### Scenario: Search does not add books
- **WHEN** a user searches within Todos
- **THEN** the system does not add catalog items or expose results outside the user's library

#### Scenario: Global discovery remains separate
- **WHEN** the user wants to discover or incorporate a book
- **THEN** the primary navigation provides Buscar rather than an add-book control in Mi Biblioteca

### Requirement: Honest reading and listening progress
The system SHALL show progress only from authoritative reading or listening data. A percentage SHALL be shown only when a reliable numerator and denominator are available, and the system SHALL NOT substitute a fabricated zero percent.

#### Scenario: Reliable percentage
- **WHEN** the server provides valid completed and total progress units
- **THEN** the UI displays the corresponding bounded percentage and progress indicator

#### Scenario: Percentage unavailable
- **WHEN** a reliable total is unavailable
- **THEN** the UI shows the current page, listening position, or a neutral resume state without displaying a false percentage

#### Scenario: Separate media progress
- **WHEN** a work supports both reading and listening with distinct positions
- **THEN** the UI associates each progress value with the correct Leer or Escuchar action

### Requirement: Explicit media actions and useful book context
Each library item SHALL display its title, author when available, supported media type, and applicable progress context. It SHALL expose explicit Leer and Escuchar actions according to actual availability, while secondary actions SHALL be placed in the contextual menu.

#### Scenario: Ebook-only item
- **WHEN** an item supports reading but not listening
- **THEN** the item displays its ebook availability and a Leer action without an Escuchar action

#### Scenario: Audiobook availability
- **WHEN** an item supports listening
- **THEN** the item displays audiobook availability and an Escuchar action

#### Scenario: Mixed-media item
- **WHEN** an item supports both reading and listening
- **THEN** the item distinguishes both media types and exposes both actions

#### Scenario: Compact mobile media actions
- **WHEN** a library item is displayed on a mobile viewport
- **THEN** its Leer and Escuchar actions use centered icon-only controls with meaningful accessible names

#### Scenario: Media actions below a cover
- **WHEN** Leer or Escuchar actions are displayed directly below a book cover
- **THEN** their container matches the full cover width, one action fills that width, or two actions divide it equally, using centered icon-only controls in every viewport

#### Scenario: Secondary book information
- **WHEN** the user opens the contextual menu for an item
- **THEN** the menu provides implemented secondary actions such as opening book information

### Requirement: Responsive library presentation
The library SHALL use mobile-first responsive presentation. Mobile summary sections SHALL use horizontally scrollable cover collections with access to Ver todo. Every complete view SHALL use a single-column vertical list on mobile and desktop and SHALL NOT change to a book-cover grid at desktop breakpoints.

#### Scenario: Mobile summary
- **WHEN** the library is displayed below the project's mobile breakpoint
- **THEN** each non-empty summary section provides a horizontally navigable collection and a visible Ver todo action

#### Scenario: Desktop summary
- **WHEN** the library is displayed at a desktop breakpoint
- **THEN** every overflowing horizontal summary collection provides accessible previous and next controls without changing classification, ordering, or counts

#### Scenario: Desktop carousel boundary
- **WHEN** a desktop summary carousel reaches its first or last available position
- **THEN** the corresponding previous or next control is disabled

#### Scenario: Complete view on any supported viewport
- **WHEN** the user opens a complete section on mobile or desktop
- **THEN** the system presents a single-column vertical list and every matching item remains reachable through pagination or incremental loading

#### Scenario: Complete view on desktop
- **WHEN** a complete list is displayed at a desktop breakpoint
- **THEN** the list is centered within a readable maximum width and does not expand into a multi-column cover grid

### Requirement: Complete list header and sorting
Every Ver todo view SHALL provide a compact header containing back navigation, the collection name, and the server-authoritative total. The header SHALL expose only implemented sorting options, and sorting SHALL be applied to the complete filtered collection before pagination.

#### Scenario: Complete-view header
- **WHEN** the user opens Ver todo for a lifecycle collection
- **THEN** the header displays back navigation, that collection's name, and the same total shown in the library summary

#### Scenario: Default ordering
- **WHEN** the user opens Continuar, Por leer, or Terminados without an explicit sort parameter
- **THEN** the system applies the domain default of recent activity, recent addition, or recent completion respectively

#### Scenario: Reverse ordering
- **WHEN** the user activates the minimum ascending-or-descending sort control
- **THEN** the server reverses the order of the complete filtered collection before returning the current page

#### Scenario: Restorable ordering
- **WHEN** the user navigates away from and back to a sorted complete view or reloads its direct URL
- **THEN** the active collection, filter, search query, and sort order are restored

#### Scenario: Unsupported sort option
- **WHEN** the backend cannot apply a sort criterion consistently to the complete collection
- **THEN** the UI does not expose that criterion as an interactive option

### Requirement: Complete list row anatomy
Every item in a Ver todo view SHALL use a consistent horizontal row containing a cover, title, author when available, honest progress context, applicable Leer and Escuchar actions, a contextual menu, and a visual separator. The layout SHALL preserve access to actions when text is long.

#### Scenario: Standard row
- **WHEN** a library item is rendered in a complete view
- **THEN** its cover appears at the leading edge, its metadata and progress occupy the flexible content area, and its actions remain in a stable action area

#### Scenario: Long title
- **WHEN** an item's title exceeds the available row width
- **THEN** the title is limited to two lines and truncated without overlapping the progress indicator or actions

#### Scenario: Long author
- **WHEN** an item's author exceeds the available row width
- **THEN** the author is limited to one line and truncated without changing the row's action layout

#### Scenario: Row separator
- **WHEN** two consecutive items appear in a complete list
- **THEN** a visible separator or equivalent spacing makes their interactive regions distinguishable

#### Scenario: Independent nested action
- **WHEN** the user activates Leer, Escuchar, or the contextual menu within a row
- **THEN** only that selected action runs and the row's primary navigation is not triggered

#### Scenario: No offline contract
- **WHEN** offline download has not been specified and implemented
- **THEN** the row does not display a download icon or another control that implies offline availability

### Requirement: Library navigation identity
The mobile primary navigation SHALL identify `/app/library` as Biblioteca with a library-appropriate icon and active state. The page SHALL avoid duplicating the same visible title in both the shell header and page content when that duplication consumes mobile space without adding context.

#### Scenario: Active mobile destination
- **WHEN** the user is on `/app/library`
- **THEN** the mobile navigation announces Biblioteca as the active destination

#### Scenario: Single useful page heading
- **WHEN** the library renders on a mobile viewport
- **THEN** the user encounters one primary visible Biblioteca heading

### Requirement: Library screen states
The library SHALL handle loading, empty, recoverable error, and success states explicitly for both the summary and complete views.

#### Scenario: Loading
- **WHEN** library data is being requested
- **THEN** the system displays a non-misleading loading state and does not present stale counts as current

#### Scenario: Empty library
- **WHEN** the authenticated user has no library memberships
- **THEN** the system displays a useful empty state that directs discovery to Buscar without presenting an add-book control

#### Scenario: Empty filtered collection
- **WHEN** the active lifecycle filter has no matching items
- **THEN** the system displays a contextual empty state without implying that the entire library is empty

#### Scenario: Recoverable error
- **WHEN** a library request fails recoverably
- **THEN** the system explains that data could not be loaded and offers an implemented retry action

### Requirement: Accessible interaction and Spanish text integrity
Library navigation, carousels, cards, menus, filters, and actions SHALL be operable by keyboard with visible focus and meaningful accessible names. User-visible Spanish text SHALL be valid UTF-8 without mojibake.

#### Scenario: Keyboard operation
- **WHEN** a keyboard user traverses the library
- **THEN** every interactive control can be reached and activated with a visible focus indicator in a logical order

#### Scenario: Carousel semantics
- **WHEN** assistive technology encounters a mobile summary carousel
- **THEN** the section and its controls expose meaningful labels without requiring pointer gestures

#### Scenario: Spanish copy
- **WHEN** the library renders Spanish labels and descriptions
- **THEN** accents and characters display correctly, including terms such as Añadidos, Está and intención

### Requirement: No book-add controls in the library
Mi Biblioteca SHALL NOT display controls labeled or intended as Nuevo libro, Añadir libro, or equivalent catalog-add affordances. Discovery and incorporation SHALL remain in Buscar.

#### Scenario: Library summary
- **WHEN** the user opens Mi Biblioteca
- **THEN** no new-book or add-book control is present

#### Scenario: Empty state
- **WHEN** the user's library or a section is empty
- **THEN** the empty state may link to Buscar but does not embed an add-book workflow

### Requirement: Compatibility and bounded data access
The change SHALL preserve `/app/library`, canonical book URIs, existing read, listen, and detail routes, and the authenticated session boundary. Complete library collections SHALL be obtained with server-enforced limits and pagination, and the change SHALL NOT alter public indexable URLs or metadata.

#### Scenario: Existing route compatibility
- **WHEN** a user follows an existing library card action
- **THEN** its reader, audiobook player, or book-detail destination remains compatible with the existing route contract

#### Scenario: Direct library navigation
- **WHEN** an authenticated user opens or reloads `/app/library`
- **THEN** the SPA resolves the library without changing the public URL contract

#### Scenario: Unauthenticated access
- **WHEN** an unauthenticated user opens `/app/library`
- **THEN** the established authenticated-session boundary handles access without exposing another user's library

#### Scenario: Large personal library
- **WHEN** a complete collection exceeds the server page limit
- **THEN** the API returns a bounded page and sufficient pagination metadata to reach the remaining items

#### Scenario: SEO and GEO neutrality
- **WHEN** the library experience is deployed
- **THEN** public indexable routes, canonical metadata, sitemaps, robots behavior, and public book content remain unchanged
