import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Book,
  getLibraryItems,
  getLibrarySummary,
  LibraryListResult,
  LibrarySummary,
} from "../api/books";
import { ApiError } from "../api/client";
import { getLegacyLoginUrl } from "../api/session";
import { useAuth } from "../auth/AuthContext";
import { AuthorLink, resolveAuthor } from "../components/AuthorLink";
import { BookCover } from "../components/BookCover";
import { getBookDetailUrl, getLibraryActions, LibraryAction } from "../features/library/navigation";
import {
  getLibraryProgressLabel,
  isLibraryView,
  LIBRARY_FILTERS,
  LIBRARY_VIEW_LABELS,
  LibrarySort,
  LibraryView,
  normalizeLibraryOffset,
  normalizeLibrarySort,
  updateLibrarySearchParams,
} from "../features/library/presentation";
import { loadAudiobookProgress } from "../features/listen/storage";
import { AppShell } from "../layout/AppShell";

const LIST_LIMIT = 20;

function LibraryActionLink({ action, className, children }: {
  action: LibraryAction;
  className: string;
  children: ReactNode;
}) {
  return <Link aria-label={action.ariaLabel} className={className} to={action.href}>{children}</Link>;
}

function MediaActions({ book, compact = false, underCover = false }: {
  book: Book;
  compact?: boolean;
  underCover?: boolean;
}) {
  const actions = getLibraryActions(book, loadAudiobookProgress(book.uri));
  const available = [actions.read, actions.listen].filter((action): action is LibraryAction => action !== null);

  if (available.length === 0) {
    return <span className="text-xs text-slate-400">No disponible</span>;
  }

  return (
    <div className={underCover ? "flex w-full gap-2" : "flex flex-wrap justify-center gap-2 sm:justify-start"}>
      {available.map((action) => (
        <LibraryActionLink
          key={action.kind}
          action={action}
          className={`inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-100 font-medium text-slate-800 transition-colors hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 ${
            underCover
              ? "h-11 min-w-0 flex-1 px-0 text-sm"
              : compact
              ? "h-11 w-11 px-0 text-xs sm:h-8 sm:w-auto sm:px-2"
              : "h-11 w-11 px-0 text-sm sm:h-9 sm:w-auto sm:px-3"
          }`}
        >
          <span aria-hidden="true" className="material-symbols-outlined text-[17px]">{action.icon}</span>
          <span className={underCover ? "hidden" : "hidden sm:inline"}>{action.label}</span>
        </LibraryActionLink>
      ))}
    </div>
  );
}

function BookMenu({ book }: { book: Book }) {
  return (
    <details className="group/menu relative">
      <summary
        aria-label={`Más acciones para ${book.titulo}`}
        className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
      >
        <span aria-hidden="true" className="material-symbols-outlined">more_horiz</span>
      </summary>
      <div className="absolute right-0 z-20 mt-1 w-52 rounded-xl border border-slate-200 bg-white p-1 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <Link
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none dark:text-slate-200 dark:hover:bg-slate-800"
          to={getBookDetailUrl(book)}
        >
          <span aria-hidden="true" className="material-symbols-outlined text-[18px]">info</span>
          Información del libro
        </Link>
      </div>
    </details>
  );
}

function SummaryCard({ book }: { book: Book }) {
  const author = resolveAuthor(book);
  const actions = getLibraryActions(book, loadAudiobookProgress(book.uri));
  const coverAction = actions.cover;

  return (
    <li className="w-[148px] shrink-0 snap-start sm:w-[170px]">
      <div className="group relative">
        {coverAction ? (
          <LibraryActionLink action={coverAction} className="block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <div className="aspect-[2/3] overflow-hidden rounded-xl bg-slate-200 shadow-sm dark:bg-slate-800">
              <BookCover alt={`Portada de ${book.titulo}`} book={book} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
            </div>
          </LibraryActionLink>
        ) : (
          <div className="aspect-[2/3] overflow-hidden rounded-xl bg-slate-200 shadow-sm dark:bg-slate-800">
            <BookCover alt={`Portada de ${book.titulo}`} book={book} className="h-full w-full object-cover" />
          </div>
        )}
        <div className="absolute right-1 top-1 rounded-full bg-white/95 shadow-sm dark:bg-slate-900/95">
          <BookMenu book={book} />
        </div>
      </div>
      <Link className="mt-3 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" to={getBookDetailUrl(book)}>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900 hover:text-primary dark:text-white">{book.titulo}</h3>
      </Link>
      <AuthorLink className="mt-1 block truncate text-xs text-slate-500 dark:text-slate-400" name={author.name} uri={author.uri} />
      <div className="mt-2">
        {book.hasReliableProgress ? (
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700" aria-label={getLibraryProgressLabel(book)}>
            <div className="h-full rounded-full bg-primary" style={{ width: `${book.progressPercent}%` }} />
          </div>
        ) : (
          <p className="text-xs text-slate-500 dark:text-slate-400">{getLibraryProgressLabel(book)}</p>
        )}
      </div>
      <div className="mt-3">
        <MediaActions book={book} compact underCover />
      </div>
    </li>
  );
}

