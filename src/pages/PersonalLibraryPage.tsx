import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { type Book, getUserLibrary } from "../api/books";
import { ApiError } from "../api/client";
import { AuthorLink, resolveAuthor } from "../components/AuthorLink";
import { BookCover } from "../components/BookCover";
import { AppShell } from "../layout/AppShell";
import { useAuth } from "../auth/AuthContext";
import { getLegacyLoginUrl } from "../api/session";
import { getBookDetailUrl, getLibraryActions, type LibraryAction } from "../features/library/navigation";
import { loadAudiobookProgress } from "../features/listen/storage";

const accentClasses = {
  audio: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  read: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

function LibraryActionLink({ action, className, children }: {
  action: LibraryAction;
  className: string;
  children: ReactNode;
}) {
  return <Link aria-label={action.ariaLabel} className={className} to={action.href}>{children}</Link>;
}

export function PersonalLibraryPage() {
  const { session } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.authenticated) {
      window.location.replace(getLegacyLoginUrl("/app/library"));
      return;
    }

    let cancelled = false;

    async function loadBooks() {
      setLoading(true);
      setError(null);

      try {
        const nextBooks = await getUserLibrary();
        if (!cancelled) {
          setBooks(nextBooks);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : "No se pudo cargar tu biblioteca.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadBooks();

    return () => {
      cancelled = true;
    };
  }, [session?.authenticated]);

  const featuredBooks = books.slice(0, 3);
  const recentBooks = books.slice(3, 7);

  return (
    <AppShell theme="light" title="Mi Biblioteca">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 p-4 md:p-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">Mi Biblioteca</h1>
            <p className="mt-1 text-base text-slate-500 dark:text-slate-400">Gestiona tus lecturas y audiolibros actuales.</p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-primary/25 transition-colors hover:bg-blue-600">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Nuevo libro
          </button>
        </div>
        <div className="border-b border-slate-200 dark:border-[#3b4554]">
          <div className="no-scrollbar flex gap-6 overflow-x-auto md:gap-8">
            <button className="border-b-2 border-primary px-1 pb-3 whitespace-nowrap text-sm font-medium text-primary">
              Leyendo <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs">{featuredBooks.length}</span>
            </button>
            {["Por leer", "Finalizado", "DNF"].map((label) => (
              <button key={label} className="border-b-2 border-transparent px-1 pb-3 whitespace-nowrap text-sm font-medium text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400">
                {label}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-[#111418] dark:text-slate-400">
            Cargando biblioteca...
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredBooks.map((book) => {
                const audioProgress = loadAudiobookProgress(book.uri);
                const actions = getLibraryActions(book, audioProgress);
                const accent = actions.read && actions.listen ? accentClasses.audio : actions.listen ? accentClasses.audio : accentClasses.read;
                const progress = book.progressPercent;
                const author = resolveAuthor(book);
                const detailUrl = getBookDetailUrl(book);

                return (
                  <div key={book.uri} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-[#1c2027]">
                    <div className="flex gap-4">
                      {actions.cover ? (
                        <LibraryActionLink action={actions.cover} className="group relative h-36 w-24 shrink-0 cursor-pointer overflow-hidden rounded-lg bg-slate-200 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:bg-slate-700">
                          <div className="absolute inset-0 z-10 bg-black/0 transition-colors group-hover:bg-black/10" />
                          <BookCover book={book} className="h-full w-full object-cover" />
                        </LibraryActionLink>
                      ) : (
                        <div className="relative h-36 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-200 shadow-sm dark:bg-slate-700">
                          <BookCover book={book} className="h-full w-full object-cover" />
                        </div>
                      )}
                      <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                        <div>
                          <div className="flex items-start justify-between">
                            <span className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${accent}`}>
                              {actions.read && actions.listen ? "Lectura y audio" : actions.listen ? "Audiolibro" : "Ebook"}
                            </span>
                            <details className="group/menu relative">
                              <summary aria-label={`Más acciones para ${book.titulo}`} className="flex cursor-pointer list-none rounded-md text-slate-400 transition-colors hover:text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary dark:hover:text-white">
                                <span aria-hidden="true" className="material-symbols-outlined text-[20px]">more_vert</span>
                              </summary>
                              <div className="absolute right-0 z-20 mt-1 w-48 rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-[#1c2027]">
                                <Link className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none dark:text-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700" to={detailUrl}>
                                  <span aria-hidden="true" className="material-symbols-outlined text-[18px]">info</span>
                                  Información del libro
                                </Link>
                              </div>
                            </details>
                          </div>
                          <Link to={detailUrl}>
                            <h3 className="line-clamp-1 text-lg font-bold leading-tight text-slate-900 hover:text-primary dark:text-white">{book.titulo}</h3>
                          </Link>
                          <AuthorLink className="mt-1 block text-sm text-slate-500 dark:text-slate-400" name={author.name} uri={author.uri} />
                        </div>
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <span>{actions.read ? `Página ${book.currentPage}` : "Sin lectura"}</span>
                            {actions.listen ? <span>{audioProgress > 0 ? `Audio: ${Math.floor(audioProgress / 60)} min` : "Audio disponible"}</span> : null}
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
                          </div>
                          {actions.read || actions.listen ? (
                            <div className="flex w-full flex-col gap-2 sm:flex-row">
                              {[actions.read, actions.listen].filter((action): action is LibraryAction => action !== null).map((action) => (
                                <LibraryActionLink key={action.kind} action={action} className="flex min-h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg bg-slate-100 px-2 py-2 text-center text-xs font-medium text-slate-900 transition-colors hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:bg-[#282f39] dark:text-white dark:hover:bg-[#323b47] sm:text-sm">
                                  <span aria-hidden="true" className="material-symbols-outlined shrink-0 text-[18px]">{action.icon}</span>
                                  <span>{action.label}</span>
                                </LibraryActionLink>
                              ))}
                            </div>
                          ) : (
                            <p className="py-2 text-center text-xs text-slate-500 dark:text-slate-400">No disponible actualmente</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8">
              <div className="flex flex-col items-center gap-6 rounded-2xl border border-primary/10 bg-primary/5 p-6 text-center dark:border-slate-700/50 dark:bg-slate-800/50 md:flex-row md:text-left">
                <div className="rounded-full bg-white p-3 shadow-sm dark:bg-slate-700">
                  <span className="material-symbols-outlined text-3xl text-primary">sentiment_satisfied</span>
                </div>
                <div className="flex-1">
                  <h4 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">Tu zona DNF (Did Not Finish)</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">EstÃ¡ bien dejar un libro si no conecta contigo. La vida es demasiado corta para leer sin intenciÃ³n.</p>
                </div>
                <button className="shrink-0 text-sm font-medium text-primary hover:underline">Ver mis libros abandonados</button>
              </div>
            </div>
            <div className="mt-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">AÃ±adidos recientemente</h2>
                <a className="text-sm font-medium text-primary hover:underline" href="#">
                  Ver todo
                </a>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
                {recentBooks.map((book) => {
                  const coverAction = getLibraryActions(book, loadAudiobookProgress(book.uri)).cover;
                  return coverAction ? (
                  <LibraryActionLink key={book.uri} action={coverAction} className="group cursor-pointer space-y-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-md">
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/20 group-hover:opacity-100">
                        <span className="material-symbols-outlined text-3xl text-white drop-shadow-lg">visibility</span>
                      </div>
                      <BookCover alt={`Portada de ${book.titulo}`} book={book} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{book.titulo}</p>
                  </LibraryActionLink>
                  ) : (
                    <div key={book.uri} className="space-y-2">
                      <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-md"><BookCover alt={`Portada de ${book.titulo}`} book={book} className="h-full w-full object-cover" /></div>
                      <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{book.titulo}</p>
                    </div>
                  );
                })}
                <div className="flex aspect-[2/3] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 text-slate-400 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-800/30">
                  <span className="material-symbols-outlined mb-1 text-3xl">add</span>
                  <span className="text-xs font-medium">AÃ±adir</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
