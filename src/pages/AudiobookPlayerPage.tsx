import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getAudiobookProgress,
  saveAudiobookProgress as saveRemoteAudiobookProgress,
} from "../api/audiobookProgress";
import {
  createAudiobookBookmark,
  deleteAudiobookBookmark,
  listAudiobookBookmarks,
  updateAudiobookBookmark,
  type AudiobookBookmark,
} from "../api/audiobookBookmarks";
import { type Book, getBookByUri } from "../api/books";
import { ApiError } from "../api/client";
import { getLegacyLoginUrl } from "../api/session";
import { getSiteUrl, toAbsoluteUrl } from "../api/url";
import { useAuth } from "../auth/AuthContext";
import {
  AudiobookPlayer,
  type AudiobookPlaybackEvent,
  type AudiobookPlayerHandle,
} from "../components/AudiobookPlayer";
import { AuthorLink, resolveAuthor } from "../components/AuthorLink";
import { BookCover } from "../components/BookCover";
import {
  clampPlaybackPosition,
  formatPlaybackTime,
  normalizePlaybackSeconds,
  parseSharedPlaybackPosition,
  resolveResumePosition,
} from "../features/listen/progress";
import {
  loadAudiobookProgress as loadLocalAudiobookProgress,
  saveAudiobookProgress as saveLocalAudiobookProgress,
} from "../features/listen/storage";
import { AppShell } from "../layout/AppShell";

