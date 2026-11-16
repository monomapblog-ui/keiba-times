import Link from "next/link";
import type { Article, GradedRace } from "@/lib/content";
import { formatRaceDate, gradeClass } from "@/lib/grade";

function courseBadge(course: string) {
  if (course.includes("ダート")) return { label: "ダ", cls: "bg-orange-50 text-orange-800" };
  if (course.includes("障")) return { label: "障", cls: "bg-neutral-100 text-neutral-700" };
  return { label: "芝", cls: "bg-emerald-50 text-emerald-800" };
}

export default function UpcomingRaceStrip({
  races,
  articlesByRace,
}: {
  races: GradedRace[];
  articlesByRace: Record<string, Article[]>;
}) {
  return (
    <div className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-5">
      {races.map((race) => {
        const badge = courseBadge(race.course);
        const hasArticle = (articlesByRace[race.name] ?? []).length > 0;
        const href = hasArticle ? `/articles/${articlesByRace[race.name][0].slug}` : "/schedule";
        return (
          <Link
            key={`${race.date}-${race.name}`}
            href={href}
            className="flex w-44 shrink-0 flex-col gap-2 rounded-xl border border-neutral-200 p-4 hover:border-neutral-400 sm:w-auto"
          >
            <div className="flex items-center gap-1.5">
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${gradeClass(race.grade)}`}>
                {race.grade}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${badge.cls}`}>
                {badge.label}
              </span>
              {hasArticle && (
                <span className="ml-auto text-[11px] font-bold text-emerald-700">記事あり</span>
              )}
            </div>
            <span className="font-serif text-sm font-bold leading-snug text-neutral-900">
              {race.name}
            </span>
            <span className="text-xs text-neutral-500">
              {formatRaceDate(race.date, race.dow)}・{race.venue}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
