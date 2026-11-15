import type { CourseStats as CourseStatsType } from "@/lib/courses";

function Table({
  head,
  rows,
}: {
  head: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-neutral-200 text-left text-xs text-neutral-500">
            {head.map((h) => (
              <th key={h} className="whitespace-nowrap px-2 py-2 font-bold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-neutral-100 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="whitespace-nowrap px-2 py-2 text-neutral-800">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="mb-3 font-serif text-sm font-bold text-neutral-900">{title}</h3>
      {children}
    </div>
  );
}

export default function CourseStats({ stats }: { stats: CourseStatsType }) {
  return (
    <div className="mb-10 rounded-xl border border-neutral-200 p-6">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-serif text-base font-bold text-neutral-900">コースデータ</h2>
        <span className="text-xs text-neutral-400">
          出典:{" "}
          <a href={stats.sourceUrl} className="underline hover:opacity-70" target="_blank" rel="noreferrer">
            {stats.sourceLabel}
          </a>
          {stats.asOf && `(${stats.asOf}時点)`}
        </span>
      </div>

      {stats.caveat && (
        <p className="mb-6 rounded-lg bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">{stats.caveat}</p>
      )}

      {stats.bracketStats && (
        <Section title="枠番別成績">
          <Table
            head={["枠", "着度数", "勝率", "連対率", "複勝率", "脚質内訳(逃/先/差/追)", "メモ"]}
            rows={stats.bracketStats.map((b) => [
              `${b.bracket}枠`,
              b.record,
              `${b.winRate}%`,
              `${b.placeRate}%`,
              `${b.showRate}%`,
              b.paceBreakdown?.map((p) => `${p.rate}%`).join(" / ") ?? "-",
              b.badges?.join("・") ?? "",
            ])}
          />
        </Section>
      )}

      {stats.paceStats && (
        <Section title="脚質別成績(枠を考慮しない全体値)">
          <Table
            head={["脚質", "勝率", "連対率", "複勝率"]}
            rows={stats.paceStats.map((p) => [p.style, `${p.winRate}%`, `${p.placeRate}%`, `${p.showRate}%`])}
          />
        </Section>
      )}

      {stats.favoriteStats && (
        <Section title="人気別成績">
          <Table
            head={["人気", "着度数", "勝率", "連対率", "複勝率", "推定単勝回収率"]}
            rows={stats.favoriteStats.map((f) => [
              `${f.rank}番人気`,
              f.record,
              `${f.winRate}%`,
              `${f.placeRate}%`,
              `${f.showRate}%`,
              f.estimatedReturnRate ? `${f.estimatedReturnRate}%` : "-",
            ])}
          />
        </Section>
      )}

      {stats.jockeyTop10 && (
        <Section title="騎手別成績トップ10(着度数)">
          <Table
            head={["騎手", "着度数", "1〜4番人気時", "5番人気以下"]}
            rows={stats.jockeyTop10.map((j) => [j.name, j.record, j.favoriteRecord ?? "-", j.longshotRecord ?? "-"])}
          />
        </Section>
      )}

      {stats.sireTop10 && (
        <Section title="種牡馬別成績トップ10(馬券内回数)">
          <Table
            head={["種牡馬", "系統", "馬券内", "①〜④人気", "⑤人気以下"]}
            rows={stats.sireTop10.map((s) => [
              s.name,
              s.lineage ?? "-",
              s.placedCount,
              s.favoriteCount,
              s.longshotCount,
            ])}
          />
        </Section>
      )}

      {stats.lineageGroupStats && (
        <Section title="大系統別の構成比(種牡馬の馬券内回数を系統ごとに合算)">
          <Table
            head={["系統", "馬券内合計", "構成比"]}
            rows={stats.lineageGroupStats.map((l) => [l.group, l.count, `${l.share}%`])}
          />
        </Section>
      )}

      {stats.baseTimes && (
        <Section title="基準タイムの目安">
          <Table
            head={Object.keys(stats.baseTimes)}
            rows={[Object.values(stats.baseTimes)]}
          />
        </Section>
      )}

      {stats.unavailable && stats.unavailable.length > 0 && (
        <p className="text-xs text-neutral-400">
          ※ {stats.unavailable.join("・")}は、今回参照した情報源では確認できなかったため掲載していません。
        </p>
      )}
    </div>
  );
}
