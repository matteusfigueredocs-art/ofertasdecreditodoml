import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import mlLogo from "@/assets/mercado-livre-logo.png";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFE600] flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center w-full max-w-sm">
        <img
          src={mlLogo}
          alt="Mercado Livre"
          className="h-10 object-contain mb-8"
          loading="eager"
          decoding="async"
        />

        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-white border-t-[#3483FA] rounded-full animate-spin" />
            <p className="text-gray-900 font-semibold text-lg">Carregando...</p>
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
