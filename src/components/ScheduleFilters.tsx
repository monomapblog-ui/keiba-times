"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { GradedRace, Article } from "@/lib/content";

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

export default function ScheduleFilters({
  races,
  articlesByRace,
  venues,
  grades,
}: {
  races: GradedRace[];
  articlesByRace: Record<string, Article[]>;
  venues: string[];
  grades: string[];
}) {
  const [venue, setVenue] = useState("");
  const [grade, setGrade] = useState("");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return races.filter((race) => {
      if (venue && race.venue !== venue) return false;
      if (grade && race.grade.replace("J・", "") !== grade) return false;
      if (q && !race.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [races, venue, grade, query]);

  const months = useMemo(
    () => Array.from(new Set(filtered.map((r) => r.date.slice(0, 7)))),
    [filtered],
  );

  const hasFilter = venue !== "" || grade !== "" || query.trim() !== "";

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <select
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-900 outline-none focus:border-neutral-400"
        >
          <option value="">競馬場: すべて</option>
          {venues.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>

        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-900 outline-none focus:border-neutral-400"
        >
          <option value="">グレード: すべて</option>
          {grades.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="レース名で検索"
          className="min-w-[180px] flex-1 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-400"
        />

        {hasFilter && (
          <button
            type="button"
            onClick={() => {
              setVenue("");
              setGrade("");
              setQuery("");
            }}
            className="text-sm font-bold text-neutral-600 hover:text-neutral-900"
          >
            条件をクリア
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-neutral-600">条件に一致するレースが見つかりませんでした。</p>
      ) : (
        <div className="flex flex-col gap-10">
          {months.map((month) => {
            const monthRaces = filtered.filter((r) => r.date.slice(0, 7) === month);
            const [, m] = month.split("-");
            return (
              <section key={month}>
                <h2 className="mb-4 font-serif text-lg font-bold text-neutral-900">{Number(m)}月</h2>
                <div className="flex flex-col divide-y divide-neutral-200 rounded-xl border border-neutral-200">
                  {monthRaces.map((race, i) => {
                    const articles = articlesByRace[race.name] ?? [];
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
      )}
    </div>
  );
}
