## ADDED Requirements

### Requirement: Persistent audiobook bookmarks
The system SHALL allow an authenticated user to create multiple private audiobook bookmarks anchored to the associated media and an integer playback second.

#### Scenario: Create at current playback position
- **WHEN** an authenticated listener activates the bookmark control while the player is ready
- **THEN** the system captures the live playback second, persists the bookmark for that user, book and media, and does not pause playback

#### Scenario: Repeat the same location
- **WHEN** the user attempts to create another bookmark for the same book, media and second
- **THEN** the system returns the existing bookmark without deleting it or creating a duplicate

### Requirement: Optional bookmark notes
The system SHALL create the bookmark before presenting an optional private note editor and SHALL preserve the bookmark when the editor is cancelled.

#### Scenario: Save optional note
- **WHEN** the user enters a valid note after creating a bookmark and confirms it
- **THEN** the system updates that owned bookmark and increments its revision

#### Scenario: Cancel optional note
- **WHEN** the user closes the note editor without saving
- **THEN** the already-created bookmark remains persisted without changing playback

#### Scenario: Concurrent edit
- **WHEN** a note update uses a stale bookmark revision
- **THEN** the system rejects it with a conflict and preserves the newer stored value

### Requirement: Audiobook bookmark navigation and management
The player SHALL expose a dedicated notebook button, visually equivalent in purpose to the ebook reader annotations control while retaining the audiobook app aesthetic. The resulting modal panel SHALL list bookmarks for the current book and associated media in playback order and provide explicit navigation, editing and deletion actions.

#### Scenario: Open audiobook notebook
- **WHEN** the user activates the dedicated bookmarks button
- **THEN** a responsive app-styled panel opens with the current audiobook bookmarks and notes without changing playback

#### Scenario: Anonymous notebook actions
- **WHEN** an unauthenticated visitor opens the bookmarks panel
- **THEN** the panel offers “Más tarde” to close it and “Crear cuenta o iniciar sesión” with return to the current audiobook location

#### Scenario: Present bookmark note
- **WHEN** a bookmark contains a non-empty note
- **THEN** the note appears below the time-and-actions row and uses the available card width

#### Scenario: Present bookmark without note
- **WHEN** a bookmark has no non-empty note
- **THEN** the card renders no note placeholder or reserved note row

#### Scenario: Navigate to bookmark
- **WHEN** the user activates a bookmark entry
- **THEN** the player seeks to its stored second, updates the visible playback position and closes the notebook panel

#### Scenario: Delete bookmark explicitly
- **WHEN** the owner confirms the delete action for a bookmark
- **THEN** the system removes that bookmark idempotently without changing other bookmarks or playback progress

#### Scenario: Media changed
- **WHEN** the video associated with the book differs from the media stored on an older bookmark
- **THEN** the current-media list does not navigate using the older bookmark and the stored row is preserved

### Requirement: Accessible compact bookmark control
The player SHALL expose a compact icon-only `bookmark_add` control with an accessible name, visible focus and a usable touch target.

#### Scenario: Player not ready
- **WHEN** the media or restored progress is not ready
- **THEN** the bookmark control is disabled and does not create a zero-position bookmark accidentally

#### Scenario: Keyboard activation
- **WHEN** keyboard focus activates the bookmark control on a ready player
- **THEN** it performs the same creation behavior and announces the saved timestamp

### Requirement: Private authenticated API
Audiobook bookmark reads and writes SHALL use the authenticated API boundary with server-side identity, ownership checks, same-origin CSRF protection for writes, bounded inputs, prepared statements and private non-cacheable responses.

#### Scenario: Anonymous creation attempt
- **WHEN** a visitor activates the bookmark control without an authenticated session
- **THEN** the player presents a contextual sign-in invitation and does not claim durable persistence

#### Scenario: Cross-user mutation attempt
- **WHEN** an authenticated user attempts to update or delete another user's bookmark
- **THEN** the API does not mutate it or reveal its private contents

#### Scenario: Associated media changed before write
- **WHEN** creation supplies a media identifier that no longer matches the book
- **THEN** the API rejects the write with a typed conflict and returns no private annotation data

### Requirement: Share audiobook moments
The player SHALL allow a listener to share either an existing bookmark or the captured current playback second with an optional transient message, without exposing a private bookmark note automatically.

