"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { RaceDay, RaceRow } from "@/lib/raceDayMock";
import { gradeClass } from "@/lib/grade";

const CHAOS_STYLE: Record<RaceRow["chaos"], string> = {
  順当: "bg-sky-50 text-sky-800",
  荒れ: "bg-orange-50 text-orange-800",
  大荒れ: "bg-rose-50 text-rose-800",
};

function surfaceBadge(surface: RaceRow["surface"]) {
  return surface === "芝"
    ? { label: "芝", style: { background: "#eafaf1", color: "var(--color-turf)" } }
    : { label: "ダ", style: { background: "#fbeee1", color: "var(--color-dirt)" } };
}

function formatTab(date: string, dow: string) {
  const [, m, d] = date.split("-");
  return { md: `${Number(m)}/${Number(d)}`, dow: dow.replace("祝日・", "").replace("曜", "") };
}

function RaceRowView({ row }: { row: RaceRow }) {
  const surface = surfaceBadge(row.surface);
  return (
    <div className="flex items-start gap-3 border-t border-neutral-100 px-4 py-3 first:border-t-0">
      <span
        className="mt-0.5 flex h-7 w-9 shrink-0 items-center justify-center rounded text-xs font-bold text-white"
        style={{ background: "var(--color-brand)" }}
      >
        {row.number}R
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          {row.grade && (
            <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${gradeClass(row.grade)}`}>
              {row.grade}
            </span>
          )}
          <span className="truncate text-sm font-bold text-neutral-900">{row.name}</span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-500">
          <span className="rounded px-1.5 py-0.5 text-[10px] font-bold" style={surface.style}>
            {surface.label}
          </span>
          <span>{row.distance.toLocaleString()}m</span>
          <span>・{row.headcount}頭</span>
          <span>・{row.condition}</span>
          {row.isGraded && (
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800">
              WIN5
            </span>
          )}
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${CHAOS_STYLE[row.chaos]}`}>
            {row.chaos}予想
          </span>
          {row.articleHref ? (
            <Link
              href={row.articleHref}
              className="rounded-full border border-emerald-800/30 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-900"
            >
              記事あり
            </Link>
          ) : row.isMock ? (
            <span className="rounded-full border border-neutral-200 px-2 py-0.5 text-[10px] font-medium text-neutral-400">
              サンプル表示
            </span>
          ) : null}
        </div>
      </div>

      <span className="mt-1 shrink-0 text-neutral-300">›</span>
    </div>
  );
}

export default function RaceDayExplorer({ raceDays }: { raceDays: RaceDay[] }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [gradedOnly, setGradedOnly] = useState(false);

  const active = raceDays[Math.min(tabIndex, raceDays.length - 1)];

  const venues = useMemo(() => {
    if (!active) return [];
    if (!gradedOnly) return active.venues;
    return active.venues
      .map((v) => ({ ...v, races: v.races.filter((r) => r.isGraded) }))
      .filter((v) => v.races.length > 0);
  }, [active, gradedOnly]);

  if (!active) return null;

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-xl font-bold text-neutral-900">レース一覧</h2>
        <div className="flex gap-2">
          <span className="rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-bold text-neutral-500">
            WIN5
          </span>
          <Link
            href="/schedule"
            className="rounded-full px-3 py-1.5 text-xs font-bold text-white"
            style={{ background: "var(--color-navy)" }}
          >
            重賞一覧 &gt;
          </Link>
        </div>
      </div>

      {/* date tabs */}
      <div className="mb-3 flex items-center gap-1 overflow-x-auto">
        <button
          type="button"
          onClick={() => setTabIndex((i) => Math.max(0, i - 1))}
          className="shrink-0 rounded-md px-2 py-2 text-sm font-bold text-neutral-400 hover:text-neutral-700"
          aria-label="前の日付"
        >
          ‹ 前
        </button>
        {raceDays.map((day, i) => {
          const tab = formatTab(day.date, day.dow);
          const isActive = i === tabIndex;
          return (
            <button
              key={day.date}
              type="button"
              onClick={() => setTabIndex(i)}
              className={`shrink-0 rounded-md px-4 py-2 text-sm font-bold ${
                isActive ? "text-white" : "bg-white text-neutral-700 border border-neutral-200"
              }`}
              style={isActive ? { background: "var(--color-brand)" } : undefined}
            >
              {tab.md}
              <span className="ml-1 text-xs font-normal">[{tab.dow}]</span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setTabIndex((i) => Math.min(raceDays.length - 1, i + 1))}
          className="shrink-0 rounded-md px-2 py-2 text-sm font-bold text-neutral-400 hover:text-neutral-700"
          aria-label="次の日付"
        >
          次 ›
        </button>
      </div>

      {/* filter bar */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-bold text-neutral-600"
        >
          条件で絞り込む ⚙
        </button>
        <button
          type="button"
          onClick={() => setGradedOnly((v) => !v)}
          className={`rounded-full px-3 py-1.5 text-xs font-bold ${
            gradedOnly ? "text-white" : "border border-neutral-300 bg-white text-neutral-600"
          }`}
          style={gradedOnly ? { background: "var(--color-brand)" } : undefined}
        >
          重賞のみ
        </button>
        <span className="ml-auto text-xs font-medium text-neutral-400">並び順: 発走時刻順</span>
      </div>

      {/* venue grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {venues.map((venueCard) => (
          <div
            key={venueCard.venue}
            className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
            style={{ borderTop: "3px solid var(--color-brand)" }}
          >
            <div className="px-4 pt-3 pb-1">
              <h3 className="font-serif text-base font-bold text-neutral-900">{venueCard.venue}競馬場</h3>
            </div>
            <div>
              {venueCard.races.map((row) => (
                <RaceRowView key={row.number} row={row} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
