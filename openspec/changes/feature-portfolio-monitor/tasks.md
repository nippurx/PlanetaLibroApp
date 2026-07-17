## 1. Registry and workflow

- [x] 1.1 Add the versioned JSON registry schema and seed the existing active changes.
- [x] 1.2 Document lifecycle, ownership, OpenSpec promotion, and archive workflow.
- [x] 1.3 Add dependency and reusable validation/storage functions for registry data.

## 2. Local monitor service

- [x] 2.1 Implement the loopback HTTP service and bounded read/update API.
- [x] 2.2 Derive active or archived OpenSpec progress without accepting client paths.
- [x] 2.3 Add automated tests for validation, persistence, and progress projection.

## 3. Monitor interface

- [x] 3.1 Build the responsive accessible monitor shell and feature cards/table.
- [x] 3.2 Add search, filters, sorting, result feedback, and empty/error/loading states.
- [x] 3.3 Add persisted priority and status controls with visible save feedback.

## 4. Integration and verification

- [x] 4.1 Add npm commands for running and testing the monitor.
- [x] 4.2 Run monitor tests, application checks/build, strict OpenSpec validation, and diff checks.
- [x] 4.3 Review documentation, artifacts, and implementation for consistency and record any remaining manual validation.

## 5. Multi-project architecture

- [x] 5.1 Add a validated machine-local project registry and explicit registration command.
- [x] 5.2 Aggregate healthy project backlogs and isolate invalid or unavailable project errors.
- [x] 5.3 Namespace feature API routes and ensure writes remain bounded to registered roots.
- [x] 5.4 Add project identity, filtering, and error visibility to the monitor interface.
- [x] 5.5 Update workflow documentation and commands for one monitor with per-project backlogs.
- [x] 5.6 Add multi-project, collision, isolation, and route tests.
- [x] 5.7 Run application checks, monitor tests, strict OpenSpec validation, smoke tests, and diff review.

## 6. Project identity correction

- [x] 6.1 Correct the default identity to `planeta-libro-app`, safely migrate the known incorrect registration, and verify the production PHP project remains a separate identity.
