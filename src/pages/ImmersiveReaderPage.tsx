import { CSSProperties, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createAnchor, resolveAnchor } from "../features/reader/anchors";
import { sanitizeFragment } from "../features/reader/sanitize";
import { getLegacyReaderUrl, getReaderRoot, loadFragment, loadManifest } from "../features/reader/source";
import { loadPreferences, loadProgress, savePreferences, saveProgress } from "../features/reader/storage";
import { ReaderAnchor, ReaderManifest, ReaderPreferences } from "../features/reader/types";
import { AppShell } from "../layout/AppShell";
import { ReaderBrandBar } from "../components/ReaderBrandBar";
import { useAuth } from "../auth/AuthContext";
import { getReaderProgress, saveReaderProgress } from "../api/readerProgress";
import { useReaderGestures } from "../features/reader/useReaderGestures";

const LOAD_BATCH = 8;

type ReaderTextSelection = { text: string; fragmentPage: number };

function readableTitle(uri: string): string {
  const words = uri.split("-");
  const titleStart = ["y", "e", "o", "u"].includes(words[2]?.toLowerCase()) ? 1 : 2;
  return words.slice(titleStart).join(" ").replace(/\b\w/g, (letter) => letter.toUpperCase()) || uri;
}

function themeColors(theme: ReaderPreferences["theme"]): { background: string; foreground: string; muted: string; panel: string } {
  if (theme === "dark") return { background: "#111418", foreground: "#e8e2d5", muted: "#a7a29a", panel: "#191d22" };
  if (theme === "light") return { background: "#fbfaf7", foreground: "#25221e", muted: "#746f67", panel: "#ffffff" };
  return { background: "#f4ecd8", foreground: "#3f3528", muted: "#74634e", panel: "#fff8e8" };
}

function getSelectedReaderText(root: HTMLElement | null): ReaderTextSelection | null {
  if (!root) return null;
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return null;
  const range = selection.getRangeAt(0);
  if (!root.contains(range.startContainer) || !root.contains(range.endContainer)) return null;
  const text = selection.toString().trim();
  if (!text) return null;
  const startElement = range.startContainer instanceof Element
    ? range.startContainer
    : range.startContainer.parentElement;
  const fragment = startElement?.closest<HTMLElement>("[data-reader-fragment]");
  if (!fragment || !root.contains(fragment)) return null;
  const fragmentPage = Number.parseInt(fragment.dataset.readerFragment ?? "", 10);
  return Number.isInteger(fragmentPage) && fragmentPage > 0 ? { text, fragmentPage } : null;
}

