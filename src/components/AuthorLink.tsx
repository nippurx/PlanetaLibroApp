import { Link } from "react-router-dom";

export type AuthorLinkProps = {
  name: string;
  uri?: string | null;
  className?: string;
  title?: string;
};

type AuthorSource = {
  autor?: {
    nombre?: string | null;
    uri?: string | null;
  } | null;
  author?: {
    nombre?: string | null;
    uri?: string | null;
  } | null;
  author_uri?: string | null;
  author_name?: string | null;
  autorNombre?: string | null;
  autorUri?: string | null;
};

export function resolveAuthor(source: AuthorSource): { name: string; uri: string | null } {
  const name =
    source.autor?.nombre?.trim() ||
    source.author?.nombre?.trim() ||
    source.author_name?.trim() ||
    source.autorNombre?.trim() ||
    "Autor desconocido";

  const uri = source.autor?.uri ?? source.author_uri ?? source.author?.uri ?? source.autorUri ?? null;

  return {
    name,
    uri: uri && uri.trim() ? uri.trim() : null,
  };
}

export function AuthorLink({ name, uri, className = "", title }: AuthorLinkProps) {
  const text = name.trim() || "Autor desconocido";
  const normalizedUri = uri?.trim() || "";
  const finalClassName = `text-inherit transition-opacity hover:opacity-85 hover:underline underline-offset-2 ${className}`.trim();

  if (normalizedUri) {
    return (
      <Link aria-label={`Ver autor ${text}`} className={finalClassName} title={title} to={`/autor/${normalizedUri}`}>
        {text}
      </Link>
    );
  }

  return (
    <span className={className} title={title}>
      {text}
    </span>
  );
}
