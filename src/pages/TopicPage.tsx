import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { type AuthorBookItem } from "../api/authors";
import { fetchBooksByTag, type BookListResult } from "../api/books";
import { ApiError } from "../api/client";
import { EntityBooksPage } from "../components/EntityBooksPage";
import { AppShell } from "../layout/AppShell";

type SortMode = "most-viewed" | "a-z";

type PaginationState = {
  limit: number;
  offset: number;
};

const DEFAULT_LIMIT = 12;

function decodeTagValue(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function formatTagLabel(tag: string): string {
  return decodeTagValue(tag)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function mapBooksToEntityShape(items: BookListResult["items"]): AuthorBookItem[] {
  return items.map((book) => ({
    id: book.id,
    uri: book.uri,
    titulo: book.titulo,
    subtitulo: book.subtitulo || null,
    cover_url: book.cover_url ?? null,
    author_uri: book.autorUri,
    autor: {
      uri: book.autorUri,
      nombre: book.autorNombre,
    },
  }));
}

export function TopicPage() {
  const { tag = "" } = useParams();
  const [books, setBooks] = useState<AuthorBookItem[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({ limit: DEFAULT_LIMIT, offset: 0 });
  const [sortMode, setSortMode] = useState<SortMode>("most-viewed");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setPagination((current) => (current.offset === 0 ? current : { ...current, offset: 0 }));
    setSortMode("most-viewed");
  }, [tag]);

  useEffect(() => {
    let cancelled = false;

    async function loadTopicPage() {
      setLoading(true);
      setError(null);
      setNotFound(false);

      try {
        const response = await fetchBooksByTag(tag, pagination.limit, pagination.offset);

        if (!cancelled) {
          setBooks(mapBooksToEntityShape(response.items));
          setPagination({
            limit: response.pagination.limit,
            offset: response.pagination.offset,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setBooks([]);

          if (err instanceof ApiError && err.status === 404) {
            setNotFound(true);
            setError(null);
          } else {
            setError(err instanceof ApiError ? err.message : "No se pudo cargar el tema.");
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (!tag) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    void loadTopicPage();

    return () => {
      cancelled = true;
    };
  }, [pagination.limit, pagination.offset, tag]);

  const tagLabel = useMemo(() => formatTagLabel(tag), [tag]);

  return (
    <AppShell theme="light" title="Tema" contentClassName="bg-background-light dark:bg-background-dark">
      <div className="mx-auto w-full max-w-6xl p-6 pb-20 md:p-8">
        <EntityBooksPage
          books={books}
          emptyMessage="No hay libros para este tema en esta pagina."
          error={error}
          header={
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111418] md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-slate-100 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/80 text-slate-500 ring-1 ring-slate-200 dark:bg-slate-900/80 dark:text-slate-300 dark:ring-slate-700">
                    <span className="material-symbols-outlined text-[34px]">sell</span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Tema</p>
                  <h1 className="mt-2 text-3xl font-bold leading-tight text-slate-900 dark:text-white md:text-4xl">{tagLabel || decodeTagValue(tag)}</h1>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    Explora libros relacionados con este tema y descubre titulos conectados por la misma etiqueta editorial.
                  </p>
                </div>
              </div>
            </section>
          }
          loading={loading}
          loadingLabel="Cargando tema..."
          notFound={notFound}
          notFoundDescription="No pudimos encontrar libros asociados al tema solicitado."
          notFoundTitle="Tema no encontrado"
          onNextPage={() =>
            setPagination((current) => ({
              ...current,
              offset: current.offset + current.limit,
            }))
          }
          onPreviousPage={() =>
            setPagination((current) => ({
              ...current,
              offset: Math.max(current.offset - current.limit, 0),
            }))
          }
          onSortModeChange={setSortMode}
          pagination={pagination}
          sortMode={sortMode}
          title="Libros"
        />
      </div>
    </AppShell>
  );
}
