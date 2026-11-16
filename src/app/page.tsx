import Link from "next/link";
import { connection } from "next/server";
import ArticleCard from "@/components/ArticleCard";
import CategoryCard from "@/components/CategoryCard";
import FeaturedRaceHero from "@/components/FeaturedRaceHero";
import PredictorCard from "@/components/PredictorCard";
import Sidebar from "@/components/Sidebar";
import UpcomingRaceStrip from "@/components/UpcomingRaceStrip";
import {
  getAllArticles,
  getAllCategories,
  getAllPredictors,
  getArticlesByCategory,
  getArticlesByRace,
  getGradedRaces,
} from "@/lib/content";
import { getAllRacecourses } from "@/lib/courses";

export default async function Home() {
  await connection();
  const today = new Date().toISOString().slice(0, 10);

  const latestArticles = getAllArticles().slice(0, 6);
  const categories = getAllCategories();
  const predictors = getAllPredictors();
  const racecourses = getAllRacecourses();

  const upcomingRaces = getGradedRaces()
    .filter((r) => r.date >= today)
    .sort((a, b) => (a.date < b.date ? -1 : 1));
  const nextRace = upcomingRaces[0];
  const strip = upcomingRaces.slice(1, 6);

  const raceNames = Array.from(new Set(upcomingRaces.slice(0, 6).map((r) => r.name)));
  const articlesByRace = Object.fromEntries(raceNames.map((name) => [name, getArticlesByRace(name)]));

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-8 sm:flex-row sm:items-start sm:gap-10">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col gap-14">
        {nextRace && (
          <section className="flex flex-col gap-5">
            <FeaturedRaceHero race={nextRace} today={today} articles={articlesByRace[nextRace.name] ?? []} />
            {strip.length > 0 && (
              <UpcomingRaceStrip races={strip} articlesByRace={articlesByRace} />
            )}
          </section>
        )}

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
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="font-serif text-xl font-bold text-neutral-900">競馬場コース特徴</h2>
            <Link href="/courses" className="text-sm font-bold text-emerald-800">
              すべて見る →
            </Link>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {racecourses.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-bold text-neutral-800 hover:border-neutral-400"
              >
                {course.name}
                <span className="ml-1.5 text-xs font-normal text-neutral-500">
                  {course.turnDirection === "right" ? "右" : "左"}
                </span>
              </Link>
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
