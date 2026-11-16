import Link from "next/link";
import type { Article, GradedRace } from "@/lib/content";
import { formatRaceDate, gradeClass } from "@/lib/grade";
import { getAllRacecourses } from "@/lib/courses";
import ArticleThumbnail from "@/components/ArticleThumbnail";

function daysUntil(dateStr: string, today: string) {
  const diff = (new Date(dateStr).getTime() - new Date(today).getTime()) / (1000 * 60 * 60 * 24);
  return Math.round(diff);
}

export default function FeaturedRaceHero({
  race,
  today,
  articles,
}: {
  race: GradedRace;
  today: string;
  articles: Article[];
}) {
  const remaining = daysUntil(race.date, today);
  const theme = articles[0]?.thumbnailTheme ?? "crimson";
  const courseSlug = getAllRacecourses().find((c) => c.name === race.venue)?.slug;
  const dataArticle = articles.find((a) => a.category === "データ分析");

  const quickNav = [
    { label: "データ分析", href: "/category/データ分析", enabled: true },
    { label: "予想コラム", href: "/articles", enabled: true },
    { label: "過去10年傾向", href: dataArticle ? `/articles/${dataArticle.slug}` : "/category/データ分析", enabled: true },
    { label: "コース特徴", href: courseSlug ? `/courses/${courseSlug}` : "/courses", enabled: true },
    { label: "出走馬・オッズ", href: "#", enabled: false },
    { label: "結果/払戻", href: "#", enabled: false },
  ];

  return (
    <section className="overflow-hidden rounded-2xl" style={{ background: "var(--color-navy)" }}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-6 pt-5">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
          次の注目レース
        </span>
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${gradeClass(race.grade)}`}>
          {race.grade}
        </span>
        {remaining >= 0 && (
          <span className="rounded-full px-2.5 py-1 text-xs font-bold text-white" style={{ background: "var(--color-coral)" }}>
            あと{remaining}日
          </span>
        )}
      </div>
      <h2 className="px-6 pb-4 pt-2 font-serif text-2xl font-bold leading-snug text-white sm:text-3xl">
        {race.name}
      </h2>
      <p className="-mt-3 px-6 pb-4 text-sm font-medium text-neutral-300">
        {formatRaceDate(race.date, race.dow)}・{race.venue}・{race.course}・{race.ageSex}
      </p>

      <div className="flex flex-col gap-5 px-6 pb-6 lg:flex-row">
        {/* left ~60%: visual */}
        <Link
          href={articles[0] ? `/articles/${articles[0].slug}` : "/schedule"}
          className="block aspect-[4/3] w-full overflow-hidden rounded-xl lg:aspect-auto lg:w-[58%]"
        >
          <ArticleThumbnail
            lines={[race.name.slice(0, Math.ceil(race.name.length / 2)), race.name.slice(Math.ceil(race.name.length / 2))]}
            tag={race.grade}
            theme={theme}
          />
        </Link>

        {/* right ~40%: quick nav + picks */}
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
            {quickNav.map((item) =>
              item.enabled ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-center text-xs font-bold text-white hover:bg-white/15"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  key={item.label}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 text-center text-xs font-bold text-white/30"
                >
                  {item.label}
                  <span className="block text-[10px] font-normal">準備中</span>
                </span>
              ),
            )}
          </div>

          <div className="flex-1 rounded-xl bg-white p-4">
            <p className="mb-2 text-xs font-bold text-neutral-500">注目データ・関連記事ピックアップ</p>
            {articles.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {articles.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/articles/${a.slug}`}
                      className="flex items-start gap-2 text-sm font-bold text-neutral-800 hover:text-emerald-800"
                    >
                      <span className="mt-0.5 shrink-0">
                        {a.category === "データ分析" ? "📊" : "📝"}
                      </span>
                      <span className="leading-snug">{a.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <Link href="/schedule" className="text-sm font-bold text-emerald-800">
                重賞日程を見る →
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
