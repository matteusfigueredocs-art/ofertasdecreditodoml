import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { FunnelSteps } from "@/components/FunnelSteps";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/fatura")({
  head: () => ({
    meta: [
      { title: "Data de vencimento - Mercado Livre" },
      { name: "description", content: "Escolha a data de vencimento da sua fatura." },
    ],
  }),
  component: Fatura,
});

const days = [5, 10, 15, 20, 25];

function Fatura() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (day: number) => {
    setSelected(day);
    setTimeout(() => {
      navigate({ to: "/gerente" });
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <FunnelSteps current={5} />

      <main className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Escolha sua Data de Vencimento
          </h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            Selecione o dia do mês que melhor se adequa ao seu orçamento para o vencimento da fatura.
          </p>

          <div className="flex flex-col gap-3 mb-6">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => handleSelect(day)}
                className="flex items-center gap-4 border border-gray-200 rounded-xl p-4 hover:border-[#FFE600] hover:shadow-md transition-all text-left bg-white"
              >
                <div className="w-14 h-14 rounded-lg bg-[#FFE600] flex items-center justify-center text-gray-900 font-extrabold text-lg shrink-0">
                  {String(day).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-base">Todo dia {day}</div>
                  <div className="text-xs text-gray-500">Vencimento mensal</div>
                </div>
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            ))}
          </div>


          <div className="bg-gradient-to-r from-[#EAF2FE] to-white border border-[#FFE600]/20 rounded-lg p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FFE600] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2v.3h6V17c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z" />
              </svg>
            </div>
            <div className="text-sm">
              <div className="font-bold text-gray-800 mb-1">Dica Importante</div>
              <div className="text-gray-600 leading-snug">
                Considere sua data de recebimento. Você pode alterar posteriormente se necessário.
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />

      {selected !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="h-1.5 bg-[#FFE600]" />
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#FFE600]/10 flex items-center justify-center mb-5 ring-8 ring-[#FFE600]/5">
                <div className="w-16 h-16 rounded-full bg-[#FFE600] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-9 h-9 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Configurado!</h2>
              <p className="text-sm text-gray-600 mb-5">Sua data de vencimento foi definida</p>

              <div className="w-full bg-[#EAF2FE]/60 border border-[#FFE600]/20 rounded-lg py-4 px-4 mb-5">
                <div className="text-[11px] tracking-wider font-semibold text-gray-500 uppercase mb-1">
                  Vencimento da Fatura
                </div>
                <div className="text-lg font-bold text-gray-800">Todo dia {selected}</div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-4 h-4 rounded-full border-2 border-[#FFE600] border-t-transparent animate-spin" />
                Preparando sua conta...
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
