import { RefObject, useCallback, useEffect, useMemo, useState } from "react";
import { ApiError } from "../../api/client";
import {
  AnnotationColor,
  AnnotationDraft,
  createAnnotation,
  deleteAnnotation,
  listAnnotations,
  ReadingAnnotation,
  updateAnnotation,
} from "../../api/annotations";
import { AppSession, getLegacyLoginUrl } from "../../api/session";
import {
  ANNOTATION_MAX_NOTE,
  annotationContentVersion,
  resolveAnnotationRange,
  serializeSelection,
  SerializedSelection,
} from "./annotations";

const DRAFT_KEY = "planetalibro:reader-annotation-draft:v1";
const DRAFT_TTL_MS = 20 * 60 * 1000;
const COLORS: Array<{ value: AnnotationColor; label: string }> = [
  { value: 1, label: "Amarillo" },
  { value: 2, label: "Azul" },
  { value: 3, label: "Rosa" },
  { value: 4, label: "Verde" },
];

type StoredDraft = { uri: string; expiresAt: number; draft: AnnotationDraft };
type EditorState = {
  annotation: ReadingAnnotation | null;
  selection: SerializedSelection | null;
  note: string;
  color: AnnotationColor;
};

type UseReaderAnnotationsOptions = {
  enabled: boolean;
  uri: string;
  rootRef: RefObject<HTMLElement>;
  session: AppSession | null;
  generatedAt?: string;
  pages: number;
  renderKey: string;
  onAnnouncement: (message: string) => void;
  onNavigate: (annotation: ReadingAnnotation) => Promise<boolean>;
};

function createRequestId(): string {
  return crypto.randomUUID();
}

function completeDraft(selection: SerializedSelection, note: string | null, color: AnnotationColor): AnnotationDraft {
  return { ...selection, note_text: note?.trim() || null, color_code: color, client_request_id: createRequestId() };
}

function storeDraft(uri: string, draft: AnnotationDraft): void {
  const value: StoredDraft = { uri, draft, expiresAt: Date.now() + DRAFT_TTL_MS };
  sessionStorage.setItem(DRAFT_KEY, JSON.stringify(value));
}

function readDraft(uri: string): AnnotationDraft | null {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(DRAFT_KEY) ?? "null") as StoredDraft | null;
    if (!parsed || parsed.uri !== uri || parsed.expiresAt <= Date.now()) {
      sessionStorage.removeItem(DRAFT_KEY);
      return null;
    }
    return parsed.draft;
  } catch {
    sessionStorage.removeItem(DRAFT_KEY);
    return null;
  }
}

function applyHighlights(root: HTMLElement, annotations: ReadingAnnotation[]): void {
  const registry = (CSS as unknown as { highlights?: { set: (name: string, value: unknown) => void; delete: (name: string) => void } }).highlights;
  const HighlightConstructor = (window as unknown as { Highlight?: new (...ranges: Range[]) => unknown }).Highlight;
  if (!registry || !HighlightConstructor) return;
  for (const color of COLORS) {
    const ranges = annotations
      .filter((annotation) => annotation.color_code === color.value)
      .map((annotation) => resolveAnnotationRange(root, annotation))
      .filter((range): range is Range => range !== null);
    const name = `reader-annotation-${color.value}`;
    if (ranges.length) registry.set(name, new HighlightConstructor(...ranges));
    else registry.delete(name);
  }
}

