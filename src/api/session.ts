import { apiClient, buildApiUrl } from "./client";

type ApiEnvelope<T> = { data: T };

export type SessionUser = {
  id: number;
  username: string;
  avatar_url: string | null;
};

export type AppSession = {
  authenticated: boolean;
  user: SessionUser | null;
  entitlements: { premium: boolean };
  csrf_token: string | null;
};

export async function getSession(): Promise<AppSession> {
  const response = await apiClient.get<ApiEnvelope<AppSession>>("/public/session");
  return response.data;
}

export function getLegacyLoginUrl(returnTo: string): string {
  const safeReturn = returnTo.startsWith("/app/") || returnTo === "/app" ? returnTo : "/app/";
  return buildApiUrl(`/public/login-redirect?return_to=${encodeURIComponent(safeReturn)}`);
}
