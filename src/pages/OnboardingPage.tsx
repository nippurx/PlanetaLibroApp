export function OnboardingPage() {
  const genres = [
    { label: "Fiction", active: true },
    { label: "Non-fiction", active: false },
    { label: "Sci-Fi", active: false },
    { label: "Sustainability", active: true },
    { label: "History", active: false },
    { label: "Biography", active: false },
    { label: "Self-help", active: false },
  ];
  const moods = [
    { label: "Inspirador", active: false },
    { label: "Relajado", active: true },
    { label: "Intenso", active: false },
    { label: "Corto", active: false },
    { label: "Largo", active: false },
    { label: "Educativo", active: false },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background-light p-4 font-sans text-slate-900 dark:bg-background-dark dark:text-slate-100 sm:p-8">
      <div className="flex w-full max-w-[640px] flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-6">
            <button className="group -ml-2 rounded-full p-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-800">
              <span className="material-symbols-outlined text-slate-500 transition-colors group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white">arrow_back</span>
            </button>
            <p className="text-sm font-medium leading-normal text-slate-500 dark:text-slate-400">Step 3 of 5</p>
            <button className="p-2 text-sm font-medium text-primary hover:underline">Skip</button>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"><div className="h-full w-[60%] rounded-full bg-primary transition-all duration-500 ease-out" /></div>
        </div>
        <div className="space-y-3 px-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">Personalize your library</h1>
          <p className="mx-auto max-w-md text-lg text-slate-600 dark:text-slate-400">Select your favorite genres and moods to get better sustainable reading recommendations.</p>
        </div>
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1"><span className="material-symbols-outlined text-primary">menu_book</span><h2 className="text-xl font-semibold text-slate-900 dark:text-white">Favorite Genres</h2></div>
            <div className="flex flex-wrap gap-3">
              {genres.map((genre) => (
                <button key={genre.label} className={`group flex h-10 items-center justify-center gap-x-2 rounded-full px-5 transition-all active:scale-95 ${genre.active ? "bg-primary hover:bg-blue-600" : "bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700"}`}>
                  <span className={`text-sm font-medium ${genre.active ? "text-white" : "text-slate-700 dark:text-slate-300"}`}>{genre.label}</span>
                  <span className={`material-symbols-outlined text-[18px] ${genre.active ? "text-white" : "text-slate-400 opacity-0 transition-opacity group-hover:opacity-100"}`}>{genre.active ? "check" : "add"}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1"><span className="material-symbols-outlined text-primary">mood</span><h2 className="text-xl font-semibold text-slate-900 dark:text-white">Current Moods</h2></div>
            <div className="flex flex-wrap gap-3">
              {moods.map((mood) => (
                <button key={mood.label} className={`group flex h-10 items-center justify-center gap-x-2 rounded-full px-5 transition-all active:scale-95 ${mood.active ? "border border-primary/50 bg-primary/20 hover:bg-primary/30" : "bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700"}`}>
                  <span className={`text-sm font-medium ${mood.active ? "text-primary" : "text-slate-700 dark:text-slate-300"}`}>{mood.label}</span>
                  {mood.active && <span className="material-symbols-outlined text-[18px] text-primary">check</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end border-t border-slate-200 pt-6 dark:border-slate-800">
          <button className="flex w-full items-center justify-center rounded-xl bg-primary px-8 py-3 text-base font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-blue-600 active:scale-95 sm:w-auto">
            <span className="mr-2">Siguiente</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
