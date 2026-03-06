type AudiobookPlayerProps = {
  videoId?: string | null;
  title?: string;
};

export function AudiobookPlayer({ videoId, title }: AudiobookPlayerProps) {
  const cleanId = videoId?.trim() || "";

  if (!cleanId) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        Este libro no tiene audiolibro disponible por ahora.
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${cleanId}?rel=0&modestbranding=1`;

  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-sm">
      <iframe
        className="h-full w-full"
        src={embedUrl}
        title={title ? `Audiolibro de ${title}` : "Audiolibro"}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
