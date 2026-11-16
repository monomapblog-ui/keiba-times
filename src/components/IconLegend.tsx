import type { CSSProperties } from "react";

const ITEMS: {
  label: string;
  desc: string;
  badge: string;
  badgeClass: string;
  badgeStyle?: CSSProperties;
}[] = [
  { label: "GⅠ / GⅡ / GⅢ", desc: "レースの格付け", badge: "GⅠ", badgeClass: "bg-amber-50 text-amber-900" },
  {
    label: "芝 / ダ",
    desc: "馬場の種類(芝コース・ダートコース)",
    badge: "芝",
    badgeClass: "",
    badgeStyle: { background: "#eafaf1", color: "var(--color-turf)" },
  },
  {
    label: "荒れ予想 / 順当予想",
    desc: "頭数・条件などから見た波乱度の目安(順当・荒れ・大荒れの3段階)",
    badge: "荒れ予想",
    badgeClass: "bg-orange-50 text-orange-800",
  },
  {
    label: "記事あり",
    desc: "そのレースに関する予想コラム・データ分析記事が公開されています",
    badge: "記事あり",
    badgeClass: "bg-emerald-50 text-emerald-900",
  },
  {
    label: "WIN5",
    desc: "その日のWIN5対象レースであることを示します",
    badge: "WIN5",
    badgeClass: "bg-amber-50 text-amber-800",
  },
  {
    label: "サンプル表示",
    desc: "本サイトでは未配信の下級条件レースを、レイアウト確認用のサンプルとして表示しています",
    badge: "サンプル表示",
    badgeClass: "border border-neutral-200 text-neutral-400",
  },
];

export default function IconLegend() {
  return (
    <details className="group rounded-xl border border-neutral-200 bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-serif text-sm font-bold text-neutral-900">
        アイコン・バッジの見方(凡例)
        <span className="text-neutral-400 transition group-open:rotate-180">⌄</span>
      </summary>
      <div className="flex flex-col gap-3 border-t border-neutral-100 px-5 py-4">
        {ITEMS.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <span
              className={`w-20 shrink-0 rounded px-2 py-1 text-center text-[11px] font-bold ${item.badgeClass}`}
              style={item.badgeStyle}
            >
              {item.badge}
            </span>
            <div>
              <p className="text-sm font-bold text-neutral-800">{item.label}</p>
              <p className="text-xs text-neutral-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </details>
  );
}