function SummarySection({ state, items, total }: {
  state: "in_progress" | "unread" | "completed";
  items: Book[];
  total: number;
}) {
  const carouselRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    function updateScrollState() {
      if (!carousel) return;
      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
      setCanScrollLeft(carousel.scrollLeft > 1);
      setCanScrollRight(carousel.scrollLeft < maxScrollLeft - 1);
    }

    updateScrollState();
    carousel.addEventListener("scroll", updateScrollState, { passive: true });
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(carousel);

    return () => {
      carousel.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [items.length]);

  function scrollCarousel(direction: -1 | 1) {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollBy({
      left: direction * Math.max(320, carousel.clientWidth * 0.8),
      behavior: "smooth",
    });
  }

  if (total === 0) {
    return null;
  }

  return (
    <section aria-labelledby={`library-${state}`} className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 id={`library-${state}`} className="min-w-0 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
          {LIBRARY_VIEW_LABELS[state]} <span className="text-slate-400">{total}</span>
        </h2>
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-1 md:flex" aria-label={`Navegar ${LIBRARY_VIEW_LABELS[state]}`}>
            <button
              aria-controls={`library-${state}-carousel`}
              aria-label={`Ver libros anteriores de ${LIBRARY_VIEW_LABELS[state]}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-default disabled:opacity-35 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
              disabled={!canScrollLeft}
              onClick={() => scrollCarousel(-1)}
              type="button"
            >
              <span aria-hidden="true" className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              aria-controls={`library-${state}-carousel`}
              aria-label={`Ver más libros de ${LIBRARY_VIEW_LABELS[state]}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-default disabled:opacity-35 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
              disabled={!canScrollRight}
              onClick={() => scrollCarousel(1)}
              type="button"
            >
              <span aria-hidden="true" className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
          <Link className="rounded-lg px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" to={`/library?view=${state}`}>
            Ver todo
          </Link>
        </div>
      </div>
      <ul
        ref={carouselRef}
        id={`library-${state}-carousel`}
        aria-label={`${LIBRARY_VIEW_LABELS[state]}: ${total} libros`}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0"
      >
        {items.map((book) => <SummaryCard key={book.uri} book={book} />)}
      </ul>
    </section>
  );
}

function LoadingState({ label = "Cargando biblioteca..." }: { label?: string }) {
  return (
    <div aria-live="polite" className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
      {label}
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-200">
      <p className="text-sm">{message}</p>
      <button className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700" onClick={onRetry} type="button">
        Reintentar
      </button>
    </div>
  );
}

function LibrarySummaryView({ onTotalChange }: { onTotalChange: (total: number | null) => void }) {
  const [summary, setSummary] = useState<LibrarySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    onTotalChange(null);
    void getLibrarySummary().then((result) => {
      if (!cancelled) {
        setSummary(result);
        onTotalChange(result.total);
      }
    }).catch((reason) => {
      if (!cancelled) {
        setError(reason instanceof ApiError ? reason.message : "No se pudo cargar tu biblioteca.");
        onTotalChange(null);
      }
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [retryKey]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={() => setRetryKey((value) => value + 1)} />;
  if (!summary || summary.total === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <span aria-hidden="true" className="material-symbols-outlined text-5xl text-slate-300">bookmark</span>
        <h2 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">Tu biblioteca está vacía</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">Explora el catálogo para encontrar tu próxima lectura o audiolibro.</p>
        <Link className="mt-5 inline-flex rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" to="/search">
          Ir a Buscar
        </Link>
      </div>
    );
  }

  const hasPrimarySections = Object.values(summary.sections).some((section) => section.total > 0);

  return (
    <div className="space-y-10">
      <SummarySection state="in_progress" items={summary.sections.in_progress.items} total={summary.sections.in_progress.total} />
      <SummarySection state="unread" items={summary.sections.unread.items} total={summary.sections.unread.total} />
      <SummarySection state="completed" items={summary.sections.completed.items} total={summary.sections.completed.total} />
      {!hasPrimarySections ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-600 dark:text-slate-300">Tus libros están disponibles en la vista completa.</p>
          <Link className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline" to="/library?view=all">Ver todos</Link>
        </div>
      ) : null}
    </div>
  );
}

function LibraryListRow({ book }: { book: Book }) {
  const author = resolveAuthor(book);
  const detailUrl = getBookDetailUrl(book);

  return (
    <li className="border-b border-slate-200 py-5 last:border-b-0 dark:border-slate-800">
      <article className="flex gap-4 sm:gap-5">
        <Link className="h-28 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-200 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:bg-slate-800 sm:h-36 sm:w-24" to={detailUrl}>
          <BookCover alt={`Portada de ${book.titulo}`} book={book} className="h-full w-full object-cover" />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-start gap-2">
            <div className="min-w-0 flex-1">
              <Link className="rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" to={detailUrl}>
                <h2 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900 hover:text-primary dark:text-white sm:text-xl">{book.titulo}</h2>
              </Link>
              <AuthorLink className="mt-1 block truncate text-sm text-slate-500 dark:text-slate-400 sm:text-base" name={author.name} uri={author.uri} />
            </div>
            <BookMenu book={book} />
          </div>
          <div className="mt-3 max-w-sm">
            {book.hasReliableProgress ? (
              <>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700" aria-label={getLibraryProgressLabel(book)}>
                  <div className="h-full rounded-full bg-primary" style={{ width: `${book.progressPercent}%` }} />
                </div>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{getLibraryProgressLabel(book)}</p>
              </>
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400">{getLibraryProgressLabel(book)}</p>
            )}
          </div>
          <div className="mt-3">
            <MediaActions book={book} compact />
          </div>
        </div>
      </article>
    </li>
  );
}

function LibraryListView({ view, sort, query, offset, setParams }: {
  view: LibraryView;
  sort: LibrarySort;
  query: string;
  offset: number;
  setParams: (updates: Record<string, string | null>) => void;
}) {
  const [result, setResult] = useState<LibraryListResult | null>(null);
  const [searchText, setSearchText] = useState(query);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => setSearchText(query), [query]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    void getLibraryItems({ state: view, q: query, sort, limit: LIST_LIMIT, offset }).then((nextResult) => {
      if (!cancelled) setResult(nextResult);
    }).catch((reason) => {
      if (!cancelled) setError(reason instanceof ApiError ? reason.message : "No se pudo cargar esta lista.");
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [view, sort, query, offset, retryKey]);

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    setParams({ q: searchText.trim() || null, offset: null });
  }

  const total = result?.pagination.total ?? 0;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="sticky top-0 z-10 -mx-4 border-b border-slate-200 bg-background-light/95 px-4 py-3 backdrop-blur-sm dark:border-slate-800 dark:bg-background-dark/95 sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:backdrop-blur-none">
        <div className="flex items-center gap-3">
          <Link aria-label="Volver a Mi Biblioteca" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-700 hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary dark:text-white dark:hover:bg-slate-800" to="/library">
            <span aria-hidden="true" className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="min-w-0 flex-1 truncate text-2xl font-bold text-slate-900 dark:text-white">
            {LIBRARY_VIEW_LABELS[view]} <span className="text-slate-400">{total}</span>
          </h1>
          <button
            aria-label={sort === "recent" ? "Ordenar por más antiguos" : "Ordenar por más recientes"}
            className="flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary dark:text-white dark:hover:bg-slate-800"
            onClick={() => setParams({ sort: sort === "recent" ? "oldest" : "recent", offset: null })}
            type="button"
          >
            <span aria-hidden="true" className="material-symbols-outlined">swap_vert</span>
            <span className="hidden sm:inline">{sort === "recent" ? "Más recientes" : "Más antiguos"}</span>
          </button>
        </div>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2" aria-label="Filtrar biblioteca">
        {LIBRARY_FILTERS.map((filter) => (
          <button
            key={filter}
            aria-pressed={filter === view}
            className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
              filter === view
                ? "bg-primary text-white"
                : "bg-white text-slate-600 shadow-sm hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
            onClick={() => setParams({ view: filter, q: filter === "all" ? query || null : null, offset: null })}
            type="button"
          >
            {LIBRARY_VIEW_LABELS[filter]} {result ? <span className={filter === view ? "text-white/75" : "text-slate-400"}>{result.counts[filter]}</span> : null}
          </button>
        ))}
      </div>

      {view === "all" ? (
        <form className="mt-4 flex gap-2" onSubmit={submitSearch}>
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Buscar dentro de Mi Biblioteca</span>
            <span aria-hidden="true" className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Buscar por título o autor"
              value={searchText}
            />
          </label>
          <button className="rounded-xl bg-primary px-4 text-sm font-semibold text-white hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" type="submit">
            Buscar
          </button>
        </form>
      ) : null}

      <div className="mt-4">
        {loading ? <LoadingState label={`Cargando ${LIBRARY_VIEW_LABELS[view].toLowerCase()}...`} /> : null}
        {!loading && error ? <ErrorState message={error} onRetry={() => setRetryKey((value) => value + 1)} /> : null}
        {!loading && !error && result && result.items.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">No hay resultados en {LIBRARY_VIEW_LABELS[view]}</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {query ? "Prueba con otra búsqueda o cambia el filtro." : "Esta sección todavía no tiene libros."}
            </p>
            <Link className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline" to="/search">Explorar en Buscar</Link>
          </div>
        ) : null}
        {!loading && !error && result && result.items.length > 0 ? (
          <ul aria-label={`${LIBRARY_VIEW_LABELS[view]}: ${result.pagination.total} libros`}>
            {result.items.map((book) => <LibraryListRow key={book.uri} book={book} />)}
          </ul>
        ) : null}
      </div>

      {!loading && !error && result && result.pagination.total > LIST_LIMIT ? (
        <nav aria-label="Paginación de la biblioteca" className="mt-6 flex items-center justify-between gap-4">
          <button
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            disabled={offset === 0}
            onClick={() => setParams({ offset: String(Math.max(0, offset - LIST_LIMIT)) })}
            type="button"
          >
            Anterior
          </button>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {offset + 1}–{Math.min(offset + LIST_LIMIT, result.pagination.total)} de {result.pagination.total}
          </span>
          <button
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            disabled={!result.pagination.hasMore}
            onClick={() => setParams({ offset: String(offset + LIST_LIMIT) })}
            type="button"
          >
            Siguiente
          </button>
        </nav>
      ) : null}
    </div>
  );
}

