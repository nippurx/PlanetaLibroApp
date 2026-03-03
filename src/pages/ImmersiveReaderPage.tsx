import { Link } from "react-router-dom";
import { AppShell } from "../layout/AppShell";

export function ImmersiveReaderPage() {
  return (
    <AppShell mode="immersive">
      <div className="flex min-h-screen flex-col bg-background-light font-display text-slate-900 antialiased transition-colors duration-300 dark:bg-background-dark dark:text-slate-100">
        <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-background-light/95 backdrop-blur-sm transition-colors duration-300 dark:border-slate-800 dark:bg-background-dark/95">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <Link className="text-slate-500 transition-colors hover:text-primary" to="/book/el-nombre-del-viento"><span className="material-symbols-outlined">arrow_back</span></Link>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold leading-tight text-slate-900 dark:text-slate-100">The Sustainable Future</h1>
                <span className="text-xs text-slate-500 dark:text-slate-400">Chapter 4: Biophilic Cities</span>
              </div>
            </div>
            <div className="mx-8 hidden max-w-md flex-1 items-center gap-3 sm:flex">
              <span className="w-8 text-right text-xs font-medium text-slate-500">32%</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"><div className="h-full w-[32%] rounded-full bg-primary" /></div>
              <span className="w-12 text-xs font-medium text-slate-500">15 min left</span>
            </div>
            <div className="flex items-center gap-2">
              {["bookmark_border", "headphones"].map((icon) => <button key={icon} className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800"><span className="material-symbols-outlined text-xl">{icon}</span></button>)}
            </div>
          </div>
        </header>
        <main className="flex flex-1 pt-20">
          <article className="mx-auto flex-1 max-w-3xl px-6 py-12 text-lg leading-relaxed text-slate-800 dark:text-slate-200 sm:px-12 sm:text-xl md:px-16 lg:px-20">
            <span className="mb-2 block text-sm font-semibold uppercase tracking-wider text-primary">Part II: The Urban Shift</span>
            <h2 className="mb-10 text-4xl font-medium text-slate-900 dark:text-slate-100 sm:text-5xl">Biophilic Cities</h2>
            <div className="max-w-none">
              <p className="mb-6 indent-8 first-letter:float-left first-letter:mr-2 first-letter:text-5xl first-letter:font-bold first-letter:text-primary">The concept of the biophilic city is not merely an aesthetic choice, but a fundamental necessity for the psychological well-being of future generations.</p>
              <p className="mb-6">Imagine a city where the walls breathe. Not metaphorically, but literally. Vertical gardens scaling skyscrapers, filtering particulate matter and cooling the ambient temperature by several degrees.</p>
              <figure className="my-10 overflow-hidden rounded-xl border border-slate-200 shadow-lg dark:border-slate-800">
                <img alt="Green vertical garden on modern building facade" className="h-64 w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpDyjaPTdOwkbTYElpjjqvr8WTOv5oNZeB0ChZcI9vo85y6w-tmeg9tuHmiZKtTvcit69g-JJ3k_x7p8eo7H6ohUpyJv5jsqZQtxdCXEBYn3aCeTORqF9Dc32SNLdAIpT3zbzraukUkubakPJOiymeE8ESwD_hgGuj_FOwhCW8MTy_wXvKXOHzpDaW6kK7Evt4QTS_K_sXBcxoB28mKh58zqFXVv9bcQuT0-XhO3xO4neiIPqt1x_JI1IOl0h47-TkWb495Ud1wopn" />
                <figcaption className="bg-slate-50 p-3 text-center text-sm italic text-slate-500 dark:bg-slate-800/50">Fig 4.1: The Bosco Verticale in Milan, a prototype for biodiversity.</figcaption>
              </figure>
              <p className="mb-6">Professor E.O. Wilson popularized the term "biophilia" to describe the innate tendency of humans to seek connections with nature and other forms of life.</p>
              <div className="my-8 border-l-4 border-primary pl-6 text-2xl font-light italic text-slate-600 dark:text-slate-400">"We cannot win this battle to save species and environments without forging an emotional bond between ourselves and nature as well."</div>
              <p className="mb-6">The integration involves three key pillars:</p>
              <ul className="mb-8 list-none space-y-4 pl-4">
                {[
                  "Physical Access: Every citizen should be within a 5-minute walk of a green space.",
                  "Visual Connection: Sightlines should prioritize trees and sky over advertisements and concrete.",
                  "Ecological Mimicry: Buildings should function like trees, harvesting water and energy.",
                ].map((item) => <li key={item} className="flex items-start gap-3"><span className="material-symbols-outlined mt-1 text-sm text-primary">circle</span><span>{item}</span></li>)}
              </ul>
            </div>
            <div className="mt-20 flex items-center justify-between border-t border-slate-200 pt-10 dark:border-slate-800">
              <a className="group flex flex-col items-start gap-1 text-slate-500 transition-colors hover:text-primary" href="#"><div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide"><span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>Previous</div><span className="text-lg font-medium text-slate-800 group-hover:text-primary dark:text-slate-200">Chapter 3: The Carbon Cost</span></a>
              <a className="group flex flex-col items-end gap-1 text-slate-500 transition-colors hover:text-primary" href="#"><div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide">Next<span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span></div><span className="text-lg font-medium text-slate-800 group-hover:text-primary dark:text-slate-200">Chapter 5: Renewable Minds</span></a>
            </div>
          </article>
          <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 flex-col overflow-y-auto border-l border-slate-200 bg-background-light/50 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-background-dark/50 xl:flex">
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-slate-400">Display Settings</h3>
            <div className="mb-8">
              <label className="mb-3 block text-sm font-medium text-slate-700 dark:text-slate-300">Theme</label>
              <div className="grid grid-cols-3 gap-2">
                <button className="rounded-lg border-2 border-primary bg-background-light p-3 text-slate-900 shadow-sm"><span className="material-symbols-outlined mb-1 text-xl">light_mode</span><span className="block text-xs font-medium">Light</span></button>
                <button className="rounded-lg border border-slate-200 bg-[#f4ecd8] p-3 text-[#433422] transition-colors hover:border-primary/50 dark:border-slate-700"><span className="material-symbols-outlined mb-1 text-xl">menu_book</span><span className="block text-xs font-medium">Sepia</span></button>
                <button className="rounded-lg border border-slate-200 bg-slate-900 p-3 text-white transition-colors hover:border-primary/50 dark:border-slate-700"><span className="material-symbols-outlined mb-1 text-xl">dark_mode</span><span className="block text-xs font-medium">Dark</span></button>
              </div>
            </div>
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between"><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Font Size</label><span className="text-xs text-slate-500">20px</span></div>
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-800">
                <span className="material-symbols-outlined text-sm text-slate-400">format_size</span>
                <input className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-primary dark:bg-slate-700" defaultValue="20" max="32" min="14" type="range" />
                <span className="material-symbols-outlined text-xl text-slate-400">format_size</span>
              </div>
            </div>
            <div className="mb-8">
              <label className="mb-3 block text-sm font-medium text-slate-700 dark:text-slate-300">Line Height</label>
              <div className="flex rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800">
                <button className="flex-1 rounded py-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-700"><span className="material-symbols-outlined rotate-90 text-lg">density_small</span></button>
                <button className="flex-1 rounded bg-primary/10 py-1.5 font-medium text-primary"><span className="material-symbols-outlined rotate-90 text-lg">density_medium</span></button>
                <button className="flex-1 rounded py-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-700"><span className="material-symbols-outlined rotate-90 text-lg">density_large</span></button>
              </div>
            </div>
            <div className="mb-8">
              <label className="mb-3 block text-sm font-medium text-slate-700 dark:text-slate-300">Font Family</label>
              <select className="block w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm text-slate-700 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300" defaultValue="Newsreader (Serif)">
                <option>Newsreader (Serif)</option>
                <option>Inter (Sans)</option>
                <option>Merriweather (Serif)</option>
              </select>
            </div>
            <div className="mt-auto rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="mb-2 flex items-start justify-between"><span className="text-xs font-bold uppercase text-primary">Now Playing</span><span className="material-symbols-outlined text-sm text-primary">graphic_eq</span></div>
              <div className="mb-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-cover bg-center shadow-sm" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAeZ0vxUabDAOSb75DvrdReCMZdScMU8klqUkokSf7m1NESJJ4kpAP-jKAWp-jhHuj_lsazWkxguJQP-4TKq4y9AxhZncsoYHrMF7kuYcUkpbcIYNIiocZt33T2ZlDWnf7huCU6Q9w_fqV5dKTs-w5U9Xn1Cq0Ofuyo1qWjgOnX5cdhuw-SHeVb6vZECp-pk3stba1iD_O7UuYgSCoLJtsbMuxaOwgosrkzuDQplqw_SUwmtj2lw1RlPjyA1IwyfAVPOUyrFuuxEyQS")' }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-900 dark:text-slate-100">Biophilic Cities</p>
                  <p className="truncate text-xs text-slate-500">Narrated by A. Smith</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4">
                {["replay_10", "play_arrow", "forward_10"].map((icon) => <button key={icon} className={`${icon === "play_arrow" ? "flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-md transition-colors hover:bg-blue-600" : "text-slate-400 transition-colors hover:text-primary"}`}><span className="material-symbols-outlined">{icon}</span></button>)}
              </div>
            </div>
          </aside>
        </main>
        <button className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/30 transition-transform hover:scale-105 xl:hidden"><span className="material-symbols-outlined text-2xl">text_fields</span></button>
      </div>
    </AppShell>
  );
}