#### Scenario: Share an existing bookmark
- **WHEN** the owner activates share on a listed bookmark and confirms the composer
- **THEN** the system shares that book and stored second through a deep link, includes only the confirmed transient message, and does not modify the bookmark

#### Scenario: Save and share the current moment
- **WHEN** an authenticated listener opens the player share control and confirms “Guardar y compartir”
- **THEN** the system creates or reuses an idempotent bookmark at the captured second before opening the platform share action

#### Scenario: Guest shares without persistence
- **WHEN** an unauthenticated listener confirms sharing the captured current moment
- **THEN** the system shares the deep link without claiming or attempting durable bookmark persistence

#### Scenario: Open shared audiobook moment
- **WHEN** a listener opens a valid `/listen/{uri}?t={seconds}` link
- **THEN** the shared second takes precedence over saved progress for that initial load, the player seeks there without autoplay, and no private bookmark identifier is required

#### Scenario: Native sharing unavailable
- **WHEN** the browser does not provide the Web Share API
- **THEN** the system copies the composed message and deep link to the clipboard and announces the result

#### Scenario: Attach the book cover
- **WHEN** a cover is available and the platform supports sharing image files
- **THEN** the system attaches the cover automatically alongside the confirmed share content without presenting a cover option in the composer

#### Scenario: Cover attachment unsupported
- **WHEN** the cover cannot be fetched or the platform cannot share image files
- **THEN** sharing continues with the message and deep link without failing the whole action

### Requirement: Compact speed label
The player SHALL display the disabled speed control as its speed icon and the compact value `1.0`, while retaining an accessible name that communicates playback speed.

#### Scenario: Render speed control
- **WHEN** the audiobook controls render
- **THEN** the visible words do not include “Velocidad” or the `x` suffix

### Requirement: Responsive audiobook breadcrumb
The audiobook page SHALL hide its Home / My Library / book-title breadcrumb on mobile viewports and preserve it on wider screens.

#### Scenario: Mobile audiobook layout
- **WHEN** the player is rendered below the `sm` breakpoint
- **THEN** the breadcrumb consumes no visible layout space and the book title remains visible as a standalone heading above the player

### Requirement: Professional narration CTA
The audiobook player card SHALL present an elegant gold CTA immediately after its primary controls and before secondary content with the exact text “Escúchalo con narración profesional”. Its legacy destination SHALL be resolved from the configured or current site origin rather than a hardcoded production domain.

#### Scenario: Follow professional narration CTA
- **WHEN** the listener activates the CTA
- **THEN** the browser navigates to `/como_descargar_audiolibros_gratis.php` on the site origin equivalent to legacy `sys_url`

#### Scenario: Mobile CTA visibility
- **WHEN** the CTA is rendered on a narrow mobile viewport with browser bottom chrome
- **THEN** its text remains on one compact line and the page provides enough trailing scroll space to reveal the complete button above that chrome

### Requirement: Compact player spacing
The audiobook player SHALL keep playback metadata and controls vertically compact, with the time labels nearly adjacent to the progress bar and no reserved height for an empty announcement.

#### Scenario: Render compact controls
- **WHEN** the audiobook player is displayed on desktop or mobile
- **THEN** the time labels sit nearly adjacent to the progress bar, control groups use compact gaps, and an empty announcement reserves no vertical space

### Requirement: Responsive next queue
The audiobook player SHALL omit the complete “Up Next in Queue” section on mobile viewports and preserve it from the `sm` breakpoint.

#### Scenario: Mobile player card
- **WHEN** the player card renders below the `sm` breakpoint
- **THEN** neither the “Up Next in Queue” heading nor its associated book row is visible

### Requirement: Safe audiobook back navigation
The audiobook header back control SHALL return through internal app navigation when available and SHALL navigate to the current legacy site root when the audiobook is a direct browser entry.

#### Scenario: Open audiobook from WhatsApp
- **WHEN** a listener opens an audiobook URL as the initial React Router entry and activates the back control
- **THEN** the browser navigates to `/` on the site origin equivalent to legacy `sys_url` instead of relying on absent or external history

#### Scenario: Open audiobook from within the app
- **WHEN** a listener reaches the audiobook through an internal app navigation entry and activates the back control
- **THEN** the browser returns to the preceding app entry
