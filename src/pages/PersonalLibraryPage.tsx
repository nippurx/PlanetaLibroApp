import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { type Book, getHomeBooks } from "../api/books";
import { ApiError } from "../api/client";
import { AuthorLink, resolveAuthor } from "../components/AuthorLink";
import { BookCover } from "../components/BookCover";
import { AppShell } from "../layout/AppShell";

const accentClasses = {
  audio: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  read: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

export function PersonalLibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadBooks() {
      setLoading(true);
      setError(null);

      try {
        const nextBooks = await getHomeBooks(8);
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
  }, []);

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
              {featuredBooks.map((book, index) => {
                const accent = book.hasAudio ? accentClasses.audio : accentClasses.read;
                const progress = Math.min(25 + index * 20, 80);
                const author = resolveAuthor(book);

                return (
                  <div key={book.uri} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-[#1c2027]">
                    <div className="flex gap-4">
                      <Link className="group relative h-36 w-24 shrink-0 cursor-pointer overflow-hidden rounded-lg bg-slate-200 shadow-sm dark:bg-slate-700" to={`/book/${book.uri}`}>
                        <div className="absolute inset-0 z-10 bg-black/0 transition-colors group-hover:bg-black/10" />
                        <BookCover book={book} className="h-full w-full object-cover" />
                      </Link>
                      <div className="flex flex-1 flex-col justify-between py-1">
                        <div>
                          <div className="flex items-start justify-between">
                            <span className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${accent}`}>
                              {book.hasAudio ? "Audiolibro" : "Ebook"}
                            </span>
                            <button className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-white">
                              <span className="material-symbols-outlined text-[20px]">more_vert</span>
                            </button>
                          </div>
                          <Link to={`/book/${book.uri}`}>
                            <h3 className="line-clamp-1 text-lg font-bold leading-tight text-slate-900 hover:text-primary dark:text-white">{book.titulo}</h3>
                          </Link>
                          <AuthorLink className="mt-1 block text-sm text-slate-500 dark:text-slate-400" name={author.name} uri={author.uri} />
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                            <span>{progress}% completado</span>
                            <span>{book.readOnline ? "Lectura lista" : "Ficha guardada"}</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
                          </div>
                          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200 dark:bg-[#282f39] dark:text-white dark:hover:bg-[#323b47]">
                            <span className="material-symbols-outlined text-[18px]">{book.hasAudio ? "play_arrow" : "menu_book"}</span>
                            Continuar
                          </button>
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
                {recentBooks.map((book) => (
                  <Link key={book.uri} className="group cursor-pointer space-y-2" to={`/book/${book.uri}`}>
                    <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-md">
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/20 group-hover:opacity-100">
                        <span className="material-symbols-outlined text-3xl text-white drop-shadow-lg">visibility</span>
                      </div>
                      <BookCover alt={`Portada de ${book.titulo}`} book={book} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{book.titulo}</p>
                  </Link>
                ))}
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
