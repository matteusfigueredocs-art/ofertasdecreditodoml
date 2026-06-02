import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShieldCheck, Lock } from "lucide-react";

export const Route = createFileRoute("/splash")({
  head: () => ({
    meta: [
      { title: "Carregando - Mercado Livre" },
      { name: "description", content: "Preparando ambiente seguro..." },
    ],
  }),
  component: SplashPage,
});

function SplashPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const duration = 10000;
    const interval = 50;
    const step = 100 / (duration / interval);
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setReady(true);
          return 100;
        }
        return next;
      });
    }, interval);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFE600] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 flex flex-col items-center">
        {/* Spinner */}
        <div className="w-20 h-20 rounded-full bg-[#3483FA]/10 flex items-center justify-center mb-6">
          <div className="w-12 h-12 rounded-full border-4 border-[#3483FA]/20 border-t-[#3483FA] animate-spin" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3 text-center">
          Carregando...
        </h1>
        <p className="text-gray-500 text-center mb-7 leading-relaxed">
          Estamos preparando o ambiente seguro para você continuar.
        </p>

        {/* Progress */}
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-[#3483FA] rounded-full transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-gray-400 text-sm font-semibold mb-7">
          {Math.round(progress)}%
        </p>

        {/* Trust box */}
        <div className="w-full bg-gray-50 rounded-2xl p-4 space-y-3 mb-7">
          <div className="flex items-center gap-3 text-gray-700 text-sm">
            <ShieldCheck className="w-5 h-5 text-[#00A650] shrink-0" />
            <span>
              <strong className="font-bold">Conexão protegida</strong> por criptografia SSL
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 text-sm">
            <Lock className="w-5 h-5 text-[#00A650] shrink-0" />
            <span>
              <strong className="font-bold">100% seguro</strong> e em conformidade com a LGPD
            </span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => ready && navigate({ to: "/" })}
          disabled={!ready}
          className={`w-full text-white text-base font-bold py-4 rounded-xl shadow-md transition-all duration-200 ${
            ready
              ? "bg-[#3483FA] hover:bg-[#2968C8] active:scale-[0.98] cursor-pointer"
              : "bg-[#3483FA]/40 cursor-not-allowed"
          }`}
        >
          {ready ? "CONTINUAR" : "AGUARDE..."}
        </button>
      </div>
    </div>
  );
}
