import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import mlLogo from "@/assets/mercado-livre-logo.png";
import { FunnelSteps } from "@/components/FunnelSteps";

export const Route = createFileRoute("/confirmacao")({
  head: () => ({
    meta: [
      { title: "Confirmação de Entrega - Mercado Livre" },
      { name: "description", content: "Confirme os detalhes do seu pedido antes de finalizar." },
    ],
  }),
  component: Confirmacao,
});

type Method = { name: string; price: string; days: string };
const METHODS: Record<string, Method> = {
type Method = { name: string; price: string; days: string };
const METHODS: Record<string, Method> = {
  sedex: { name: "SEDEX", price: "R$ 29,90", days: "3 dias úteis" },
  loggi: { name: "Loggi", price: "R$ 31,67", days: "1 dia útil" },
  pac: { name: "PAC", price: "R$ 24,30", days: "15-20 dias úteis" },
};
  const navigate = useNavigate();
  const [params, setParams] = useState({
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    metodo: "sedex",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    setParams((p) => ({
      endereco: sp.get("endereco") ?? p.endereco,
      numero: sp.get("numero") ?? p.numero,
      complemento: sp.get("complemento") ?? p.complemento,
      bairro: sp.get("bairro") ?? p.bairro,
      cidade: sp.get("cidade") ?? p.cidade,
      estado: sp.get("estado") ?? p.estado,
      cep: sp.get("cep") ?? p.cep,
      metodo: sp.get("metodo") ?? p.metodo,
    }));
  }, []);

  const method = METHODS[params.metodo] ?? METHODS.sedex;
  const line1 = [params.endereco, params.numero, params.complemento].filter(Boolean).join(", ");
  const line2 = [params.bairro, params.cidade && `${params.cidade}${params.estado ? "/" + params.estado : ""}`]
    .filter(Boolean).join(" - ");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-[#FFE600] w-full py-3 flex justify-center items-center shadow-sm">
        <img src={mlLogo} alt="Mercado Livre" className="h-9 object-contain" />
      </div>
      <FunnelSteps current={5} />

      <main className="flex-1 flex items-start justify-center px-4 py-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Confirmação de Entrega
          </h1>
          <p className="text-sm text-gray-600 text-center mb-5">
            Confirme os detalhes do seu pedido antes de finalizar
          </p>

          <div className="bg-[#EAF2FE]/60 border-2 border-[#FFE600] rounded-lg p-3 flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-full bg-[#FFE600] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="font-bold text-gray-900 text-sm">
              Taxa de envio gerada com sucesso!
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 bg-[#FFE600] rounded-sm" />
              <h2 className="font-bold text-gray-800">Detalhes do Envio</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 relative">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                </svg>
                <div className="text-xs font-bold text-gray-700 tracking-wide">ENDEREÇO DE ENTREGA:</div>
                <div className="absolute top-3 right-3 text-lg">📍</div>
              </div>
              <div className="text-sm text-gray-700 leading-relaxed">
                <div>{line1 || "—"}</div>
                <div>{line2 || "—"}</div>
                {params.cep && <div>CEP: {params.cep}</div>}
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-4 mb-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-[#3483FA]" />
              <h2 className="font-bold text-gray-800">Método de Envio</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="font-bold text-gray-800 text-lg mb-1">{method.name}</div>
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[#FFE600] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFE600]" />
                </div>
                Prazo de entrega: {method.days}
              </div>
              <div className="inline-flex bg-[#EAF2FE] text-gray-900 text-xs font-semibold py-1 px-3 rounded-full">
                ✓ Rastreamento incluído
              </div>
            </div>
          </div>

          <div className="text-center border-t border-gray-200 pt-4 mb-5">
            <div className="text-xs font-semibold text-gray-500 tracking-wider mb-1">
              TOTAL DO ENVIO
            </div>
            <div className="text-3xl font-bold text-gray-800">{method.price}</div>
          </div>

          <button
            onClick={() => navigate({ to: "/pagamento", search: { nome: new URLSearchParams(typeof window !== "undefined" ? window.location.search : "").get("nome") ?? "" } as never })}
            className="w-full bg-[#FFE600] hover:bg-[#E6CF00] text-gray-900 font-bold py-4 rounded-lg shadow-md transition-colors tracking-wide"
          >
            SIM, VOU QUERER!
          </button>
        </div>
      </main>
    </div>
  );
}
