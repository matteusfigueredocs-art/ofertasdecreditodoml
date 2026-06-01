import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel Admin - Tempo Real" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Admin,
});

const FUNNEL = [
  { path: "/", label: "Landing", icon: "fa-house" },
  { path: "/validacao", label: "Validação CPF", icon: "fa-id-card" },
  { path: "/calculando", label: "Calculando", icon: "fa-spinner" },
  { path: "/interesse", label: "Interesse", icon: "fa-hand-pointer" },
  { path: "/questionario", label: "Questionário", icon: "fa-clipboard-question" },
  { path: "/processando", label: "Processando", icon: "fa-gear" },
  { path: "/aprovado", label: "Aprovado", icon: "fa-circle-check" },
  { path: "/limite", label: "Limite", icon: "fa-dollar-sign" },
  { path: "/personalizar", label: "Personalizar", icon: "fa-palette" },
  { path: "/cartao-aprovado", label: "Cartão", icon: "fa-credit-card" },
  { path: "/confirmacao", label: "Confirmação", icon: "fa-check-double" },
  { path: "/gerente", label: "Gerente", icon: "fa-user-tie" },
  { path: "/endereco", label: "Endereço", icon: "fa-location-dot" },
  { path: "/envio", label: "Envio", icon: "fa-truck" },
  { path: "/fatura", label: "Fatura", icon: "fa-file-invoice-dollar" },
  { path: "/pagamento", label: "Pagamento PIX", icon: "fa-qrcode" },
  { path: "/sucesso", label: "Sucesso", icon: "fa-trophy" },
];

type Visit = {
  session_id: string;
  path: string;
  user_agent: string | null;
  converted: boolean;
  last_seen_at: string;
  first_seen_at: string;
};

const ONLINE_WINDOW_MS = 60_000;

function deviceFromUA(ua: string | null): string {
  if (!ua) return "Desktop";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iPhone";
  if (/Android/i.test(ua)) return "Android";
  return "Desktop";
}

function deviceIcon(d: string) {
  return d === "iPhone" ? "fa-mobile-screen" : d === "Android" ? "fa-mobile" : "fa-desktop";
}

function Admin() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [totalToday, setTotalToday] = useState(0);
  const [conversionsToday, setConversionsToday] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const sinceOnline = new Date(Date.now() - ONLINE_WINDOW_MS).toISOString();
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const sinceToday = startOfDay.toISOString();

    const [{ data: online }, { count: todayCount }, { count: convCount }] = await Promise.all([
      supabase
        .from("funnel_visits")
        .select("session_id, path, user_agent, converted, last_seen_at, first_seen_at")
        .gte("last_seen_at", sinceOnline)
        .order("last_seen_at", { ascending: false })
        .limit(500),
      supabase
        .from("funnel_visits")
        .select("*", { count: "exact", head: true })
        .gte("first_seen_at", sinceToday),
      supabase
        .from("funnel_visits")
        .select("*", { count: "exact", head: true })
        .gte("first_seen_at", sinceToday)
        .eq("converted", true),
    ]);

    setVisits((online as Visit[]) || []);
    setTotalToday(todayCount || 0);
    setConversionsToday(convCount || 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const poll = setInterval(fetchData, 5000);
    const tick = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      clearInterval(poll);
      clearInterval(tick);
    };
  }, []);

  const byPath = useMemo(() => {
    const map = new Map<string, number>();
    visits.forEach((v) => map.set(v.path, (map.get(v.path) || 0) + 1));
    return map;
  }, [visits]);

  const maxStep = Math.max(...Array.from(byPath.values()), 1);
  const conversionRate = totalToday > 0 ? ((conversionsToday / totalToday) * 100).toFixed(2) : "0.00";

  const recent = visits.slice(0, 15);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <i className="fas fa-chart-line text-slate-950" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Painel ao vivo</h1>
              <p className="text-[11px] text-slate-400">Dados reais do funil</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 font-semibold">AO VIVO</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KPI label="Online agora" value={visits.length} icon="fa-users" accent="emerald" />
          <KPI label="Visitas hoje" value={totalToday.toLocaleString("pt-BR")} icon="fa-eye" accent="cyan" />
          <KPI label="Conversões hoje" value={conversionsToday} icon="fa-circle-check" accent="amber" />
          <KPI label="Taxa conversão" value={`${conversionRate}%`} icon="fa-percent" accent="violet" />
        </div>

        <section className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-sm">Visitantes online por etapa</h2>
            <span className="text-[11px] text-slate-400">Janela: 60s • atualiza a cada 5s</span>
          </div>
          {loading ? (
            <p className="text-xs text-slate-500 py-8 text-center">Carregando…</p>
          ) : (
            <div className="space-y-2">
              {FUNNEL.map((s) => {
                const count = byPath.get(s.path) || 0;
                const pct = (count / maxStep) * 100;
                return (
                  <div key={s.path}>
                    <div className="flex items-center gap-3 text-xs mb-1">
                      <i className={`fas ${s.icon} text-slate-400 w-4`} />
                      <span className="flex-1 font-medium text-slate-200">{s.label}</span>
                      <span className="text-slate-500 text-[10px] font-mono">{s.path}</span>
                      <span className="w-10 text-right font-bold tabular-nums text-emerald-400">{count}</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-700 ease-out"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <h2 className="font-bold text-sm mb-3">Atividade recente</h2>
          {recent.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">Nenhum visitante online no momento.</p>
          ) : (
            <div className="divide-y divide-slate-800">
              {recent.map((v) => {
                const step = FUNNEL.find((f) => f.path === v.path) || { label: v.path, icon: "fa-circle" };
                const device = deviceFromUA(v.user_agent);
                const secs = Math.max(1, Math.floor((now - new Date(v.last_seen_at).getTime()) / 1000));
                return (
                  <div key={v.session_id} className="flex items-center gap-3 py-2.5 text-xs">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                      <i className={`fas ${deviceIcon(device)} text-slate-300`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-slate-200 truncate font-mono text-[11px]">
                        {v.session_id.slice(0, 12)}…
                      </div>
                      <div className="text-slate-500 text-[10px]">
                        {device} • visto há {secs < 60 ? `${secs}s` : `${Math.floor(secs / 60)}min`}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold">
                        <i className={`fas ${step.icon}`} />
                        {step.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <p className="text-center text-[10px] text-slate-600 pb-6">
          Painel de uso interno • Acesso restrito
        </p>
      </main>
    </div>
  );
}

function KPI({ label, value, icon, accent }: { label: string; value: string | number; icon: string; accent: string }) {
  const colors: Record<string, string> = {
    emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-300",
    cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-300",
    amber: "from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-300",
    violet: "from-violet-500/20 to-violet-500/5 border-violet-500/30 text-violet-300",
  };
  return (
    <div className={`bg-gradient-to-br ${colors[accent]} border rounded-xl p-3`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{label}</span>
        <i className={`fas ${icon} text-xs opacity-70`} />
      </div>
      <div className="text-2xl font-extrabold tabular-nums">{value}</div>
    </div>
  );
}
