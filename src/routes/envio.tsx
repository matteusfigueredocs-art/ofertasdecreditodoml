import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import mlLogo from "@/assets/mercado-livre-logo.png";
import sedexLogo from "@/assets/sedex-logo.png";
import pacLogo from "@/assets/pac-logo.png";
import loggiLogo from "@/assets/loggi-logo.png";
import { FunnelSteps } from "@/components/FunnelSteps";

export const Route = createFileRoute("/envio")({
  head: () => ({
    meta: [
      { title: "Método de envio - Mercado Livre" },
      { name: "description", content: "Escolha o método de envio do seu cartão de crédito aprovado." },
    ],
  }),
  component: Envio,
});

type Stage = "confirm" | "searching" | "options";

const searchSteps = [
  "Localizando agência mais próxima",
  "Calculando rota de entrega",
  "Verificando prazos disponíveis",
  "Consultando frete Correios",
];

function Envio() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("confirm");
  const [stepIdx, setStepIdx] = useState(0);

  // pega cidade/estado/cep dos params (vindo do /endereco)
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    setCidade(sp.get("cidade") || "");
    setEstado(sp.get("estado") || "");
    setCep(sp.get("cep") || "");
  }, []);

  useEffect(() => {
    if (stage !== "searching") return;
    setStepIdx(0);
    const perStep = 2200; // ~10s total
    const timers: ReturnType<typeof setTimeout>[] = [];
    searchSteps.forEach((_, i) => {
      timers.push(setTimeout(() => setStepIdx(i + 1), (i + 1) * perStep));
    });
    timers.push(setTimeout(() => setStage("options"), searchSteps.length * perStep + 400));
    return () => timers.forEach(clearTimeout);
  }, [stage]);

  const handleSelect = (method: "sedex" | "pac" | "loggi") => {
    const current = typeof window !== "undefined" ? window.location.search : "";
    const sp = new URLSearchParams(current);
    sp.set("metodo", method);
    navigate({ to: "/confirmacao", search: Object.fromEntries(sp) as never });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-[#FFE600] w-full py-3 flex justify-center items-center shadow-sm">
        <img src={mlLogo} alt="Mercado Livre" className="h-9 object-contain" />
      </div>
      <FunnelSteps current={4} />

      <main className="flex-1 flex items-start justify-center px-4 py-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 md:p-8">
          {stage === "confirm" && (
            <>
              <h1 className="text-2xl font-bold text-gray-800 text-center mb-3">
                Confirme sua cidade
              </h1>
              <p className="text-sm text-gray-600 text-center mb-6 leading-relaxed">
                Vamos calcular o frete de entrega do seu cartão até esse endereço.
              </p>

              <div className="border-2 border-[#FFE600] rounded-xl p-5 mb-5 bg-[#FFFBE0]">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#FFE600] flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Entrega para</div>
                    <div className="text-lg font-bold text-gray-900 truncate">
                      {cidade || "Sua cidade"}{estado ? ` - ${estado}` : ""}
                    </div>
                    {cep && <div className="text-xs text-gray-600 mt-0.5">CEP {cep}</div>}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStage("searching")}
                className="w-full bg-[#FFE600] hover:bg-[#E6CF00] text-gray-900 font-bold py-4 rounded-lg shadow-md transition-colors"
              >
                Confirmar e calcular frete
              </button>
              <button
                onClick={() => navigate({ to: "/endereco" })}
                className="w-full mt-3 text-sm text-gray-600 hover:text-gray-900 font-medium py-2"
              >
                Alterar endereço
              </button>
            </>
          )}

          {stage === "searching" && (
            <>
              <h1 className="text-xl font-bold text-gray-800 text-center mb-1">
                Buscando opções de envio
              </h1>
              <p className="text-sm text-gray-600 text-center mb-6">
                Calculando frete até {cidade ? `${cidade}${estado ? `/${estado}` : ""}` : "seu endereço"}
              </p>

              {/* Mapa estilizado tipo Correios */}
              <div className="relative h-44 rounded-xl overflow-hidden bg-[#EAF4FF] border border-gray-200 mb-6">
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      "linear-gradient(0deg, rgba(0,80,180,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,80,180,.12) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 180" preserveAspectRatio="none">
                  <path d="M30 150 Q 140 40 250 110 T 380 60" stroke="#0050B4" strokeWidth="2.5" strokeDasharray="6 6" fill="none" />
                </svg>
                <div className="absolute left-6 bottom-6 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-[#0050B4] flex items-center justify-center shadow-md">
                    <span className="text-base">🏤</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-700 mt-1">Agência</span>
                </div>
                <div className="absolute right-6 top-6 flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#FFE600] border-2 border-gray-900 flex items-center justify-center shadow-md animate-pulse">
                    <span className="text-base">📍</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-900 mt-1 max-w-[100px] truncate">
                    {cidade || "Destino"}
                  </span>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-14 h-14 rounded-full border-4 border-[#FFE600] border-t-transparent animate-spin" />
                </div>
              </div>

              <div className="space-y-3">
                {searchSteps.map((label, i) => {
                  const done = i < stepIdx;
                  const active = i === stepIdx;
                  return (
                    <div key={label} className="flex items-center gap-3">
                      {done ? (
                        <span className="w-6 h-6 rounded-full bg-[#FFE600] text-gray-900 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                      ) : active ? (
                        <span className="w-6 h-6 rounded-full border-2 border-[#FFE600] border-t-transparent animate-spin shrink-0" />
                      ) : (
                        <span className="w-6 h-6 rounded-full border border-gray-300 shrink-0" />
                      )}
                      <span className={`text-sm ${done || active ? "text-gray-800 font-semibold" : "text-gray-400"}`}>
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {stage === "options" && (
            <>
              <h1 className="text-2xl font-bold text-gray-800 text-center mb-3">
                Escolha o método de envio
              </h1>
              <p className="text-sm text-gray-600 text-center mb-6 leading-relaxed">
                Entrega para <span className="font-bold text-gray-900">{cidade || "sua cidade"}{estado ? ` - ${estado}` : ""}</span>
              </p>

              <button
                onClick={() => handleSelect("sedex")}
                className="w-full border border-gray-200 rounded-xl p-4 mb-3 flex items-center gap-4 hover:border-[#FFE600] hover:shadow-sm transition-all text-left bg-white"
              >
                <div className="w-20 h-14 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0 p-1.5">
                  <img src={sedexLogo} alt="SEDEX" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-bold text-gray-800">SEDEX</div>
                    <div className="bg-[#FFE600] text-gray-900 text-[10px] font-bold py-1 px-2.5 rounded-full whitespace-nowrap">
                      MAIS POPULAR
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">3 dias úteis</div>
                  <div className="text-xs text-gray-900 font-semibold mt-0.5">
                    ✓ Rastreamento incluído
                  </div>
                  <div className="text-xs text-gray-500 italic mt-0.5">Chegará até 30/05</div>
                  <div className="text-right font-bold text-gray-800 -mt-5">R$ 29,90</div>
                </div>
              </button>

              <button
                onClick={() => handleSelect("loggi")}
                className="w-full border border-gray-200 rounded-xl p-4 mb-3 flex items-center gap-4 hover:border-[#FFE600] hover:shadow-sm transition-all text-left bg-white"
              >
                <div className="w-20 h-14 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0 p-0.5 overflow-hidden">
                  <img src={loggiLogo} alt="Loggi" className="w-full h-full object-contain scale-125" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-bold text-gray-800">Loggi</div>
                    <div className="font-bold text-gray-800 whitespace-nowrap">R$ 31,67</div>
                  </div>
                  <div className="text-sm text-gray-600">1 dia útil</div>
                  <div className="text-xs text-gray-900 font-semibold mt-0.5">
                    ✓ Rastreamento em tempo real
                  </div>
                  <div className="text-xs text-gray-500 italic mt-0.5">
                    Chegará até 28/05
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleSelect("pac")}
                className="w-full border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:border-[#FFE600] hover:shadow-sm transition-all text-left bg-white"
              >
                <div className="w-20 h-14 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0 p-1.5">
                  <img src={pacLogo} alt="PAC" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-bold text-gray-800">PAC</div>
                    <div className="font-bold text-gray-800 whitespace-nowrap">R$ 24,30</div>
                  </div>
                  <div className="text-sm text-gray-600">15-20 dias úteis</div>
                  <div className="text-xs text-gray-900 font-semibold mt-0.5">
                    ✓ Rastreamento incluído
                  </div>
                  <div className="text-xs text-gray-500 italic mt-0.5">
                    Chegará entre 17/06 a 24/06
                  </div>
                </div>
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
