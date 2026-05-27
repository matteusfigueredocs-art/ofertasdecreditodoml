import { useEffect, useState } from "react";
import { Clock, Flame } from "lucide-react";

/**
 * Sticky urgency bar — countdown + scarcity message.
 * Persists the deadline in sessionStorage so the timer doesn't reset
 * across funnel pages.
 */
export function UrgencyBar() {
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);

  useEffect(() => {
    const KEY = "ml_offer_deadline";
    let deadline = Number(sessionStorage.getItem(KEY));
    const now = Date.now();
    if (!deadline || deadline < now) {
      deadline = now + 15 * 60 * 1000;
      sessionStorage.setItem(KEY, String(deadline));
    }
    const tick = () => {
      const diff = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
      setSecondsLeft(diff);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="w-full bg-gradient-to-r from-[#D93025] via-[#E8472C] to-[#D93025] text-white py-2 px-3 flex items-center justify-center gap-2 text-[12px] sm:text-sm font-semibold shadow-md animate-pulse-soft">
      <Flame className="w-4 h-4 shrink-0" />
      <span className="hidden sm:inline">Oferta exclusiva expira em</span>
      <span className="sm:hidden">Expira em</span>
      <span className="inline-flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded-md font-mono tabular-nums">
        <Clock className="w-3 h-3" />
        {mm}:{ss}
      </span>
      <span className="hidden xs:inline">· Últimas vagas hoje</span>
    </div>
  );
}
