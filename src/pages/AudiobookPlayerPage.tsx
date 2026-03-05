import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { type Book, getBookByUri } from "../api/books";
import { ApiError } from "../api/client";
import { AuthorLink, resolveAuthor } from "../components/AuthorLink";
import { BookCover } from "../components/BookCover";
import { AppShell } from "../layout/AppShell";

export function AudiobookPlayerPage() {
  const { libro_uri = "" } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const bookAuthor = book ? resolveAuthor(book) : null;

  useEffect(() => {
    let cancelled = false;

    async function loadBook() {
      setLoading(true);
      setError(null);

      try {
        const nextBook = await getBookByUri(libro_uri);
        if (!cancelled) {
          setBook(nextBook);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : "No se pudo cargar el audiolibro.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadBook();

    return () => {
      cancelled = true;
    };
  }, [libro_uri]);

  return (
    <AppShell mode="immersive">
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-background-light font-sans text-slate-900 dark:bg-background-dark dark:text-slate-100">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 bg-background-light px-6 py-3 dark:border-slate-800 dark:bg-background-dark md:px-10">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-slate-900 dark:text-white">
              <div className="h-6 w-6 text-primary">
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">EcoReads</h2>
            </div>
            <nav className="hidden items-center gap-9 md:flex">
              {["Discover", "My Library", "Challenges", "Community"].map((item) => (
                <a key={item} className={`text-sm font-medium leading-normal transition-colors ${item === "My Library" ? "text-slate-900 dark:text-slate-100" : "text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary"}`} href="#">
                  {item}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end gap-8">
            <label className="hidden h-10 min-w-40 max-w-64 flex-col sm:flex">
              <div className="flex h-full w-full flex-1 items-stretch overflow-hidden rounded-lg bg-white ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                <div className="flex items-center justify-center pl-4 text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </div>
                <input className="form-input flex h-full w-full flex-1 resize-none overflow-hidden rounded-lg rounded-l-none border-none bg-transparent px-4 pl-2 text-base font-normal leading-normal text-slate-900 placeholder:text-slate-400 focus:outline-0 focus:ring-0 dark:text-white" defaultValue="" placeholder="Search" />
              </div>
            </label>
            {book ? (
              <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-slate-100 dark:ring-slate-800">
                <BookCover alt={`Portada de ${book.titulo}`} book={book} className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800" />
            )}
          </div>
        </header>
        <main className="flex flex-grow flex-col items-center justify-center p-4 sm:p-8">
          {loading ? (
            <div className="w-full max-w-[1200px] rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
              Cargando audiolibro...
            </div>
          ) : error || !book ? (
            <div className="w-full max-w-[1200px] rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
              {error ?? "No se encontrÃ³ el audiolibro solicitado."}
            </div>
          ) : (
            <>
              <div className="mb-8 flex w-full max-w-[1200px] flex-wrap gap-2 px-4">
                <Link className="text-sm font-medium leading-normal text-slate-500 transition-colors hover:text-primary" to="/home">
                  Home
                </Link>
                <span className="text-sm font-medium leading-normal text-slate-500">/</span>
                <Link className="text-sm font-medium leading-normal text-slate-500 transition-colors hover:text-primary" to="/library">
                  My Library
                </Link>
                <span className="text-sm font-medium leading-normal text-slate-500">/</span>
                <span className="text-sm font-medium leading-normal text-slate-900 dark:text-white">{book.titulo}</span>
              </div>
              <div className="grid w-full max-w-[1200px] grid-cols-1 gap-10 lg:grid-cols-12">
                <div className="flex flex-col items-center gap-6 lg:col-span-5 lg:items-start">
                  <div className="group relative aspect-[2/3] w-[280px] overflow-hidden rounded-xl shadow-2xl transition-transform hover:scale-[1.02] sm:w-[360px]">
                    <BookCover alt={`Portada de ${book.titulo}`} book={book} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="mt-2 space-y-2 text-center lg:text-left">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{book.titulo}</h1>
                    <div className="space-y-1">
                      <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
                        By{" "}
                        <AuthorLink
                          className="text-current hover:underline underline-offset-2"
                          name={bookAuthor?.name ?? "Autor desconocido"}
                          uri={bookAuthor?.uri ?? null}
                        />
                      </p>
                      <p className="text-sm text-slate-400 dark:text-slate-500">
                        {book.hasAudio ? `Audiolibro disponible en YouTube (${book.youtubeVideoId})` : "Sin audiolibro vinculado"}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full flex-wrap justify-center gap-3 lg:justify-start">
                    {["API", book.readOnline ? "Read Online" : "Catalog", book.idioma ?? "Sin idioma"].map((tag) => (
                      <span key={tag} className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link className="group mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-200 px-6 py-3 font-semibold text-slate-900 transition-all hover:bg-slate-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 sm:w-auto" to={`/read/${book.uri}/${book.currentPage}`}>
                    <span className="material-symbols-outlined text-[20px] transition-transform group-hover:scale-110">menu_book</span>
                    Cambiar a lectura
                  </Link>
                </div>
                <div className="flex flex-col justify-center lg:col-span-7">
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-10">
                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
                    <div className="group relative mb-8 aspect-video w-full overflow-hidden rounded-xl bg-slate-900">
                      <div className="absolute inset-0 opacity-60">
                        <BookCover alt={`Backdrop de ${book.titulo}`} book={book} className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-40" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-600">
                          <span className="material-symbols-outlined ml-1 text-[48px]">play_arrow</span>
                        </button>
                      </div>
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        <div className="rounded bg-black/60 px-2 py-1 font-mono text-xs text-white backdrop-blur-sm">
                          {book.hasAudio ? "audio" : "preview"}
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10 flex flex-col gap-6">
                      <div className="group w-full space-y-2">
                        <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                          <span>0:00</span>
                          <span>{book.hasAudio ? "YouTube ID" : "Sin audio"}</span>
                        </div>
                        <div className="relative h-2 cursor-pointer overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                          <div className="absolute left-0 top-0 h-full w-[35%] rounded-full bg-primary" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:relative sm:justify-center sm:gap-12">
                        <button className="flex items-center gap-1 text-xs font-bold text-slate-500 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary sm:absolute sm:left-0">
                          <span className="material-symbols-outlined text-[20px]">speed</span>1.0x
                        </button>
                        <div className="flex items-center gap-6">
                          {["replay_10", "skip_previous"].map((icon) => (
                            <button key={icon} className="text-slate-400 transition-colors hover:text-slate-900 dark:hover:text-white">
                              <span className="material-symbols-outlined text-[32px]">{icon}</span>
                            </button>
                          ))}
                          <button className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-all hover:scale-105 active:scale-95 dark:bg-white dark:text-slate-900">
                            <span className="material-symbols-outlined fill-1 text-[40px]">pause</span>
                          </button>
                          {["skip_next", "forward_30"].map((icon) => (
                            <button key={icon} className="text-slate-400 transition-colors hover:text-slate-900 dark:hover:text-white">
                              <span className="material-symbols-outlined text-[32px]">{icon}</span>
                            </button>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 sm:absolute sm:right-0">
                          <button className="text-slate-500 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary">
                            <span className="material-symbols-outlined text-[24px]">volume_up</span>
                          </button>
                          <button className="hidden text-slate-500 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary sm:block">
                            <span className="material-symbols-outlined text-[24px]">bookmark_add</span>
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-center">
                        <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-800/50">
                          <span className="material-symbols-outlined text-[18px] text-slate-400">list</span>
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{book.currentChapter}</span>
                          <span className="material-symbols-outlined cursor-pointer text-[18px] text-slate-400 hover:text-primary">expand_more</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
                      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Up Next in Queue</h3>
                      <div className="group flex cursor-pointer items-center gap-4 rounded-lg p-3 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded">
                          <BookCover alt={`Portada de ${book.titulo}`} book={book} className="h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-base font-semibold text-slate-900 transition-colors group-hover:text-primary dark:text-white">{book.titulo}</h4>
                          <AuthorLink
                            className="text-sm text-slate-500 dark:text-slate-400"
                            name={bookAuthor?.name ?? "Autor desconocido"}
                          uri={bookAuthor?.uri ?? null}
                          />
                        </div>
                        <button className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition-all hover:border-primary hover:bg-primary hover:text-white dark:border-slate-600">
                          <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </AppShell>
  );
}


