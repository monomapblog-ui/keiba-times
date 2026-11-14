import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/content";

export default function Home() {
  const latestArticles = getAllArticles().slice(0, 6);

  return (
    <div>
      <section className="mb-10">
        <h1 className="mb-2 text-2xl font-bold">競馬予想コラムをまとめて読む</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          予想家による重賞・注目レースのコラムを中心に、最新の競馬ニュースも配信します。
        </p>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">最新の記事</h2>
          <Link href="/articles" className="text-sm hover:underline">
            すべて見る &rarr;
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {latestArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
