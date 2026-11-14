import Link from "next/link";
import { getAllCategories } from "@/lib/content";

export default function Sidebar({ activeCategory }: { activeCategory?: string }) {
  const categories = getAllCategories();

  return (
    <aside className="flex w-full flex-row flex-wrap gap-2 sm:w-52 sm:shrink-0 sm:flex-col sm:gap-1">
      <Link
        href="/articles"
        className={`rounded-lg px-3 py-2 text-sm font-bold ${
          !activeCategory ? "bg-neutral-100 text-neutral-900" : "text-neutral-600"
        }`}
      >
        すべて
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={`/category/${encodeURIComponent(category)}`}
          className={`rounded-lg px-3 py-2 text-sm font-medium ${
            activeCategory === category ? "bg-neutral-100 text-neutral-900" : "text-neutral-600"
          }`}
        >
          {category}
        </Link>
      ))}
      <div className="hidden h-px bg-neutral-200 sm:mx-1 sm:my-3 sm:block" />
      <Link
        href="/predictors"
        className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600"
      >
        予想家一覧
      </Link>
    </aside>
  );
}
