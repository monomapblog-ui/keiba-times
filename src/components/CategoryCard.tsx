import Link from "next/link";

const SWATCHES: Record<string, string[]> = {
  予想コラム: ["bg-emerald-50", "bg-neutral-100", "bg-neutral-200"],
  ニュース: ["bg-neutral-100", "bg-neutral-200", "bg-neutral-100"],
};

const DESCRIPTIONS: Record<string, string> = {
  予想コラム: "予想家が独自の視点で分析する、重賞・注目レースのコラムが並びます。",
  ニュース: "重賞レースの出走予定や競馬界の最新トピックをまとめて配信します。",
};

export default function CategoryCard({ category, count }: { category: string; count: number }) {
  const swatches = SWATCHES[category] ?? ["bg-neutral-100", "bg-neutral-200", "bg-neutral-100"];

  return (
    <Link
      href={`/category/${encodeURIComponent(category)}`}
      className="flex flex-col gap-2.5 rounded-xl border border-neutral-200 bg-white p-5"
    >
      <div className="flex gap-1.5">
        {swatches.map((swatch, i) => (
          <div key={i} className={`h-10 w-10 rounded-lg ${swatch}`} />
        ))}
      </div>
      <span className="font-serif text-base font-bold text-neutral-900">{category}</span>
      <span className="text-xs text-neutral-600">{count}件の記事</span>
      <p className="text-sm text-neutral-600">{DESCRIPTIONS[category] ?? ""}</p>
    </Link>
  );
}
