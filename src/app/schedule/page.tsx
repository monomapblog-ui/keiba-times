import Link from "next/link";
import { connection } from "next/server";
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

  const months = Array.from(new Set(races.map((r) => r.date.slice(0, 7))));

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

      <div className="flex flex-col gap-10">
        {months.map((month) => {
          const monthRaces = races.filter((r) => r.date.slice(0, 7) === month);
          const [, m] = month.split("-");
          return (
            <section key={month}>
              <h2 className="mb-4 font-serif text-lg font-bold text-neutral-900">{Number(m)}月</h2>
              <div className="flex flex-col divide-y divide-neutral-200 rounded-xl border border-neutral-200">
                {monthRaces.map((race, i) => {
                  const articles = getArticlesByRace(race.name);
                  const isPast = Boolean(race.winner);
                  return (
                    <div key={i} className="flex flex-wrap items-center gap-3 p-4 text-sm">
                      <span className="w-28 shrink-0 text-neutral-600">
                        {formatDate(race.date, race.dow)}
                      </span>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${gradeClass(race.grade)}`}>
                        {race.grade}
                      </span>
                      <span className="font-serif font-bold text-neutral-900">{race.name}</span>
                      <span className="text-neutral-500">
                        {race.venue}・{race.course}
                      </span>
                      <span className="ml-auto flex items-center gap-3">
                        {isPast ? (
                          <span className="text-neutral-600">
                            優勝: {race.winner}({race.jockey})
                          </span>
                        ) : (
                          <span className="font-bold text-emerald-800">出走予定</span>
                        )}
                        {articles.map((a) => (
                          <Link
                            key={a.slug}
                            href={`/articles/${a.slug}`}
                            className="font-bold text-emerald-800 hover:underline"
                          >
                            コラムを読む →
                          </Link>
                        ))}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
