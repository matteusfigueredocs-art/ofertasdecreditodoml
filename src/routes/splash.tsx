import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/splash")({
  head: () => ({
    meta: [
      { title: "Bem-vindo - Mercado Livre" },
      { name: "description", content: "Carregando sua oferta exclusiva..." },
    ],
  }),
  component: SplashPage,
});

function SplashPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const duration = 10000;
    const interval = 50;
    const step = 100 / (duration / interval);
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setShowButton(true);
          return 100;
        }
        return next;
      });
    }, interval);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFE600] flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center w-full max-w-sm">
        {!showButton ? (
          <div className="flex flex-col items-center gap-4 w-full animate-in fade-in duration-300">
            <p className="text-gray-900 font-semibold text-lg">Carregando...</p>
            <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3483FA] rounded-full transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-gray-700 text-sm font-medium">{Math.round(progress)}%</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 w-full animate-in fade-in zoom-in-95 duration-300">
            <p className="text-gray-900 text-center text-base leading-relaxed">
              Sua oferta exclusiva está pronta!
            </p>
            <button
              onClick={() => navigate({ to: "/" })}
              className="w-full bg-[#3483FA] hover:bg-[#2968C8] text-white text-lg font-bold py-4 rounded-xl shadow-lg transition-all duration-200 active:scale-95"
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
