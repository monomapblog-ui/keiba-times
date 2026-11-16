import Link from "next/link";
import type { Article, GradedRace } from "@/lib/content";
import { formatRaceDate, gradeClass } from "@/lib/grade";
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

  return (
    <section className="overflow-hidden rounded-2xl border border-neutral-200">
      <div className="flex flex-col sm:flex-row">
        <Link
          href={articles[0] ? `/articles/${articles[0].slug}` : "/schedule"}
          className="block aspect-[4/3] w-full shrink-0 sm:aspect-auto sm:w-72"
        >
          <ArticleThumbnail
            lines={[race.name.slice(0, Math.ceil(race.name.length / 2)), race.name.slice(Math.ceil(race.name.length / 2))]}
            tag={race.grade}
            theme={theme}
          />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-bold text-white">
              次の注目レース
            </span>
            {remaining >= 0 && (
              <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-800">
                あと{remaining}日
              </span>
            )}
            <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${gradeClass(race.grade)}`}>
              {race.grade}
            </span>
          </div>

          <h2 className="font-serif text-2xl font-bold leading-snug text-neutral-900">
            {race.name}
          </h2>

          <p className="text-sm font-medium text-neutral-700">
            {formatRaceDate(race.date, race.dow)}・{race.venue}・{race.course}・{race.ageSex}
          </p>

          {articles.length > 0 ? (
            <div className="mt-1 flex flex-wrap gap-2">
              {articles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/articles/${a.slug}`}
                  className="rounded-full border border-emerald-800/30 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-900 hover:bg-emerald-100"
                >
                  {a.category === "データ分析" ? "📊 " : "📝 "}
                  {a.title.length > 28 ? `${a.title.slice(0, 28)}…` : a.title}
                </Link>
              ))}
            </div>
          ) : (
            <Link href="/schedule" className="mt-1 text-sm font-bold text-emerald-800">
              重賞日程を見る →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
