import { type ReactNode, useMemo } from "react";
import { Link } from "react-router-dom";
import { type AuthorBookItem } from "../api/authors";
import { BookCover } from "./BookCover";

type SortMode = "most-viewed" | "a-z";

type PaginationState = {
  limit: number;
  offset: number;
};

type EntityBooksPageProps = {
  title: string;
  loadingLabel: string;
  error: string | null;
  loading: boolean;
  notFound: boolean;
  notFoundTitle: string;
  notFoundDescription: string;
  emptyMessage: string;
  books: AuthorBookItem[];
  pagination: PaginationState;
  sortMode: SortMode;
  onSortModeChange: (value: SortMode) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  header: ReactNode;
};

export function EntityBooksPage({
  title,
  loadingLabel,
  error,
  loading,
  notFound,
  notFoundTitle,
  notFoundDescription,
  emptyMessage,
  books,
  pagination,
  sortMode,
  onSortModeChange,
  onPreviousPage,
  onNextPage,
  header,
}: EntityBooksPageProps) {
  const visibleBooks = useMemo(() => {
    if (sortMode === "most-viewed") {
      return books;
    }

    return [...books].sort((left, right) => left.titulo.localeCompare(right.titulo, "es-ES"));
  }, [books, sortMode]);

  const hasNextPage = books.length === pagination.limit;

  return (
    <>
      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-[#111418] dark:text-slate-400">
          {loadingLabel}
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      ) : notFound ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-[#111418]">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{notFoundTitle}</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{notFoundDescription}</p>
          <Link className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90" to="/search">
            Volver a explorar
          </Link>
        </div>
      ) : (
        <>
          {header}

          <section className="mt-8">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
              <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span>Ordenar</span>
                <select
                  className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 ring-primary/20 focus:outline-none focus:ring-2 dark:border-slate-700 dark:bg-[#282f39] dark:text-white"
                  onChange={(event) => onSortModeChange(event.target.value as SortMode)}
                  value={sortMode}
                >
                  <option value="most-viewed">Mas vistos</option>
                  <option value="a-z">A-Z</option>
                </select>
              </label>
            </div>

            {visibleBooks.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-[#111418] dark:text-slate-400">
                {emptyMessage}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                {visibleBooks.map((book) => (
                  <Link key={`${book.id}-${book.uri}`} className="group flex flex-col gap-3" to={`/book/${book.uri}`}>
                    <div className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                      <BookCover
                        alt={`Portada de ${book.titulo}`}
                        book={{
                          titulo: book.titulo,
                          cover_url: book.cover_url ?? null,
                        }}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                        {book.titulo}
                      </h3>
                      {book.subtitulo ? <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">{book.subtitulo}</p> : null}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-[#282f39] dark:text-white dark:hover:bg-[#323b47]"
                disabled={loading || pagination.offset <= 0}
                onClick={onPreviousPage}
                type="button"
              >
                Anterior
              </button>
              <button
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading || !hasNextPage}
                onClick={onNextPage}
                type="button"
              >
                Siguiente
              </button>
            </div>
          </section>
        </>
      )}
    </>
  );
}
