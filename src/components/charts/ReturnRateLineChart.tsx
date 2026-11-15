"use client";

import { useMemo, useState } from "react";

type YearPoint = {
  year: number;
  favorite: number;
  longshot: number;
};

const WIDTH = 720;
const HEIGHT = 360;
const PAD_LEFT = 44;
const PAD_RIGHT = 16;
const PAD_TOP = 20;
const PAD_BOTTOM = 32;

const COLOR_FAVORITE = "#2a78d6";
const COLOR_LONGSHOT = "#eb6834";

export default function ReturnRateLineChart({ data }: { data: YearPoint[] }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const plotWidth = WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;

  const maxValue = useMemo(() => {
    const max = Math.max(...data.map((d) => Math.max(d.favorite, d.longshot)), 100);
    return Math.ceil((max + 20) / 20) * 20;
  }, [data]);

  const xFor = (i: number) => PAD_LEFT + (i / (data.length - 1)) * plotWidth;
  const yFor = (v: number) => PAD_TOP + plotHeight - (v / maxValue) * plotHeight;

  const linePath = (key: "favorite" | "longshot") =>
    data.map((d, i) => `${i === 0 ? "M" : "L"}${xFor(i)},${yFor(d[key])}`).join(" ");

  const breakEvenY = yFor(100);
  const yTicks = [0, maxValue / 2, maxValue];
  const xLabelStep = Math.ceil(data.length / 8);

  const hovered = hoverIndex !== null ? data[hoverIndex] : null;

  return (
    <div className="not-prose">
      <div className="mb-3 flex items-center gap-5 text-xs font-bold text-neutral-700">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: COLOR_FAVORITE }} />
          1番人気
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: COLOR_LONGSHOT }} />
          最低人気
        </span>
        <span className="flex items-center gap-1.5 text-neutral-400">
          <span className="inline-block h-0 w-3 border-t-2 border-dashed border-neutral-400" />
          損益分岐(回収率100%)
        </span>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full"
          role="img"
          aria-label="1番人気と最低人気の年別回収率の推移"
          onMouseLeave={() => setHoverIndex(null)}
        >
          {yTicks.map((t) => (
            <g key={t}>
              <line
                x1={PAD_LEFT}
                x2={WIDTH - PAD_RIGHT}
                y1={yFor(t)}
                y2={yFor(t)}
                stroke="#e5e5e5"
                strokeWidth={1}
              />
              <text x={PAD_LEFT - 8} y={yFor(t) + 3} textAnchor="end" fontSize="10" fill="#737373">
                {t}%
              </text>
            </g>
          ))}

          <line
            x1={PAD_LEFT}
            x2={WIDTH - PAD_RIGHT}
            y1={breakEvenY}
            y2={breakEvenY}
            stroke="#a3a3a3"
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />

          {data.map((d, i) =>
            i % xLabelStep === 0 ? (
              <text key={d.year} x={xFor(i)} y={HEIGHT - PAD_BOTTOM + 16} textAnchor="middle" fontSize="10" fill="#737373">
                {d.year}
              </text>
            ) : null,
          )}

          <path d={linePath("longshot")} fill="none" stroke={COLOR_LONGSHOT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          <path d={linePath("favorite")} fill="none" stroke={COLOR_FAVORITE} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

          {hoverIndex !== null && (
            <line
              x1={xFor(hoverIndex)}
              x2={xFor(hoverIndex)}
              y1={PAD_TOP}
              y2={HEIGHT - PAD_BOTTOM}
              stroke="#a3a3a3"
              strokeWidth={1}
            />
          )}

          {data.map((d, i) => (
            <circle
              key={d.year}
              cx={xFor(i)}
              cy={yFor(d.favorite)}
              r={hoverIndex === i ? 4 : 0}
              fill={COLOR_FAVORITE}
            />
          ))}
          {data.map((d, i) => (
            <circle
              key={d.year}
              cx={xFor(i)}
              cy={yFor(d.longshot)}
              r={hoverIndex === i ? 4 : 0}
              fill={COLOR_LONGSHOT}
            />
          ))}

          {data.map((d, i) => (
            <rect
              key={d.year}
              x={xFor(i) - plotWidth / (data.length - 1) / 2}
              y={PAD_TOP}
              width={plotWidth / (data.length - 1)}
              height={plotHeight}
              fill="transparent"
              onMouseEnter={() => setHoverIndex(i)}
            />
          ))}
        </svg>

        {hovered && (
          <div
            className="pointer-events-none absolute top-0 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs shadow-sm"
            style={{
              left: `${(xFor(hoverIndex!) / WIDTH) * 100}%`,
              transform: hoverIndex! > data.length / 2 ? "translateX(-100%)" : "translateX(0%)",
            }}
          >
            <div className="mb-1 font-bold text-neutral-900">{hovered.year}年</div>
            <div style={{ color: COLOR_FAVORITE }}>1番人気: {hovered.favorite}%</div>
            <div style={{ color: COLOR_LONGSHOT }}>最低人気: {hovered.longshot}%</div>
          </div>
        )}
      </div>
      <p className="mt-2 text-[11px] text-neutral-500">
        年別の単勝回収率(その年のGI対象レースをまとめて100円ずつ購入したと仮定)。JRA公式サイトのレース結果データより作成。
      </p>
    </div>
  );
}
