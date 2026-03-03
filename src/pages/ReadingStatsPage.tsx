import { AppShell } from "../layout/AppShell";

const completedBooks = [
  ["The Sustainable Future", "Sarah Jenkins", "4.8", "Finished 2d ago", "https://lh3.googleusercontent.com/aida-public/AB6AXuCStuH7MXOCTUakGD92lAUQvXEp5YBKlQIopX0ADsmpQ91ocM78mz63oID8uI8t5Xq-bX4QAhhaYH_4mGjjjHo3o2u70Xw1nqpFq8PsKTZv5mNnnnkTGamW36fc6w_uJVLP5rxmL5hMDeVZWU0Bmv90LJFK2zcwcJd-BQk0Vahvr4UBFVOM8VYE_LrNsYxJQnTPYev3_1Iv9J-RCFJKsWkmsI6cnAO-HaSrp2oQI-Dlp3rl9uwKFdeBImx2KKEN1jAWGlIj3Tw4Zify"],
  ["Mindful Tech", "David Cal Newman", "5.0", "Finished 5d ago", "https://lh3.googleusercontent.com/aida-public/AB6AXuAF8ylWyX5o6bEL2GRLof2OhbZ7lceV3nAP3Soqu3vUyK7wPJSuu3t04uIhdifhrRQxSbMpcJS4X-w39JrNDEpz5I-LNdx-dJvcY--DnkErzPWF2YcGanoHmEj73yyUOqmrQe14qrxF886PDpbqzw84YFfsnWokwcKHLl58Qrt_KAMklpIRfds_0dPGKZ89KmtUJpVNtgs4a57JMv2ZwE8InsxPYrBo-TMCSpoWG8VmCU-xVYiEZcaJAohpFeCOIG7M8X7RpVM0WiJO"],
  ["Green Living Guide", "Elena Rodriguez", "4.2", "Finished 1w ago", "https://lh3.googleusercontent.com/aida-public/AB6AXuDFmggJlDpjswTDvqSZoQ2bPf5c_EpLz3cbpN5bf5_X-P6R2IDVZ9iCetnoO06CqJo8tAX7Sg4BDOuRODnkbWMeW8cpUERUgP3sZvp25qFXtmvfivwDTpxmqfwaP7Yd51c7aNt2evIz0vYkoXf3QzfNd1UGh25KtgZd3TzePIQRLzVuY536hMuym9uYjw_8DynfEIG9MWMYrrFeG7vLG5A6ewDBXWQND1nKwVf38pxeGIMVxHp5U82U0w1Zjo1a8xi8WBRSQVaeQw6X"],
];

