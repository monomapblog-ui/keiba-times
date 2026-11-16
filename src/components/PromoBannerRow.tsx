import Link from "next/link";

const BANNERS = [
  {
    href: "/schedule",
    title: "重賞スケジュール",
    body: "直近の重賞日程と結果をまとめてチェック",
    bg: "linear-gradient(135deg, #1e7e58, #145c40)",
  },
  {
    href: "/about",
    title: "競馬タイムズ活用ガイド",
    body: "予想家の選び方、データコラムの読み方",
    bg: "linear-gradient(135deg, #141e24, #1a262d)",
  },
  {
    href: "/category/データ分析",
    title: "データ分析特集",
    body: "自分たちで集計した実データで徹底検証",
    bg: "linear-gradient(135deg, #e05a6d, #b8374a)",
  },
];

export default function PromoBannerRow() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {BANNERS.map((b) => (
        <Link
          key={b.href}
          href={b.href}
          className="flex flex-col gap-1 rounded-xl p-5 text-white"
          style={{ background: b.bg }}
        >
          <span className="font-serif text-base font-bold">{b.title}</span>
          <span className="text-xs text-white/80">{b.body}</span>
        </Link>
      ))}
    </div>
  );
}
