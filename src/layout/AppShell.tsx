import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";

type ShellMode = "standard" | "immersive";
type ShellTheme = "dark" | "light";

type AppShellProps = {
  children: ReactNode;
  title?: ReactNode;
  headerRight?: ReactNode;
  searchPlaceholder?: string;
  mode?: ShellMode;
  theme?: ShellTheme;
  contentClassName?: string;
};

const navItems = [
  { href: "/home", label: "Inicio", icon: "home" },
  { href: "/library", label: "Mi Biblioteca", icon: "library_books" },
  { href: "/search", label: "Explorar", icon: "explore" },
  { href: "/stats", label: "Estadísticas", icon: "bar_chart" },
  { href: "/settings", label: "Configuración", icon: "settings" },
];

function isActive(pathname: string, href: string) {
  if (href === "/home") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({
  children,
  title,
  headerRight,
  searchPlaceholder = "Buscar libros, autores...",
  mode = "standard",
  theme = "dark",
  contentClassName = "",
}: AppShellProps) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  if (mode === "immersive") {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        {children}
      </div>
    );
  }

  const dark = theme === "dark";

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col justify-between border-r transition-transform duration-300 md:static md:w-64 md:translate-x-0 ${
          dark
            ? "border-slate-800 bg-[#0d1220]"
            : "border-slate-200 bg-white dark:bg-[#111418]"
        } ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col gap-6 p-4">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary ring-2 ring-primary/20">
              <span className="material-symbols-outlined fill-1">auto_stories</span>
            </div>
            <div className="flex flex-col">
              <h1 className={`text-base font-semibold leading-tight ${dark ? "text-white" : "text-slate-900 dark:text-white"}`}>
                PlanetaLibro
              </h1>
              <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500 dark:text-slate-400"}`}>
                Premium Member
              </p>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary/10 text-primary dark:bg-[#282f39] dark:text-white"
                      : dark
                        ? "text-slate-400 hover:bg-[#161d31] hover:text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-[#282f39] dark:hover:text-white"
                  }`}
                  to={item.href}
                  onClick={() => setOpen(false)}
                >
                  <span className={`material-symbols-outlined ${active ? "fill-1" : ""}`}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className={`border-t p-4 ${dark ? "border-slate-800" : "border-slate-200 dark:border-slate-800"}`}>
          <div className="flex items-center gap-3 rounded-xl px-2 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">AR</div>
            <div className="min-w-0">
              <p className={`truncate text-sm font-medium ${dark ? "text-white" : "text-slate-900 dark:text-white"}`}>Alex Reader</p>
              <p className={`truncate text-xs ${dark ? "text-slate-400" : "text-slate-500 dark:text-slate-400"}`}>Lector sustentable</p>
            </div>
          </div>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className={`sticky top-0 z-30 flex items-center justify-between border-b px-4 py-4 md:px-6 ${
            dark
              ? "border-slate-800 bg-background-dark/90 backdrop-blur-md"
              : "border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-[#111418]/95"
          }`}
        >
          <div className="flex min-w-0 items-center gap-4">
            <button
              className={`rounded-lg p-2 md:hidden ${dark ? "text-white hover:bg-[#161d31]" : "text-slate-600 hover:bg-slate-100 dark:text-white dark:hover:bg-[#282f39]"}`}
              onClick={() => setOpen(true)}
              type="button"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="min-w-0">
              {typeof title === "string" ? (
                <h2 className={`truncate text-xl font-bold tracking-tight ${dark ? "text-white" : "text-slate-900 dark:text-white"}`}>{title}</h2>
              ) : (
                title
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div
              className={`hidden items-center rounded-full px-4 py-2 md:flex ${
                dark
                  ? "border border-slate-800 bg-[#161d31]"
                  : "border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-[#282f39]"
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-slate-400">search</span>
              <input
                className="w-64 border-none bg-transparent px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0 dark:text-white"
                placeholder={searchPlaceholder}
                type="text"
              />
            </div>
            {headerRight}
          </div>
        </header>
        <main className={`min-h-0 flex-1 overflow-y-auto ${contentClassName}`}>{children}</main>
      </div>
    </div>
  );
}
