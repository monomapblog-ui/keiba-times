import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import CategoryCard from "@/components/CategoryCard";
import PredictorCard from "@/components/PredictorCard";
import Sidebar from "@/components/Sidebar";
import { getAllArticles, getAllCategories, getAllPredictors, getArticlesByCategory } from "@/lib/content";

export default function Home() {
  const latestArticles = getAllArticles().slice(0, 6);
  const categories = getAllCategories();
  const predictors = getAllPredictors();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-8 sm:flex-row sm:items-start sm:gap-10">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col gap-14">
        <section>
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="font-serif text-xl font-bold text-neutral-900">最新の記事</h2>
            <Link href="/articles" className="text-sm font-bold text-emerald-800">
              すべて見る →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-6 font-serif text-xl font-bold text-neutral-900">注目カテゴリ</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {categories.map((category) => (
              <CategoryCard
                key={category}
                category={category}
                count={getArticlesByCategory(category).length}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-6 font-serif text-xl font-bold text-neutral-900">注目の予想家</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {predictors.map((predictor) => (
              <PredictorCard key={predictor.slug} predictor={predictor} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
