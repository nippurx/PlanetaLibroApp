import { Link } from "react-router-dom";
import { AppShell } from "../layout/AppShell";
import { libraryBooks, recentMiniBooks } from "../mock/book";

const accentClasses: Record<string, string> = {
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

export function PersonalLibraryPage() {
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
              Leyendo <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs">3</span>
            </button>
            {["Por leer", "Finalizado", "DNF"].map((label) => (
              <button key={label} className="border-b-2 border-transparent px-1 pb-3 whitespace-nowrap text-sm font-medium text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400">
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {libraryBooks.map((book) => (
            <Link key={book.titulo} className="flex gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-[#1c2027]" to="/book/el-nombre-del-viento">
              <div className="group relative h-36 w-24 shrink-0 cursor-pointer overflow-hidden rounded-lg bg-slate-200 shadow-sm dark:bg-slate-700">
                <div className="absolute inset-0 z-10 bg-black/0 transition-colors group-hover:bg-black/10" />
                <img alt={book.titulo} className="h-full w-full object-cover" src={book.cover} />
              </div>
              <div className="flex flex-1 flex-col justify-between py-1">
                <div>
                  <div className="flex items-start justify-between">
                    <span className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${accentClasses[book.accent]}`}>{book.formato}</span>
                    <button className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-white">
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </div>
                  <h3 className="line-clamp-1 text-lg font-bold leading-tight text-slate-900 dark:text-white">{book.titulo}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{book.autor}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>{book.progreso} completado</span>
                    <span>8h restantes</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                    <div className="h-full rounded-full bg-primary" style={{ width: book.progreso }} />
                  </div>
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200 dark:bg-[#282f39] dark:text-white dark:hover:bg-[#323b47]">
                    <span className="material-symbols-outlined text-[18px]">{book.formato === "Audiolibro" ? "play_arrow" : "menu_book"}</span>
                    Continuar
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-primary/10 bg-primary/5 p-6 text-center dark:border-slate-700/50 dark:bg-slate-800/50 md:flex-row md:text-left">
            <div className="rounded-full bg-white p-3 shadow-sm dark:bg-slate-700">
              <span className="material-symbols-outlined text-3xl text-primary">sentiment_satisfied</span>
            </div>
            <div className="flex-1">
              <h4 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">Tu zona DNF (Did Not Finish)</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Está bien dejar un libro si no conecta contigo. La vida es demasiado corta para leer libros que no disfrutas.</p>
            </div>
            <button className="shrink-0 text-sm font-medium text-primary hover:underline">Ver mis libros abandonados</button>
          </div>
        </div>
        <div className="mt-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Añadidos recientemente</h2>
            <a className="text-sm font-medium text-primary hover:underline" href="#">Ver todo</a>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
            {recentMiniBooks.map((cover, index) => (
              <div key={cover} className="group cursor-pointer space-y-2">
                <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-md">
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/20 group-hover:opacity-100">
                    <span className="material-symbols-outlined text-3xl text-white drop-shadow-lg">visibility</span>
                  </div>
                  <img alt={`Mini portada ${index + 1}`} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" src={cover} />
                </div>
                <p className="truncate text-sm font-medium text-slate-900 dark:text-white">Libro recomendado {index + 1}</p>
              </div>
            ))}
            <div className="flex aspect-[2/3] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 text-slate-400 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-800/30">
              <span className="material-symbols-outlined mb-1 text-3xl">add</span>
              <span className="text-xs font-medium">Añadir</span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
