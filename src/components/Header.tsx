import Link from "next/link";
import { Suspense } from "react";
import AuthNavLink from "@/components/AuthNavLink";

const NAV_LINKS = [
  { href: "/", label: "トップ" },
  { href: "/category/ニュース", label: "ニュース" },
  { href: "/articles", label: "予想コラム" },
  { href: "/category/データ分析", label: "データ分析" },
  { href: "/schedule", label: "重賞日程" },
  { href: "/courses", label: "コース特徴" },
  { href: "/predictors", label: "予想家一覧" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40">
      {/* upper bar: logo + account actions */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3">
          <Link href="/" className="shrink-0 font-serif text-lg font-bold text-neutral-900">
            競馬タイムズ
          </Link>

          <form
            action="/articles"
            method="GET"
            className="order-3 w-full sm:order-none sm:w-auto sm:min-w-[180px] sm:max-w-md sm:flex-1"
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

          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/courses"
              className="hidden rounded-full border border-neutral-300 px-4 py-2 text-sm font-bold text-neutral-700 hover:bg-neutral-50 sm:inline-block"
            >
              コース特徴
            </Link>
            <Suspense fallback={<span className="text-sm font-bold text-neutral-300">ログイン</span>}>
              <AuthNavLink />
            </Suspense>
            <Link
              href="/signup"
              className="rounded-full px-4 py-2 text-sm font-bold text-white"
              style={{ background: "var(--color-coral)" }}
            >
              会員登録 &gt;
            </Link>
          </div>
        </div>
      </div>

      {/* lower bar: primary navigation */}
      <nav style={{ background: "var(--color-navy)" }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-1 gap-y-1 px-4 py-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-4 py-2.5 text-sm font-bold text-neutral-200 hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
