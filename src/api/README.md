Shared API layer for PlanetaLibroApp.

- `client.ts` reads `import.meta.env.VITE_API_BASE` and centralizes HTTP errors.
- `books.ts` contains the current book-facing contracts and fetch helpers.
- Additional entities should follow the same pattern (`authors.ts`, `categories.ts`, etc.).
