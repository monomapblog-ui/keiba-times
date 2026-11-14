import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getAllArticles, getAllCategories } from "@/lib/content";

export const metadata = { title: "予想コラム一覧 | 競馬予想メディア" };
export const instant = false;

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const categories = getAllCategories();
  const articles = getAllArticles().filter((a) => !category || a.category === category);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">予想コラム一覧</h1>
      <div className="mb-6 flex gap-2 text-sm">
        <Link
          href="/articles"
          className={`rounded px-3 py-1 ${!category ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "bg-neutral-100 dark:bg-neutral-800"}`}
        >
          すべて
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/articles?category=${encodeURIComponent(c)}`}
            className={`rounded px-3 py-1 ${category === c ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "bg-neutral-100 dark:bg-neutral-800"}`}
          >
            {c}
          </Link>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
