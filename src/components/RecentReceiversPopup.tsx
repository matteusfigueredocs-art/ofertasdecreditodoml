import { useEffect, useState } from "react";

const receivers = [
  { name: "Mariana S.", city: "São Paulo - SP", time: "há 2 min", limit: "R$ 4.500", color: "from-pink-400 to-rose-500", initial: "M" },
  { name: "Carlos R.", city: "Rio de Janeiro - RJ", time: "há 5 min", limit: "R$ 6.200", color: "from-blue-400 to-indigo-500", initial: "C" },
  { name: "Juliana P.", city: "Belo Horizonte - MG", time: "há 8 min", limit: "R$ 3.800", color: "from-amber-400 to-orange-500", initial: "J" },
  { name: "Ricardo M.", city: "Curitiba - PR", time: "há 12 min", limit: "R$ 8.500", color: "from-emerald-400 to-teal-500", initial: "R" },
  { name: "Fernanda L.", city: "Salvador - BA", time: "há 15 min", limit: "R$ 5.100", color: "from-purple-400 to-fuchsia-500", initial: "F" },
];


export function RecentReceiversPopup() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let i = 0;
    const show = () => {
      setIndex(i % receivers.length);
      setVisible(true);
      setTimeout(() => setVisible(false), 4500);
      i++;
    };
    const start = setTimeout(show, 1500);
    const interval = setInterval(show, 7000);
    return () => { clearTimeout(start); clearInterval(interval); };
  }, []);

  const r = receivers[index];

  return (
    <div
      className={`fixed bottom-3 left-3 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-2 flex items-center gap-2 max-w-[220px]">
        <div className={`relative w-8 h-8 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
          {r.initial}
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#25D366] border border-white flex items-center justify-center">
            <i className="fas fa-check text-white text-[5px]" />
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-bold text-gray-900 truncate leading-tight">{r.name} recebeu o cartão</div>
          <div className="text-[8px] text-gray-500 truncate leading-tight">{r.city} • {r.time}</div>
          <div className="text-[8px] font-extrabold text-[#00A650] leading-tight mt-0.5">
            Limite {r.limit}
          </div>
        </div>
      </div>
    </div>
  );
}

