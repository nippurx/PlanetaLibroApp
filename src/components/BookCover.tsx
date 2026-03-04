import { useEffect, useState } from "react";
import type { Book } from "../api/books";
import { toAbsoluteUrl } from "../api/url";

type BookCoverProps = {
  book: Pick<Book, "titulo" | "cover_url">;
  className?: string;
  alt?: string;
};

const COVER_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='360' viewBox='0 0 240 360'%3E%3Crect width='240' height='360' fill='%23e2e8f0'/%3E%3Ctext x='120' y='186' text-anchor='middle' font-family='Arial,sans-serif' font-size='16' fill='%2364748b'%3ESin portada%3C/text%3E%3C/svg%3E";

export function BookCover({ book, className = "", alt }: BookCoverProps) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [book.cover_url]);

  const coverSrc = imageFailed ? "" : toAbsoluteUrl(book.cover_url);

  if (coverSrc) {
    return (
      <img
        alt={alt ?? book.titulo}
        className={className}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = COVER_PLACEHOLDER;
          setImageFailed(true);
        }}
        src={coverSrc}
      />
    );
  }

  return (
    <div className={`flex items-center justify-center bg-slate-200 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-800 dark:text-slate-400 ${className}`}>
      <span className="px-3">Sin portada</span>
    </div>
  );
}