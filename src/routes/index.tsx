import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import mlLogo from "@/assets/mercado-livre-logo.png";
import { SiteFooter } from "@/components/SiteFooter";


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
import clienteAndre from "@/assets/cliente-andre.png";
import clientePatricia1 from "@/assets/cliente-patricia-1.png";
import clienteJuliana from "@/assets/cliente-juliana.png";
import clienteJoaoPedro from "@/assets/cliente-joao-pedro.png";

import clienteMariana from "@/assets/cliente-mariana.png";
import clienteJoao from "@/assets/cliente-joao.png";
import clienteCarlos from "@/assets/cliente-carlos.png";
import cartaoMao from "@/assets/cartao-mao.png";

const steps = [
  { img: step1Img, text: "Preencha seu CPF para consultar seu limite de cartão pré-aprovado" },
  { img: step2Img, text: "Escolha seu modelo de cartão e forma de envio" },
  { img: step3Img, text: "Receba seu cartão no conforto de casa e comece a usar" },
];

const clientes = [
  { img: clienteAndre, name: "ANDRÉ LIMA", city: "Cartão entregue", text: "Recebi meu cartão em casa e chegou tudo certinho." },
  { img: clientePatricia1, name: "PATRÍCIA ALVES", city: "Cartão entregue", text: "Foi bem rápido e o cartão veio do jeito que eu esperava." },
  { img: clienteJuliana, name: "JULIANA FERREIRA", city: "Cartão entregue", text: "Chegou direitinho e já consegui ativar sem dificuldade." },
  { img: clienteJoaoPedro, name: "JOÃO PEDRO LIMA", city: "Cartão entregue", text: "A entrega foi tranquila e o cartão veio certinho." },
  
  { img: clienteMariana, name: "MARIANA SOUZA", city: "Cartão entregue", text: "Atendimento ótimo e o cartão chegou rapidinho." },
  { img: clienteJoao, name: "JOÃO SILVA", city: "Cartão entregue", text: "Processo simples do começo ao fim, recomendo." },
  { img: clienteCarlos, name: "CARLOS OLIVEIRA", city: "Cartão entregue", text: "Recebi no prazo e já estou usando sem problemas." },
];


