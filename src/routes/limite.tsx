import { createFileRoute, useNavigate } from "@tanstack/react-router";
import mlLogo from "@/assets/mercado-livre-logo.png";
import { FunnelSteps } from "@/components/FunnelSteps";

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
      <div className="bg-[#FFE600] w-full py-3 flex justify-center items-center shadow-sm">
        <img src={mlLogo} alt="Mercado Livre" className="h-9 object-contain" />
      </div>
      <FunnelSteps current={3} />

      <div className="absolute w-72 h-72 rounded-full bg-[#FFE600]/20 -top-20 -right-20 z-0" />
      <div className="absolute w-56 h-56 rounded-full bg-[#FFE600]/10 -bottom-16 -left-16 z-0" />

      <main className="flex-1 flex items-start justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Entenda como funciona seu limite
          </h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            Saiba como seu limite de crédito pode aumentar ou diminuir
          </p>

          <div className="bg-[#EAF2FE] border-2 border-[#FFE600] rounded-lg p-5 text-center mb-4">
            <div className="text-gray-900 font-bold text-lg mb-2">Aumento de Limite</div>
            <p className="text-sm text-gray-700 leading-snug">
              Caso você realize o pagamento das faturas em dia, seu limite será aumentado constantemente.
            </p>
          </div>

          <div className="bg-[#FFF9DB] border-2 border-[#E8B84A] rounded-lg p-5 text-center mb-6">
            <div className="text-[#B8860B] font-bold text-lg mb-2">Redução de Limite</div>
            <p className="text-sm text-gray-700 leading-snug">
              No entanto, se houver atraso no pagamento das faturas, o limite poderá ser reduzido.
            </p>
          </div>

          <button
            onClick={() => navigate({ to: "/personalizar" })}
            className="w-full bg-[#FFE600] hover:bg-[#E6CF00] text-gray-900 text-lg font-semibold py-4 rounded-md shadow-md transition-all"
          >
            Concordo
          </button>
        </div>
      </main>

      <footer className="text-center text-xs text-gray-500 py-6 relative z-10">
        <p>© 2025 Mercado Instituição de Pagamento Ltda.</p>
        <p className="mt-1">
          CNPJ: 10.573.521/0001-91 ·{" "}
          <a href="#" className="text-gray-900">Termos e condições</a> ·{" "}
          <a href="#" className="text-gray-900">Privacidade</a>
        </p>
      </footer>
    </div>
  );
}
