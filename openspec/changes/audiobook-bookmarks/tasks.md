## 1. API contract and persistence

- [x] 1.1 Add typed audiobook bookmark repository operations for current-media listing, idempotent creation, owned update and owned deletion.
- [x] 1.2 Add authenticated controller validation, CSRF/origin protection, rate limits, media-change conflicts and private responses.
- [x] 1.3 Register audiobook bookmark routes and repository wiring without changing existing progress contracts.
- [x] 1.4 Add a PHP contract test covering routes, ownership, idempotency, media validation and optimistic revisions.

## 2. Frontend integration

- [x] 2.1 Add the typed audiobook bookmark API client and bounded data contracts.
- [x] 2.2 Add the accessible `bookmark_add` action that captures the live normalized second, creates immediately and leaves playback running.
- [x] 2.3 Add optional note editing with conflict recovery and cancellation that preserves the created bookmark.
- [x] 2.4 Add the current-media bookmark list with seek, edit, explicit delete and authenticated/empty/error states.

## 3. Validation and documentation

- [x] 3.1 Run TypeScript checks, frontend tests, PHP contracts, production build and `git diff --check`.
- [x] 3.2 Validate the OpenSpec change strictly and align API documentation and task status with the implemented behavior.

## 4. Deployment regression

- [x] 4.1 Correct the API synchronization target to the active `src/api/v1` document-root path.
- [x] 4.2 Synchronize the new controller, repository and routes, then verify the active router contains the audiobook bookmark endpoints.

## 5. Audiobook notebook panel

- [x] 5.1 Replace the always-visible bookmark list with a dedicated reader-equivalent `bookmarks` button and responsive app-styled modal panel.
- [x] 5.2 Preserve empty, loading, error, edit and delete states inside the panel and close it after seeking to a bookmark.
- [x] 5.3 Build, deploy and validate the updated frontend and strict OpenSpec change.

## 6. Share audiobook moments

- [x] 6.1 Add validated `?t=` deep-link parsing and make a shared second override saved progress on initial player restoration.
- [x] 6.2 Add an accessible share composer for the current moment with authenticated “Guardar y compartir”, guest sharing and Web Share/clipboard fallback.
- [x] 6.3 Add a share action to every existing bookmark without automatically exposing its private note.
- [x] 6.4 Add automated deep-link coverage, build and deploy the frontend, and validate the complete change strictly.

## 7. Cover attachment and compact speed

- [x] 7.1 Reduce the visible speed control to its icon and `1.0` while preserving its accessible label.
- [x] 7.2 Add an optional cover attachment to the share composer with capability detection and graceful fallback.
- [x] 7.3 Build, deploy and strictly validate the updated frontend and OpenSpec change.

## 8. Bookmark note readability

- [x] 8.1 Move non-empty notes below the time-and-actions row and omit note UI entirely when empty.
- [x] 8.2 Build, deploy and strictly validate the presentation correction.

## 9. Automatic cover sharing

- [x] 9.1 Remove the cover option from the composer and always attempt to attach an available cover.
- [x] 9.2 Build, deploy and strictly validate the updated sharing flow.

## 10. Anonymous notebook actions

- [x] 10.1 Add the same dismiss and authentication actions used by bookmark saving to the anonymous notebook state.
- [x] 10.2 Build, deploy and strictly validate the updated panel.

## 11. Mobile breadcrumb

- [x] 11.1 Hide the audiobook breadcrumb on mobile while preserving it from the `sm` breakpoint.
- [x] 11.2 Build, deploy and strictly validate the responsive correction.

## 12. Mobile book title

- [x] 12.1 Restore the standalone book title above the mobile player without restoring or duplicating the breadcrumb.
- [x] 12.2 Build, deploy and strictly validate the mobile title correction.

## 13. Professional narration CTA

- [x] 13.1 Add a centralized legacy site URL resolver without a fixed production domain.
- [x] 13.2 Add the elegant gold professional narration CTA at the bottom of the audiobook page.
- [x] 13.3 Build, deploy and strictly validate the CTA change.

## 14. CTA visibility and compact player

- [x] 14.1 Move the professional narration CTA inside the player card immediately after the controls.
- [x] 14.2 Reduce vertical gaps around the player, time labels, progress bar, actions and empty announcements.
- [x] 14.3 Build, deploy and strictly validate the visibility correction.

## 15. Mobile CTA clipping

- [x] 15.1 Keep the CTA text on one compact mobile line and hide its decorative icon below `sm`.
- [x] 15.2 Add mobile trailing scroll space so browser bottom chrome cannot permanently cover the CTA.
- [x] 15.3 Build, deploy and strictly validate the clipping correction.

## 16. Mobile next queue

- [x] 16.1 Hide the complete “Up Next in Queue” section below `sm` while preserving it on wider screens.
- [x] 16.2 Build, deploy and strictly validate the responsive queue correction.

## 17. Direct-entry back fallback

- [x] 17.1 Distinguish direct React Router entries from internal navigation for the audiobook back control.
- [x] 17.2 Send direct-entry back actions to the legacy site root without a hardcoded domain.
- [x] 17.3 Build, deploy and strictly validate the navigation correction.
