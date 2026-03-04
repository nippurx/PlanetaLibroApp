const API_BASE = (import.meta.env.VITE_API_BASE ?? "").replace(/\/+$/, "");

function getRuntimeBase(): string {
  if (!API_BASE) {
    return "";
  }

  if (import.meta.env.DEV) {
    try {
      return new URL(API_BASE).pathname.replace(/\/+$/, "");
    } catch {
      return API_BASE;
    }
  }

  return API_BASE;
}

type HttpMethod = "GET" | "POST";

export class ApiError extends Error {
  status: number;
  payload: unknown;
  url: string;

  constructor(message: string, options: { status: number; payload: unknown; url: string }) {
    super(message);
    this.name = "ApiError";
    this.status = options.status;
    this.payload = options.payload;
    this.url = options.url;
  }
}

type RequestOptions = {
  body?: unknown;
  headers?: HeadersInit;
};

function buildUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getRuntimeBase()}${normalizedPath}`;
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

async function request<T>(method: HttpMethod, path: string, options: RequestOptions = {}): Promise<T> {
  const url = buildUrl(path);
  const response = await fetch(url, {
    method,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(options.body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const payload = await parseResponseBody(response);

  if (!response.ok) {
    const message =
      typeof payload === "object" &&
      payload !== null &&
      "error" in payload &&
      typeof payload.error === "object" &&
      payload.error !== null &&
      "message" in payload.error &&
      typeof payload.error.message === "string"
        ? payload.error.message
        : `Request failed with status ${response.status}`;

    throw new ApiError(message, {
      status: response.status,
      payload,
      url,
    });
  }

  return payload as T;
}

export const apiClient = {
  get<T>(path: string, headers?: HeadersInit) {
    return request<T>("GET", path, { headers });
  },
  post<T>(path: string, body?: unknown, headers?: HeadersInit) {
    return request<T>("POST", path, { body, headers });
  },
};

export { API_BASE };
