"use client";

import Link from "next/link";
import { useState } from "react";
import type { Article } from "@/lib/content";
import ArticleThumbnail from "@/components/ArticleThumbnail";

const CATEGORY_STYLE: Record<string, string> = {
  予想コラム: "bg-emerald-50 text-emerald-900",
};

export type ArticleWithPredictorName = Article & { predictorName?: string };

function MiniArticleCard({ article }: { article: ArticleWithPredictorName }) {
  const tagClass = CATEGORY_STYLE[article.category] ?? "bg-neutral-100 text-neutral-600";

  return (
    <article className="flex flex-col gap-3">
      <Link href={`/articles/${article.slug}`} className="block aspect-[4/3] overflow-hidden rounded-lg">
        <ArticleThumbnail
          lines={article.thumbnailLines ?? [article.track ?? article.category]}
          tag={article.category}
          theme={article.thumbnailTheme ?? "gold"}
        />
      </Link>

      <span className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-bold ${tagClass}`}>
        {article.category}
      </span>

      <h3 className="font-serif text-base font-bold leading-snug">
        <Link href={`/articles/${article.slug}`} className="text-neutral-900">
          {article.title}
        </Link>
      </h3>

      <p className="truncate text-sm text-neutral-600">{article.excerpt}</p>

      <div className="flex items-center gap-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-[11px] font-bold text-white">
          {article.predictorName ? article.predictorName.slice(0, 1) : "編"}
        </div>
        <span className="text-xs text-neutral-600">
          {article.predictorName ?? "編集部"}・{article.date}
        </span>
      </div>
    </article>
  );
}

export default function LatestArticlesTabs({
  articles,
  categories,
}: {
  articles: ArticleWithPredictorName[];
  categories: string[];
}) {
  const [active, setActive] = useState<string>("すべて");
  const tabs = ["すべて", ...categories];
  const filtered = active === "すべて" ? articles : articles.filter((a) => a.category === active);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isActive = tab === active;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={`rounded-full px-4 py-1.5 text-sm font-bold ${
                isActive ? "text-white" : "border border-neutral-200 bg-white text-neutral-600"
              }`}
              style={isActive ? { background: "var(--color-brand)" } : undefined}
            >
              {tab}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, 6).map((article) => (
          <MiniArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
