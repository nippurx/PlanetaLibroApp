export type LibraryView = "all" | "unread" | "in_progress" | "completed" | "abandoned";
export type LibrarySort = "recent" | "oldest";

type LibraryProgress = {
  currentPage: number;
  readingStarted: boolean;
  progressPercent: number;
  hasReliableProgress: boolean;
  totalPages: number | null;
  listeningMinute: number;
  listeningStarted: boolean;
};

export const LIBRARY_VIEW_LABELS: Record<LibraryView, string> = {
  all: "Todos",
  in_progress: "Continuar",
  unread: "Por leer",
  completed: "Terminados",
  abandoned: "Abandonados",
};

export const LIBRARY_FILTERS: LibraryView[] = ["all", "in_progress", "unread", "completed", "abandoned"];

export function isLibraryView(value: string | null): value is LibraryView {
  return LIBRARY_FILTERS.some((view) => view === value);
}

export function normalizeLibrarySort(value: string | null): LibrarySort {
  return value === "oldest" ? "oldest" : "recent";
}

export function normalizeLibraryOffset(value: string | null): number {
  const parsed = Number(value ?? 0);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : 0;
}

export function updateLibrarySearchParams(
  current: URLSearchParams,
  updates: Record<string, string | null>,
): URLSearchParams {
  const next = new URLSearchParams(current);
  for (const [key, value] of Object.entries(updates)) {
    if (value === null || value === "") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
  }
  return next;
}

export function getLibraryProgressLabel(book: LibraryProgress): string {
  if (book.hasReliableProgress && book.totalPages !== null) {
    return `${book.progressPercent}% · Página ${book.currentPage} de ${book.totalPages}`;
  }
  if (book.readingStarted) {
    return `Página ${Math.max(1, book.currentPage)}`;
  }
  if (book.listeningStarted) {
    return book.listeningMinute > 0 ? `Audio: minuto ${book.listeningMinute}` : "Audio iniciado";
  }
  return "Sin comenzar";
}
