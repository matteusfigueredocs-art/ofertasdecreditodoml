import { Check } from "lucide-react";
import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import mlLogo from "@/assets/mercado-livre-logo.png";

const STEPS = [
  { id: 1, label: "Identificação" },
  { id: 2, label: "Análise" },
  { id: 3, label: "Personalização" },
  { id: 4, label: "Entrega" },
];

const MENU_ITEMS = [
  {
    icon: "fa-circle-question",
    title: "Como solicitar ajuda",
    text: "Acesse o app do Mercado Livre, vá em \"Minha conta\" > \"Ajuda\" e selecione o assunto. Nosso time responde em até 24h.",
  },
  {
    icon: "fa-headset",
    title: "Atendimento ao cliente",
    text: "Fale com a gente pelo chat do app, 24 horas por dia, 7 dias por semana. Atendimento 100% gratuito.",
  },
  {
    icon: "fa-shield-halved",
    title: "Segurança e proteção",
    text: "Em caso de perda, roubo ou compras não reconhecidas, bloqueie seu cartão direto pelo app na hora.",
  },
];

export function FunnelSteps({
  current,
  showBack = true,
}: {
  current: number;
  showBack?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleBack = () => {
    router.history.back();
  };

  return (
    <div className="w-full bg-[#FFE600] border-b border-[#E6CF00] relative">
      <div className="max-w-md mx-auto px-3 pt-3 pb-3">
        <div className="flex items-center justify-between mb-3">
          {showBack ? (
            <button
              type="button"
              onClick={handleBack}
              aria-label="Voltar"
              className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-black/5 active:bg-black/10 transition-colors"
            >
              <i className="fas fa-arrow-left text-gray-900 text-lg" />
            </button>
          ) : (
            <div className="w-9 h-9" />
          )}
          <img src={mlLogo} alt="Mercado Livre" className="h-8 object-contain" />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menu"
            className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-black/5 active:bg-black/10 transition-colors"
          >
            <i className={`fas ${menuOpen ? "fa-xmark" : "fa-bars"} text-gray-900 text-lg`} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => {
            const done = current > s.id;
            const active = current === s.id;
            const circleClass = done
              ? "bg-[#FFE600] text-gray-900 border-[#FFE600]"
              : active
              ? "bg-white text-gray-900 border-[#FFE600] ring-4 ring-[#FFE600]/20"
              : "bg-white/70 text-gray-500 border-gray-400";
            const labelClass = active
              ? "text-gray-900 font-bold"
              : done
              ? "text-gray-800 font-semibold"
              : "text-gray-600";
            const prevDone = current > s.id - 1;
            return (
              <div key={s.id} className="flex-1 flex flex-col items-center relative">
                {i > 0 && (
                  <div
                    className={`absolute top-3 right-1/2 h-[2px] w-full ${
                      prevDone ? "bg-[#FFE600]" : "bg-gray-400/50"
                    }`}
                  />
                )}
                <div
                  className={`relative z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center text-[11px] font-bold ${circleClass}`}
                >
                  {done ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : s.id}
                </div>
                <span className={`mt-1 text-[9.5px] text-center leading-tight ${labelClass}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute left-2 right-2 top-full mt-2 z-50 max-w-md mx-auto bg-white rounded-xl shadow-2xl border border-[#E6CF00] overflow-hidden">
            {MENU_ITEMS.map((item) => (
              <details key={item.title} className="group border-b border-gray-100 last:border-b-0">
                <summary className="flex items-center gap-3 px-4 py-3 cursor-pointer list-none hover:bg-gray-50">
                  <span className="w-8 h-8 rounded-full bg-[#FFE600] flex items-center justify-center shrink-0">
                    <i className={`fas ${item.icon} text-gray-900 text-sm`} />
                  </span>
                  <span className="flex-1 text-sm font-semibold text-gray-900">
                    {item.title}
                  </span>
                  <i className="fas fa-chevron-down text-gray-500 text-xs transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-4 pb-4 pt-0 text-xs text-gray-700 leading-relaxed">
                  {item.text}
                </p>
              </details>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
