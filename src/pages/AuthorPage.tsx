import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { type Author, type AuthorBookItem, fetchAuthorByUri } from "../api/authors";
import { ApiError } from "../api/client";
import { BookCover } from "../components/BookCover";
import { AppShell } from "../layout/AppShell";

type SortMode = "most-viewed" | "a-z";

type PaginationState = {
  limit: number;
  offset: number;
};

const DEFAULT_LIMIT = 12;

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function sanitizeHtml(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  doc.querySelectorAll("script,style,iframe,object,embed").forEach((node) => node.remove());

  doc.querySelectorAll("*").forEach((element) => {
    [...element.attributes].forEach((attribute) => {
      const attrName = attribute.name.toLowerCase();
      const attrValue = attribute.value.trim().toLowerCase();

      if (attrName.startsWith("on")) {
        element.removeAttribute(attribute.name);
        return;
      }

      if ((attrName === "href" || attrName === "src") && attrValue.startsWith("javascript:")) {
        element.removeAttribute(attribute.name);
      }
    });
  });

  return doc.body.innerHTML;
}

function getAuthorBio(author: Author | null): { html: string | null; text: string | null } {
  if (!author) {
    return { html: null, text: null };
  }

  return {
    html: author.bio_html ?? author.htm ?? null,
    text: author.bio ?? null,
  };
}

export function AuthorPage() {
  const { uri = "" } = useParams();
  const [author, setAuthor] = useState<Author | null>(null);
  const [books, setBooks] = useState<AuthorBookItem[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({ limit: DEFAULT_LIMIT, offset: 0 });
  const [sortMode, setSortMode] = useState<SortMode>("most-viewed");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setPagination((current) => (current.offset === 0 ? current : { ...current, offset: 0 }));
    setSortMode("most-viewed");
  }, [uri]);

  useEffect(() => {
    setImageFailed(false);
  }, [author?.photo.url]);

  useEffect(() => {
    let cancelled = false;

    async function loadAuthorPage() {
      setLoading(true);
      setError(null);
      setNotFound(false);

      try {
        const response = await fetchAuthorByUri(uri, {
          limit: pagination.limit,
          offset: pagination.offset,
        });

        if (!cancelled) {
          setAuthor(response.author ?? null);
          setBooks(response.books ?? []);
          if (response.pagination) {
            setPagination({
              limit: response.pagination.limit,
              offset: response.pagination.offset,
            });
          }
        }
      } catch (err) {
        if (!cancelled) {
          setAuthor(null);
          setBooks([]);

          if (err instanceof ApiError && err.status === 404) {
            setNotFound(true);
            setError(null);
          } else {
            setError(err instanceof ApiError ? err.message : "No se pudo cargar el autor.");
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (!uri) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    void loadAuthorPage();

    return () => {
      cancelled = true;
    };
  }, [pagination.limit, pagination.offset, uri]);

  const visibleBooks = useMemo(() => {
    if (sortMode === "most-viewed") {
      return books;
    }

    return [...books].sort((left, right) => left.titulo.localeCompare(right.titulo, "es-ES"));
  }, [books, sortMode]);

  const bio = getAuthorBio(author);
  const sanitizedBioHtml = useMemo(() => (bio.html ? sanitizeHtml(bio.html) : null), [bio.html]);
  const hasNextPage = books.length === pagination.limit;

  return (
    <AppShell theme="light" title="Autor" contentClassName="bg-background-light dark:bg-background-dark">
      <div className="mx-auto w-full max-w-6xl p-6 pb-20 md:p-8">
        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-[#111418] dark:text-slate-400">
            Cargando autor...
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        ) : notFound || !author ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-[#111418]">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Autor no encontrado</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">No pudimos encontrar la ficha del autor solicitado.</p>
            <Link className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90" to="/search">
              Volver a explorar
            </Link>
          </div>
        ) : (
          <>
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111418] md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                  {author.photo.available && author.photo.url && !imageFailed ? (
                    <img
                      alt={`Foto de ${author.nombre}`}
                      className="h-full w-full object-cover"
                      onError={() => setImageFailed(true)}
                      src={author.photo.url}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-slate-500 dark:text-slate-300">
                      {getInitials(author.nombre)}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white md:text-4xl">{author.nombre}</h1>
                  {sanitizedBioHtml ? (
                    <div
                      className="prose prose-slate mt-4 max-w-none text-sm dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: sanitizedBioHtml }}
                    />
                  ) : bio.text ? (
                    <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-slate-400">{bio.text}</p>
                  ) : (
                    <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Este autor no tiene biografia disponible.</p>
                  )}
                </div>
              </div>
            </section>

            <section className="mt-8">
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Libros</h2>
                <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span>Ordenar</span>
                  <select
                    className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 ring-primary/20 focus:outline-none focus:ring-2 dark:border-slate-700 dark:bg-[#282f39] dark:text-white"
                    onChange={(event) => setSortMode(event.target.value as SortMode)}
                    value={sortMode}
                  >
                    <option value="most-viewed">Mas vistos</option>
                    <option value="a-z">A-Z</option>
                  </select>
                </label>
              </div>

              {visibleBooks.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-[#111418] dark:text-slate-400">
                  No hay libros para este autor en esta pagina.
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
                  onClick={() =>
                    setPagination((current) => ({
                      ...current,
                      offset: Math.max(current.offset - current.limit, 0),
                    }))
                  }
                  type="button"
                >
                  Anterior
                </button>
                <button
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={loading || !hasNextPage}
                  onClick={() =>
                    setPagination((current) => ({
                      ...current,
                      offset: current.offset + current.limit,
                    }))
                  }
                  type="button"
                >
                  Siguiente
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </AppShell>
  );
}
