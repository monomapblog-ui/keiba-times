type Stat = {
  label: string;
  value: string;
  sub: string;
  color: "blue" | "orange";
};

const COLOR_STYLE: Record<Stat["color"], { dot: string; value: string; border: string }> = {
  blue: { dot: "bg-[#2a78d6]", value: "text-[#2a78d6]", border: "border-[#2a78d6]/30" },
  orange: { dot: "bg-[#eb6834]", value: "text-[#eb6834]", border: "border-[#eb6834]/30" },
};

export default function StatCompare({ stats }: { stats: Stat[] }) {
  return (
    <div className="not-prose grid grid-cols-1 gap-4 sm:grid-cols-2">
      {stats.map((stat) => {
        const style = COLOR_STYLE[stat.color];
        return (
          <div key={stat.label} className={`rounded-xl border ${style.border} bg-neutral-50 p-5`}>
            <div className="mb-2 flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
              <span className="text-xs font-bold text-neutral-600">{stat.label}</span>
            </div>
            <div className={`font-serif text-3xl font-bold ${style.value}`}>{stat.value}</div>
            <div className="mt-1 text-xs text-neutral-500">{stat.sub}</div>
          </div>
        );
      })}
    </div>
  );
}
