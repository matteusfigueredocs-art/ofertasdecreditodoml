import { useEffect, useState } from "react";

const receivers = [
  { name: "Mariana S.", city: "São Paulo - SP", time: "há 2 min", color: "from-pink-400 to-rose-500", initial: "M" },
  { name: "Carlos R.", city: "Rio de Janeiro - RJ", time: "há 5 min", color: "from-blue-400 to-indigo-500", initial: "C" },
  { name: "Juliana P.", city: "Belo Horizonte - MG", time: "há 8 min", color: "from-amber-400 to-orange-500", initial: "J" },
  { name: "Ricardo M.", city: "Curitiba - PR", time: "há 12 min", color: "from-emerald-400 to-teal-500", initial: "R" },
  { name: "Fernanda L.", city: "Salvador - BA", time: "há 15 min", color: "from-purple-400 to-fuchsia-500", initial: "F" },
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
      className={`fixed bottom-4 left-4 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-3 flex items-center gap-3 max-w-[280px]">
        <div className={`relative w-11 h-11 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center text-white font-bold shrink-0`}>
          {r.initial}
          <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#25D366] border-2 border-white flex items-center justify-center">
            <i className="fas fa-check text-white text-[7px]" />
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-bold text-gray-900 truncate">{r.name} recebeu o cartão</div>
          <div className="text-[10px] text-gray-500 truncate">{r.city}</div>
          <div className="text-[9px] text-[#3483FA] font-semibold mt-0.5">
            <i className="fas fa-circle text-[5px] mr-1 align-middle" />{r.time}
          </div>
        </div>
      </div>
    </div>
  );
}
