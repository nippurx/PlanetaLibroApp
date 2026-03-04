import { useEffect, useState } from "react";
import { getApiHealth } from "../api/books";

type HealthState = "loading" | "ok" | "error";

const badgeClasses: Record<HealthState, string> = {
  loading: "border-slate-300 bg-white text-slate-500",
  ok: "border-emerald-200 bg-emerald-50 text-emerald-700",
  error: "border-red-200 bg-red-50 text-red-700",
};

const badgeCopy: Record<HealthState, string> = {
  loading: "...",
  ok: "API OK",
  error: "API ERROR",
};

export function ApiHealthBadge() {
  const [state, setState] = useState<HealthState>("loading");

  useEffect(() => {
    let cancelled = false;

    async function checkHealth() {
      try {
        const response = await getApiHealth();
        if (!cancelled) {
          setState(response.ok ? "ok" : "error");
        }
      } catch {
        if (!cancelled) {
          setState("error");
        }
      }
    }

    void checkHealth();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50">
      <div className={`rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm ${badgeClasses[state]}`}>
        {badgeCopy[state]}
      </div>
    </div>
  );
}
