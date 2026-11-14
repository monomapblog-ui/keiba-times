import Link from "next/link";
import type { Article } from "@/lib/content";
import { getPredictorBySlug } from "@/lib/content";
import ArticleThumbnail from "@/components/ArticleThumbnail";

const CATEGORY_STYLE: Record<string, string> = {
  予想コラム: "bg-emerald-50 text-emerald-900",
};

export default function ArticleCard({ article }: { article: Article }) {
  const predictor = article.predictorSlug ? getPredictorBySlug(article.predictorSlug) : undefined;
  const tagClass = CATEGORY_STYLE[article.category] ?? "bg-neutral-100 text-neutral-600";

  return (
    <article className="flex flex-col gap-3">
      <Link
        href={`/articles/${article.slug}`}
        className="block aspect-[4/3] overflow-hidden rounded-lg"
      >
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
          {predictor ? predictor.name.slice(0, 1) : "編"}
        </div>
        <span className="text-xs text-neutral-600">
          {predictor ? predictor.name : "編集部"}・{article.date}
        </span>
      </div>
    </article>
  );
}