export function PersonalLibraryPage() {
  const { session } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [libraryTotal, setLibraryTotal] = useState<number | null>(null);
  const rawView = searchParams.get("view");
  const listMode = isLibraryView(rawView);
  const view: LibraryView = listMode ? rawView : "all";
  const sort = normalizeLibrarySort(searchParams.get("sort"));
  const query = searchParams.get("q")?.trim() ?? "";
  const offset = useMemo(() => {
    return normalizeLibraryOffset(searchParams.get("offset"));
  }, [searchParams]);

  useEffect(() => {
    if (!session?.authenticated) {
      window.location.replace(getLegacyLoginUrl("/app/library"));
    }
  }, [session?.authenticated]);

  function updateParams(updates: Record<string, string | null>) {
    setSearchParams((current) => {
      return updateLibrarySearchParams(current, updates);
    });
  }

  if (!session?.authenticated) {
    return null;
  }

  const libraryTitle = listMode ? undefined : (
    <h2 className="truncate text-lg font-bold tracking-tight text-slate-900 dark:text-white md:text-xl">
      Mi Biblioteca {libraryTotal !== null ? <span className="text-slate-400">{libraryTotal}</span> : null}
    </h2>
  );

  return (
    <AppShell theme="light" title={libraryTitle}>
      <div className="mx-auto w-full max-w-[1200px] p-4 pb-8 md:p-8">
        {listMode ? (
          <LibraryListView view={view} sort={sort} query={query} offset={offset} setParams={updateParams} />
        ) : (
          <LibrarySummaryView onTotalChange={setLibraryTotal} />
        )}
      </div>
    </AppShell>
  );
}