export function AudiobookPlayerPage() {
  const { session } = useAuth();
  const { libro_uri = "" } = useParams();
  const { key: locationKey, search } = useLocation();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressReady, setProgressReady] = useState(false);
  const [resumePositionSeconds, setResumePositionSeconds] = useState(0);
  const [savedProgressSeconds, setSavedProgressSeconds] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [progressStatus, setProgressStatus] = useState<"idle" | "loading" | "synced" | "local" | "error">("idle");
  const [authPrompt, setAuthPrompt] = useState(false);
  const [authReason, setAuthReason] = useState<"progress" | "bookmark">("progress");
  const [guestPromptDismissed, setGuestPromptDismissed] = useState(false);
  const [headerSearch, setHeaderSearch] = useState("");
  const [bookmarks, setBookmarks] = useState<AudiobookBookmark[]>([]);
  const [bookmarksLoading, setBookmarksLoading] = useState(false);
  const [bookmarkError, setBookmarkError] = useState<string | null>(null);
  const [bookmarkAnnouncement, setBookmarkAnnouncement] = useState("");
  const [bookmarksPanelOpen, setBookmarksPanelOpen] = useState(false);
  const [bookmarkEditor, setBookmarkEditor] = useState<{ bookmark: AudiobookBookmark; note: string } | null>(null);
  const [shareComposer, setShareComposer] = useState<{ positionSeconds: number; bookmark: AudiobookBookmark | null; message: string } | null>(null);
  const [shareBusy, setShareBusy] = useState(false);
  const playerRef = useRef<AudiobookPlayerHandle | null>(null);
  const restoredProgressKeyRef = useRef("");
  const latestPositionRef = useRef(0);
  const lastQueuedPositionRef = useRef<number | null>(null);
  const lastHeartbeatAtRef = useRef(0);
  const saveQueueRef = useRef<Promise<void>>(Promise.resolve());
  const persistOnUnmountRef = useRef<(keepalive?: boolean) => void>(() => undefined);
  const bookAuthor = book ? resolveAuthor(book) : null;

  useEffect(() => {
    if (!bookmarksPanelOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setBookmarksPanelOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [bookmarksPanelOpen]);

  useEffect(() => {
    const nextQuery = new URLSearchParams(search).get("q") ?? "";
    setHeaderSearch(nextQuery);
  }, [search]);

  useEffect(() => {
    let cancelled = false;

    async function loadBook() {
      setLoading(true);
      setError(null);
      setBook(null);
      setIsReady(false);
      setIsPlaying(false);

      try {
        const nextBook = await getBookByUri(libro_uri);
        if (!cancelled) {
          if (import.meta.env.DEV) {
            console.log("listen book recursos.video_audiolibro", nextBook.recursos?.video_audiolibro);
          }
          setBook(nextBook);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : "No se pudo cargar el audiolibro.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadBook();

    return () => {
      cancelled = true;
    };
  }, [libro_uri]);

  const videoId = book?.recursos?.video_audiolibro?.trim() || "";
  const isPlayerAvailable = Boolean(videoId);
  const controlsDisabled = !isReady || !progressReady || !isPlayerAvailable;
  const progressPercent = durationSeconds > 0 ? Math.min(100, (currentSeconds / durationSeconds) * 100) : 0;
  const sharedPositionSeconds = parseSharedPlaybackPosition(new URLSearchParams(search).get("t"));

  const loadBookmarks = useCallback(async (signal?: AbortSignal) => {
    if (!book || !videoId || !session?.authenticated) {
      setBookmarks([]);
      return;
    }
    setBookmarksLoading(true);
    setBookmarkError(null);
    try {
      setBookmarks(await listAudiobookBookmarks(book.uri, signal));
    } catch (reason) {
      if (signal?.aborted) return;
      setBookmarkError(reason instanceof Error ? reason.message : "No se pudieron cargar los señaladores.");
    } finally {
      if (!signal?.aborted) setBookmarksLoading(false);
    }
  }, [book, session?.authenticated, videoId]);

  useEffect(() => {
    const controller = new AbortController();
    void loadBookmarks(controller.signal);
    return () => controller.abort();
  }, [loadBookmarks]);

  useEffect(() => {
    if (!book || !videoId) return;
    let cancelled = false;
    const localPosition = loadLocalAudiobookProgress(book.uri);
    const initialPosition = sharedPositionSeconds ?? localPosition;
    restoredProgressKeyRef.current = "";
    lastQueuedPositionRef.current = null;
    setGuestPromptDismissed(false);
    setAuthPrompt(false);
    setProgressReady(false);
    setSavedProgressSeconds(initialPosition);
    setResumePositionSeconds(initialPosition);
    setCurrentSeconds(initialPosition);
    latestPositionRef.current = initialPosition;

    if (!session?.authenticated) {
      setProgressStatus("local");
      setProgressReady(true);
      return;
    }

    setProgressStatus("loading");
    const progressController = new AbortController();
    const progressTimeout = window.setTimeout(() => progressController.abort(), 4000);
    void getAudiobookProgress(book.uri, progressController.signal)
      .then((remoteProgress) => {
        if (cancelled) return;
        const resumePosition = sharedPositionSeconds ?? resolveResumePosition(remoteProgress, localPosition);
        setResumePositionSeconds(resumePosition);
        setSavedProgressSeconds(resumePosition);
        setCurrentSeconds(resumePosition);
        latestPositionRef.current = resumePosition;
        saveLocalAudiobookProgress(book.uri, resumePosition);
        setProgressStatus("synced");
      })
      .catch(() => {
        if (cancelled) return;
        setProgressStatus("error");
      })
      .finally(() => {
        window.clearTimeout(progressTimeout);
        if (!cancelled) setProgressReady(true);
      });

    return () => {
      cancelled = true;
      window.clearTimeout(progressTimeout);
      progressController.abort();
    };
  }, [book, session?.authenticated, sharedPositionSeconds, videoId]);

  useEffect(() => {
    if (!book || !isReady || !progressReady) return;
    const restoreKey = `${book.uri}:${resumePositionSeconds}`;
    if (restoredProgressKeyRef.current === restoreKey) return;
    restoredProgressKeyRef.current = restoreKey;
    const duration = playerRef.current?.getDuration() || 0;
    const restoredPosition = duration > 0 ? Math.min(duration, resumePositionSeconds) : resumePositionSeconds;
    if (restoredPosition > 0) playerRef.current?.seekTo(restoredPosition);
    setCurrentSeconds(restoredPosition);
    latestPositionRef.current = restoredPosition;
    setDurationSeconds(duration);
  }, [book, isReady, progressReady, resumePositionSeconds]);

  const persistProgressSnapshot = useCallback((positionOverride?: number, keepalive = false) => {
    if (!book) return;
    const livePosition = normalizePlaybackSeconds(playerRef.current?.getCurrentTime() || 0);
    const position = normalizePlaybackSeconds(positionOverride ?? (livePosition > 0 ? livePosition : latestPositionRef.current));
    saveLocalAudiobookProgress(book.uri, position);
    setSavedProgressSeconds(position);
    setCurrentSeconds(position);
    latestPositionRef.current = position;

    if (!session?.authenticated || !session.csrf_token || !videoId) {
      setProgressStatus("local");
      return;
    }

    if (keepalive) {
      void saveRemoteAudiobookProgress(book.uri, position, videoId, session.csrf_token, true).catch(() => undefined);
      return;
    }
    if (lastQueuedPositionRef.current === position) return;
    lastQueuedPositionRef.current = position;
    saveQueueRef.current = saveQueueRef.current
      .catch(() => undefined)
      .then(async () => {
        try {
          const saved = await saveRemoteAudiobookProgress(book.uri, position, videoId, session.csrf_token!);
          setSavedProgressSeconds(saved.position_seconds);
          saveLocalAudiobookProgress(book.uri, saved.position_seconds);
          setProgressStatus("synced");
        } catch {
          setProgressStatus("error");
          lastQueuedPositionRef.current = null;
        }
      });
  }, [book, session?.authenticated, session?.csrf_token, videoId]);

  useEffect(() => {
    persistOnUnmountRef.current = (keepalive = false) => persistProgressSnapshot(undefined, keepalive);
  }, [persistProgressSnapshot]);

  useEffect(() => () => persistOnUnmountRef.current(true), [libro_uri]);

  useEffect(() => {
    const persistBeforeLeaving = () => persistProgressSnapshot(undefined, true);
    const persistWhenHidden = () => {
      if (document.visibilityState === "hidden") persistBeforeLeaving();
    };
    window.addEventListener("pagehide", persistBeforeLeaving);
    document.addEventListener("visibilitychange", persistWhenHidden);
    return () => {
      window.removeEventListener("pagehide", persistBeforeLeaving);
      document.removeEventListener("visibilitychange", persistWhenHidden);
    };
  }, [persistProgressSnapshot]);

  useEffect(() => {
    if (!isPlaying) return;
    lastHeartbeatAtRef.current = Date.now();
    const timer = window.setInterval(() => {
      const position = normalizePlaybackSeconds(playerRef.current?.getCurrentTime() || 0);
      setCurrentSeconds(position);
      latestPositionRef.current = position;
      setDurationSeconds(playerRef.current?.getDuration() || 0);
      if (Date.now() - lastHeartbeatAtRef.current >= 15000) {
        lastHeartbeatAtRef.current = Date.now();
        persistProgressSnapshot(position);
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isPlaying, persistProgressSnapshot]);

  function handlePlay() {
    if (!session?.authenticated && !guestPromptDismissed) {
      setAuthReason("progress");
      setAuthPrompt(true);
      return;
    }
    playerRef.current?.play();
  }

  function handlePause() {
    playerRef.current?.pause();
  }

  function handleTogglePlay() {
    if (isPlaying) {
      handlePause();
      return;
    }

    handlePlay();
  }

  function handleSeekBy(seconds: number) {
    const target = playerRef.current?.seekBy(seconds) ?? 0;
    setCurrentSeconds(target);
    latestPositionRef.current = target;
    persistProgressSnapshot(target);
  }

  function handleSeekTo(seconds: number) {
    const target = clampPlaybackPosition(seconds, durationSeconds);
    playerRef.current?.seekTo(target);
    setCurrentSeconds(target);
    latestPositionRef.current = target;
  }

  function persistSeekPosition() {
    persistProgressSnapshot(latestPositionRef.current);
  }

  function handlePlaybackStateChange(isNowPlaying: boolean, event?: AudiobookPlaybackEvent) {
    setIsPlaying(isNowPlaying);
    const position = normalizePlaybackSeconds(playerRef.current?.getCurrentTime() || latestPositionRef.current);
    setCurrentSeconds(position);
    latestPositionRef.current = position;
    setDurationSeconds(playerRef.current?.getDuration() || 0);
    if (event === "paused" || event === "ended") persistProgressSnapshot();
  }

  function continueAsGuest() {
    setGuestPromptDismissed(true);
    setAuthPrompt(false);
    if (authReason === "progress") playerRef.current?.play();
  }

  async function handleAddBookmark() {
    if (!book || !videoId || bookmarksLoading) return;
    if (!session?.authenticated || !session.csrf_token) {
      setAuthReason("bookmark");
      setAuthPrompt(true);
      return;
    }
    const position = normalizePlaybackSeconds(playerRef.current?.getCurrentTime() ?? latestPositionRef.current);
    setBookmarksLoading(true);
    setBookmarkError(null);
    try {
      const result = await createAudiobookBookmark(book.uri, position, videoId, session.csrf_token);
      const saved = result.bookmark;
      setBookmarks((current) => [...current.filter((item) => item.id !== saved.id), saved]
        .sort((a, b) => a.position_seconds - b.position_seconds || a.id - b.id));
      setBookmarkAnnouncement(result.created
        ? `Señalador agregado en ${formatPlaybackTime(saved.position_seconds)}.`
        : `Ya había un señalador en ${formatPlaybackTime(saved.position_seconds)}.`);
      setBookmarkEditor({ bookmark: saved, note: saved.note_text ?? "" });
    } catch (reason) {
      setBookmarkError(reason instanceof Error ? reason.message : "No se pudo agregar el señalador.");
      if (reason instanceof ApiError && reason.status === 409) void loadBookmarks();
    } finally {
      setBookmarksLoading(false);
    }
  }

  function openCurrentMomentShare() {
    const position = normalizePlaybackSeconds(playerRef.current?.getCurrentTime() ?? latestPositionRef.current);
    setBookmarkError(null);
    setShareComposer({ positionSeconds: position, bookmark: null, message: "" });
  }

  function openBookmarkShare(bookmark: AudiobookBookmark) {
    setBookmarksPanelOpen(false);
    setBookmarkError(null);
    setShareComposer({ positionSeconds: bookmark.position_seconds, bookmark, message: "" });
  }

  async function loadShareCover(): Promise<File | null> {
    const coverUrl = toAbsoluteUrl(book?.cover_url);
    if (!coverUrl) return null;
    try {
      const response = await fetch(coverUrl);
      if (!response.ok) return null;
      const blob = await response.blob();
      if (!blob.type.startsWith("image/")) return null;
      const extension = blob.type === "image/png" ? "png" : blob.type === "image/webp" ? "webp" : "jpg";
      return new File([blob], `portada-${book?.uri ?? "libro"}.${extension}`, { type: blob.type });
    } catch {
      return null;
    }
  }

  async function copyShareText(value: string) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return;
    }
    const textArea = document.createElement("textarea");
    textArea.value = value;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    const copied = document.execCommand("copy");
    textArea.remove();
    if (!copied) throw new Error("No se pudo copiar el enlace.");
  }

  async function handleShareMoment() {
    if (!shareComposer || !book || !videoId || shareBusy) return;
    if (shareComposer.message.length > 1000) {
      setBookmarkError("El mensaje no puede superar 1.000 caracteres.");
      return;
    }

    setShareBusy(true);
    setBookmarkError(null);
    try {
      let position = shareComposer.positionSeconds;
      if (!shareComposer.bookmark && session?.authenticated && session.csrf_token) {
        const result = await createAudiobookBookmark(book.uri, position, videoId, session.csrf_token);
        const saved = result.bookmark;
        position = saved.position_seconds;
        setBookmarks((current) => [...current.filter((item) => item.id !== saved.id), saved]
          .sort((a, b) => a.position_seconds - b.position_seconds || a.id - b.id));
      }

      const appBase = new URL(import.meta.env.BASE_URL, window.location.origin);
      const shareUrl = new URL(`listen/${encodeURIComponent(book.uri)}?t=${position}`, appBase).toString();
      const moment = `${book.titulo} — ${formatPlaybackTime(position)}`;
      const message = shareComposer.message.trim();
      const shareText = message ? `${message}\n\n${moment}` : moment;
      const clipboardText = `${shareText}\n${shareUrl}`;

      if (navigator.share) {
        const coverFile = await loadShareCover();
        const files = coverFile && navigator.canShare?.({ files: [coverFile] }) ? [coverFile] : undefined;
        await navigator.share({ title: book.titulo, text: shareText, url: shareUrl, files });
        const resultMessage = session?.authenticated && !shareComposer.bookmark
          ? "Señalador guardado y momento compartido."
          : "Momento compartido.";
        setBookmarkAnnouncement(book.cover_url
          ? files
            ? `${resultMessage} Se adjuntó la tapa.`
            : `${resultMessage} La aplicación no permitió adjuntar la tapa.`
          : resultMessage);
      } else {
        await copyShareText(clipboardText);
        setBookmarkAnnouncement(session?.authenticated && !shareComposer.bookmark
          ? "Señalador guardado y enlace copiado."
          : "Enlace copiado.");
      }
      setShareComposer(null);
    } catch (reason) {
      if (reason instanceof DOMException && reason.name === "AbortError") return;
      setBookmarkError(reason instanceof Error ? reason.message : "No se pudo compartir el momento.");
      if (reason instanceof ApiError && reason.status === 409) void loadBookmarks();
    } finally {
      setShareBusy(false);
    }
  }

  async function handleSaveBookmarkNote() {
    if (!bookmarkEditor || !session?.csrf_token) return;
    if (bookmarkEditor.note.length > 10000) {
      setBookmarkError("La nota no puede superar 10.000 caracteres.");
      return;
    }
    setBookmarksLoading(true);
    setBookmarkError(null);
    try {
      const updated = await updateAudiobookBookmark(
        bookmarkEditor.bookmark.id,
        bookmarkEditor.note.trim() || null,
        bookmarkEditor.bookmark.revision,
        session.csrf_token,
      );
      setBookmarks((current) => current.map((item) => item.id === updated.id ? updated : item));
      setBookmarkEditor(null);
      setBookmarkAnnouncement("Nota del señalador guardada.");
    } catch (reason) {
      setBookmarkError(reason instanceof Error ? reason.message : "No se pudo guardar la nota.");
      if (reason instanceof ApiError && reason.status === 409) {
        setBookmarkEditor(null);
        void loadBookmarks();
      }
    } finally {
      setBookmarksLoading(false);
    }
  }

  async function handleDeleteBookmark(bookmark: AudiobookBookmark) {
    if (!session?.csrf_token || !window.confirm(`¿Eliminar el señalador de ${formatPlaybackTime(bookmark.position_seconds)}?`)) return;
    setBookmarksLoading(true);
    setBookmarkError(null);
    try {
      await deleteAudiobookBookmark(bookmark.id, session.csrf_token);
      setBookmarks((current) => current.filter((item) => item.id !== bookmark.id));
      setBookmarkEditor(null);
      setBookmarkAnnouncement("Señalador eliminado.");
    } catch (reason) {
      setBookmarkError(reason instanceof Error ? reason.message : "No se pudo eliminar el señalador.");
    } finally {
      setBookmarksLoading(false);
    }
  }

  function submitHeaderSearch() {
    const normalizedQuery = headerSearch.trim();
    const params = new URLSearchParams();

    if (normalizedQuery) {
      params.set("q", normalizedQuery);
    }

    navigate(params.toString() ? `/search?${params.toString()}` : "/search");
  }

  function leaveAudiobook() {
    persistProgressSnapshot(undefined, true);
    if (locationKey !== "default" && window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.assign(getSiteUrl("/"));
  }

  return (
    <AppShell mode="immersive">
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-background-light font-sans text-slate-900 dark:bg-background-dark dark:text-slate-100">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 bg-background-light px-6 py-3 dark:border-slate-800 dark:bg-background-dark md:px-10">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
              <button
                aria-label="Volver"
                className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
                onClick={leaveAudiobook}
                type="button"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">PlanetaLibro</h2>
            </div>
            <nav className="hidden items-center gap-9 md:flex">
              {["Discover", "My Library", "Challenges", "Community"].map((item) => (
                <a
                  key={item}
                  className={`text-sm font-medium leading-normal transition-colors ${item === "My Library" ? "text-slate-900 dark:text-slate-100" : "text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary"}`}
                  href="#"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end gap-8">
            <form
              className="hidden h-10 min-w-40 max-w-64 flex-col sm:flex"
              onSubmit={(event) => {
                event.preventDefault();
                submitHeaderSearch();
              }}
            >
              <div className="flex h-full w-full flex-1 items-stretch overflow-hidden rounded-lg bg-white ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                <button className="flex items-center justify-center pl-4 text-slate-400 transition-colors hover:text-primary" type="submit">
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </button>
                <input
                  className="form-input flex h-full w-full flex-1 resize-none overflow-hidden rounded-lg rounded-l-none border-none bg-transparent px-4 pl-2 text-base font-normal leading-normal text-slate-900 placeholder:text-slate-400 focus:outline-0 focus:ring-0 dark:text-white"
                  onChange={(event) => setHeaderSearch(event.target.value)}
                  placeholder="Buscar libros o autores"
                  type="text"
                  value={headerSearch}
                />
              </div>
            </form>
            {book ? (
              <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-slate-100 dark:ring-slate-800">
                <BookCover alt={`Portada de ${book.titulo}`} book={book} className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800" />
            )}
          </div>
        </header>
        <main className="flex flex-grow flex-col items-center justify-start p-4 pb-28 sm:p-8 lg:justify-center">
          {loading ? (
            <div className="w-full max-w-[1200px] rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
              Cargando audiolibro...
            </div>
          ) : error || !book ? (
            <div className="w-full max-w-[1200px] rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
              {error ?? "No se encontró el audiolibro solicitado."}
            </div>
          ) : (
            <>
              <div className="mb-4 hidden w-full max-w-[1200px] flex-wrap gap-2 px-4 sm:flex lg:mb-8">
                <Link className="text-sm font-medium leading-normal text-slate-500 transition-colors hover:text-primary" to="/home">
                  Home
                </Link>
                <span className="text-sm font-medium leading-normal text-slate-500">/</span>
                <Link className="text-sm font-medium leading-normal text-slate-500 transition-colors hover:text-primary" to="/library">
                  My Library
                </Link>
                <span className="text-sm font-medium leading-normal text-slate-500">/</span>
                <span className="text-sm font-medium leading-normal text-slate-900 dark:text-white">{book.titulo}</span>
              </div>
              <h1 className="mb-4 w-full max-w-[1200px] px-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:hidden">{book.titulo}</h1>
              <div className="grid w-full max-w-[1200px] grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="order-2 flex flex-col items-center gap-6 lg:order-1 lg:col-span-5 lg:items-start">
                  <div className="group relative aspect-[2/3] w-[280px] overflow-hidden rounded-xl shadow-2xl transition-transform hover:scale-[1.02] sm:w-[360px]">
                    <BookCover alt={`Portada de ${book.titulo}`} book={book} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="mt-2 space-y-2 text-center lg:text-left">
                    <h1 className="hidden text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:block sm:text-4xl">{book.titulo}</h1>
                    <div className="space-y-1">
                      <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
                        By{" "}
                        <AuthorLink
                          className="text-current hover:underline underline-offset-2"
                          name={bookAuthor?.name ?? "Autor desconocido"}
                          uri={bookAuthor?.uri ?? null}
                        />
                      </p>
                      <p className="text-sm text-slate-400 dark:text-slate-500">
                        {videoId ? `Audiolibro disponible en YouTube (${videoId})` : "Sin audiolibro vinculado"}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full flex-wrap justify-center gap-3 lg:justify-start">
                    {["API", book.readOnline ? "Read Online" : "Catalog", book.idioma ?? "Sin idioma"].map((tag) => (
                      <span key={tag} className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    className="group mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-200 px-6 py-3 font-semibold text-slate-900 transition-all hover:bg-slate-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 sm:w-auto"
                    to={`/read/${book.uri}/`}
                  >
                    <span className="material-symbols-outlined text-[20px] transition-transform group-hover:scale-110">menu_book</span>
                    Cambiar a lectura
                  </Link>
                </div>
                <div className="order-1 flex flex-col justify-center lg:order-2 lg:col-span-7">
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-10">
                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
                    <div className="relative z-10 mb-4 sm:mb-6">
                      <AudiobookPlayer
                        ref={playerRef}
                        videoId={videoId}
                        title={book.titulo}
                        onReady={() => {
                          setDurationSeconds(playerRef.current?.getDuration() || 0);
                          setIsReady(true);
                        }}
                        onPlayStateChange={handlePlaybackStateChange}
                      />
                    </div>
                    <div className="relative z-10 flex flex-col gap-3">
                      <div className="group w-full">
                        <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                          <span>{formatPlaybackTime(currentSeconds)}</span>
                          <span>
                            {videoId
                              ? isReady
                                ? durationSeconds > 0
                                  ? formatPlaybackTime(durationSeconds)
                                  : "Duración no disponible"
                                : "Inicializando reproductor"
                              : "Sin audio"}
                          </span>
                        </div>
                        <div className="group relative h-5 touch-none">
                          <div className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 overflow-hidden rounded-full bg-slate-200 transition-shadow group-focus-within:ring-2 group-focus-within:ring-primary group-focus-within:ring-offset-2 dark:bg-slate-700 dark:ring-offset-slate-900">
                            <div className="absolute left-0 top-0 h-full rounded-full bg-primary transition-[width]" style={{ width: `${progressPercent}%` }} />
                          </div>
                          <input
                            aria-label={`Posición del audiolibro: ${formatPlaybackTime(currentSeconds)} de ${formatPlaybackTime(durationSeconds)}`}
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
                            disabled={controlsDisabled || durationSeconds <= 0}
                            max={Math.max(1, durationSeconds)}
                            min={0}
                            onBlur={persistSeekPosition}
                            onChange={(event) => handleSeekTo(Number(event.target.value))}
                            onKeyUp={persistSeekPosition}
                            onPointerUp={persistSeekPosition}
                            step={1}
                            type="range"
                            value={Math.min(currentSeconds, Math.max(1, durationSeconds))}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="flex items-center gap-6">
                          <button
                            className="text-slate-400 transition-colors hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:text-white"
                            disabled={controlsDisabled}
                            onClick={() => handleSeekBy(-10)}
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[32px]">replay_10</span>
                          </button>
                          <button
                            className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-slate-900"
                            disabled={controlsDisabled}
                            onClick={handleTogglePlay}
                            type="button"
                            aria-label={isPlaying ? "Pausar audiolibro" : "Reproducir audiolibro"}
                          >
                            <span className="material-symbols-outlined fill-1 text-[40px]">{isPlaying ? "pause" : "play_arrow"}</span>
                          </button>
                          <button
                            className="text-slate-400 transition-colors hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:text-white"
                            disabled={controlsDisabled}
                            onClick={() => handleSeekBy(30)}
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[32px]">forward_30</span>
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          aria-label="Velocidad de reproducción: 1.0x"
                          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-500 transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:border-primary dark:hover:text-primary"
                          disabled
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[20px]">speed</span>
                          <span className="text-xs">1.0</span>
                        </button>
                        <button
                          aria-label="Agregar señalador"
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:border-primary dark:hover:text-primary"
                          disabled={controlsDisabled || bookmarksLoading}
                          onClick={() => { void handleAddBookmark(); }}
                          title="Agregar señalador"
                          type="button"
                        >
                          <span aria-hidden="true" className="material-symbols-outlined text-[22px]">bookmark_add</span>
                        </button>
                        <button
                          aria-controls="audiobook-bookmarks-panel"
                          aria-expanded={bookmarksPanelOpen}
                          aria-label="Abrir mis señaladores"
                          className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:border-primary dark:hover:text-primary"
                          onClick={() => setBookmarksPanelOpen(true)}
                          title="Mis señaladores"
                          type="button"
                        >
                          <span aria-hidden="true" className="material-symbols-outlined text-[22px]">bookmarks</span>
                          {bookmarks.length > 0 && (
                            <span className="absolute -right-1.5 -top-1.5 min-w-5 rounded-full bg-primary px-1 text-center text-[10px] font-bold leading-5 text-white" aria-hidden="true">
                              {bookmarks.length > 99 ? "99+" : bookmarks.length}
                            </span>
                          )}
                        </button>
                        <button
                          aria-label="Compartir momento actual"
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:border-primary dark:hover:text-primary"
                          disabled={controlsDisabled || shareBusy}
                          onClick={openCurrentMomentShare}
                          title="Compartir momento actual"
                          type="button"
                        >
                          <span aria-hidden="true" className="material-symbols-outlined text-[22px]">share</span>
                        </button>
                      </div>
                      {bookmarkAnnouncement && <p aria-live="polite" className="text-center text-xs font-medium text-emerald-700 dark:text-emerald-400">{bookmarkAnnouncement}</p>}
                      {bookmarkError && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300" role="alert">{bookmarkError}</p>}
                    </div>
                    <a
                      className="group relative z-10 mt-4 flex w-full items-center justify-center rounded-xl border border-amber-300/70 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 px-3 py-2.5 text-center text-[13px] font-bold leading-none text-amber-950 shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 sm:gap-3 sm:px-5 sm:py-3 sm:text-base sm:leading-normal"
                      href={getSiteUrl("/como_descargar_audiolibros_gratis.php")}
                    >
                      <span aria-hidden="true" className="material-symbols-outlined hidden text-[22px] transition-transform group-hover:scale-110 sm:inline">headphones</span>
                      <span className="whitespace-nowrap">Escúchalo con narración profesional</span>
                    </a>
                    <div className="mt-5 hidden border-t border-slate-200 pt-4 dark:border-slate-800 sm:block">
                      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Up Next in Queue</h3>
                      <div className="group flex cursor-pointer items-center gap-4 rounded-lg p-3 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded">
                          <BookCover alt={`Portada de ${book.titulo}`} book={book} className="h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-base font-semibold text-slate-900 transition-colors group-hover:text-primary dark:text-white">{book.titulo}</h4>
                          <AuthorLink
                            className="text-sm text-slate-500 dark:text-slate-400"
                            name={bookAuthor?.name ?? "Autor desconocido"}
                            uri={bookAuthor?.uri ?? null}
                          />
                        </div>
                        <button className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition-all hover:border-primary hover:bg-primary hover:text-white dark:border-slate-600">
                          <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
        {bookmarksPanelOpen && (
          <div
            className="fixed inset-0 z-[90] flex items-end justify-center bg-black/55 sm:items-stretch sm:justify-end"
            onClick={() => setBookmarksPanelOpen(false)}
            role="presentation"
          >
            <section
              aria-labelledby="audiobook-bookmarks-title"
              aria-modal="true"
              className="flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white text-slate-900 shadow-2xl sm:h-full sm:max-h-none sm:max-w-md sm:rounded-l-2xl sm:rounded-tr-none dark:bg-slate-900 dark:text-slate-100"
              id="audiobook-bookmarks-panel"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
            >
              <header className="flex items-center gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-800">
                <span aria-hidden="true" className="material-symbols-outlined text-[26px] text-primary">bookmarks</span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-bold" id="audiobook-bookmarks-title">Mis señaladores</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {bookmarks.length === 1 ? "1 punto guardado" : `${bookmarks.length} puntos guardados`}
                  </p>
                </div>
                {session?.authenticated && bookmarksLoading ? <span className="text-xs text-slate-400" role="status">Actualizando…</span> : null}
                <button
                  aria-label="Cerrar mis señaladores"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary dark:hover:bg-slate-800 dark:hover:text-white"
                  onClick={() => setBookmarksPanelOpen(false)}
                  type="button"
                >
                  <span aria-hidden="true" className="material-symbols-outlined">close</span>
                </button>
              </header>
              <div className="flex-1 overflow-y-auto p-5">
                {bookmarkError && <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300" role="alert">{bookmarkError}</p>}
                {!session?.authenticated ? (
                  <div className="grid min-h-48 place-items-center text-center">
                    <div>
                      <span aria-hidden="true" className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">bookmark</span>
                      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Iniciá sesión para guardar y consultar señaladores.</p>
                      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                        <button
                          className="rounded-lg px-4 py-2 font-bold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                          onClick={() => setBookmarksPanelOpen(false)}
                          type="button"
                        >Más tarde</button>
                        <a
                          className="rounded-lg bg-primary px-4 py-2 font-bold text-white hover:brightness-95"
                          href={getLegacyLoginUrl(`${window.location.pathname}${window.location.search}`)}
                        >Crear cuenta o iniciar sesión</a>
                      </div>
                    </div>
                  </div>
                ) : bookmarksLoading && bookmarks.length === 0 ? (
                  <p className="py-10 text-center text-sm text-slate-500" role="status">Cargando señaladores…</p>
                ) : bookmarks.length === 0 ? (
                  <div className="grid min-h-48 place-items-center text-center">
                    <div>
                      <span aria-hidden="true" className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">bookmark_add</span>
                      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Todavía no agregaste señaladores a este audiolibro.</p>
                    </div>
                  </div>
                ) : (
                  <ol className="space-y-3">
                    {bookmarks.map((bookmark) => (
                      <li className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60" key={bookmark.id}>
                        <div className="flex items-center gap-2">
                          <button
                            className="flex shrink-0 items-center gap-1 rounded-lg bg-primary px-3 py-2 text-sm font-bold text-white hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            onClick={() => {
                              handleSeekTo(bookmark.position_seconds);
                              setBookmarksPanelOpen(false);
                            }}
                            type="button"
                          >
                            <span aria-hidden="true" className="material-symbols-outlined text-[18px]">play_arrow</span>
                            {formatPlaybackTime(bookmark.position_seconds)}
                          </button>
                          <span className="min-w-0 flex-1" />
                          <button
                            aria-label={`Editar señalador de ${formatPlaybackTime(bookmark.position_seconds)}`}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary dark:hover:bg-slate-700 dark:hover:text-white"
                            onClick={() => {
                              setBookmarksPanelOpen(false);
                              setBookmarkEditor({ bookmark, note: bookmark.note_text ?? "" });
                            }}
                            type="button"
                          ><span aria-hidden="true" className="material-symbols-outlined text-[19px]">edit_note</span></button>
                          <button
                            aria-label={`Compartir señalador de ${formatPlaybackTime(bookmark.position_seconds)}`}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-primary/10 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                            onClick={() => openBookmarkShare(bookmark)}
                            type="button"
                          ><span aria-hidden="true" className="material-symbols-outlined text-[19px]">share</span></button>
                          <button
                            aria-label={`Eliminar señalador de ${formatPlaybackTime(bookmark.position_seconds)}`}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-red-100 hover:text-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-300"
                            onClick={() => { void handleDeleteBookmark(bookmark); }}
                            type="button"
                          ><span aria-hidden="true" className="material-symbols-outlined text-[19px]">delete</span></button>
                        </div>
                        {bookmark.note_text?.trim() ? (
                          <p className="mt-3 whitespace-pre-wrap break-words border-t border-slate-200 pt-3 text-sm leading-6 text-slate-600 dark:border-slate-700 dark:text-slate-300">{bookmark.note_text}</p>
                        ) : null}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </section>
          </div>
        )}
        {shareComposer && book && (
          <div
            className="fixed inset-0 z-[95] grid place-items-center bg-black/55 p-4"
            onClick={() => { if (!shareBusy) setShareComposer(null); }}
            role="presentation"
          >
            <section
              aria-labelledby="audiobook-share-title"
              aria-modal="true"
              className="w-full max-w-lg rounded-2xl bg-white p-6 text-slate-900 shadow-2xl dark:bg-slate-900 dark:text-slate-100"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
            >
              <div className="flex items-start gap-3">
                <span aria-hidden="true" className="material-symbols-outlined mt-0.5 text-[26px] text-primary">share</span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-bold" id="audiobook-share-title">Compartir este momento</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {book.titulo} · {formatPlaybackTime(shareComposer.positionSeconds)}
                  </p>
                </div>
                <button
                  aria-label="Cerrar"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary dark:hover:bg-slate-800 dark:hover:text-white"
                  disabled={shareBusy}
                  onClick={() => setShareComposer(null)}
                  type="button"
                ><span aria-hidden="true" className="material-symbols-outlined">close</span></button>
              </div>
              <label className="mt-5 block text-sm font-semibold">
                Mensaje opcional
                <textarea
                  autoFocus
                  className="mt-2 min-h-28 w-full rounded-lg border border-slate-300 bg-white p-3 font-normal text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  maxLength={1000}
                  onChange={(event) => setShareComposer({ ...shareComposer, message: event.target.value })}
                  placeholder="Escribí algo para acompañar el enlace…"
                  value={shareComposer.message}
                />
              </label>
              <div className="mt-1 flex min-h-6 items-center justify-between gap-3">
                {shareComposer.bookmark?.note_text ? (
                  <button
                    className="text-xs font-semibold text-primary hover:underline"
                    onClick={() => setShareComposer({ ...shareComposer, message: shareComposer.bookmark?.note_text?.slice(0, 1000) ?? "" })}
                    type="button"
                  >Usar mi nota como mensaje</button>
                ) : <span />}
                <span className="text-xs text-slate-400">{shareComposer.message.length}/1000</span>
              </div>
              <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                {shareComposer.bookmark
                  ? "Tu nota privada no se comparte salvo que elijas usarla como mensaje."
                  : session?.authenticated
                    ? "Al continuar se guardará un señalador estándar en este momento."
                    : "El enlace se compartirá sin guardar un señalador. Iniciá sesión si querés conservarlo."}
              </p>
              {bookmarkError && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300" role="alert">{bookmarkError}</p>}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  className="rounded-lg px-4 py-2 font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-50 dark:text-slate-200 dark:hover:bg-slate-800"
                  disabled={shareBusy}
                  onClick={() => setShareComposer(null)}
                  type="button"
                >Cancelar</button>
                <button
                  className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-bold text-white hover:brightness-95 disabled:opacity-50"
                  disabled={shareBusy}
                  onClick={() => { void handleShareMoment(); }}
                  type="button"
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-[19px]">share</span>
                  {shareBusy
                    ? "Preparando…"
                    : !shareComposer.bookmark && session?.authenticated
                      ? "Guardar y compartir"
                      : "Compartir"}
                </button>
              </div>
            </section>
          </div>
        )}
        {bookmarkEditor && (
          <div className="fixed inset-0 z-[95] grid place-items-center bg-black/55 p-4" role="presentation">
            <div aria-labelledby="audiobook-note-title" aria-modal="true" className="w-full max-w-lg rounded-2xl bg-white p-6 text-slate-900 shadow-2xl dark:bg-slate-900 dark:text-slate-100" role="dialog">
              <h2 className="text-xl font-bold" id="audiobook-note-title">Nota del señalador</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Momento: {formatPlaybackTime(bookmarkEditor.bookmark.position_seconds)}</p>
              <label className="mt-5 block text-sm font-semibold">
                Nota opcional
                <textarea autoFocus className="mt-2 min-h-32 w-full rounded-lg border border-slate-300 bg-white p-3 font-normal text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white" maxLength={10000} onChange={(event) => setBookmarkEditor({ ...bookmarkEditor, note: event.target.value })} value={bookmarkEditor.note} />
              </label>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <button className="rounded-lg px-3 py-2 text-sm font-bold text-red-700 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/30" onClick={() => { void handleDeleteBookmark(bookmarkEditor.bookmark); }} type="button">Eliminar</button>
                <div className="flex gap-3">
                  <button className="rounded-lg px-4 py-2 font-bold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800" onClick={() => setBookmarkEditor(null)} type="button">Cancelar</button>
                  <button className="rounded-lg bg-primary px-4 py-2 font-bold text-white hover:brightness-95 disabled:opacity-50" disabled={bookmarksLoading} onClick={() => { void handleSaveBookmarkNote(); }} type="button">Guardar</button>
                </div>
              </div>
            </div>
          </div>
        )}
        {authPrompt && (
          <div className="fixed inset-0 z-[90] grid place-items-center bg-black/55 p-4" role="presentation">
            <div
              aria-labelledby="audiobook-auth-title"
              aria-modal="true"
              className="w-full max-w-lg rounded-2xl bg-white p-6 text-slate-900 shadow-2xl dark:bg-slate-900 dark:text-slate-100"
              role="dialog"
            >
              <h2 className="text-xl font-bold" id="audiobook-auth-title">{authReason === "bookmark" ? "Guardá tus señaladores" : "Guardá el avance de tus audiolibros"}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {authReason === "bookmark"
                  ? "Creá una cuenta gratuita o iniciá sesión para conservar señaladores y notas en todos tus dispositivos."
                  : "Creá una cuenta gratuita o iniciá sesión para conservar tu posición y recuperarla desde cualquier dispositivo."}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                <button
                  className="rounded-lg px-4 py-2 font-bold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  onClick={continueAsGuest}
                  type="button"
                >
                  Más tarde
                </button>
                <a
                  className="rounded-lg bg-primary px-4 py-2 font-bold text-white hover:brightness-95"
                  href={getLegacyLoginUrl(`${window.location.pathname}${window.location.search}`)}
                >
                  Crear cuenta o iniciar sesión
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