export function ReadingStatsPage() {
  return (
    <AppShell theme="light" title="Your Reading Stats">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white md:text-4xl">Your Reading Stats</h1>
            <p className="text-base font-normal text-slate-500 dark:text-slate-400">Track your sustainable reading habits and progress this week.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-300 dark:bg-surface-dark dark:text-white dark:hover:bg-slate-700">
              <span className="material-symbols-outlined text-lg">calendar_month</span>
              Last 30 Days
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-lg shadow-primary/20 transition-colors hover:bg-blue-700">
              <span className="material-symbols-outlined text-lg">download</span>
              Export Report
            </button>
          </div>
        </div>
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["menu_book", "Total Books", "12", "+2%", "bg-blue-100 text-primary dark:bg-blue-900/30"],
            ["timer", "Hours Read", "48h", "+15%", "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"],
            ["headphones", "Hours Listened", "32h", "+8%", "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"],
            ["eco", "Eco Score", "94/100", "+5%", "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"],
          ].map(([icon, label, value, delta, accent]) => (
            <div key={label} className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-surface-dark">
              <div className="flex items-start justify-between">
                <div className={`rounded-lg p-2 ${accent}`}><span className="material-symbols-outlined">{icon}</span></div>
                <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-bold text-emerald-500">{delta}</span>
              </div>
              <div>
                <p className="text-sm font-medium leading-normal text-slate-500 dark:text-slate-400">{label}</p>
                <p className="mt-1 text-3xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">{value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-surface-dark lg:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-100 p-6 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Activity Overview</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Reading vs Listening over time</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-primary" /><span className="text-xs font-medium text-slate-600 dark:text-slate-400">Reading</span></div>
                <div className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-purple-500" /><span className="text-xs font-medium text-slate-600 dark:text-slate-400">Listening</span></div>
              </div>
            </div>
            <div className="relative flex min-h-[300px] flex-col justify-end p-6">
              <div className="relative h-64 w-full">
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                  {Array.from({ length: 5 }).map((_, index) => <div key={index} className="h-px w-full bg-slate-100 dark:bg-slate-800/50" />)}
                </div>
                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="gradientPrimary" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#136dec" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#136dec" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gradientPurple" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,80 C10,75 20,60 30,65 C40,70 50,40 60,35 C70,30 80,45 90,20 L100,25 L100,100 L0,100 Z" fill="url(#gradientPrimary)" />
                  <path d="M0,80 C10,75 20,60 30,65 C40,70 50,40 60,35 C70,30 80,45 90,20 L100,25" fill="none" stroke="#136dec" strokeLinecap="round" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                  <path d="M0,90 C15,85 25,80 35,75 C45,70 55,75 65,60 C75,45 85,55 100,40 L100,100 L0,100 Z" fill="url(#gradientPurple)" />
                  <path d="M0,90 C15,85 25,80 35,75 C45,70 55,75 65,60 C75,45 85,55 100,40" fill="none" stroke="#a855f7" strokeLinecap="round" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>
              <div className="mt-4 flex justify-between text-xs font-semibold text-slate-400 dark:text-slate-500">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => <span key={day}>{day}</span>)}</div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-surface-dark">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Weekly Goal</h3>
                <span className="cursor-pointer text-sm font-medium text-primary hover:underline">Edit</span>
              </div>
              <div className="mb-2 flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">245</span>
                <span className="mb-1.5 text-sm text-slate-500 dark:text-slate-400">/ 300 mins</span>
              </div>
              <div className="mb-4 h-3 w-full rounded-full bg-slate-100 dark:bg-slate-700"><div className="relative h-3 w-[82%] rounded-full bg-primary"><div className="absolute right-0 top-1/2 h-4 w-4 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-white shadow-sm dark:border-white dark:bg-primary" /></div></div>
              <p className="text-sm text-slate-500 dark:text-slate-400">You're on track! Read for <span className="font-semibold text-slate-900 dark:text-white">55 more mins</span> to reach your weekly sustainability badge.</p>
            </div>
            <div className="flex-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-surface-dark">
              <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Consistency</h3>
              <div className="grid grid-cols-7 gap-2">
                {["M", "T", "W", "T", "F", "S", "S"].map((day) => <div key={day} className="text-center text-[10px] uppercase tracking-wider text-slate-400">{day}</div>)}
                {Array.from({ length: 28 }).map((_, index) => {
                  const palette = ["bg-primary/20", "bg-primary/30", "bg-primary/40", "bg-primary/60", "bg-primary/80", "bg-primary", "bg-slate-100 dark:bg-slate-700/50"];
                  return <div key={index} className={`aspect-square rounded ${palette[index % palette.length]}`} />;
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-surface-dark">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Completed Recently</h3>
              <a className="text-sm font-medium text-primary hover:text-blue-700" href="#">View All</a>
            </div>
            <div className="flex flex-col gap-4">
              {completedBooks.map(([title, author, score, finished, cover]) => (
                <div key={title} className="group flex cursor-pointer items-center gap-4 rounded-lg p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded bg-slate-200 shadow-sm"><img alt={title} className="h-full w-full object-cover" src={cover} /></div>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate font-semibold text-slate-900 dark:text-white">{title}</h4>
                    <p className="truncate text-sm text-slate-500 dark:text-slate-400">{author}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-amber-400"><span className="material-symbols-outlined fill-1 text-[16px]">star</span><span className="font-medium text-slate-700 dark:text-slate-300">{score}</span></div>
                    <p className="mt-1 text-xs text-slate-400">{finished}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-surface-dark">
            <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Content Distribution</h3>
            <div className="flex flex-1 flex-col justify-center gap-4">
              {[
                ["Sustainability & Nature", "45%", "bg-emerald-500"],
                ["Technology & Future", "30%", "bg-primary"],
                ["Self Development", "15%", "bg-purple-500"],
                ["Fiction", "10%", "bg-orange-500"],
              ].map(([label, value, color]) => (
                <div key={label} className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="font-medium text-slate-700 dark:text-slate-300">{label}</span><span className="text-slate-500 dark:text-slate-400">{value}</span></div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700"><div className={`h-full rounded-full ${color}`} style={{ width: value }} /></div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"><span className="material-symbols-outlined">emoji_events</span></div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Eco-Reader Champion</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Top 5% of community</p>
                </div>
              </div>
              <button className="text-xs font-bold uppercase tracking-wide text-primary hover:text-blue-700">View Badges</button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
