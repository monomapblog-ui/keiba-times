import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
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
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-8 sm:flex-row sm:items-start sm:gap-10">
      <Sidebar activeCategory={decoded} />
      <div className="min-w-0 flex-1">
        <h1 className="mb-6 font-serif text-xl font-bold text-neutral-900">{decoded}</h1>
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
