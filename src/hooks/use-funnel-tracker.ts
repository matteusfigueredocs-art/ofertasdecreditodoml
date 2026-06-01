import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "ml_funnel_session_id";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function useFunnelTracker() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname.startsWith("/admin")) return;

    const sessionId = getSessionId();
    const ua = navigator.userAgent;
    const converted = pathname === "/sucesso";

    const send = async () => {
      try {
        await supabase.from("funnel_visits").upsert(
          {
            session_id: sessionId,
            path: pathname,
            user_agent: ua,
            last_seen_at: new Date().toISOString(),
            ...(converted ? { converted: true } : {}),
          },
          { onConflict: "session_id" },
        );
      } catch {
        // silent
      }
    };

    send();
    const heartbeat = setInterval(send, 20000);
    return () => clearInterval(heartbeat);
  }, [pathname]);
}
