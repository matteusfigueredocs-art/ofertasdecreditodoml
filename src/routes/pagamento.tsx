import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FunnelSteps } from "@/components/FunnelSteps";

export const Route = createFileRoute("/pagamento")({
  head: () => ({
    meta: [
      { title: "Finalize o envio - Mercado Livre" },
      { name: "description", content: "Pague o frete para receber seu cartão." },
    ],
  }),
  component: Pagamento,
});

const FAQ = [
  {
    q: "Como funciona o cartão virtual?",
    a: "O cartão virtual funciona como um cartão físico, mas é disponibilizado imediatamente após o pagamento. Você pode usar para compras online e apps.",
  },
  {
    q: "Por que eu preciso pagar o frete?",
    a: "O frete é necessário para o envio seguro do seu cartão físico. Este valor cobre os custos de postagem e seguro.",
  },
  {
    q: "O que acontece depois que eu pagar o frete?",
    a: "Após o pagamento, seu cartão virtual será ativado imediatamente e o cartão físico será enviado para o endereço cadastrado.",
  },
  {
    q: "E se eu pagar o frete e o cartão não chegar?",
    a: "Todos os envios são rastreados e segurados. Em caso de problema, entre em contato conosco para resolução imediata.",
  },
  {
    q: "E se eu não pagar o frete agora?",
    a: "Esta oferta é válida apenas hoje. Caso não efetue o pagamento dentro do prazo, o cartão será cancelado.",
  },
  {
    q: "Já paguei o frete. Preciso fazer mais alguma coisa?",
    a: "Não! Após o pagamento, seu cartão virtual será ativado automaticamente e você receberá todas as informações por email.",
  },
];

function Pagamento() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("TITULAR DO CARTÃO");
  const [seconds, setSeconds] = useState(10 * 60);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    const n = sp.get("nome");
    if (n) setNome(n.toUpperCase());
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <FunnelSteps current={5} />

      <main className="flex-1 flex items-start justify-center px-4 py-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 md:p-8">
          <div className="text-center mb-2">
            <div className="text-sm font-semibold text-gray-700">Seu Limite Disponível</div>
            <div className="text-3xl font-bold text-gray-900 mt-1">R$ 4.750</div>
          </div>

          <div className="mt-5 mb-6 rounded-2xl p-5 bg-gradient-to-br from-[#FFE600] to-[#1d5fc4] text-white shadow-lg aspect-[1.6] flex flex-col justify-between">
            <div className="w-10 h-7 rounded bg-[#FFD700]/90 shadow-inner" />
            <div className="text-lg font-semibold tracking-[0.2em]">
              4532 •••• •••• ••••
            </div>
            <div className="flex justify-between text-xs">
              <div>
                <div className="opacity-70 tracking-wider">TITULAR</div>
                <div className="font-semibold text-sm tracking-wide truncate max-w-[180px]">
                  {nome}
                </div>
              </div>
              <div className="text-right">
                <div className="opacity-70 tracking-wider">VALIDADE</div>
                <div className="font-semibold text-sm">12/28</div>
              </div>
            </div>
          </div>

          <h1 className="text-xl font-bold text-gray-800 mb-1">
            Finalize o envio do seu cartão
          </h1>
          <p className="text-sm text-gray-600 mb-5">
            Pague o frete para receber o cartão físico e ativar o cartão virtual agora mesmo.
          </p>

          <div className="text-center text-3xl font-bold text-gray-800 my-6">
            R$ 29,90
          </div>

          <button
            onClick={() => navigate({ to: "/" })}
            className="w-full bg-[#2A68C8] hover:bg-[#1E5BBA] text-white font-bold py-4 rounded-lg shadow-md transition-colors"
          >
            Pagar Frete
          </button>
          <div className="text-center text-xs text-gray-900 font-semibold mt-2 flex items-center justify-center gap-1">
            🔒 Pagamento 100% seguro
          </div>

          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <dt className="font-semibold text-gray-700">Método de Envio</dt>
              <dd className="text-gray-600">SEDEX</dd>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <dt className="font-semibold text-gray-700">Prazo de Entrega</dt>
              <dd className="text-gray-600">1 dia útil</dd>
            </div>
          </dl>

          <div className="mt-5 rounded-lg border border-gray-200 p-4">
            <div className="font-bold text-gray-800 text-sm">Pagamento em Até 10 Minutos</div>
            <div className="text-xs text-gray-600 mt-1">
              Realize o pagamento do frete em até 10 minutos para ativar o cartão virtual.
            </div>
          </div>

          <div className="mt-3 rounded-lg border border-gray-200 p-4">
            <div className="font-bold text-gray-800 text-sm">Ativação Após Pagamento</div>
            <div className="text-xs text-gray-600 mt-1">
              O cartão virtual será ativado automaticamente após a aprovação do pagamento.
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-gradient-to-r from-[#FFF7CC] to-[#FFE600]/40 border border-[#FFE600] p-4 text-center">
            <div className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Oferta expira em
            </div>
            <div className="text-3xl font-bold text-[#E53935] tabular-nums my-1">
              {mm}:{ss}
            </div>
            <div className="text-xs text-gray-700">Pague hoje para garantir seu cartão</div>
          </div>

          <h2 className="font-bold text-gray-800 mt-8 mb-3">Perguntas Frequentes</h2>
          <div className="space-y-2">
            {FAQ.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-semibold text-gray-800 hover:bg-gray-50"
                >
                  {item.q}
                  <span className={`transition-transform text-gray-400 ${open === i ? "rotate-180" : ""}`}>▼</span>
                </button>
                {open === i && (
                  <div className="px-4 pb-4 text-sm text-gray-600">{item.a}</div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3 p-3 bg-[#EAF2FE] rounded-lg">
            <div className="w-9 h-9 rounded-full bg-[#FFE600] flex items-center justify-center text-gray-900 font-bold shrink-0">
              ✓
            </div>
            <div className="text-sm">
              <div className="font-semibold text-gray-800">Ana Silva</div>
              <div className="text-xs text-gray-600">Recebeu seu cartão hoje · há 2 minutos</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
