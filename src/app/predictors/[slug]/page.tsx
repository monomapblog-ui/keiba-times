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
  return { title: `${predictor.name} | 予想家一覧 | 競馬予想メディア`, description: predictor.bio };
}

export default async function PredictorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const predictor = getPredictorBySlug(slug);
  if (!predictor) notFound();

  const articles = getArticlesByPredictor(slug);

  return (
    <div>
      <header className="mb-8">
        <h1 className="mb-1 text-2xl font-bold">{predictor.name}</h1>
        <p className="mb-3 text-sm text-neutral-500">{predictor.specialty}</p>
        <p className="mb-4 text-neutral-600 dark:text-neutral-400">{predictor.bio}</p>
        {predictor.twitter && (
          <p className="text-sm text-neutral-500">{predictor.twitter}</p>
        )}
        {predictor.content && (
          <div className="prose prose-neutral dark:prose-invert mt-4 max-w-none">
            <MDXRemote source={predictor.content} />
          </div>
        )}
      </header>

      <h2 className="mb-4 text-xl font-semibold">執筆記事</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
