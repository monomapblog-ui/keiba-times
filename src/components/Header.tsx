import Link from "next/link";
import { Suspense } from "react";
import AuthNavLink from "@/components/AuthNavLink";

const NAV_LINKS = [
  { href: "/articles", label: "予想コラム" },
  { href: "/schedule", label: "重賞日程" },
  { href: "/predictors", label: "予想家一覧" },
  { href: "/category/データ分析", label: "データ分析" },
  { href: "/category/ニュース", label: "ニュース" },
];

export default function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4">
        <Link href="/" className="shrink-0 font-serif text-lg font-bold text-neutral-900">
          競馬タイムズ
        </Link>

        <nav className="order-3 flex flex-wrap items-center gap-x-5 gap-y-1 sm:order-none sm:ml-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-900 hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}
          <Suspense fallback={<span className="text-sm font-bold text-neutral-300">ログイン</span>}>
            <AuthNavLink />
          </Suspense>
        </nav>

        <form
          action="/articles"
          method="GET"
          className="order-4 w-full sm:order-none sm:w-auto sm:min-w-[180px] sm:max-w-md sm:flex-1"
        >
          <label htmlFor="search-input" className="sr-only">
            記事・予想家を検索
          </label>
          <input
            id="search-input"
            type="search"
            name="q"
            placeholder="記事を検索"
            className="w-full rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-400"
          />
        </form>
      </div>
    </header>
  );
}
