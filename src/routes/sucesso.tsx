import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FunnelSteps } from "@/components/FunnelSteps";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/sucesso")({
  head: () => ({
    meta: [
      { title: "Pedido confirmado - Mercado Livre" },
      { name: "description", content: "Seu pedido foi confirmado. Em breve você receberá um e-mail com a emissão do cartão." },
    ],
  }),
  component: Sucesso,
});

type Endereco = {
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
};

const cardColorMap: Record<string, { from: string; to: string; text: string }> = {
  preto: { from: "#1a1a1a", to: "#3a3a3a", text: "#FFE600" },
  amarelo: { from: "#FFE600", to: "#F5C518", text: "#1a1a1a" },
  azul: { from: "#2A68C8", to: "#1E5BBA", text: "#ffffff" },
  branco: { from: "#f5f5f5", to: "#e5e5e5", text: "#1a1a1a" },
  vermelho: { from: "#D32F2F", to: "#A52525", text: "#ffffff" },
};

function Sucesso() {
  const [nomeCompleto, setNomeCompleto] = useState("Titular do Cartão");
  const [primeiroNome, setPrimeiroNome] = useState("Titular");
  const [endereco, setEndereco] = useState<Endereco | null>(null);
  const [cardColor, setCardColor] = useState("preto");
  const [cardColorName, setCardColorName] = useState("Preto");

  useEffect(() => {
    try {
      const n = sessionStorage.getItem("nomeTitular");
      if (n) {
        const upper = n.toUpperCase().trim();
        setNomeCompleto(upper);
        setPrimeiroNome(n.trim().split(/\s+/)[0]);
      }
      const end = sessionStorage.getItem("endereco");
      if (end) setEndereco(JSON.parse(end));
      const col = sessionStorage.getItem("cardColor");
      if (col) setCardColor(col);
      const colName = sessionStorage.getItem("cardColorName");
      if (colName) setCardColorName(colName);
    } catch {}
  }, []);

  const colors = cardColorMap[cardColor] ?? cardColorMap.preto;

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
            <h1 className="text-2xl font-bold text-white">Pedido confirmado!</h1>
            <p className="text-sm text-white/90 mt-1">
              Parabéns, {primeiroNome}! Seu cartão está sendo preparado. 💳
            </p>
          </div>

          {/* Cartão personalizado */}
          <div className="mb-4">
            <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 px-1">
              💳 Seu cartão
            </div>
            <div
              className="rounded-2xl p-5 aspect-[1.586/1] flex flex-col justify-between shadow-2xl relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                color: colors.text,
              }}
            >
              <div
                className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-10"
                style={{ background: colors.text }}
              />
              <div
                className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full opacity-10"
                style={{ background: colors.text }}
              />

              <div className="flex justify-between items-start relative z-10">
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                  Mercado Livre
                </div>
                <div
                  className="text-[10px] font-bold px-2 py-0.5 rounded"
                  style={{ background: colors.text + "22" }}
                >
                  {cardColorName}
                </div>
              </div>

              <div className="relative z-10">
                <div
                  className="w-10 h-7 rounded-md mb-3 opacity-90"
                  style={{
                    background: `linear-gradient(135deg, ${colors.text}cc, ${colors.text}66)`,
                  }}
                />
                <div className="font-mono text-base tracking-widest opacity-90">
                  •••• •••• •••• 4750
                </div>
              </div>

              <div className="flex justify-between items-end relative z-10">
                <div>
                  <div className="text-[8px] uppercase tracking-wider opacity-70">
                    Titular
                  </div>
                  <div className="text-xs font-bold tracking-wide truncate max-w-[180px]">
                    {nomeCompleto}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[8px] uppercase tracking-wider opacity-70">
                    Validade
                  </div>
                  <div className="text-xs font-bold">12/31</div>
                </div>
              </div>
            </div>
          </div>

          {/* Endereço de entrega */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-full bg-[#FFE600] flex items-center justify-center text-sm">
                📍
              </span>
              <div className="font-bold text-gray-800">Endereço de entrega</div>
            </div>
            {endereco ? (
              <div className="text-sm text-gray-700 leading-relaxed">
                <div className="font-semibold text-gray-900">{nomeCompleto}</div>
                <div>
                  {endereco.endereco}, {endereco.numero}
                  {endereco.complemento ? ` - ${endereco.complemento}` : ""}
                </div>
                <div>
                  {endereco.bairro} - {endereco.cidade}/{endereco.estado}
                </div>
                <div className="text-gray-500 text-xs mt-1">CEP {endereco.cep}</div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                Endereço informado durante o cadastro.
              </div>
            )}
          </div>

          {/* Aviso por e-mail */}
          <div className="bg-[#EAF2FE]/60 border border-[#3483FA]/30 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">📧</span>
              <div className="text-sm font-bold text-gray-900">
                Você receberá um e-mail
              </div>
            </div>
            <div className="text-xs text-gray-700 leading-relaxed">
              Assim que seu cartão for emitido, enviaremos um e-mail com o código
              de rastreio e os próximos passos da entrega.
            </div>
          </div>

          {/* Próximos passos */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-4">
            <div className="font-bold text-gray-800 mb-3">Próximos passos</div>
            <ol className="space-y-3">
              {[
                { t: "Pagamento confirmado", d: "Recebemos seu pagamento via PIX", done: true },
                { t: "Emissão do cartão", d: "Em até 5 dias úteis", active: true },
                { t: "E-mail de confirmação", d: "Aviso da emissão com rastreio", done: false },
                { t: "Entrega no endereço", d: "3 a 7 dias úteis após emissão", done: false },
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
                    <div className={`text-sm font-semibold ${s.done || s.active ? "text-gray-800" : "text-gray-500"}`}>
                      {s.t}
                    </div>
                    <div className="text-xs text-gray-500">{s.d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="text-center text-xs text-gray-500 mt-3 mb-2">
            Em caso de dúvidas, aguarde o e-mail de confirmação.
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
