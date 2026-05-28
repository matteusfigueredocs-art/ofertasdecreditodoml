import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TrendingUp, UserCheck, Calculator, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import { FunnelSteps } from "@/components/FunnelSteps";

export const Route = createFileRoute("/calculando")({
  head: () => ({
    meta: [
      { title: "Calculando seu limite - Mercado Livre" },
      { name: "description", content: "Estamos definindo o melhor limite para você." },
    ],
  }),
  component: Calculando,
});

type StepState = "done" | "active" | "pending";

function Calculando() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(15);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStep(2);
      setProgress(60);
    }, 6000);
    const t2 = setTimeout(() => {
      setStep(3);
      setProgress(100);
    }, 12000);
    const t3 = setTimeout(() => {
      try {
        sessionStorage.setItem("limiteAprovado", "4200");
      } catch {}
      navigate({ to: "/aprovado" });
    }, 15000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [navigate]);

  // Animated counter going up to simulate "limit being calculated"
  useEffect(() => {
    const start = Date.now();
    const target = 4200;
    const duration = 14500;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      setCounter(Math.floor(target * eased));
      if (pct >= 1) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const getState = (i: number): StepState =>
    step > i ? "done" : step === i ? "active" : "pending";

  return (
    <div className="min-h-screen bg-[#FFE600] flex flex-col">
      {/* Header */}
      <FunnelSteps current={2} />

      <main className="flex-1 flex items-start justify-center px-3 py-5">
        <div className="w-full max-w-md">
          {/* Hero card with limite animado */}
          <div className="relative bg-gradient-to-br from-[#FFE600] to-[#1E5BBA] rounded-2xl shadow-xl p-5 text-white overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute -bottom-12 -left-8 w-28 h-28 rounded-full bg-[#FFE600]/20" />

            <div className="relative flex items-center gap-2 mb-3">
              <span className="text-[11px] opacity-90">Análise em tempo real</span>
            </div>

            <p className="relative text-xs uppercase tracking-wider opacity-90 mb-1">
              Calculando seu limite
            </p>
            <div className="relative flex items-end gap-1">
              <span className="text-sm font-semibold mb-1.5">R$</span>
              <span className="text-4xl font-extrabold tabular-nums">
                {counter.toLocaleString("pt-BR")}
              </span>
              <span className="ml-1 text-sm font-semibold mb-1.5 animate-pulse">,00</span>
            </div>

            {/* Progress */}
            <div className="relative mt-4">
              <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FFE600] rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] mt-1 opacity-90">
                <span>Processando dados</span>
                <span className="font-bold">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Spinner + título */}
          <div className="flex items-center gap-3 mt-5 mb-3">
            <div className="relative w-12 h-12 shrink-0">
              <div className="absolute inset-0 rounded-full border-[3px] border-gray-200" />
              <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#3483FA] animate-spin" />
              <div className="absolute inset-1.5 rounded-full bg-[#FFE600] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-gray-800" strokeWidth={2.6} />
              </div>
            </div>
            <div>
              <h1 className="text-base font-extrabold text-gray-900 leading-tight">
                Quase lá! Confirmando seu perfil
              </h1>
              <p className="text-[12px] text-gray-600 leading-snug">
                Estamos definindo o melhor limite para você.
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="bg-white rounded-2xl shadow-md p-3 space-y-2">
            <StepRow
              icon={<UserCheck className="w-4 h-4 text-white" strokeWidth={2.5} />}
              label="Validando perfil"
              state={getState(0)}
              status="done"
            />
            <StepRow
              icon={<Calculator className="w-4 h-4 text-white" strokeWidth={2.5} />}
              label="Calculando limite"
              state={getState(1)}
              status={step > 1 ? "done" : "loading"}
            />
            <StepRow
              icon={<CheckCircle2 className="w-4 h-4 text-white" strokeWidth={2.5} />}
              label="Verificando aprovação"
              state={getState(2)}
              status={step > 2 ? "done" : step === 2 ? "loading" : "waiting"}
            />
          </div>

          {/* Trust badge */}
          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-600">
            <ShieldCheck className="w-4 h-4 text-gray-900" />
            <span>Análise 100% segura e criptografada</span>
          </div>
        </div>
      </main>
    </div>
  );
}

function StepRow({
  icon,
  label,
  state,
  status,
}: {
  icon: React.ReactNode;
  label: string;
  state: StepState;
  status: "done" | "loading" | "waiting";
}) {
  const bg =
    state === "done"
      ? "bg-[#EAF2FE] border-l-4 border-[#FFE600]"
      : state === "active"
      ? "bg-[#EAF2FE] border-l-4 border-[#FFE600]"
      : "bg-gray-50 border-l-4 border-gray-200";

  const iconBg =
    state === "done" ? "#3483FA" : state === "active" ? "#3483FA" : "#9CA3AF";

  const labelColor = state === "pending" ? "text-gray-500" : "text-gray-800";

  return (
    <div className={`flex items-center justify-between rounded-lg px-3 py-2.5 ${bg}`}>
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconBg }}
        >
          {state === "done" ? (
            <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={2.5} />
          ) : (
            icon
          )}
        </div>
        <span className={`font-semibold text-[13px] ${labelColor}`}>{label}</span>
      </div>
      <div className="text-[11px]">
        {status === "done" && <span className="text-gray-900 font-semibold">✓ Ok</span>}
        {status === "loading" && (
          <span className="text-gray-900 tracking-widest animate-pulse font-bold">•••</span>
        )}
        {status === "waiting" && <span className="text-gray-400">Aguardando</span>}
      </div>
    </div>
  );
}
