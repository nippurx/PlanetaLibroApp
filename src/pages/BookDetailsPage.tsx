import { Link } from "react-router-dom";
import { AppShell } from "../layout/AppShell";
import { mockBook } from "../mock/book";

export function BookDetailsPage() {
  return (
    <AppShell
      theme="light"
      title="Detalles del Libro"
      contentClassName="bg-background-light dark:bg-background-dark"
      headerRight={
        <button className="relative text-slate-500 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-white">
          <span className="material-symbols-outlined text-[24px]">notifications</span>
          <span className="absolute right-0 top-1 h-2 w-2 rounded-full border-2 border-white bg-primary dark:border-[#111418]" />
        </button>
      }
    >
      <div className="mx-auto max-w-5xl px-6 py-8 pb-20">
        <div className="mb-8 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Link className="hover:text-primary" to="/library">Biblioteca</Link>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span>Fantasía</span>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span className="font-medium text-slate-900 dark:text-white">{mockBook.titulo}</span>
        </div>
        <div className="flex flex-col gap-8 md:flex-row lg:gap-12">
          <div className="flex w-full flex-shrink-0 flex-col gap-6 md:w-[300px]">
            <div className="group relative aspect-[2/3] overflow-hidden rounded-xl shadow-2xl shadow-primary/10">
              <img alt={mockBook.portada_alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={mockBook.portada} />
            </div>
            <div className="flex flex-col gap-3">
              <Link className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-6 py-3.5 font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90" to={`/listen/${mockBook.libro_uri}`}>
                <span className="material-symbols-outlined">headphones</span>
                <span>Escuchar Audiolibro</span>
              </Link>
              <Link className="flex w-full items-center justify-center gap-3 rounded-xl bg-slate-200 px-6 py-3.5 font-bold text-slate-900 transition-colors hover:bg-slate-300 dark:bg-[#282f39] dark:text-white dark:hover:bg-[#323b47]" to={`/read/${mockBook.libro_uri}/${mockBook.current_page}`}>
                <span className="material-symbols-outlined">menu_book</span>
                <span>Leer Libro</span>
              </Link>
            </div>
            <div className="flex items-center justify-between gap-2">
              {[
                ["bookmark_add", "Guardar"],
                ["favorite", "Me gusta"],
                ["share", "Compartir"],
              ].map(([icon, label]) => (
                <button key={label} className="flex flex-1 flex-col items-center justify-center gap-1 rounded-lg py-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-primary dark:text-slate-400 dark:hover:bg-[#282f39]">
                  <span className="material-symbols-outlined">{icon}</span>
                  <span className="text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-6">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Fantasía épica</span>
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400">Eco-friendly</span>
              </div>
              <h1 className="mb-2 font-display text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-5xl">{mockBook.titulo}</h1>
              <a className="font-display text-xl font-medium text-primary transition-colors hover:text-primary/80" href="#">{mockBook.autor}</a>
            </div>
            <div className="mb-8 flex items-center gap-6 border-b border-slate-200 pb-8 dark:border-slate-800/50">
              <div className="flex items-center gap-1 text-yellow-500">
                <span className="material-symbols-outlined fill-1 text-[20px]">star</span>
                <span className="ml-1 text-lg font-bold text-slate-900 dark:text-white">4.8</span>
                <span className="text-sm font-normal text-slate-500 dark:text-slate-400">(12.5k reseñas)</span>
              </div>
              <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <span className="material-symbols-outlined text-[20px]">schedule</span>
                <span className="text-sm font-medium">28h 45m</span>
              </div>
              <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <span className="material-symbols-outlined text-[20px]">auto_stories</span>
                <span className="text-sm font-medium">{mockBook.pages_total} págs</span>
              </div>
            </div>
            <div className="mb-8 max-w-none text-slate-600 dark:text-slate-400">
              <h3 className="mb-3 font-display text-lg font-bold text-slate-900 dark:text-white">Sinopsis</h3>
              <p className="leading-relaxed">{mockBook.sinopsis}</p>
              <p className="mt-4 leading-relaxed">Ahora va a revelar la verdad sobre sí mismo. Y para ello debe empezar por el principio: su infancia en una troupe de artistas itinerantes, los años malviviendo como un ladronzuelo en las calles de una gran ciudad y su llegada a una universidad.</p>
            </div>
            <div className="mb-8 rounded-xl bg-slate-100 p-6 dark:bg-surface-dark">
              <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h4 className="mb-1 text-sm font-bold text-slate-900 dark:text-white">Tu progreso</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Última lectura: hace 2 días</p>
                </div>
                <div className="relative">
                  <select className="cursor-pointer appearance-none rounded-lg bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-900 ring-1 ring-slate-200 focus:outline-none focus:ring-primary dark:bg-[#282f39] dark:text-white dark:ring-slate-700" defaultValue="Leyendo">
                    <option>Leyendo</option>
                    <option>Por leer</option>
                    <option>Terminado</option>
                    <option>Abandonado</option>
                  </select>
                  <span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[20px] text-slate-500">expand_more</span>
                </div>
              </div>
              <div className="mb-2 h-2.5 w-full rounded-full bg-slate-200 dark:bg-[#282f39]">
                <div className="h-2.5 rounded-full bg-primary" style={{ width: `${mockBook.progress_percent}%` }} />
              </div>
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Página {mockBook.current_page} de {mockBook.pages_total}</span>
                <span>{mockBook.progress_percent}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
