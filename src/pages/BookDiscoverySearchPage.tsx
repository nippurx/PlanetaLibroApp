import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { type Book, searchBooks } from "../api/books";
import { ApiError } from "../api/client";
import { AuthorLink, resolveAuthor } from "../components/AuthorLink";
import { BookCover } from "../components/BookCover";
import { AppShell } from "../layout/AppShell";

export function BookDiscoverySearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = (searchParams.get("q") ?? "").trim();

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [audioOnly, setAudioOnly] = useState(false);
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const queryFromUrl = (searchParams.get("q") ?? "").trim();
    setQuery(queryFromUrl);
    setDebouncedQuery(queryFromUrl);
  }, [searchParams]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 400);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [query]);

  function commitQueryToUrl(value: string) {
    const normalizedQuery = value.trim();
    const nextParams = new URLSearchParams(searchParams);

    if (normalizedQuery) {
      nextParams.set("q", normalizedQuery);
    } else {
      nextParams.delete("q");
    }

    setSearchParams(nextParams, { replace: true });
  }

  useEffect(() => {
    let cancelled = false;

    async function runSearch() {
      if (!debouncedQuery) {
        setResults([]);
        setError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const items = await searchBooks(debouncedQuery, 20, 0);
        const filtered = audioOnly ? items.filter((book) => book.hasAudio) : items;

        if (!cancelled) {
          setResults(filtered);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : "No se pudieron cargar los libros.");
          setResults([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void runSearch();

    return () => {
      cancelled = true;
    };
  }, [audioOnly, debouncedQuery]);

  return (
    <AppShell theme="light" title="Search" contentClassName="bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-20 flex flex-col gap-4 border-b border-slate-200 bg-background-light/95 px-6 py-4 backdrop-blur-sm dark:border-slate-800 dark:bg-background-dark/95">
        <div className="mx-auto w-full max-w-4xl">
          <label className="flex h-12 w-full flex-col">
            <div className="flex h-full w-full flex-1 items-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition-all focus-within:ring-2 focus-within:ring-primary dark:bg-[#282f39] dark:ring-transparent">
              <div className="flex items-center justify-center pl-4 text-slate-400 dark:text-slate-400">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                className="flex w-full flex-1 border-none bg-transparent px-4 text-base font-normal leading-normal text-slate-900 placeholder:text-slate-400 focus:ring-0 dark:text-white"
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    const normalizedQuery = query.trim();
                    setDebouncedQuery(normalizedQuery);
                    commitQueryToUrl(normalizedQuery);
                  }
                }}
                placeholder="Search by title, author, or ISBN"
                type="text"
                value={query}
              />
            </div>
          </label>
        </div>
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="scrollbar-hide flex w-full gap-2 overflow-x-auto pb-2 md:w-auto md:pb-0">
            {["Genre", "Length", "Mood"].map((label) => (
              <button key={label} className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-slate-200 bg-white px-4 transition-colors hover:border-primary dark:border-slate-700 dark:bg-[#282f39]">
                <span className="text-sm font-medium text-slate-700 dark:text-white">{label}</span>
                <span className="material-symbols-outlined text-lg text-slate-500">expand_more</span>
              </button>
            ))}
          </div>
          <div className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2 dark:border-slate-700 dark:bg-[#282f39] md:w-auto md:justify-start">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl text-primary">volume_up</span>
              <span className="text-sm font-medium text-slate-700 dark:text-white">Solo con audio</span>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                checked={audioOnly}
                className="peer sr-only"
                onChange={(event) => setAudioOnly(event.target.checked)}
                type="checkbox"
              />
              <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full dark:bg-slate-700" />
            </label>
          </div>
        </div>
      </header>
      <div className="mx-auto w-full max-w-[1400px] flex-1 p-6 md:px-10 md:py-8">
        <h2 className="mb-6 px-2 text-xl font-semibold dark:text-white">
          {debouncedQuery ? `Resultados para "${debouncedQuery}"` : "Busca libros por titulo o autor"}
        </h2>
        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-[#111418] dark:text-slate-400">
            Cargando libros...
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        ) : !debouncedQuery ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-[#111418] dark:text-slate-400">
            Escribi una busqueda para ver resultados reales.
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-[#111418] dark:text-slate-400">
            No se encontraron libros para esa busqueda.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {results.map((book) => {
              const author = resolveAuthor(book);

              return (
                <div key={book.id} className="group flex flex-col gap-3">
                  <Link className="block" to={`/book/${book.uri}`}>
                    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                      <BookCover book={book} className="h-full w-full object-cover" />
                      {book.hasAudio && (
                        <div className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white backdrop-blur-md">
                          <span className="material-symbols-outlined text-[18px]">headphones</span>
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <span className="rounded-full bg-primary p-3 text-white shadow-lg">
                          <span className="material-symbols-outlined">visibility</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div>
                    <Link to={`/book/${book.uri}`}>
                      <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-slate-900 transition-colors hover:text-primary dark:text-white">
                        {book.titulo}
                      </h3>
                    </Link>
                    {book.subtitulo ? (
                      <p className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">{book.subtitulo}</p>
                    ) : null}
                    <AuthorLink className="mt-1 block text-xs font-normal text-slate-500 dark:text-slate-400" name={author.name} uri={author.uri} />
                    <div className="mt-1.5 flex items-center gap-1">
                      <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-400/20">
                        {book.readOnline ? "Online" : "Ficha"}
                      </span>
                      {book.hasAudio && (
                        <span className="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/20">
                          Audio
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
