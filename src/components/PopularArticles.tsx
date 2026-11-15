"use client";

import Link from "next/link";
import { useState } from "react";
import type { Article } from "@/lib/content";

type RankedArticle = { article: Article; count: number };
type Tab = { key: string; label: string; items: RankedArticle[] };

const RANK_COLOR = ["bg-amber-400", "bg-neutral-300", "bg-orange-300"];

export default function PopularArticles({ tabs }: { tabs: Tab[] }) {
  const [activeKey, setActiveKey] = useState(tabs[0]?.key);
  const active = tabs.find((t) => t.key === activeKey) ?? tabs[0];

  if (!active) return null;

  return (
    <div className="rounded-xl border border-neutral-200 p-4">
      <div className="mb-3 flex items-center gap-1.5 text-sm font-bold text-neutral-900">
        <span>🏆</span>
        人気記事ランキング
      </div>

      <div className="mb-3 flex gap-1 border-b border-neutral-200 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveKey(tab.key)}
            className={`rounded-full px-2.5 py-1 text-xs font-bold ${
              tab.key === active.key
                ? "bg-neutral-900 text-white"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active.items.length === 0 ? (
        <p className="text-xs text-neutral-500">まだ十分なデータがありません。</p>
      ) : (
        <ol className="flex flex-col gap-3">
          {active.items.map((item, i) => (
            <li key={item.article.slug} className="flex items-start gap-2.5">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-neutral-900 ${
                  RANK_COLOR[i] ?? "bg-neutral-100"
                }`}
              >
                {i + 1}
              </span>
              <Link
                href={`/articles/${item.article.slug}`}
                className="text-xs font-bold leading-snug text-neutral-800 hover:text-emerald-800"
              >
                {item.article.title}
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
