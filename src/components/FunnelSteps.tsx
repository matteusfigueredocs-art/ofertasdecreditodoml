import { Check } from "lucide-react";

const STEPS = [
  { id: 1, label: "Identificação" },
  { id: 2, label: "Análise" },
  { id: 3, label: "Personalização" },
  { id: 4, label: "Entrega" },
  { id: 5, label: "Pagamento" },
];

export function FunnelSteps({ current }: { current: number }) {
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-md mx-auto px-3 py-3">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => {
            const done = current > s.id;
            const active = current === s.id;
            const circleClass = done
              ? "bg-[#00A650] text-white border-[#00A650]"
              : active
              ? "bg-[#3483FA] text-white border-[#3483FA] ring-4 ring-[#3483FA]/15"
              : "bg-white text-gray-400 border-gray-300";
            const labelClass = active
              ? "text-[#3483FA] font-semibold"
              : done
              ? "text-gray-700"
              : "text-gray-400";
            const lineClass = current > s.id ? "bg-[#00A650]" : "bg-gray-200";
            return (
              <div key={s.id} className="flex-1 flex flex-col items-center relative">
                {i > 0 && (
                  <div
                    className={`absolute top-3 right-1/2 h-[2px] w-full ${
                      current > s.id - 1 && current >= s.id ? "bg-[#3483FA]" : lineClass
                    }`}
                  />
                )}
                <div
                  className={`relative z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center text-[11px] font-bold ${circleClass}`}
                >
                  {done ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : s.id}
                </div>
                <span className={`mt-1 text-[9.5px] text-center leading-tight ${labelClass}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
