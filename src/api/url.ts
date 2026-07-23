const API_BASE = import.meta.env.VITE_API_BASE ?? "";

export function getSiteUrl(path: string): string {
  const configuredOrigin = import.meta.env.VITE_SITE_URL?.trim();
  const siteOrigin = (configuredOrigin || window.location.origin).replace(/\/+$/, "");
  return new URL(path.replace(/^\/+/, ""), `${siteOrigin}/`).toString();
}

export function getApiOrigin(): string {
  if (!API_BASE) {
    return "";
  }

  try {
    return new URL(API_BASE).origin;
  } catch {
    return "";
  }
}

export function toAbsoluteUrl(pathOrUrl?: string | null): string | "" {
  if (!pathOrUrl) {
    return "";
  }

  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const origin = getApiOrigin();
  if (!origin) {
    return "";
  }

  if (pathOrUrl.startsWith("/")) {
    return `${origin}${pathOrUrl}`;
  }

  return `${origin}/${pathOrUrl}`;
}
