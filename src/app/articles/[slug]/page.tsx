import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllArticles, getArticleBySlug, getPredictorBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return { title: `${article.title} | 競馬予想メディア`, description: article.excerpt };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const predictor = article.predictorSlug ? getPredictorBySlug(article.predictorSlug) : undefined;

  return (
    <article>
      <div className="mb-4 flex items-center gap-2 text-xs text-neutral-500">
        <span className="rounded bg-neutral-100 px-2 py-0.5 dark:bg-neutral-800">
          {article.category}
        </span>
        <time dateTime={article.date}>{article.date}</time>
        {article.track && <span>{article.track}</span>}
      </div>
      <h1 className="mb-4 text-3xl font-bold">{article.title}</h1>
      {predictor && (
        <Link
          href={`/predictors/${article.predictorSlug}`}
          className="mb-8 inline-block text-sm font-medium hover:underline"
        >
          予想家: {predictor.name}
        </Link>
      )}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={article.content} />
      </div>
    </article>
  );
}
