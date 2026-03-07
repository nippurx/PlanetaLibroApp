import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { type Author, type AuthorBookItem, fetchAuthorByUri } from "../api/authors";
import { ApiError } from "../api/client";
import { EntityBooksPage } from "../components/EntityBooksPage";
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

  const bio = getAuthorBio(author);
  const sanitizedBioHtml = useMemo(() => (bio.html ? sanitizeHtml(bio.html) : null), [bio.html]);

  return (
    <AppShell theme="light" title="Autor" contentClassName="bg-background-light dark:bg-background-dark">
      <div className="mx-auto w-full max-w-6xl p-6 pb-20 md:p-8">
        <EntityBooksPage
          books={books}
          emptyMessage="No hay libros para este autor en esta pagina."
          error={error}
          header={
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111418] md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                  {author?.photo.available && author.photo.url && !imageFailed ? (
                    <img
                      alt={`Foto de ${author.nombre}`}
                      className="h-full w-full object-cover"
                      onError={() => setImageFailed(true)}
                      src={author.photo.url}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-slate-500 dark:text-slate-300">
                      {getInitials(author?.nombre ?? "")}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white md:text-4xl">{author?.nombre}</h1>
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
          }
          loading={loading}
          loadingLabel="Cargando autor..."
          notFound={notFound || !author}
          notFoundDescription="No pudimos encontrar la ficha del autor solicitado."
          notFoundTitle="Autor no encontrado"
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
