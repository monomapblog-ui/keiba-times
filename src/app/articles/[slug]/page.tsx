import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Suspense } from "react";
import remarkGfm from "remark-gfm";
import ArticleCard from "@/components/ArticleCard";
import ShareButtons from "@/components/ShareButtons";
import ViewTracker from "@/components/ViewTracker";
import ReturnRateLineChart from "@/components/charts/ReturnRateLineChart";
import StatCompare from "@/components/charts/StatCompare";
import { getAllArticles, getArticleBySlug, getArticlesByRace, getPredictorBySlug } from "@/lib/content";

const mdxComponents = { ReturnRateLineChart, StatCompare };

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return { title: `${article.title} | 競馬タイムズ`, description: article.excerpt };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const predictor = article.predictorSlug ? getPredictorBySlug(article.predictorSlug) : undefined;
  const relatedArticles = article.race
    ? getArticlesByRace(article.race).filter((a) => a.slug !== article.slug)
    : [];

  return (
    <article className="mx-auto max-w-2xl px-6 py-12">
      <Suspense fallback={null}>
        <ViewTracker slug={article.slug} />
      </Suspense>

      <div className="mb-4 flex items-center gap-2 text-sm">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-900">
          {article.category}
        </span>
        <time dateTime={article.date} className="text-neutral-600">
          {article.date}
        </time>
        {article.track && <span className="text-neutral-600">{article.track}</span>}
      </div>

      <h1 className="mb-6 font-serif text-3xl font-bold leading-snug text-neutral-900">
        {article.title}
      </h1>

      {predictor && (
        <Link
          href={`/predictors/${article.predictorSlug}`}
          className="mb-9 flex items-center gap-3 rounded-xl border border-neutral-200 p-4"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-base font-bold text-white">
            {predictor.name.slice(0, 1)}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-neutral-900">{predictor.name}</span>
            <span className="text-xs font-bold text-emerald-800">{predictor.specialty}</span>
          </div>
          <span className="ml-auto text-sm font-bold text-emerald-800">プロフィールを見る →</span>
        </Link>
      )}

      <div className="mb-9">
        <ShareButtons title={article.title} />
      </div>

      <div className="prose prose-neutral max-w-none prose-headings:font-serif prose-a:text-emerald-800">
        <MDXRemote
          source={article.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] }, blockJS: false }}
        />
      </div>

      <div className="mt-10 border-t border-neutral-200 pt-6">
        <ShareButtons title={article.title} />
      </div>

      {relatedArticles.length > 0 && (
        <div className="mt-12 border-t border-neutral-200 pt-8">
          <h2 className="mb-5 font-serif text-lg font-bold text-neutral-900">
            同じレースの関連記事
          </h2>
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            {relatedArticles.map((related) => (
              <ArticleCard key={related.slug} article={related} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
