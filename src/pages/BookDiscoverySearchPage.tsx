import { Link } from "react-router-dom";
import { AppShell } from "../layout/AppShell";
import { recommendationBooks } from "../mock/book";

export function BookDiscoverySearchPage() {
  return (
    <AppShell theme="light" title="Search" contentClassName="bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-20 flex flex-col gap-4 border-b border-slate-200 bg-background-light/95 px-6 py-4 backdrop-blur-sm dark:border-slate-800 dark:bg-background-dark/95">
        <div className="mx-auto w-full max-w-4xl">
          <label className="flex h-12 w-full flex-col">
            <div className="flex h-full w-full flex-1 items-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition-all focus-within:ring-2 focus-within:ring-primary dark:bg-[#282f39] dark:ring-transparent">
              <div className="flex items-center justify-center pl-4 text-slate-400 dark:text-slate-400">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input className="flex w-full flex-1 border-none bg-transparent px-4 text-base font-normal leading-normal text-slate-900 placeholder:text-slate-400 focus:ring-0 dark:text-white" defaultValue="" placeholder="Search by title, author, or ISBN" type="text" />
            </div>
          </label>
        </div>
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="scrollbar-hide flex w-full gap-2 overflow-x-auto pb-2 md:w-auto md:pb-0">
            {["Genre", "Length", "Mood"].map((label) => (
              <button key={label} className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-slate-200 bg-white px-4 transition-colors hover:border-primary dark:border-slate-700 dark:bg-[#282f39]">
                <span className="text-sm font-medium text-slate-700 dark:text-white">{label}</span>
                <span className="material-symbols-outlined text-lg text-slate-500">expand_more</span>
              </button>
            ))}
          </div>
          <div className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2 dark:border-slate-700 dark:bg-[#282f39] md:w-auto md:justify-start">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl text-primary">volume_up</span>
              <span className="text-sm font-medium text-slate-700 dark:text-white">Solo con audio</span>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input className="peer sr-only" type="checkbox" />
              <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full dark:bg-slate-700" />
            </label>
          </div>
        </div>
      </header>
      <div className="mx-auto w-full max-w-[1400px] flex-1 p-6 md:px-10 md:py-8">
        <h2 className="mb-6 px-2 text-xl font-semibold dark:text-white">Top Results for "Nature"</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {recommendationBooks.concat(recommendationBooks.slice(0, 1)).map((book, index) => (
            <Link key={`${book.titulo}-${index}`} className="group flex cursor-pointer flex-col gap-3" to="/book/el-nombre-del-viento">
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url("${book.cover}")` }} />
                {index % 2 === 0 && (
                  <div className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white backdrop-blur-md">
                    <span className="material-symbols-outlined text-[18px]">headphones</span>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="rounded-full bg-primary p-3 text-white shadow-lg">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                </div>
              </div>
              <div>
                <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-slate-900 transition-colors group-hover:text-primary dark:text-white">{book.titulo}</h3>
                <p className="mt-1 text-xs font-normal text-slate-500 dark:text-slate-400">{book.autor}</p>
                <div className="mt-1.5 flex items-center gap-1">
                  <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-400/20">Nature</span>
                  {index % 2 === 0 && <span className="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/20">Audio</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
