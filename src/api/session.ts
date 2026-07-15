import { apiClient } from "./client";

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
};

export async function getSession(): Promise<AppSession> {
  const response = await apiClient.get<ApiEnvelope<AppSession>>("/public/session");
  return response.data;
}

export function getLegacyLoginUrl(returnTo: string): string {
  void returnTo;
  return "https://planetalibro.net/login.php";
}
