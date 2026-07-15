const BLOCK_SELECTOR = "p,h1,h2,h3,h4,h5,h6,blockquote,li,figure,img,hr";
const REMOVE_SELECTOR = "script,style,iframe,object,embed,form,input,button,textarea,select,link,meta,base";
const SAFE_TAGS = new Set(["P", "B", "EM", "STRONG", "I", "IMG", "A", "H1", "H2", "H3", "H4", "H5", "H6", "CITE", "SMALL", "SUB", "SUP", "HR", "BR", "BLOCKQUOTE", "UL", "OL", "LI", "FIGURE", "FIGCAPTION", "DIV", "SPAN"]);

function safeResourceUrl(value: string, readerRoot: string): string | null {
  try {
    const base = new URL(`${readerRoot.replace(/\/$/, "")}/`, window.location.origin);
    const url = new URL(value, base);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (!/^https?:/i.test(value) && !url.pathname.startsWith(`${base.pathname}`)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function sanitizeFragment(html: string, readerRoot: string, blockStart = 0): { html: string; blockCount: number } {
  const doc = new DOMParser().parseFromString(`<main>${html}</main>`, "text/html");
  const main = doc.querySelector("main");
  if (!main) return { html: "", blockCount: 0 };
  main.querySelectorAll(REMOVE_SELECTOR).forEach((node) => node.remove());
  main.querySelectorAll("*").forEach((element) => {
    if (!SAFE_TAGS.has(element.tagName)) {
      element.replaceWith(...Array.from(element.childNodes));
      return;
    }
    for (const attribute of Array.from(element.attributes)) {
      const name = attribute.name.toLowerCase();
      if (name.startsWith("on") || ["style", "srcset", "class", "id"].includes(name)) element.removeAttribute(attribute.name);
      else if (!(["href", "title", "rel", "target"].includes(name) && element.tagName === "A") && !(["src", "alt", "title", "width", "height"].includes(name) && element.tagName === "IMG")) element.removeAttribute(attribute.name);
    }
    if (element instanceof HTMLAnchorElement) {
      const href = element.getAttribute("href") ?? "";
      if (/^(https?:|mailto:)/i.test(href)) {
        element.rel = "nofollow noopener noreferrer";
        element.target = "_blank";
      } else element.removeAttribute("href");
    }
    if (element instanceof HTMLImageElement) {
      const safe = safeResourceUrl(element.getAttribute("src") ?? "", readerRoot);
      if (safe) element.src = safe;
      else element.removeAttribute("src");
      element.loading = "lazy";
      element.decoding = "async";
    }
  });
  main.querySelectorAll("p,h1,h2,h3,h4,h5,h6").forEach((element) => {
    if (!element.textContent?.trim() && !element.querySelector("img")) {
      element.remove();
    }
  });
  let index = blockStart;
  main.querySelectorAll(BLOCK_SELECTOR).forEach((block) => block.setAttribute("data-reader-block", String(index++)));
  return { html: main.innerHTML, blockCount: index - blockStart };
}
