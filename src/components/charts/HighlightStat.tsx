type Item = {
  label: string;
  value: string;
  sub?: string;
  color?: "blue" | "orange" | "emerald" | "neutral";
};

const COLOR_HEX: Record<NonNullable<Item["color"]>, string> = {
  blue: "#2a78d6",
  orange: "#eb6834",
  emerald: "#059669",
  neutral: "#737373",
};

export default function HighlightStat({ items, title }: { items: Item[]; title?: string }) {
  return (
    <div className="not-prose">
      {title && <p className="mb-3 text-xs font-bold text-neutral-600">{title}</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item) => {
          const color = COLOR_HEX[item.color ?? "blue"];
          return (
            <div
              key={item.label}
              className="rounded-xl border border-neutral-200 bg-neutral-50 py-5 pl-4 pr-5"
              style={{ borderLeft: `5px solid ${color}` }}
            >
              <p className="mb-1.5 text-xs font-bold text-neutral-600">{item.label}</p>
              <p className="font-serif text-2xl font-bold leading-tight" style={{ color }}>
                {item.value}
              </p>
              {item.sub && <p className="mt-1.5 text-xs text-neutral-500">{item.sub}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
