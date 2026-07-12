import { useEffect, useMemo, useRef, useState } from "react";

type RichTextProps = {
  content: string;
  className?: string;
  collapsibleOnMobile?: boolean;
};

function renderInlineMarkdown(value: string): string {
  return value
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g, '<img alt="$1" src="$2">')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_]+)__/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
    .replace(/(^|[^_])_([^_]+)_/g, "$1<em>$2</em>");
}

function markdownToHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const firstContentLine = lines.findIndex((line) => line.trim());
  if (firstContentLine >= 0 && /^#{1,6}\s+sinopsis\s*$/i.test(lines[firstContentLine].trim())) {
    lines.splice(firstContentLine, 1);
  }
  const output: string[] = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      output.push(`<p>${renderInlineMarkdown(paragraph.join("<br>"))}</p>`);
      paragraph = [];
    }
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const heading = line.match(/^(#{1,6})\s+(.+)$/);

    if (heading) {
      flushParagraph();
      output.push(`<h${heading[1].length}>${renderInlineMarkdown(heading[2])}</h${heading[1].length}>`);
      continue;
    }

    if (/^[-*+]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      flushParagraph();
      const ordered = /^\d+\.\s+/.test(line);
      const items: string[] = [];
      while (index < lines.length && (ordered ? /^\d+\.\s+/.test(lines[index]) : /^[-*+]\s+/.test(lines[index]))) {
        items.push(`<li>${renderInlineMarkdown(lines[index].replace(ordered ? /^\d+\.\s+/ : /^[-*+]\s+/, ""))}</li>`);
        index += 1;
      }
      index -= 1;
      output.push(`<${ordered ? "ol" : "ul"}>${items.join("")}</${ordered ? "ol" : "ul"}>`);
      continue;
    }

    if (/^>\s?/.test(line)) {
      flushParagraph();
      output.push(`<blockquote>${renderInlineMarkdown(line.replace(/^>\s?/, ""))}</blockquote>`);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      continue;
    }

    if (/^<[^>]+>/.test(line.trim())) {
      flushParagraph();
      output.push(renderInlineMarkdown(line));
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  return output.join("");
}

function sanitizeHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("script,style,iframe,object,embed,form,input,button,textarea,select").forEach((node) => node.remove());

  doc.querySelectorAll("*").forEach((element) => {
    [...element.attributes].forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.trim().toLowerCase();
      if (name.startsWith("on") || name === "style" || ((name === "href" || name === "src") && /^(javascript|data):/.test(value))) {
        element.removeAttribute(attribute.name);
      }
    });
  });

  return doc.body.innerHTML;
}

export function RichText({ content, className, collapsibleOnMobile = false }: RichTextProps) {
  const html = useMemo(() => sanitizeHtml(markdownToHtml(content)), [content]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [content]);

  useEffect(() => {
    const element = contentRef.current;
    if (!element || !collapsibleOnMobile || expanded) return;

    const updateOverflow = () => setCanExpand(element.scrollHeight > element.clientHeight + 1);
    updateOverflow();
    const observer = new ResizeObserver(updateOverflow);
    observer.observe(element);
    return () => observer.disconnect();
  }, [collapsibleOnMobile, expanded, html]);

  return (
    <div>
      <div className="relative">
        <div
          ref={contentRef}
          className={`${className ?? ""} ${collapsibleOnMobile && !expanded ? "line-clamp-6 md:line-clamp-none" : ""}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {collapsibleOnMobile && canExpand && !expanded ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background-light to-transparent dark:from-background-dark md:hidden" />
        ) : null}
      </div>
      {collapsibleOnMobile && canExpand ? (
        <button
          type="button"
          className="mt-2 font-bold text-primary transition-colors hover:text-primary/80 md:hidden"
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? "Mostrar menos" : "Leer sinopsis completa"}
        </button>
      ) : null}
    </div>
  );
}
