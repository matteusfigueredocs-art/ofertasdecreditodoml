import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

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

const CITIES = [
  "São Paulo - SP", "Rio de Janeiro - RJ", "Belo Horizonte - MG", "Curitiba - PR",
  "Salvador - BA", "Porto Alegre - RS", "Recife - PE", "Fortaleza - CE",
  "Brasília - DF", "Manaus - AM", "Goiânia - GO", "Belém - PA", "Vitória - ES",
  "Florianópolis - SC", "Natal - RN", "Campinas - SP", "São Luís - MA",
  "Maceió - AL", "João Pessoa - PB", "Cuiabá - MT",
];

const DEVICES = ["iPhone", "Android", "Desktop"];

type Visitor = {
  id: string;
  city: string;
  device: string;
  stepIdx: number;
  enteredAt: number;
};

function rand<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)]; }

function genVisitor(): Visitor {
  // Weighted: more people at top of funnel
  const weights = FUNNEL.map((_, i) => Math.max(1, FUNNEL.length - i * 0.7));
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  let idx = 0;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r <= 0) { idx = i; break; }
  }
  return {
    id: Math.random().toString(36).slice(2, 9),
    city: rand(CITIES),
    device: rand(DEVICES),
    stepIdx: idx,
    enteredAt: Date.now() - Math.floor(Math.random() * 120000),
  };
}

function Admin() {
  const [visitors, setVisitors] = useState<Visitor[]>(() =>
    Array.from({ length: 47 }, genVisitor)
  );
  const [now, setNow] = useState(Date.now());
  const [totalToday, setTotalToday] = useState(1284);
  const [conversions, setConversions] = useState(38);

  useEffect(() => {
    const tick = setInterval(() => setNow(Date.now()), 1000);
    const churn = setInterval(() => {
      setVisitors((prev) => {
        const next = [...prev];
        // Random advance some visitors
        for (let i = 0; i < next.length; i++) {
          if (Math.random() < 0.18) {
            const nv = { ...next[i] };
            if (Math.random() < 0.15) {
              // leave
              next[i] = genVisitor();
            } else {
              nv.stepIdx = Math.min(FUNNEL.length - 1, nv.stepIdx + 1);
              nv.enteredAt = Date.now();
              next[i] = nv;
            }
          }
        }
        // Sometimes add/remove
        const delta = Math.floor(Math.random() * 5) - 2;
        if (delta > 0) for (let i = 0; i < delta; i++) next.push(genVisitor());
        if (delta < 0) for (let i = 0; i < -delta && next.length > 20; i++) next.pop();
        return next;
      });
      setTotalToday((t) => t + Math.floor(Math.random() * 3));
      if (Math.random() < 0.15) setConversions((c) => c + 1);
    }, 2500);
    return () => { clearInterval(tick); clearInterval(churn); };
  }, []);

  const byStep = useMemo(() => {
    const map = new Map<number, number>();
    visitors.forEach((v) => map.set(v.stepIdx, (map.get(v.stepIdx) || 0) + 1));
    return map;
  }, [visitors]);

  const maxStep = Math.max(...Array.from(byStep.values()), 1);
  const conversionRate = ((conversions / totalToday) * 100).toFixed(2);

  const recent = [...visitors]
    .sort((a, b) => b.enteredAt - a.enteredAt)
    .slice(0, 12);

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
              <p className="text-[11px] text-slate-400">Visitantes no funil em tempo real</p>
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
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KPI label="Online agora" value={visitors.length} icon="fa-users" accent="emerald" />
          <KPI label="Visitas hoje" value={totalToday.toLocaleString("pt-BR")} icon="fa-eye" accent="cyan" />
          <KPI label="Conversões" value={conversions} icon="fa-circle-check" accent="amber" />
          <KPI label="Taxa conversão" value={`${conversionRate}%`} icon="fa-percent" accent="violet" />
        </div>

        {/* Funnel */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-sm">Visitantes por etapa</h2>
            <span className="text-[11px] text-slate-400">Atualiza a cada 2.5s</span>
          </div>
          <div className="space-y-2">
            {FUNNEL.map((s, i) => {
              const count = byStep.get(i) || 0;
              const pct = (count / maxStep) * 100;
              return (
                <div key={s.path} className="group">
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
        </section>

        {/* Activity feed */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <h2 className="font-bold text-sm mb-3">Atividade recente</h2>
          <div className="divide-y divide-slate-800">
            {recent.map((v) => {
              const step = FUNNEL[v.stepIdx];
              const secs = Math.max(1, Math.floor((now - v.enteredAt) / 1000));
              return (
                <div key={v.id} className="flex items-center gap-3 py-2.5 text-xs">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <i className={`fas ${v.device === "iPhone" ? "fa-mobile-screen" : v.device === "Android" ? "fa-mobile" : "fa-desktop"} text-slate-300`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-slate-200 truncate">
                      Visitante de <span className="font-semibold">{v.city}</span>
                    </div>
                    <div className="text-slate-500 text-[10px]">
                      {v.device} • há {secs < 60 ? `${secs}s` : `${Math.floor(secs / 60)}min`}
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
        </section>

        <p className="text-center text-[10px] text-slate-600 pb-6">
          Dados simulados para visualização do funil • Acesso restrito
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