function Index() {
  const [idx, setIdx] = useState(0);
  const [clienteIdx, setClienteIdx] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % 3), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setClienteIdx((i) => (i + 1) % clientes.length), 4500);
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
    navigate({ to: "/validacao" });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto min-h-screen bg-[#FFE600] relative">

        {/* Header */}
        <div className="px-4 py-3 bg-[#FFE600] shadow-sm relative">

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menu"
              className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-black/5 active:bg-black/10 transition-colors"
            >
              <i className={`fas ${menuOpen ? "fa-xmark" : "fa-bars"} text-gray-900 text-xl`} />
            </button>
            <img src={mlLogo} alt="Mercado Livre" className="h-9 object-contain" />
            <div className="w-10 h-10" />
          </div>

          {/* Menu dropdown */}
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/40 z-40"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute left-2 right-2 top-full mt-2 z-50 bg-white rounded-xl shadow-2xl border border-[#E6CF00] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {[
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
                ].map((item) => (
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



        {/* Hero */}
        <div className="relative">
          <img src={heroImg} alt="Cartão Mercado Pago Pré-aprovado" className="w-full h-auto object-contain block" />
        </div>

        {/* Timeline */}
        <div className="-mt-12 relative z-10">
          {/* White divider line between hero and content */}
          <div className="h-1 bg-white w-full shadow-md" />
          <div className="bg-white p-6 pt-10 relative">




            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3483FA] text-white text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-full shadow-lg whitespace-nowrap ring-4 ring-white">
              Simples e rápido
            </div>


            <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center leading-tight">
              Aproveite seu cartão de crédito de forma segura, rápida e sem burocracia
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


        {/* Bloco entrega do cartão */}
        <div>
          <div className="relative bg-white overflow-hidden">

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
              {/* Efeito de fundo */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="absolute w-[78%] h-[78%] rounded-full bg-[#FFE600]/40 blur-3xl" />
                <div className="absolute w-[55%] h-[55%] rounded-full bg-[#3483FA]/25 blur-2xl translate-x-6 translate-y-4" />
                <svg className="absolute w-[90%] h-[90%] opacity-[0.07]" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="dots-entrega" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.8" fill="#1a1a1a" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#dots-entrega)" />
                </svg>
              </div>
              {/* Glow giratório sutil */}
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                aria-hidden
              >
                <div
                  className="w-[70%] h-[70%] rounded-full opacity-60 animate-[spin_18s_linear_infinite]"
                  style={{
                    background:
                      "conic-gradient(from 0deg, rgba(255,230,0,0) 0deg, rgba(255,230,0,0.55) 90deg, rgba(52,131,250,0.35) 180deg, rgba(255,230,0,0) 270deg)",
                    filter: "blur(28px)",
                  }}
                />
              </div>

              <img
                src={cartaoEntregaImg}
                alt="Cartão Mercado Livre e envelope de entrega"
                className="relative w-full max-w-[280px] object-contain drop-shadow-2xl"
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
        {/* Como Solicitar - Carrossel */}
        <div id="como-solicitar">
          <div className="bg-white p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Como solicitar?</h2>


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
        <div className="px-4 py-6 bg-white">
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

        {/* Benefícios */}
        {/* Benefícios */}
        <div className="bg-white p-5">
          <h2 className="text-lg font-bold text-gray-900 text-center mb-4">Benefícios do seu cartão</h2>
          <div className="relative flex justify-center items-end mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-[#EAF2FE] via-white to-[#3483FA]/10 pt-6">
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #3483FA 1.2px, transparent 1.5px)", backgroundSize: "18px 18px", opacity: 0.25 }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.7) 80%)" }} />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
            <img src={cartaoMao} alt="Cartão Mercado Livre Platinum sendo segurado" className="relative w-72 max-w-full h-auto drop-shadow-2xl" />
          </div>


          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "fa-shield-halved", title: "Compra protegida", desc: "Garantia em todas as compras" },
              { icon: "fa-gift", title: "Pontos Meli+", desc: "Acumule a cada compra" },
              { icon: "fa-globe", title: "Aceito no mundo", desc: "Mastercard internacional" },
              { icon: "fa-coins", title: "Cashback", desc: "Dinheiro de volta nas compras" },
            ].map((b) => (
              <div key={b.title} className="border border-gray-100 rounded-xl p-3 flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#EAF2FE] flex items-center justify-center shrink-0">
                  <i className={`fa-solid ${b.icon} text-[#3483FA]`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 leading-tight">{b.title}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>




        {/* Quem já recebeu */}
        <div className="bg-white p-5">
          <h2 className="text-lg font-bold text-gray-900 text-center mb-1">Quem já recebeu o cartão</h2>
          <div className="flex items-center justify-center gap-1 text-yellow-400 mb-4">
            {[...Array(5)].map((_, i) => <i key={i} className="fa-solid fa-star text-xs" />)}
            <span className="text-xs text-gray-600 ml-1 font-medium">4.8 · +12 mil avaliações</span>
          </div>

          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${clienteIdx * 100}%)` }}
            >
              {clientes.map((c) => (
                <div key={c.name} className="w-full shrink-0 px-1">
                  <div className="relative rounded-xl overflow-hidden aspect-[4/5] shadow-md">
                    <img src={c.img} alt={`${c.name} recebeu o cartão`} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-[#FFE600] rounded-full px-2 py-1 flex items-center gap-1 shadow">
                      <i className="fa-solid fa-check text-[10px] text-gray-900" />
                      <span className="text-[10px] font-bold text-gray-900">Entregue</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-3">
                      <p className="text-white text-base font-bold leading-tight">{c.name}</p>
                      <p className="text-white/80 text-[11px]">{c.city}</p>
                      <div className="flex gap-0.5 text-yellow-300 mt-1">
                        {[...Array(5)].map((_, i) => <i key={i} className="fa-solid fa-star text-[10px]" />)}
                      </div>
                      <p className="text-white text-xs leading-snug mt-1.5">"{c.text}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4">
            {clientes.map((_, i) => (
              <button
                key={i}
                onClick={() => setClienteIdx(i)}
                aria-label={`Cliente ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === clienteIdx ? "w-6 bg-[#3483FA]" : "w-2 bg-gray-300"}`}
              />
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white p-5">

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


        {/* Footer */}
        <div className="pb-28">
          <SiteFooter />
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
