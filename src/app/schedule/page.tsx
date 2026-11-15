import Link from "next/link";
import { connection } from "next/server";
import ScheduleFilters from "@/components/ScheduleFilters";
import { getArticlesByRace, getGradedRaces, getNextGradedRace } from "@/lib/content";

export const metadata = { title: "重賞日程 | 競馬タイムズ" };
export const instant = false;

const GRADE_STYLE: Record<string, string> = {
  "GⅠ": "bg-amber-50 text-amber-900",
  "GⅡ": "bg-sky-50 text-sky-900",
  "GⅢ": "bg-neutral-100 text-neutral-700",
};

function gradeClass(grade: string) {
  const key = grade.replace("J・", "");
  return GRADE_STYLE[key] ?? "bg-neutral-100 text-neutral-700";
}

function formatDate(date: string, dow: string) {
  const [, m, d] = date.split("-");
  return `${Number(m)}月${Number(d)}日(${dow.replace("祝日・", "")})`;
}

export default async function SchedulePage() {
  await connection();
  const today = new Date().toISOString().slice(0, 10);
  const races = getGradedRaces();
  const nextRace = getNextGradedRace(today);
  const nextRaceArticles = nextRace ? getArticlesByRace(nextRace.name) : [];

  const venues = Array.from(new Set(races.map((r) => r.venue))).sort((a, b) =>
    a.localeCompare(b, "ja"),
  );
  const grades = Array.from(new Set(races.map((r) => r.grade.replace("J・", ""))));
  const articlesByRace = Object.fromEntries(
    Array.from(new Set(races.map((r) => r.name))).map((name) => [name, getArticlesByRace(name)]),
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-2 font-serif text-xl font-bold text-neutral-900">重賞日程</h1>
      <p className="mb-8 text-sm text-neutral-600">2026年のJRA重賞レース一覧です。</p>

      {nextRace && (
        <div className="mb-10 rounded-xl border border-amber-200 bg-amber-50 p-6">
          <span className="text-xs font-bold text-amber-800">次の注目レース</span>
          <div className="mt-2 flex flex-wrap items-baseline gap-3">
            <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${gradeClass(nextRace.grade)}`}>
              {nextRace.grade}
            </span>
            <h2 className="font-serif text-2xl font-bold text-neutral-900">{nextRace.name}</h2>
          </div>
          <p className="mt-2 text-sm text-neutral-700">
            {formatDate(nextRace.date, nextRace.dow)}・{nextRace.venue}・{nextRace.course}・{nextRace.ageSex}
          </p>
          {nextRaceArticles.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {nextRaceArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/articles/${a.slug}`}
                  className="text-sm font-bold text-emerald-800"
                >
                  予想コラムを読む: {a.title} →
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      <ScheduleFilters races={races} articlesByRace={articlesByRace} venues={venues} grades={grades} />
    </div>
  );
}
