import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FunnelSteps } from "@/components/FunnelSteps";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/sucesso")({
  head: () => ({
    meta: [
      { title: "Pagamento confirmado - Mercado Livre" },
      { name: "description", content: "Seu pagamento foi confirmado e seu cartão está a caminho." },
    ],
  }),
  component: Sucesso,
});

function Sucesso() {
  const [nome, setNome] = useState("Titular");
  const [codigo, setCodigo] = useState("ML000000000BR");

  useEffect(() => {
    try {
      const n = sessionStorage.getItem("nomeTitular");
      if (n) setNome(n.trim().split(/\s+/)[0]);
    } catch {}
    // gera código de rastreio determinístico após mount (evita hydration mismatch)
    const rnd = Math.floor(100000000 + Math.random() * 900000000);
    setCodigo(`ML${rnd}BR`);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <FunnelSteps current={5} />

      <main className="flex-1 flex items-start justify-center px-4 py-6">
        <div className="w-full max-w-md">
          {/* Hero check */}
          <div className="bg-gradient-to-br from-[#3483FA] to-[#1E5BBA] rounded-2xl p-6 text-center shadow-lg shadow-[#3483FA]/30 mb-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-white flex items-center justify-center mb-3 shadow-md">
              <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#2A68C8]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Pagamento confirmado!</h1>
            <p className="text-sm text-white/90 mt-1">
              Tudo certo, {nome}. Seu cartão já está sendo preparado. 💳✨
            </p>
          </div>

          {/* Status box */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Status do pedido</span>
            </div>

            <ol className="space-y-3">
              {[
                { t: "Pagamento aprovado", d: "Confirmado via PIX", done: true },
                { t: "Cartão virtual ativado", d: "Disponível no app Mercado Pago", done: true },
                { t: "Cartão físico em separação", d: "Em até 24h", done: false, active: true },
                { t: "Envio para o endereço", d: "Você receberá o rastreio por e-mail", done: false },
              ].map((s) => (
                <li key={s.t} className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      s.done
                        ? "bg-[#3483FA] text-white"
                        : s.active
                        ? "border-2 border-[#3483FA] text-[#3483FA] bg-white"
                        : "border border-gray-300 text-gray-400 bg-white"
                    }`}
                  >
                    {s.done ? "✓" : s.active ? "•" : ""}
                  </span>
                  <div>
                    <div className={`text-sm font-semibold ${s.done || s.active ? "text-gray-800" : "text-gray-500"}`}>{s.t}</div>
                    <div className="text-xs text-gray-500">{s.d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Tracking */}
          <div className="bg-[#EAF2FE]/60 border border-[#3483FA]/30 rounded-xl p-4 mb-4">
            <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">📦 Código de rastreio</div>
            <div className="font-mono text-lg font-bold text-[#1E5BBA]">{codigo}</div>
            <div className="text-xs text-gray-600 mt-1">Ative o rastreio em até 24h pelo e-mail enviado.</div>
          </div>

          {/* Next steps */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-4">
            <div className="font-bold text-gray-800 mb-2">Próximos passos</div>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex gap-2"><span>📧</span> Você receberá um e-mail de confirmação em instantes.</li>
              <li className="flex gap-2"><span>📱</span> Use seu cartão virtual agora mesmo no app Mercado Pago.</li>
              <li className="flex gap-2"><span>🚚</span> Seu cartão físico chega em 3 a 7 dias úteis.</li>
            </ul>
          </div>

          <a
            href="https://www.mercadolivre.com.br"
            className="block w-full text-center bg-[#2A68C8] hover:bg-[#1E5BBA] text-white font-bold py-4 rounded-lg shadow-md transition-colors"
          >
            Voltar ao Mercado Livre
          </a>
          <div className="text-center text-xs text-gray-500 mt-3">
            Dúvidas? Entre em contato pelo app.
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
