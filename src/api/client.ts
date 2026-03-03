// Keep API calls host-relative so the same frontend works on .net, .com and localhost via Vite proxy.
export const API_BASE_PATH = "/api/v1/public";

export function apiUrl(path: string): string {
  return `${API_BASE_PATH}${path.startsWith("/") ? "" : "/"}${path}`;
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(apiUrl(path), {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
