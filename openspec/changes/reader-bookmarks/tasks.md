## 1. API and contracts

- [x] 1.1 Extend annotation TypeScript and PHP contracts with explicit annotation types and bookmark filter compatibility.
- [x] 1.2 Implement authenticated transactional bookmark toggle and duplicate-tolerant removal in the repository/controller.
- [x] 1.3 Add API regression coverage for type filtering, point-anchor validation, toggle creation and toggle removal.

## 2. Reader interaction

- [x] 2.1 Derive a stable point anchor and context for the visible reading location.
- [x] 2.2 Add the persistent upper-right bookmark target with exclusive gesture behavior, accessible state and loading protection.
- [x] 2.3 Render the active bookmark consistently across paged/scroll modes and reader themes without blocking right-side navigation below it.

## 3. Unified notebook

- [x] 3.1 Add bookmark loading/filtering, context presentation, navigation and deletion to the existing annotations notebook.
- [x] 3.2 Preserve highlight/note creation, editing, filtering and navigation behavior with explicit types.

## 4. Validation and documentation

- [x] 4.1 Add or update frontend pure-logic tests for bookmark location and exclusive hit behavior.
- [x] 4.2 Run applicable frontend tests, PHP tests, build, strict OpenSpec validation and diff checks.
- [x] 4.3 Update implementation documentation and manual mobile/desktop verification checklist, declaring any environment-only checks pending.

## 5. Backward-navigation regression

- [x] 5.1 Recompute the visible bookmark point after paged CSS transitions and cancel stale recalculations during rapid navigation.
- [x] 5.2 Validate backward and forward navigation behavior, build and strict OpenSpec consistency.

## 6. Bookmark alignment

- [x] 6.1 Align the visible bookmark flush with the lower edge of the black brand bar while preserving its touch target.

## 7. Desktop pointer regression

- [x] 7.1 Keep the bookmark target above the desktop toolbar hit surface and reserve its horizontal space so toolbar controls cannot intercept clicks.
- [x] 7.2 Validate desktop pointer activation, frontend tests, build and strict OpenSpec consistency.

## 8. Desktop activation hardening

- [x] 8.1 Execute pointer activation directly on `pointerup`, retain click activation for keyboard, and surface bookmark API errors visibly.
- [x] 8.2 Validate pointer/touch deduplication, keyboard activation, tests, build and strict OpenSpec consistency.

## 9. Stale content recovery

- [x] 9.1 Revalidate reader manifests and fragments instead of accepting stale browser cache entries.
- [x] 9.2 Recover a bookmark 409 by reloading coherent content rather than saving against an unverified version.
- [x] 9.3 Add cache-policy regression coverage and run tests, build and strict OpenSpec validation.

## 10. Notebook navigation controls

- [x] 10.1 Prevent toolbar focus restoration when “Ir al señalador” closes the notebook for content navigation.
- [x] 10.2 Validate normal panel focus restoration, bookmark navigation, tests, build and strict OpenSpec consistency.

## 11. Mobile brand-bar placement

- [x] 11.1 Move the mobile bookmark target into the right side of the black brand bar while preserving desktop placement and safe-area spacing.
- [x] 11.2 Validate the mobile `Tt` control remains unobstructed, tests, build and strict OpenSpec consistency.

## 12. Notebook bookmark redraw

- [x] 12.1 Determine active state by persisted bookmark geometry within the visible page instead of exact equality with the recalculated page start.
- [x] 12.2 Remove the actual visible bookmark location when layout reflow has shifted the calculated page-start point.
- [x] 12.3 Add viewport-membership regression coverage and run tests, build and strict OpenSpec validation.
