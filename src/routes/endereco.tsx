import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import mlLogo from "@/assets/mercado-livre-logo.png";

export const Route = createFileRoute("/endereco")({
  head: () => ({
    meta: [
      { title: "Endereço de Entrega - Mercado Livre" },
      { name: "description", content: "Informe o endereço para entrega do seu cartão." },
    ],
  }),
  component: Endereco,
});

const estados = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB",
  "PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
];

function Endereco() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const formatCep = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 8);
    return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.cep || !form.endereco || !form.numero || !form.bairro || !form.cidade || !form.estado) return;
    navigate({ to: "/" });
  };

  const inputCls =
    "w-full border border-gray-300 rounded-lg px-3 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#3483FA] focus:ring-2 focus:ring-[#3483FA]/20 bg-white";
  const labelCls = "block text-sm font-semibold text-gray-800 mb-1.5";

  return (
    <div className="min-h-screen bg-[#EEEEEE] flex flex-col">
      <div className="bg-[#FFE600] w-full py-3 flex justify-center items-center shadow-sm">
        <img src={mlLogo} alt="Mercado Livre" className="h-9 object-contain" />
      </div>

      <main className="flex-1 flex items-start justify-center px-4 py-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Endereço de Entrega
          </h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            Onde você deseja receber seu cartão
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelCls}>CEP</label>
              <input
                inputMode="numeric"
                value={form.cep}
                onChange={(e) => setForm((f) => ({ ...f, cep: formatCep(e.target.value) }))}
                placeholder="00000-000"
                className={inputCls}
              />
            </div>

            <div>
              <label className={labelCls}>Endereço</label>
              <input value={form.endereco} onChange={set("endereco")} placeholder="Rua, Avenida, etc." className={inputCls} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Número</label>
                <input value={form.numero} onChange={set("numero")} placeholder="123" className={inputCls} inputMode="numeric" />
              </div>
              <div>
                <label className={labelCls}>Complemento <span className="font-normal text-gray-500">(opcional)</span></label>
                <input value={form.complemento} onChange={set("complemento")} placeholder="Apto, Bloco, etc." className={inputCls} />
              </div>
            </div>

            <div>
              <label className={labelCls}>Bairro</label>
              <input value={form.bairro} onChange={set("bairro")} placeholder="Nome do bairro" className={inputCls} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Cidade</label>
                <input value={form.cidade} onChange={set("cidade")} placeholder="Nome da cidade" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Estado</label>
                <select value={form.estado} onChange={set("estado")} className={inputCls + " appearance-none bg-no-repeat bg-right pr-8"} style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1l5 5 5-5' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>\")", backgroundPosition: "right 0.75rem center" }}>
                  <option value="">Selecione</option>
                  {estados.map((uf) => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3483FA] hover:bg-[#2968c8] text-white font-bold py-4 rounded-lg shadow-md transition-colors mt-2"
            >
              Continuar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
