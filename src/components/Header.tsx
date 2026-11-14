import Link from "next/link";

const NAV_LINKS = [
  { href: "/articles", label: "予想コラム" },
  { href: "/predictors", label: "予想家一覧" },
  { href: "/category/ニュース", label: "ニュース" },
];

export default function Header() {
  return (
    <header className="border-b border-black/10 dark:border-white/15">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          競馬予想メディア
        </Link>
        <nav className="flex gap-3 text-xs sm:gap-6 sm:text-sm">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
