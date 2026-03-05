import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { type Book, getHomeBooks } from "../api/books";
import { ApiError } from "../api/client";
import { AuthorLink, resolveAuthor } from "../components/AuthorLink";
import { BookCover } from "../components/BookCover";
import { AppShell } from "../layout/AppShell";

export function UserDashboardPage() {
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
          setError(err instanceof ApiError ? err.message : "No se pudieron cargar los libros destacados.");
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

  const currentBook = books[0] ?? null;
  const recommendationBooks = books.slice(1, 6);
  const currentBookAuthor = currentBook ? resolveAuthor(currentBook) : null;

  return (
    <AppShell
      theme="dark"
      title="Buenos dÃ­as, Sofia"
      contentClassName="bg-background-dark"
      headerRight={
        <button className="relative text-slate-400 transition-colors hover:text-white">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
        </button>
      }
    >
      <div className="mx-auto max-w-7xl space-y-8 p-6 pb-20">
        {loading ? (
          <div className="rounded-xl border border-slate-800 bg-[#12172b] p-6 text-sm text-slate-400">
            Cargando dashboard...
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-900/50 bg-red-950/30 p-6 text-sm text-red-300">
            {error}
          </div>
        ) : currentBook ? (
          <>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <section className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-gradient-to-br from-[#131b30] to-[#090d19] p-6 lg:col-span-2">
                <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative z-10 flex flex-col gap-6 sm:flex-row">
                  <div className="w-32 shrink-0 sm:w-40">
                    <BookCover alt={`Portada de ${currentBook.titulo}`} book={currentBook} className="aspect-[2/3] w-full rounded-xl object-cover shadow-2xl shadow-black/50" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded bg-primary/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">En progreso</span>
                        <span className="text-xs text-slate-500">Â· Fuente API real</span>
                      </div>
                      <h1 className="mb-1 font-display text-4xl font-bold text-white">{currentBook.titulo}</h1>
                      <AuthorLink
                        className="text-lg text-slate-400"
                        name={currentBookAuthor?.name ?? "Autor desconocido"}
                        uri={currentBookAuthor?.uri ?? null}
                      />
                    </div>
                    <div className="mt-6 space-y-4">
                      <div>
                        <div className="mb-2 flex justify-between text-sm">
                          <span className="font-medium text-white">{currentBook.currentChapter}</span>
                          <span className="font-bold text-primary">{currentBook.progressPercent}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full border border-slate-800 bg-[#0d1220]">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${currentBook.progressPercent}%` }} />
                        </div>
                        <p className="mt-2 text-xs text-slate-500">{currentBook.readOnline ? "Disponible para lectura online" : "Ficha disponible"}</p>
                      </div>
                      <div className="flex gap-3">
                        <Link className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-background-dark transition-colors hover:bg-slate-100" to={`/listen/${currentBook.uri}`}>
                          <span className="material-symbols-outlined text-[20px]">play_circle</span>
                          Escuchar
                        </Link>
                        <Link className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-[#161d31] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:border-primary hover:bg-primary/10" to={`/read/${currentBook.uri}/${currentBook.currentPage}`}>
                          <span className="material-symbols-outlined text-[20px]">menu_book</span>
                          Leer
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-[#12172b] p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-white">Meta Diaria</h3>
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <span className="material-symbols-outlined">flag</span>
                  </div>
                </div>
                <div className="flex flex-col items-center py-6">
                  <div className="relative h-32 w-32">
                    <svg className="h-full w-full -rotate-90">
                      <circle className="text-[#090d19]" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8" />
                      <circle className="text-primary" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="365" strokeDashoffset="100" strokeWidth="8" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-white">22</span>
                      <span className="text-xs text-slate-400">min</span>
                    </div>
                  </div>
                  <p className="mt-4 font-medium text-white">Casi listo</p>
                  <p className="text-sm text-slate-400">Te faltan 8 minutos hoy</p>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {["L", "M", "X", "J", "V", "S", "D"].map((day, index) => (
                    <div key={day} className={`flex h-8 items-center justify-center rounded text-[10px] font-bold ${index < 4 ? "bg-primary text-white" : "border border-slate-800 bg-[#090d19] text-slate-500"}`}>
                      {day}
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white">Para vos hoy</h2>
                <div className="flex gap-2">
                  {["arrow_back", "arrow_forward"].map((icon) => (
                    <button key={icon} className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-800 text-white transition-colors hover:bg-[#161d31]">
                      <span className="material-symbols-outlined text-sm">{icon}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
                {recommendationBooks.map((book) => {
                  const author = resolveAuthor(book);

                  return (
                    <div key={book.uri} className="group">
                      <Link className="block cursor-pointer" to={`/book/${book.uri}`}>
                        <div className="relative mb-3 aspect-[2/3] overflow-hidden rounded-xl">
                          <BookCover alt={`Portada de ${book.titulo}`} book={book} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-black/60 px-1.5 py-0.5 backdrop-blur-sm">
                            <span className="material-symbols-outlined fill-1 text-[14px] text-yellow-400">star</span>
                            <span className="text-xs font-bold text-white">{book.hasAudio ? "Audio" : "Book"}</span>
                          </div>
                        </div>
                        <h4 className="truncate font-semibold text-white transition-colors group-hover:text-primary">{book.titulo}</h4>
                      </Link>
                      <AuthorLink className="mt-0.5 block truncate text-sm text-slate-400" name={author.name} uri={author.uri} />
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-[#12172b] p-6 text-sm text-slate-400">
            No hay libros disponibles en este momento.
          </div>
        )}
      </div>
    </AppShell>
  );
}