export function ImmersiveReaderPage() {
  const { session } = useAuth();
  const { libro_uri = "", page } = useParams();
  const requestedPage = Math.max(1, Number.parseInt(page ?? "1", 10) || 1);
  const [manifest, setManifest] = useState<ReaderManifest | null>(null);
  const [fragments, setFragments] = useState<Map<number, string>>(new Map());
  const [preferences, setPreferences] = useState<ReaderPreferences>(() => loadPreferences());
  const [visualPage, setVisualPage] = useState(0);
  const [visualPages, setVisualPages] = useState(1);
  const [visualPageWidth, setVisualPageWidth] = useState(1);
  const [columnGeometry, setColumnGeometry] = useState<{ width: number; gap: number } | null>(null);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [panel, setPanel] = useState<"index" | "preferences" | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [repaginating, setRepaginating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [hasShareSelection, setHasShareSelection] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleFragmentPage, setVisibleFragmentPage] = useState(1);
  const [serverPageReady, setServerPageReady] = useState(false);
  const [restoredAnchor, setRestoredAnchor] = useState<ReaderAnchor | null>(null);
  const [layoutReady, setLayoutReady] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelButtonRef = useRef<HTMLButtonElement>(null);
  const gestureLock = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);
  const shareSelectionRef = useRef<ReaderTextSelection | null>(null);
  const pendingAnchor = useRef<ReaderAnchor | null>(null);
  const pendingFragmentPage = useRef<number | null>(null);
  const pendingIndexPrefetch = useRef<{ start: number; end: number } | null>(null);
  const navigateAfterLayout = useRef(0);
  const lastServerPage = useRef<{ uri: string; page: number } | null>(null);
  const colors = themeColors(preferences.theme);
  const loadedPages = useMemo(() => [...fragments.keys()].sort((a, b) => a - b), [fragments]);
  const firstLoadedPage = loadedPages[0];
  const lastLoadedPage = loadedPages[loadedPages.length - 1];

  const captureAnchor = useCallback((): ReaderAnchor | null => {
    const root = contentRef.current;
    if (!root) return null;
    const viewport = viewportRef.current;
    let target: Element | null = null;
    if (viewport) {
      const rect = viewport.getBoundingClientRect();
      target = document.elementFromPoint(rect.left + rect.width / 2, rect.top + Math.min(96, rect.height / 3));
    }
    return createAnchor(root, target);
  }, []);

  const persistProgress = useCallback(() => {
    if (!manifest) return;
    const anchor = captureAnchor();
    if (!anchor) return;
    saveProgress({ version: 1, uri: libro_uri, manifestVersion: manifest.generated_at, anchor, updatedAt: new Date().toISOString() });
  }, [captureAnchor, libro_uri, manifest]);

  const loadRange = useCallback(async (start: number, end: number, signal?: AbortSignal, blocking = true) => {
    if (!manifest) return;
    const missing: number[] = [];
    for (let value = Math.max(1, start); value <= Math.min(manifest.pages, end); value += 1) if (!fragments.has(value)) missing.push(value);
    if (!missing.length) return;
    if (blocking) {
      const anchor = captureAnchor();
      if (anchor) {
        pendingAnchor.current = anchor;
        setRepaginating(true);
      }
    }
    setLoadingMore(true);
    try {
      const values = await Promise.all(missing.map(async (number) => [number, await loadFragment(libro_uri, number, manifest.pages, signal)] as const));
      setFragments((current) => {
        const next = new Map(current);
        values.forEach(([number, html]) => next.set(number, html));
        return next;
      });
    } catch (reason) {
      if (blocking) {
        pendingAnchor.current = null;
        navigateAfterLayout.current = 0;
        setRepaginating(false);
      }
      throw reason;
    } finally { setLoadingMore(false); }
  }, [captureAnchor, fragments, libro_uri, manifest]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError(null); setManifest(null); setFragments(new Map()); setLayoutReady(false); setVisualPage(0); setVisibleFragmentPage(1); setServerPageReady(false);
    loadManifest(libro_uri, controller.signal)
      .then(async (nextManifest) => {
        setManifest(nextManifest);
        const local = loadProgress(libro_uri);
        setRestoredAnchor(page === undefined ? local?.anchor ?? null : null);
        const savedPage = page === undefined && session?.authenticated
          ? await getReaderProgress(libro_uri).catch(() => null)
          : null;
        const preferredPage = savedPage ?? (page === undefined ? nextManifest.paginicio : requestedPage);
        const start = Math.min(nextManifest.pages, preferredPage);
        pendingFragmentPage.current = savedPage !== null || page !== undefined ? start : null;
        const from = page === undefined ? Math.max(1, start - 1) : start;
        const to = Math.min(nextManifest.pages, start + LOAD_BATCH - 1);
        const values = await Promise.all(Array.from({ length: to - from + 1 }, (_, offset) => from + offset).map(async (number) => [number, await loadFragment(libro_uri, number, nextManifest.pages, controller.signal)] as const));
        setFragments(new Map(values));
      })
      .catch((reason: unknown) => {
        if (!controller.signal.aborted) {
          const message = reason instanceof Error ? reason.message : "No se pudo abrir este libro.";
          setError(message);
        }
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [libro_uri, page, requestedPage, session?.authenticated]);

  const sanitizedHtml = useMemo(() => {
    let blockIndex = 0;
    return loadedPages.map((number) => {
      const result = sanitizeFragment(fragments.get(number) ?? "", getReaderRoot(libro_uri), blockIndex);
      blockIndex += result.blockCount;
      return `<div class="reader-fragment" data-reader-fragment="${number}">${result.html}</div>`;
    }).join("");
  }, [fragments, libro_uri, loadedPages]);

  const recalculate = useCallback((anchor?: ReaderAnchor | null, advance = 0, fragmentPage?: number | null) => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!viewport || !content) return;
    const width = Math.max(1, viewport.clientWidth);
    const viewportStyle = getComputedStyle(viewport);
    const horizontalPadding = (Number.parseFloat(viewportStyle.paddingLeft) || 0) + (Number.parseFloat(viewportStyle.paddingRight) || 0);
    const columnWidth = Math.max(1, width - horizontalPadding);
    const columnGap = Math.max(0, width - columnWidth);
    setColumnGeometry((current) => current && Math.abs(current.width - columnWidth) < 0.1 && Math.abs(current.gap - columnGap) < 0.1
      ? current
      : { width: columnWidth, gap: columnGap });
    const pages = preferences.mode === "paged" ? Math.max(1, Math.ceil(content.scrollWidth / width)) : 1;
    setVisualPageWidth(width);
    setLayoutReady(true);
    setVisualPages(pages);
    if (anchor || fragmentPage) {
      const fragmentTarget = fragmentPage
        ? content.querySelector(`[data-reader-fragment="${fragmentPage}"]`)
        : null;
      const target = fragmentTarget ?? (anchor ? resolveAnchor(content, anchor) : null);
      if (target) {
        if (preferences.mode === "paged") {
          const targetRect = (target as HTMLElement).getClientRects()[0] ?? target.getBoundingClientRect();
          const contentRect = content.getBoundingClientRect();
          const targetOffset = Math.max(0, targetRect.left - contentRect.left);
          const next = Math.min(pages - 1, Math.max(0, Math.floor(targetOffset / width) + advance));
          setVisualPage(next);
        } else target.scrollIntoView({ block: "start" });
      }
    }
  }, [preferences.mode]);

  useLayoutEffect(() => {
    if (!sanitizedHtml || !contentRef.current) return;
    let cancelled = false;
    const settleLayout = async () => {
      const content = contentRef.current;
      if (!content) return;
      const fonts = document.fonts?.ready ?? Promise.resolve();
      const images = [...content.querySelectorAll("img")].map((image) => image.complete
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            image.addEventListener("load", () => resolve(), { once: true });
            image.addEventListener("error", () => resolve(), { once: true });
          }));
      await Promise.race([
        Promise.all([fonts, ...images]),
        new Promise((resolve) => window.setTimeout(resolve, 2500)),
      ]);
      await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      if (cancelled) return;
      const anchor = restoredAnchor ?? pendingAnchor.current;
      recalculate(anchor, navigateAfterLayout.current, pendingFragmentPage.current);
      setRestoredAnchor(null);
      pendingAnchor.current = null;
      pendingFragmentPage.current = null;
      navigateAfterLayout.current = 0;
      setRepaginating(false);
    };
    void settleLayout();
    return () => { cancelled = true; };
  }, [columnGeometry?.gap, columnGeometry?.width, recalculate, restoredAnchor, sanitizedHtml, visualPageWidth]);

  useEffect(() => {
    if (
      !manifest
      || !layoutReady
      || loadingMore
      || repaginating
      || pendingIndexPrefetch.current
      || !lastLoadedPage
      || lastLoadedPage >= manifest.pages
    ) return;

    const nearPagedEnd = preferences.mode === "paged" && visualPage >= Math.max(0, visualPages - 2);
    const nearScrollEnd = preferences.mode === "scroll" && scrollProgress >= 0.8;
    if (!nearPagedEnd && !nearScrollEnd) return;

    if (nearScrollEnd) setScrollProgress(0);

    void loadRange(lastLoadedPage + 1, lastLoadedPage + LOAD_BATCH, undefined, false)
      .catch(() => setAnnouncement("No se pudo precargar el siguiente tramo. Intenta avanzar nuevamente."));
  }, [lastLoadedPage, layoutReady, loadRange, loadingMore, manifest, preferences.mode, repaginating, scrollProgress, visualPage, visualPages]);

  useEffect(() => {
    const range = pendingIndexPrefetch.current;
    if (!range || !layoutReady || repaginating || loadingMore) return;
    pendingIndexPrefetch.current = null;
    void loadRange(range.start, range.end, undefined, false)
      .catch(() => setAnnouncement("El capítulo está disponible, pero no se pudo precargar el tramo siguiente."));
  }, [layoutReady, loadRange, loadingMore, repaginating]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    let previousWidth = viewport.clientWidth;
    let previousHeight = viewport.clientHeight;
    const observer = new ResizeObserver(() => {
      const width = viewport.clientWidth;
      const height = viewport.clientHeight;
      if (width === previousWidth && height === previousHeight) return;
      previousWidth = width;
      previousHeight = height;
      if (pendingAnchor.current) return;
      const anchor = captureAnchor();
      requestAnimationFrame(() => recalculate(anchor));
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [captureAnchor, recalculate]);

  useEffect(() => {
    savePreferences(preferences);
  }, [preferences]);

  const clearShareSelection = useCallback(() => {
    shareSelectionRef.current = null;
    setHasShareSelection(false);
    window.getSelection()?.removeAllRanges();
  }, []);

  useEffect(() => clearShareSelection(), [clearShareSelection, libro_uri]);

  useEffect(() => {
    const rememberSelection = () => {
      const selected = getSelectedReaderText(contentRef.current);
      if (!selected) return;
      shareSelectionRef.current = selected;
      setHasShareSelection(true);
      setControlsVisible(true);
      if (hideTimer.current) {
        window.clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
    };
    document.addEventListener("selectionchange", rememberSelection);
    return () => document.removeEventListener("selectionchange", rememberSelection);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(persistProgress, 1500);
    const onVisibility = () => { if (document.visibilityState === "hidden") persistProgress(); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => { window.clearInterval(interval); document.removeEventListener("visibilitychange", onVisibility); persistProgress(); };
  }, [persistProgress]);

  const scheduleHide = useCallback(() => {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    if (panel || hasShareSelection) return;
    hideTimer.current = window.setTimeout(() => setControlsVisible(false), 3500);
  }, [hasShareSelection, panel]);

  const goToVisualPage = useCallback(async (next: number) => {
    const viewport = viewportRef.current;
    if (!viewport || preferences.mode !== "paged") return;
    clearShareSelection();
    if (next < 0 && manifest && firstLoadedPage > 1) {
      navigateAfterLayout.current = -1;
      await loadRange(firstLoadedPage - LOAD_BATCH, firstLoadedPage - 1);
      return;
    }
    if (next >= visualPages && manifest && lastLoadedPage < manifest.pages) {
      navigateAfterLayout.current = 1;
      await loadRange(lastLoadedPage + 1, lastLoadedPage + LOAD_BATCH);
      return;
    }
    const clamped = Math.min(visualPages - 1, Math.max(0, next));
    setVisualPage(clamped);
    setAnnouncement(`Página visual ${clamped + 1} de ${visualPages}`);
    scheduleHide();
  }, [clearShareSelection, firstLoadedPage, lastLoadedPage, loadRange, manifest, preferences.mode, scheduleHide, visualPages]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { if (panel) setPanel(null); else setControlsVisible(true); return; }
      const target = event.target as HTMLElement | null;
      if (target?.matches("input,select,button,a,textarea")) return;
      if (preferences.mode === "paged" && ["ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); void goToVisualPage(visualPage + 1); }
      if (preferences.mode === "paged" && ["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); void goToVisualPage(visualPage - 1); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToVisualPage, panel, preferences.mode, visualPage]);

  useEffect(() => {
    if (panel) { panelRef.current?.focus(); setControlsVisible(true); }
    else panelButtonRef.current?.focus();
  }, [panel]);

  const chapter = useMemo(() => {
    if (!manifest || !loadedPages.length) return "Inicio";
    const ratio = preferences.mode === "paged" ? visualPage / Math.max(1, visualPages - 1) : 0;
    const approximate = loadedPages[0] + Math.round((lastLoadedPage - loadedPages[0]) * ratio);
    return [...manifest.index].reverse().find((item) => item.pag <= approximate)?.titulo || "Inicio";
  }, [lastLoadedPage, loadedPages, manifest, preferences.mode, visualPage, visualPages]);
  function updatePreferences(patch: Partial<ReaderPreferences>) {
    const anchor = captureAnchor();
    setRestoredAnchor(anchor);
    setPreferences((current) => ({ ...current, ...patch }));
  }

  function leaveReader() {
    persistProgress();
    // TEMPORAL: para restaurar el retorno original, volver a usar navigate(-1)
    // cuando location.key !== "default" y navigate(`/book/${libro_uri}`) en caso contrario.
    window.location.assign(`https://planetalibro.net/libro/${encodeURIComponent(libro_uri)}`);
  }

  function firstVisibleFragment(): number {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!viewport || !content) return firstLoadedPage ?? 1;
    const viewportRect = viewport.getBoundingClientRect();
    const fragmentElements = content.querySelectorAll<HTMLElement>("[data-reader-fragment]");
    for (const fragment of fragmentElements) {
      const visible = [...fragment.getClientRects()].some((rect) => (
        rect.right > viewportRect.left
        && rect.left < viewportRect.right
        && rect.bottom > viewportRect.top
        && rect.top < viewportRect.bottom
      ));
      if (visible) return Number.parseInt(fragment.dataset.readerFragment ?? "", 10) || firstLoadedPage || 1;
    }
    return firstLoadedPage ?? 1;
  }

  useLayoutEffect(() => {
    if (!layoutReady) return;
    const nextPage = firstVisibleFragment();
    setVisibleFragmentPage((current) => current === nextPage ? current : nextPage);
  }, [firstLoadedPage, layoutReady, preferences.mode, sanitizedHtml, scrollProgress, visualPage]);

  useEffect(() => {
    if (!layoutReady || !manifest) return;
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        const nextPage = firstVisibleFragment();
        setVisibleFragmentPage(nextPage);
        setServerPageReady(true);
      });
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      if (secondFrame) cancelAnimationFrame(secondFrame);
    };
  }, [layoutReady, manifest, sanitizedHtml, visualPage]);

  useEffect(() => {
    if (!session?.authenticated || !serverPageReady || !manifest) return;
    const previous = lastServerPage.current;
    if (previous?.uri === libro_uri && previous.page === visibleFragmentPage) return;
    lastServerPage.current = { uri: libro_uri, page: visibleFragmentPage };
    void saveReaderProgress(libro_uri, visibleFragmentPage).catch(() => {
      lastServerPage.current = previous;
    });
  }, [libro_uri, manifest, serverPageReady, session?.authenticated, visibleFragmentPage]);

  const fragmentProgress = manifest
    ? Math.min(100, Math.max(0, Math.round((visibleFragmentPage / manifest.pages) * 100)))
    : 0;

  async function shareLocation() {
    const selectedText = getSelectedReaderText(contentRef.current) ?? shareSelectionRef.current;
    const fragmentPage = selectedText?.fragmentPage ?? firstVisibleFragment();
    const appBase = new URL(import.meta.env.BASE_URL, window.location.origin);
    const shareUrl = new URL(`read/${encodeURIComponent(libro_uri)}/${fragmentPage}`, appBase).toString();
    const title = readableTitle(libro_uri);
    const shareText = selectedText?.text ?? `Continúa leyendo ${title}`;
    const clipboardText = selectedText ? `${shareText}\n\n${shareUrl}` : shareUrl;
    try {
      if (navigator.share) {
        if (selectedText) window.getSelection()?.removeAllRanges();
        await navigator.share(selectedText
          ? { title, text: clipboardText }
          : { title, text: shareText, url: shareUrl });
        setAnnouncement(selectedText ? "Texto seleccionado compartido." : "Ubicación compartida.");
        if (selectedText) clearShareSelection();
        return;
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(clipboardText);
        setAnnouncement(selectedText ? "Texto seleccionado y enlace copiados." : "Enlace de lectura copiado.");
        if (selectedText) clearShareSelection();
        return;
      }
      const textArea = document.createElement("textarea");
      textArea.value = clipboardText;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      const copied = document.execCommand("copy");
      textArea.remove();
      if (!copied) throw new Error("No se pudo copiar el enlace.");
      setAnnouncement(selectedText ? "Texto seleccionado y enlace copiados." : "Enlace de lectura copiado.");
      if (selectedText) clearShareSelection();
    } catch (reason) {
      if (reason instanceof DOMException && reason.name === "AbortError") return;
      setAnnouncement("No se pudo compartir. Intenta nuevamente.");
    }
  }

  async function goToIndexItem(item: ReaderManifest["index"][number]) {
    if (!manifest) return;
    const from = Math.max(1, item.pag - 1);
    const criticalTo = item.pag;
    const prefetchTo = Math.min(manifest.pages, from + LOAD_BATCH - 1);
    const destination: ReaderAnchor = { version: 1, quote: item.titulo, prefix: "", suffix: "", blockIndex: 0, offset: 0 };
    pendingAnchor.current = destination;
    navigateAfterLayout.current = 0;
    setPanel(null);
    setRepaginating(true);
    setLoadingMore(true);
    setLayoutReady(false);
    setVisualPage(0);
    pendingIndexPrefetch.current = criticalTo < prefetchTo ? { start: criticalTo + 1, end: prefetchTo } : null;
    try {
      const values = await Promise.all(Array.from({ length: criticalTo - from + 1 }, (_, offset) => from + offset).map(async (number) => (
        [number, fragments.get(number) ?? await loadFragment(libro_uri, number, manifest.pages)] as const
      )));
      setFragments(new Map(values));
      setAnnouncement(`Capítulo: ${item.titulo}`);
    } catch (reason) {
      pendingIndexPrefetch.current = null;
      pendingAnchor.current = null;
      setRepaginating(false);
      setAnnouncement(reason instanceof Error ? `No se pudo abrir el capítulo: ${reason.message}` : "No se pudo abrir el capítulo.");
    } finally {
      setLoadingMore(false);
    }
  }

  const navigateByGesture = useCallback((delta: -1 | 1) => {
    if (gestureLock.current !== null) return;
    gestureLock.current = window.setTimeout(() => { gestureLock.current = null; }, 180);
    void goToVisualPage(visualPage + delta);
  }, [goToVisualPage, visualPage]);

  useEffect(() => () => {
    if (gestureLock.current !== null) window.clearTimeout(gestureLock.current);
  }, []);

  const toggleControls = useCallback(() => {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    if (controlsVisible) setControlsVisible(false);
    else {
      setControlsVisible(true);
      scheduleHide();
    }
  }, [controlsVisible, scheduleHide]);

  const readerGestures = useReaderGestures({
    containerRef: viewportRef,
    enabled: panel === null && !repaginating && !loadingMore,
    canGoPrevious: preferences.mode === "paged" && (visualPage > 0 || firstLoadedPage > 1),
    canGoNext: preferences.mode === "paged" && (visualPage < visualPages - 1 || Boolean(manifest && lastLoadedPage < manifest.pages)),
    onPreviousPage: () => navigateByGesture(-1),
    onNextPage: () => navigateByGesture(1),
    onToggleControls: toggleControls,
  });

  const readerStyle = {
    "--reader-bg": colors.background, "--reader-fg": colors.foreground, "--reader-muted": colors.muted, "--reader-panel": colors.panel,
    "--reader-font-size": `${preferences.fontSize}px`, "--reader-line-height": String(preferences.lineHeight), "--reader-measure": `${preferences.measure}px`,
    "--reader-text-align": preferences.alignment,
    "--reader-page-offset": `${visualPage * visualPageWidth}px`,
    "--reader-column-width": columnGeometry ? `${columnGeometry.width}px` : undefined,
    "--reader-column-gap": columnGeometry ? `${columnGeometry.gap}px` : undefined,
  } as CSSProperties;

  if (loading) return <AppShell mode="immersive"><div className="reader-state" role="status">Preparando el libro…</div></AppShell>;
  if (error || !manifest) return (
    <AppShell mode="immersive"><div className="reader-state"><h1>No pudimos abrir el libro</h1><p>{error}</p><div><Link to={`/book/${libro_uri}`}>Volver a la ficha</Link><a href={getLegacyReaderUrl(libro_uri, requestedPage)}>Abrir lector clásico</a></div></div></AppShell>
  );

  return (
    <AppShell mode="immersive">
      <div className={`reader-shell reader-theme-${preferences.theme} reader-font-${preferences.font} ${repaginating ? "is-repaginating" : ""}`} style={readerStyle}>
        <ReaderBrandBar />
        <header className={`reader-toolbar reader-toolbar-top ${controlsVisible ? "is-visible" : ""}`}>
          <button aria-label="Volver a la ficha del libro" onClick={leaveReader}><span className="material-symbols-outlined">arrow_back</span></button>
          <div className="reader-title"><strong>{readableTitle(libro_uri)}</strong><span>{chapter}</span></div>
          <button aria-label={hasShareSelection ? "Compartir texto seleccionado" : "Compartir ubicación de lectura"} onPointerDown={() => {
            const selected = getSelectedReaderText(contentRef.current);
            if (selected) shareSelectionRef.current = selected;
          }} onClick={() => { void shareLocation(); }}><span className="material-symbols-outlined">share</span></button>
          <button ref={panelButtonRef} aria-expanded={panel === "index"} aria-label="Abrir índice" onClick={() => setPanel(panel === "index" ? null : "index")}><span className="material-symbols-outlined">toc</span></button>
          <button aria-expanded={panel === "preferences"} aria-label="Abrir preferencias" onClick={() => setPanel(panel === "preferences" ? null : "preferences")}><span className="material-symbols-outlined">text_fields</span></button>
        </header>

        <main ref={viewportRef} className={`reader-viewport is-${preferences.mode}`} aria-label="Contenido del libro" {...readerGestures} onScroll={(event) => { if (preferences.mode === "scroll") { const element = event.currentTarget; setScrollProgress(element.scrollTop / Math.max(1, element.scrollHeight - element.clientHeight)); } }}>
          <article ref={contentRef} className="reader-content" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
        </main>

        {preferences.mode === "paged" && <>
          <button className="reader-page-button reader-page-previous" disabled={visualPage === 0 && firstLoadedPage === 1} aria-label="Página visual anterior" onClick={(event) => { event.stopPropagation(); void goToVisualPage(visualPage - 1); }}><span className="material-symbols-outlined">chevron_left</span></button>
          <button className="reader-page-button reader-page-next" disabled={visualPage >= visualPages - 1 && lastLoadedPage === manifest.pages} aria-label="Página visual siguiente" onClick={(event) => { event.stopPropagation(); void goToVisualPage(visualPage + 1); }}><span className="material-symbols-outlined">chevron_right</span></button>
        </>}

        <footer className={`reader-toolbar reader-toolbar-bottom ${controlsVisible ? "is-visible" : ""}`}>
          <span className="reader-position">Pág. {visibleFragmentPage} de {manifest.pages}</span><div className="reader-progress" aria-label={`Página ${visibleFragmentPage} de ${manifest.pages}; ${fragmentProgress}% leído`}><i style={{ width: `${fragmentProgress}%` }} /></div><span>{fragmentProgress}%</span>
        </footer>

        {panel && <div className="reader-backdrop" onPointerDown={(event) => event.stopPropagation()} onClick={() => setPanel(null)}>
          <div ref={panelRef} className="reader-panel" role="dialog" aria-modal="true" aria-label={panel === "index" ? "Índice del libro" : "Preferencias de lectura"} tabIndex={-1} onClick={(event) => event.stopPropagation()}>
            <div className="reader-panel-heading"><h2>{panel === "index" ? "Índice" : "Preferencias"}</h2><button aria-label="Cerrar panel" onClick={() => setPanel(null)}><span className="material-symbols-outlined">close</span></button></div>
            {panel === "index" ? <nav aria-label="Capítulos" className="reader-index">{manifest.index.map((item, index) => <button key={`${item.pag}-${index}`} style={{ paddingLeft: `${Math.min(3, item.nivel - 1) * 1.1 + .75}rem` }} onClick={() => { void goToIndexItem(item); }}>{item.titulo}</button>)}</nav> : <Preferences value={preferences} onChange={updatePreferences} />}
          </div>
        </div>}
        {loadingMore && repaginating && <div className="reader-loading" role="status">Cargando…</div>}
        {repaginating && <div className="reader-layout-placeholder" role="status" aria-live="polite"><span>Ajustando la página…</span><i /><i /><i /><i /></div>}
        <div className="sr-only" aria-live="polite">{announcement}</div>
      </div>
    </AppShell>
  );
}

function Preferences({ value, onChange }: { value: ReaderPreferences; onChange: (patch: Partial<ReaderPreferences>) => void }) {
  return <div className="reader-settings">
    <fieldset><legend>Modo de lectura</legend><div className="reader-segmented"><button aria-pressed={value.mode === "paged"} onClick={() => onChange({ mode: "paged" })}>Paginado</button><button aria-pressed={value.mode === "scroll"} onClick={() => onChange({ mode: "scroll" })}>Continuo</button></div></fieldset>
    <fieldset><legend>Tema</legend><div className="reader-segmented"><button aria-pressed={value.theme === "light"} onClick={() => onChange({ theme: "light" })}>Claro</button><button aria-pressed={value.theme === "sepia"} onClick={() => onChange({ theme: "sepia" })}>Sepia</button><button aria-pressed={value.theme === "dark"} onClick={() => onChange({ theme: "dark" })}>Oscuro</button></div></fieldset>
    <label>Fuente<select value={value.font} onChange={(event) => onChange({ font: event.target.value as ReaderPreferences["font"] })}><option value="book">Libro — Newsreader</option><option value="clear">Clara — Noto Sans</option><option value="hyperlegible">Alta legibilidad — Atkinson Hyperlegible</option><option value="opendyslexic">OpenDyslexic</option></select></label>
    <fieldset><legend>Alineación</legend><div className="reader-segmented"><button aria-pressed={value.alignment === "left"} onClick={() => onChange({ alignment: "left" })}>Izquierda</button><button aria-pressed={value.alignment === "justify"} onClick={() => onChange({ alignment: "justify" })}>Justificado</button></div></fieldset>
    <label>Tamaño <output>{value.fontSize}px</output><input type="range" min="14" max="32" value={value.fontSize} onChange={(event) => onChange({ fontSize: Number(event.target.value) })} /></label>
    <label>Interlineado <output>{value.lineHeight.toFixed(2)}</output><input type="range" min="1.35" max="2.2" step="0.05" value={value.lineHeight} onChange={(event) => onChange({ lineHeight: Number(event.target.value) })} /></label>
    <label>Ancho <output>{value.measure}px</output><input type="range" min="480" max="960" step="40" value={value.measure} onChange={(event) => onChange({ measure: Number(event.target.value) })} /></label>
  </div>;
}
