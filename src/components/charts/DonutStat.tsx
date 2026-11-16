type DonutItem = {
  label: string;
  value: number;
  sub?: string;
  color?: "blue" | "orange" | "emerald" | "neutral";
};

const COLOR_HEX: Record<NonNullable<DonutItem["color"]>, string> = {
  blue: "#2a78d6",
  orange: "#eb6834",
  emerald: "#059669",
  neutral: "#a3a3a3",
};

const SIZE = 104;
const STROKE = 10;
const R = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * R;

export default function DonutStat({ items, title }: { items: DonutItem[]; title?: string }) {
  return (
    <div className="not-prose">
      {title && <p className="mb-3 text-xs font-bold text-neutral-600">{title}</p>}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {items.map((item) => {
          const color = COLOR_HEX[item.color ?? "blue"];
          const pct = Math.max(0, Math.min(100, item.value));
          const dash = (pct / 100) * CIRCUMFERENCE;
          return (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-4 text-center"
            >
              <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
                <circle
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={R}
                  fill="none"
                  stroke="#e5e5e5"
                  strokeWidth={STROKE}
                />
                <circle
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={R}
                  fill="none"
                  stroke={color}
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
                  transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
                />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="font-serif"
                  style={{ fontSize: 19, fontWeight: 700, fill: "#171717" }}
                >
                  {pct % 1 === 0 ? pct : pct.toFixed(1)}%
                </text>
              </svg>
              <span className="text-xs font-bold text-neutral-800">{item.label}</span>
              {item.sub && <span className="text-[11px] text-neutral-500">{item.sub}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
