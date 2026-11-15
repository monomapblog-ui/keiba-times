import ArticleCard from "@/components/ArticleCard";
import PopularArticles from "@/components/PopularArticles";
import Sidebar from "@/components/Sidebar";
import { getArticleBySlug, searchArticles, type Article } from "@/lib/content";
import { getTopViewedSlugs } from "@/lib/views";

export const metadata = { title: "予想コラム一覧 | 競馬タイムズ" };
export const instant = false;

const RANKING_WINDOWS = [
  { key: "all", label: "最新", hours: null },
  { key: "48h", label: "48時間", hours: 48 },
  { key: "week", label: "週間", hours: 24 * 7 },
] as const;

async function getPopularTabs() {
  return Promise.all(
    RANKING_WINDOWS.map(async (w) => {
      const top = await getTopViewedSlugs(w.hours, 5);
      const items = top
        .map((t) => {
          const article = getArticleBySlug(t.slug);
          return article ? { article, count: t.count } : null;
        })
        .filter((x): x is { article: Article; count: number } => x !== null);
      return { key: w.key, label: w.label, items };
    }),
  );
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim();
  const articles = searchArticles(query ?? "");
  const popularTabs = await getPopularTabs();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-8 sm:flex-row sm:items-start sm:gap-10">
      <div className="flex w-full flex-col gap-6 sm:w-52 sm:shrink-0">
        <Sidebar />
        <PopularArticles tabs={popularTabs} />
      </div>
      <div className="min-w-0 flex-1">
        <h1 className="mb-6 font-serif text-xl font-bold text-neutral-900">
          {query ? `「${query}」の検索結果` : "予想コラム一覧"}
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
