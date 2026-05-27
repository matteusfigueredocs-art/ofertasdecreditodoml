import { createFileRoute, useNavigate } from "@tanstack/react-router";
import mlLogo from "@/assets/mercado-livre-logo.png";

export const Route = createFileRoute("/fatura")({
  head: () => ({
    meta: [
      { title: "Data de vencimento - Mercado Livre" },
      { name: "description", content: "Escolha a data de vencimento da sua fatura." },
    ],
  }),
  component: Fatura,
});

const days = [5, 10, 15, 20, 25];

function Fatura() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#EEEEEE] flex flex-col">
      <div className="bg-[#FFE600] w-full py-3 flex justify-center items-center shadow-sm">
        <img src={mlLogo} alt="Mercado Livre" className="h-9 object-contain" />
      </div>

      <main className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Escolha sua Data de Vencimento
          </h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            Selecione o dia do mês que melhor se adequa ao seu orçamento para o vencimento da fatura.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => navigate({ to: "/" })}
                className={`flex items-center gap-3 border border-gray-200 rounded-lg p-3 hover:border-[#3483FA] hover:shadow-sm transition-all text-left ${
                  day === 25 ? "col-span-2 max-w-[50%] mx-auto w-full" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-md bg-[#3483FA] flex items-center justify-center text-white font-bold shrink-0">
                  {String(day).padStart(2, "0")}
                </div>
                <div className="flex-1 font-semibold text-gray-800 text-sm">Todo dia {day}</div>
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#E8F5EC] to-white border border-[#00A650]/20 rounded-lg p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#00A650] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2v.3h6V17c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z" />
              </svg>
            </div>
            <div className="text-sm">
              <div className="font-bold text-gray-800 mb-1">Dica Importante</div>
              <div className="text-gray-600 leading-snug">
                Considere sua data de recebimento. Você pode alterar posteriormente se necessário.
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-gray-500 py-6">
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
