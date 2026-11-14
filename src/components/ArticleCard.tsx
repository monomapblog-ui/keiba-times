import Link from "next/link";
import type { Article } from "@/lib/content";
import { getPredictorBySlug } from "@/lib/content";

export default function ArticleCard({ article }: { article: Article }) {
  const predictor = article.predictorSlug ? getPredictorBySlug(article.predictorSlug) : undefined;

  return (
    <article className="rounded-lg border border-black/10 p-5 transition hover:border-black/30 dark:border-white/15 dark:hover:border-white/40">
      <div className="mb-2 flex items-center gap-2 text-xs text-neutral-500">
        <span className="rounded bg-neutral-100 px-2 py-0.5 dark:bg-neutral-800">
          {article.category}
        </span>
        <time dateTime={article.date}>{article.date}</time>
      </div>
      <h2 className="mb-2 text-lg font-semibold">
        <Link href={`/articles/${article.slug}`} className="hover:underline">
          {article.title}
        </Link>
      </h2>
      <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">{article.excerpt}</p>
      {predictor && (
        <Link
          href={`/predictors/${article.predictorSlug}`}
          className="text-sm font-medium hover:underline"
        >
          予想家: {predictor.name}
        </Link>
      )}
    </article>
  );
}
