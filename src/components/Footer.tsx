import Link from "next/link";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-8 px-6 py-10">
        <div className="max-w-xs">
          <div className="mb-2 font-serif text-base font-bold text-neutral-900">競馬タイムズ</div>
          <p className="text-sm leading-relaxed text-neutral-600">
            競馬の予想コラムを集約し、予想家ごとの視点で楽しめるメディアです。
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-neutral-600">コンテンツ</span>
          <Link href="/articles" className="text-sm text-neutral-600 hover:text-neutral-900">
            予想コラム
          </Link>
          <Link href="/schedule" className="text-sm text-neutral-600 hover:text-neutral-900">
            重賞日程
          </Link>
          <Link href="/predictors" className="text-sm text-neutral-600 hover:text-neutral-900">
            予想家一覧
          </Link>
          <Link href="/category/データ分析" className="text-sm text-neutral-600 hover:text-neutral-900">
            データ分析
          </Link>
          <Link href="/category/ニュース" className="text-sm text-neutral-600 hover:text-neutral-900">
            ニュース
          </Link>
        </div>
      </div>
      <div className="border-t border-neutral-200 px-6 py-4 text-center text-xs text-neutral-600">
        &copy; {year} 競馬タイムズ
      </div>
    </footer>
  );
}
