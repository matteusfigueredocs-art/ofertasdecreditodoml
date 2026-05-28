import { ShieldCheck, Lock, BadgeCheck, CreditCard } from "lucide-react";

export function TrustSeals() {
  const items = [
    { icon: ShieldCheck, label: "Site Oficial" },
    { icon: Lock, label: "SSL 256-bit" },
    { icon: BadgeCheck, label: "Dados Protegidos" },
    { icon: CreditCard, label: "Mastercard" },
  ];
  return (
    <div className="w-full max-w-md mx-auto px-4 py-4">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-3 py-3">
        <p className="text-[10px] uppercase tracking-wider text-gray-500 text-center mb-2 font-semibold">
          Compra 100% segura
        </p>
        <div className="grid grid-cols-4 gap-2">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="w-9 h-9 rounded-full bg-[#EAF2FE] flex items-center justify-center">
                <Icon className="w-4 h-4 text-[#3483FA]" strokeWidth={2.4} />
              </div>
              <span className="text-[10px] text-gray-700 font-medium text-center leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
