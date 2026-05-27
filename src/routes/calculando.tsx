import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TrendingUp, UserCheck, Calculator, CheckCircle2 } from "lucide-react";
import mlLogo from "@/assets/mercado-livre-logo.png";

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
  const [step, setStep] = useState(1); // 0=validar, 1=calcular, 2=verificar
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStep(2);
      setProgress(70);
    }, 2200);
    const t2 = setTimeout(() => {
      setProgress(100);
    }, 4000);
    const t3 = setTimeout(() => navigate({ to: "/aprovado" }), 4800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [navigate]);

  const getState = (i: number): StepState =>
    step > i ? "done" : step === i ? "active" : "pending";

  return (
    <div className="min-h-screen bg-[#EEEEEE] flex flex-col">
      <div className="bg-[#FFE600] w-full py-3 flex justify-center items-center shadow-sm">
        <img src={mlLogo} alt="Mercado Livre" className="h-9 object-contain" />
      </div>

      <main className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 md:p-8">
          {/* Top progress bar */}
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-[#3483FA] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Circular icon with spinning arc */}
          <div className="flex justify-center mb-5">
            <div className="relative w-28 h-28">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#3483FA] animate-spin" />
              <div className="absolute inset-3 rounded-full bg-[#FFE600] flex items-center justify-center shadow-inner">
                <TrendingUp className="w-9 h-9 text-gray-800" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Calculando seu limite...
          </h1>
          <p className="text-sm text-gray-600 text-center mb-6 leading-snug">
            Com base no seu perfil, estamos definindo o melhor limite para você.
          </p>

          <div className="space-y-3">
            <StepRow
              icon={<UserCheck className="w-5 h-5 text-white" strokeWidth={2.5} />}
              label="Validando perfil"
              state={getState(0)}
              activeColor="#00A650"
              doneColor="#00A650"
              status="done"
            />
            <StepRow
              icon={<Calculator className="w-5 h-5 text-white" strokeWidth={2.5} />}
              label="Calculando limite"
              state={getState(1)}
              activeColor="#3483FA"
              doneColor="#00A650"
              status={step > 1 ? "done" : "loading"}
            />
            <StepRow
              icon={<CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />}
              label="Verificando aprovação"
              state={getState(2)}
              activeColor="#3483FA"
              doneColor="#00A650"
              status={step > 2 ? "done" : step === 2 ? "loading" : "waiting"}
            />
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
  activeColor,
  doneColor,
  status,
}: {
  icon: React.ReactNode;
  label: string;
  state: StepState;
  activeColor: string;
  doneColor: string;
  status: "done" | "loading" | "waiting";
}) {
  const bg =
    state === "done"
      ? "bg-[#E8F5EC] border-l-4 border-[#00A650]"
      : state === "active"
      ? "bg-[#EAF2FE] border-l-4 border-[#3483FA]"
      : "bg-gray-100 border-l-4 border-gray-200";

  const iconBg =
    state === "done" ? doneColor : state === "active" ? activeColor : "#9CA3AF";

  const labelColor =
    state === "pending" ? "text-gray-500" : "text-gray-800";

  return (
    <div className={`flex items-center justify-between rounded-lg px-4 py-3 ${bg}`}>
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconBg }}
        >
          {state === "done" ? (
            <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
          ) : (
            icon
          )}
        </div>
        <span className={`font-semibold text-sm ${labelColor}`}>{label}</span>
      </div>
      <div className="text-xs">
        {status === "done" && <span className="text-gray-500">Concluído</span>}
        {status === "loading" && (
          <span className="text-[#3483FA] tracking-widest animate-pulse">•••</span>
        )}
        {status === "waiting" && <span className="text-gray-400">Aguardando</span>}
      </div>
    </div>
  );
}
