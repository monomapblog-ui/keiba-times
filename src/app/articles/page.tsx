import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import { getAllArticles } from "@/lib/content";

export const metadata = { title: "予想コラム一覧 | 競馬予想メディア" };
export const instant = false;

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim().toLowerCase();
  const articles = getAllArticles().filter((article) => {
    if (!query) return true;
    return (
      article.title.toLowerCase().includes(query) || article.excerpt.toLowerCase().includes(query)
    );
  });

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-8 sm:flex-row sm:items-start sm:gap-10">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <h1 className="mb-6 font-serif text-xl font-bold text-neutral-900">
          {query ? `「${q}」の検索結果` : "予想コラム一覧"}
        </h1>
        {articles.length === 0 ? (
          <p className="text-sm text-neutral-600">該当する記事が見つかりませんでした。</p>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
