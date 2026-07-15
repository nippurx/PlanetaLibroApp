import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { AppSession, getSession } from "../api/session";

type AuthState = {
  session: AppSession | null;
  loading: boolean;
};

const AuthContext = createContext<AuthState>({ session: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AppSession | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getSession()
      .then((nextSession) => {
        if (cancelled) return;
        setSession(nextSession);
      })
      .catch(() => {
        if (!cancelled) {
          setSession(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => ({ session, loading }), [session, loading]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-light text-sm text-slate-500 dark:bg-background-dark dark:text-slate-400">
        Comprobando sesión...
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  return useContext(AuthContext);
}
