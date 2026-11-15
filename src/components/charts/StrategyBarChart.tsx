"use client";

type Bar = {
  label: string;
  value: number;
  color?: "blue" | "orange" | "neutral";
};

const COLOR_HEX: Record<NonNullable<Bar["color"]>, string> = {
  blue: "#2a78d6",
  orange: "#eb6834",
  neutral: "#a3a3a3",
};

export default function StrategyBarChart({
  bars,
  unit = "%",
  title,
}: {
  bars: Bar[];
  unit?: string;
  title?: string;
}) {
  const max = Math.max(...bars.map((b) => b.value), 1);

  return (
    <div className="not-prose">
      {title && <p className="mb-3 text-xs font-bold text-neutral-600">{title}</p>}
      <div className="flex flex-col gap-2.5">
        {bars.map((bar) => {
          const widthPct = (bar.value / max) * 100;
          const color = COLOR_HEX[bar.color ?? "neutral"];
          return (
            <div key={bar.label} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-right text-xs font-bold text-neutral-700">
                {bar.label}
              </span>
              <div className="flex-1 rounded bg-neutral-100">
                <div
                  className="flex h-5 items-center justify-end rounded px-2"
                  style={{ width: `${Math.max(widthPct, 6)}%`, background: color }}
                >
                  <span className="text-[11px] font-bold text-white">
                    {bar.value}
                    {unit}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
