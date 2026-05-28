import { Check } from "lucide-react";

const STEPS = [
  { id: 1, label: "Identificação" },
  { id: 2, label: "Análise" },
  { id: 3, label: "Personalização" },
  { id: 4, label: "Entrega" },
];

export function FunnelSteps({ current }: { current: number }) {
  return (
    <div className="w-full bg-[#F4D147] border-b border-[#E5C238]">
      <div className="max-w-md mx-auto px-3 py-3">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => {
            const done = current > s.id;
            const active = current === s.id;
            const circleClass = done
              ? "bg-[#F4D147] text-gray-900 border-[#F4D147]"
              : active
              ? "bg-white text-gray-900 border-[#F4D147] ring-4 ring-[#F4D147]/20"
              : "bg-white/70 text-gray-500 border-gray-400";
            const labelClass = active
              ? "text-gray-900 font-bold"
              : done
              ? "text-gray-800 font-semibold"
              : "text-gray-600";
            const prevDone = current > s.id - 1;
            return (
              <div key={s.id} className="flex-1 flex flex-col items-center relative">
                {i > 0 && (
                  <div
                    className={`absolute top-3 right-1/2 h-[2px] w-full ${
                      prevDone ? "bg-[#F4D147]" : "bg-gray-400/50"
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
