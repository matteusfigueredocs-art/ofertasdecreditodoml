import { useEffect, useState } from "react";

const firstNames = [
  "Mariana", "Carlos", "Juliana", "Ricardo", "Fernanda", "Bruno", "Camila", "Rafael", "Patrícia", "Lucas",
  "Beatriz", "Gustavo", "Amanda", "Felipe", "Larissa", "Diego", "Vanessa", "Thiago", "Aline", "Eduardo",
  "Renata", "Marcelo", "Tatiana", "André", "Priscila", "Rodrigo", "Carolina", "Leandro", "Bianca", "Vinícius",
  "Daniela", "Fábio", "Letícia", "Murilo", "Gabriela", "Henrique", "Natália", "Pedro", "Sabrina", "Alex",
  "Isabela", "Otávio", "Cristina", "Wesley", "Débora", "Igor", "Simone", "Caio", "Joana", "Matheus",
  "Adriana", "Paulo", "Roberta", "Sérgio", "Luciana", "Marcos", "Tatiane", "José", "Helena", "Antônio",
  "Mônica", "Ronaldo", "Andréa", "Júlio", "Sandra", "Anderson", "Cláudia", "Maurício", "Vera", "Wagner",
  "Eliane", "Edson", "Sônia", "Jorge", "Regina", "Marcio", "Suelen", "Roberto", "Karina", "Daniel",
  "Michele", "Alexandre", "Janaína", "Fernando", "Tamires", "Cristiano", "Vitória", "Davi", "Lorena", "Samuel",
  "Yasmin", "Nathan", "Raquel", "Erick", "Mirela", "Heitor", "Manuela", "Arthur", "Sophia", "Enzo",
];

const lastInitials = ["S.", "R.", "P.", "M.", "L.", "C.", "F.", "G.", "A.", "B.", "O.", "T.", "N.", "D."];

const cities = [
  "São Paulo - SP", "Rio de Janeiro - RJ", "Belo Horizonte - MG", "Curitiba - PR", "Salvador - BA",
  "Porto Alegre - RS", "Recife - PE", "Fortaleza - CE", "Brasília - DF", "Manaus - AM",
  "Goiânia - GO", "Belém - PA", "Vitória - ES", "Florianópolis - SC", "Natal - RN",
  "Campinas - SP", "São Luís - MA", "Maceió - AL", "João Pessoa - PB", "Cuiabá - MT",
  "Teresina - PI", "Aracaju - SE", "Campo Grande - MS", "Londrina - PR", "Ribeirão Preto - SP",
  "Uberlândia - MG", "Sorocaba - SP", "Niterói - RJ", "Santos - SP", "Joinville - SC",
  "Caxias do Sul - RS", "Feira de Santana - BA", "Juiz de Fora - MG", "São José dos Campos - SP", "Osasco - SP",
  "Contagem - MG", "Aparecida de Goiânia - GO", "Ananindeua - PA", "Jaboatão - PE", "Petrópolis - RJ",
  "Santo André - SP", "São Bernardo - SP", "Pelotas - RS", "Anápolis - GO", "Itapetinga - BA",
  "Maringá - PR", "Mauá - SP", "Diadema - SP", "Carapicuíba - SP", "Piracicaba - SP",
];

const gradients = [
  "from-pink-400 to-rose-500",
  "from-blue-400 to-indigo-500",
  "from-amber-400 to-orange-500",
  "from-emerald-400 to-teal-500",
  "from-purple-400 to-fuchsia-500",
  "from-cyan-400 to-blue-500",
  "from-red-400 to-pink-500",
  "from-yellow-400 to-amber-500",
  "from-green-400 to-emerald-500",
  "from-violet-400 to-purple-500",
  "from-sky-400 to-cyan-500",
  "from-orange-400 to-red-500",
];

const limits = [
  "R$ 1.800", "R$ 2.500", "R$ 3.200", "R$ 3.800", "R$ 4.100", "R$ 4.500", "R$ 5.100", "R$ 5.700",
  "R$ 6.200", "R$ 6.800", "R$ 7.400", "R$ 8.000", "R$ 8.500", "R$ 9.200", "R$ 10.000", "R$ 12.000",
];

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function genReceiver() {
  const first = pick(firstNames);
  const last = pick(lastInitials);
  return {
    name: `${first} ${last}`,
    initial: first[0],
    city: pick(cities),
    limit: pick(limits),
    time: `há ${Math.floor(Math.random() * 28) + 1} min`,
    color: pick(gradients),
  };
}

export function RecentReceiversPopup() {
  const [r, setR] = useState(() => genReceiver());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = () => {
      setR(genReceiver());
      setVisible(true);
      setTimeout(() => setVisible(false), 4500);
    };
    const start = setTimeout(show, 1500);
    const interval = setInterval(show, 7000);
    return () => { clearTimeout(start); clearInterval(interval); };
  }, []);

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