export function useReaderAnnotations(options: UseReaderAnnotationsOptions) {
  const [items, setItems] = useState<ReadingAnnotation[]>([]);
  const [highlightItems, setHighlightItems] = useState<ReadingAnnotation[]>([]);
  const [filter, setFilter] = useState<"all" | "highlights" | "notes">("all");
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selection, setSelection] = useState<SerializedSelection | null>(null);
  const [selectionPosition, setSelectionPosition] = useState<{ left: number; top: number } | null>(null);
  const [activeAnnotation, setActiveAnnotation] = useState<ReadingAnnotation | null>(null);
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [authPrompt, setAuthPrompt] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unlocatedIds, setUnlocatedIds] = useState<Set<number>>(new Set());
  const contentVersion = annotationContentVersion(options.generatedAt, options.uri, options.pages);

  const load = useCallback(async (append = false) => {
    if (!options.enabled || !options.session?.authenticated) {
      setItems([]);
      setNextCursor(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const page = await listAnnotations(options.uri, filter, append ? nextCursor : null);
      setItems((current) => append ? [...current, ...page.items] : page.items);
      setHighlightItems((current) => {
        const merged = new Map(current.map((item) => [item.id, item]));
        page.items.forEach((item) => merged.set(item.id, item));
        return [...merged.values()];
      });
      setNextCursor(page.next_cursor);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "No se pudieron cargar las anotaciones.");
    } finally {
      setLoading(false);
    }
  }, [filter, nextCursor, options.enabled, options.session?.authenticated, options.uri]);

  useEffect(() => { void load(false); }, [filter, options.session?.authenticated, options.uri]);

  useEffect(() => {
    if (!options.enabled) return;
    const root = options.rootRef.current;
    if (!root) return;
    applyHighlights(root, highlightItems);
    return () => {
      const registry = (CSS as unknown as { highlights?: { delete: (name: string) => void } }).highlights;
      COLORS.forEach((color) => registry?.delete(`reader-annotation-${color.value}`));
    };
  }, [highlightItems, options.enabled, options.renderKey, options.rootRef]);

  useEffect(() => {
    if (!options.enabled) return;
    const dismissSelection = () => {
      setSelection(null);
      setSelectionPosition(null);
      setActiveAnnotation(null);
    };
    const rememberSelection = () => {
      const root = options.rootRef.current;
      const nativeSelection = window.getSelection();
      if (!root || !nativeSelection || nativeSelection.isCollapsed || nativeSelection.rangeCount === 0) {
        dismissSelection();
        return;
      }
      const serialized = serializeSelection(root, nativeSelection, contentVersion);
      if (!serialized) {
        dismissSelection();
        return;
      }
      const rect = nativeSelection.getRangeAt(0).getBoundingClientRect();
      setSelection(serialized);
      setSelectionPosition({ left: Math.min(window.innerWidth - 155, Math.max(8, rect.left + rect.width / 2 - 70)), top: Math.max(56, rect.top - 52) });
    };
    const dismissOnPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest(".reader-selection-actions")) return;
      dismissSelection();
    };
    document.addEventListener("selectionchange", rememberSelection);
    document.addEventListener("pointerdown", dismissOnPointerDown, true);
    window.addEventListener("resize", dismissSelection);
    window.addEventListener("scroll", dismissSelection, true);
    return () => {
      document.removeEventListener("selectionchange", rememberSelection);
      document.removeEventListener("pointerdown", dismissOnPointerDown, true);
      window.removeEventListener("resize", dismissSelection);
      window.removeEventListener("scroll", dismissSelection, true);
    };
  }, [contentVersion, options.enabled, options.renderKey, options.rootRef]);

  useEffect(() => {
    if (!options.enabled) return;
    const root = options.rootRef.current;
    if (!root) return;
    const activateHighlight = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const nativeSelection = window.getSelection();
      if (nativeSelection && !nativeSelection.isCollapsed) return;
      const annotation = [...highlightItems].reverse().find((item) => {
        const range = resolveAnnotationRange(root, item);
        return range !== null && [...range.getClientRects()].some((rect) => (
          event.clientX >= rect.left && event.clientX <= rect.right
          && event.clientY >= rect.top && event.clientY <= rect.bottom
        ));
      });
      if (!annotation) return;
      setSelection(null);
      setActiveAnnotation(annotation);
      setSelectionPosition({
        left: Math.min(window.innerWidth - 220, Math.max(8, event.clientX - 105)),
        top: Math.max(56, event.clientY - 76),
      });
    };
    root.addEventListener("pointerup", activateHighlight);
    return () => root.removeEventListener("pointerup", activateHighlight);
  }, [highlightItems, options.enabled, options.renderKey, options.rootRef]);

  useEffect(() => {
    if (!options.session?.authenticated) return;
    const pending = readDraft(options.uri);
    if (!pending) return;
    sessionStorage.removeItem(DRAFT_KEY);
    const { note_text, color_code, client_request_id: _requestId, ...serialized } = pending;
    setEditor({ annotation: null, selection: serialized, note: note_text ?? "", color: color_code });
  }, [options.session?.authenticated, options.uri]);

  const saveSelection = useCallback(async (note: string | null, color: AnnotationColor) => {
    if (!selection) return;
    const draft = completeDraft(selection, note, color);
    if (!options.session?.authenticated || !options.session.csrf_token) {
      storeDraft(options.uri, draft);
      setAuthPrompt(true);
      setSelection(null);
      setSelectionPosition(null);
      window.getSelection()?.removeAllRanges();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const created = await createAnnotation(options.uri, draft, options.session.csrf_token);
      setItems((current) => [...current, created].sort((a, b) => a.start_fragment - b.start_fragment || a.start_offset - b.start_offset || a.id - b.id));
      setHighlightItems((current) => [...current, created]);
      setSelection(null);
      setSelectionPosition(null);
      setEditor(null);
      window.getSelection()?.removeAllRanges();
      options.onAnnouncement(note ? "Nota guardada." : "Texto destacado.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "No se pudo guardar la anotación.");
    } finally {
      setLoading(false);
    }
  }, [options, selection]);

  const saveEditor = useCallback(async () => {
    if (!editor) return;
    if (editor.note.length > ANNOTATION_MAX_NOTE) {
      setError(`La nota no puede superar ${ANNOTATION_MAX_NOTE.toLocaleString("es-AR")} caracteres.`);
      return;
    }
    if (!editor.annotation) {
      const previousSelection = selection;
      if (editor.selection && !selection) setSelection(editor.selection);
      const draft = completeDraft(editor.selection ?? selection!, editor.note, editor.color);
      if (!options.session?.authenticated || !options.session.csrf_token) {
        storeDraft(options.uri, draft);
        setAuthPrompt(true);
        return;
      }
      setLoading(true);
      try {
        const created = await createAnnotation(options.uri, draft, options.session.csrf_token);
        setItems((current) => [...current, created].sort((a, b) => a.start_fragment - b.start_fragment || a.start_offset - b.start_offset || a.id - b.id));
        setHighlightItems((current) => [...current, created]);
        setEditor(null);
        setSelection(null);
        setSelectionPosition(null);
        window.getSelection()?.removeAllRanges();
        options.onAnnouncement("Nota guardada.");
      } catch (reason) {
        setSelection(previousSelection);
        setError(reason instanceof Error ? reason.message : "No se pudo guardar la nota.");
      } finally { setLoading(false); }
      return;
    }
    if (!options.session?.csrf_token) return;
    setLoading(true);
    try {
      const updated = await updateAnnotation(editor.annotation.id, {
        note_text: editor.note.trim() || null,
        color_code: editor.color,
        revision: editor.annotation.revision,
      }, options.session.csrf_token);
      setItems((current) => current.map((item) => item.id === updated.id ? updated : item));
      setHighlightItems((current) => current.map((item) => item.id === updated.id ? updated : item));
      setEditor(null);
      setActiveAnnotation(null);
      setSelectionPosition(null);
      options.onAnnouncement(updated.note_text ? "Nota actualizada." : "Destacado actualizado.");
    } catch (reason) {
      if (reason instanceof ApiError && reason.status === 409) void load(false);
      setError(reason instanceof Error ? reason.message : "No se pudo actualizar la anotación.");
    } finally { setLoading(false); }
  }, [editor, load, options, selection]);

  const remove = useCallback(async (annotation: ReadingAnnotation) => {
    if (!options.session?.csrf_token) return;
    setLoading(true);
    try {
      await deleteAnnotation(annotation.id, options.session.csrf_token);
      setItems((current) => current.filter((item) => item.id !== annotation.id));
      setHighlightItems((current) => current.filter((item) => item.id !== annotation.id));
      setEditor(null);
      setActiveAnnotation(null);
      setSelectionPosition(null);
      options.onAnnouncement("Anotación eliminada.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "No se pudo eliminar la anotación.");
    } finally { setLoading(false); }
  }, [options]);

  const selectionToolbar = options.enabled && selectionPosition && (selection || activeAnnotation) ? (
    <div className={`reader-selection-actions ${activeAnnotation ? "is-existing" : ""}`} data-reader-interactive style={selectionPosition} role="toolbar" aria-label={activeAnnotation ? "Acciones para el subrayado" : "Acciones para el texto seleccionado"}>
      {activeAnnotation && <button disabled={loading} onPointerDown={(event) => event.preventDefault()} onClick={() => { void remove(activeAnnotation); }}><span className="material-symbols-outlined" aria-hidden="true">delete</span><span>Borrar</span></button>}
      <button disabled={loading} onPointerDown={(event) => event.preventDefault()} onClick={() => {
        if (activeAnnotation) {
          setEditor({ annotation: activeAnnotation, selection: null, note: activeAnnotation.note_text ?? "", color: activeAnnotation.color_code });
          setActiveAnnotation(null);
          setSelectionPosition(null);
        } else {
          void saveSelection(null, 1);
        }
      }}><span className="reader-selection-color" aria-hidden="true" /><span>Subrayar</span></button>
      <button disabled={loading} onPointerDown={(event) => event.preventDefault()} onClick={() => {
        if (activeAnnotation) {
          setEditor({ annotation: activeAnnotation, selection: null, note: activeAnnotation.note_text ?? "", color: activeAnnotation.color_code });
        } else if (selection) {
        setEditor({ annotation: null, selection, note: "", color: 1 });
        setSelection(null);
        window.getSelection()?.removeAllRanges();
        }
        setActiveAnnotation(null);
        setSelectionPosition(null);
      }}><span className="material-symbols-outlined" aria-hidden="true">edit_note</span><span>Nota</span></button>
    </div>
  ) : null;

  const dialogs = options.enabled ? (
    <>
      {editor && <div className="reader-annotation-modal" data-reader-interactive role="presentation">
        <div role="dialog" aria-modal="true" aria-labelledby="annotation-editor-title">
          <h2 id="annotation-editor-title">{editor.annotation ? "Editar anotación" : "Añadir nota"}</h2>
          <blockquote>{editor.annotation?.exact_text ?? editor.selection?.exact_text}</blockquote>
          <label>Nota<textarea autoFocus maxLength={ANNOTATION_MAX_NOTE} value={editor.note} onChange={(event) => setEditor({ ...editor, note: event.target.value })} /></label>
          <fieldset><legend>Color</legend><div className="reader-annotation-colors">{COLORS.map((color) => <button key={color.value} type="button" className={`is-color-${color.value}`} aria-label={color.label} aria-pressed={editor.color === color.value} onClick={() => setEditor({ ...editor, color: color.value })} />)}</div></fieldset>
          {error && <p role="alert">{error}</p>}
          <div className="reader-annotation-modal-actions">
            {editor.annotation && <button className="is-danger" aria-label="Borrar anotación" title="Borrar anotación" onClick={() => { void remove(editor.annotation!); }}><span className="material-symbols-outlined" aria-hidden="true">delete</span></button>}
            <button onClick={() => setEditor(null)}>Cancelar</button>
            <button disabled={loading} onClick={() => { void saveEditor(); }}>Guardar</button>
          </div>
        </div>
      </div>}
      {authPrompt && <div className="reader-annotation-modal" data-reader-interactive role="presentation">
        <div role="dialog" aria-modal="true" aria-labelledby="annotation-auth-title">
          <h2 id="annotation-auth-title">Guardá tus destacados y notas</h2>
          <p>Creá una cuenta gratuita o iniciá sesión para conservarlos y recuperarlos desde cualquier dispositivo.</p>
          <div className="reader-annotation-modal-actions">
            <button onClick={() => { sessionStorage.removeItem(DRAFT_KEY); setAuthPrompt(false); }}>Ahora no</button>
            <a href={getLegacyLoginUrl(`${window.location.pathname}${window.location.search}`)}>Crear cuenta o iniciar sesión</a>
          </div>
        </div>
      </div>}
    </>
  ) : null;

  const notebook = useMemo(() => (
    <div className="reader-annotations-notebook">
      <div className="reader-segmented" role="group" aria-label="Filtrar anotaciones">
        {([['all', 'Todas'], ['highlights', 'Destacados'], ['notes', 'Notas']] as const).map(([value, label]) => (
          <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>
        ))}
      </div>
      {!options.session?.authenticated && <div className="reader-annotations-empty"><p>Iniciá sesión para guardar y consultar tus anotaciones.</p><a href={getLegacyLoginUrl(`${window.location.pathname}${window.location.search}`)}>Crear cuenta o iniciar sesión</a></div>}
      {options.session?.authenticated && loading && items.length === 0 && <p role="status">Cargando anotaciones…</p>}
      {options.session?.authenticated && error && <p role="alert">{error}</p>}
      {options.session?.authenticated && !loading && !error && items.length === 0 && <p className="reader-annotations-empty">Todavía no hay anotaciones con este filtro.</p>}
      <ol>{items.map((annotation) => <li key={annotation.id} className={`is-color-${annotation.color_code}`}>
        <blockquote>{annotation.exact_text}</blockquote>
        {annotation.note_text && <p>{annotation.note_text}</p>}
        {unlocatedIds.has(annotation.id) && <p role="status">El pasaje ya no pudo localizarse; la anotación se conserva.</p>}
        <div><button onClick={() => { void options.onNavigate(annotation).then((located) => setUnlocatedIds((current) => { const next = new Set(current); if (located) next.delete(annotation.id); else next.add(annotation.id); return next; })); }}>Ir al texto</button><button onClick={() => setEditor({ annotation, selection: null, note: annotation.note_text ?? "", color: annotation.color_code })}>Editar</button></div>
      </li>)}</ol>
      {nextCursor && <button disabled={loading} onClick={() => { void load(true); }}>Cargar más</button>}
    </div>
  ), [error, filter, items, load, loading, nextCursor, options, unlocatedIds]);

  return { items, selectionToolbar, dialogs, notebook, refresh: () => load(false) };
}
