import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { Book } from "../api/books";
import { AuthorLink, resolveAuthor } from "./AuthorLink";
import { BookCover } from "./BookCover";

type HorizontalBookListProps = {
  books: Book[];
  loading?: boolean;
  ariaLabel?: string;
};

function BookListSkeleton() {
  return (
    <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={`book-skeleton-${index}`}
          className="basis-[calc(50%-0.5rem)] shrink-0 md:basis-[calc(25%-0.75rem)] lg:basis-[calc(20%-0.8rem)]"
        >
          <div className="animate-pulse">
            <div className="mb-3 aspect-[2/3] rounded-xl bg-slate-800" />
            <div className="h-4 rounded bg-slate-800" />
            <div className="mt-2 h-3 w-2/3 rounded bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function HorizontalBookList({ books, loading = false, ariaLabel = "Lista de libros" }: HorizontalBookListProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;

    if (!container || loading) {
      setHasOverflow(false);
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    const updateControls = () => {
      const { clientWidth, scrollLeft, scrollWidth } = container;
      const nextHasOverflow = scrollWidth > clientWidth + 1;
      setHasOverflow(nextHasOverflow);
      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(nextHasOverflow && scrollLeft + clientWidth < scrollWidth - 1);
    };

    const animationFrame = window.requestAnimationFrame(updateControls);

    container.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      container.removeEventListener("scroll", updateControls);
      window.removeEventListener("resize", updateControls);
    };
  }, [books.length, loading]);

  const scrollBooks = (direction: "left" | "right") => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    container.scrollBy({
      left: direction === "left" ? -container.clientWidth : container.clientWidth,
      behavior: "smooth",
    });
  };

  if (loading) {
    return <BookListSkeleton />;
  }

  return (
    <>
      {hasOverflow ? (
        <div className="mb-4 flex justify-end gap-2">
          {[
            { icon: "arrow_back", direction: "left" as const, hidden: !canScrollLeft, label: "Ver libro anterior" },
            { icon: "arrow_forward", direction: "right" as const, hidden: !canScrollRight, label: "Ver libro siguiente" },
          ].map(({ icon, direction, hidden, label }) => (
            <button
              key={icon}
              aria-label={label}
              className={`flex h-8 w-8 items-center justify-center rounded-full border border-slate-800 text-white transition-colors hover:bg-[#161d31] ${hidden ? "pointer-events-none opacity-0" : ""}`}
              onClick={() => scrollBooks(direction)}
              type="button"
            >
              <span className="material-symbols-outlined text-sm">{icon}</span>
            </button>
          ))}
        </div>
      ) : null}
      <div
        ref={scrollRef}
        aria-label={ariaLabel}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scroll-smooth"
      >
        {books.map((book) => {
          const author = resolveAuthor(book);

          return (
            <div
              key={book.uri}
              className="group min-w-0 basis-[calc(50%-0.5rem)] shrink-0 snap-start md:basis-[calc(25%-0.75rem)] lg:basis-[calc(20%-0.8rem)]"
            >
              <Link className="block w-full cursor-pointer" to={`/book/${book.uri}`}>
                <div className="relative mb-3 aspect-[2/3] overflow-hidden rounded-xl">
                  <BookCover
                    alt={`Portada de ${book.titulo}`}
                    book={book}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-black/60 px-1.5 py-0.5 backdrop-blur-sm">
                    <span className="material-symbols-outlined fill-1 text-[14px] text-yellow-400">star</span>
                    <span className="text-xs font-bold text-white">{book.hasAudio ? "Audio" : "Book"}</span>
                  </div>
                </div>
                <h4 className="truncate font-semibold text-white transition-colors group-hover:text-primary">{book.titulo}</h4>
              </Link>
              <AuthorLink className="mt-0.5 block truncate text-sm text-slate-400" name={author.name} uri={author.uri} />
            </div>
          );
        })}
      </div>
    </>
  );
}
