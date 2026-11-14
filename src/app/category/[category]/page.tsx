import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { getAllCategories, getArticlesByCategory } from "@/lib/content";

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return { title: `${decodeURIComponent(category)} | 競馬予想メディア` };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const articles = getArticlesByCategory(decoded);
  if (articles.length === 0 && !getAllCategories().includes(decoded)) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">{decoded}</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
