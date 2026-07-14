export type ReaderMode = "paged" | "scroll";
export type ReaderTheme = "light" | "sepia" | "dark";
export type ReaderFont = "serif" | "sans" | "accessible";

export type ReaderIndexItem = { titulo: string; pag: number; nivel: number };
export type ReaderChapter = { href: string; page: number; title: string };

export type ReaderManifest = {
  version: 2;
  uri: string;
  generated_at?: string;
  pages: number;
  paginicio: number;
  index: ReaderIndexItem[];
  chapters: ReaderChapter[];
  assets: string[];
  warnings: string[];
};

export type ReaderAnchor = {
  version: 1;
  quote: string;
  prefix: string;
  suffix: string;
  blockIndex: number;
  offset: number;
};

export type ReaderPreferences = {
  version: 1;
  mode: ReaderMode;
  theme: ReaderTheme;
  font: ReaderFont;
  fontSize: number;
  lineHeight: number;
  measure: number;
};

export type ReaderProgress = {
  version: 1;
  uri: string;
  manifestVersion?: string;
  anchor: ReaderAnchor;
  updatedAt: string;
};

export class ReaderError extends Error {
  constructor(
    message: string,
    readonly code: "INVALID_URI" | "INVALID_MANIFEST" | "OUT_OF_RANGE" | "HTTP_ERROR",
    readonly cause?: unknown,
  ) {
    super(message);
    this.name = "ReaderError";
  }
}
