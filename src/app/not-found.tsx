import Link from "next/link";

export const metadata = { title: "ページが見つかりません | 競馬タイムズ" };

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
      <p className="mb-2 font-serif text-5xl font-bold text-neutral-300">404</p>
      <h1 className="mb-3 font-serif text-xl font-bold text-neutral-900">
        ページが見つかりませんでした
      </h1>
      <p className="mb-8 text-sm text-neutral-600">
        お探しのページは削除されたか、URLが変更された可能性があります。
      </p>
      <Link
        href="/"
        className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white hover:opacity-90"
      >
        トップページへ戻る
      </Link>
    </div>
  );
}
