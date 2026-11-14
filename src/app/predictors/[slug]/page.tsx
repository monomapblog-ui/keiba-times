import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import ArticleCard from "@/components/ArticleCard";
import { getAllPredictors, getArticlesByPredictor, getPredictorBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllPredictors().map((predictor) => ({ slug: predictor.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const predictor = getPredictorBySlug(slug);
  if (!predictor) return {};
  return { title: `${predictor.name} | 予想家一覧 | 競馬タイムズ`, description: predictor.bio };
}

export default async function PredictorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const predictor = getPredictorBySlug(slug);
  if (!predictor) notFound();

  const articles = getArticlesByPredictor(slug);

  return (
    <div>
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-8 px-6 py-14">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-4xl font-bold text-white">
            {predictor.name.slice(0, 1)}
          </div>
          <div className="flex max-w-xl flex-col gap-2">
            <h1 className="font-serif text-2xl font-bold text-neutral-900">{predictor.name}</h1>
            <span className="text-xs font-bold text-emerald-800">{predictor.specialty}</span>
            <p className="text-[15px] leading-relaxed text-neutral-700">{predictor.bio}</p>
            {predictor.twitter && <span className="text-sm text-neutral-600">{predictor.twitter}</span>}
            {predictor.content && (
              <div className="prose prose-neutral prose-sm mt-2 max-w-none">
                <MDXRemote source={predictor.content} />
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="mb-6 font-serif text-xl font-bold text-neutral-900">執筆記事</h2>
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
