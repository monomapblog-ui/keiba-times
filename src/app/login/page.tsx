import Link from "next/link";
import { login } from "@/app/auth/actions";

export const metadata = { title: "ログイン | 競馬タイムズ" };
export const instant = false;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-sm px-6 py-16">
      <h1 className="mb-6 font-serif text-xl font-bold text-neutral-900">ログイン</h1>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>
      )}

      <form action={login} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-bold text-neutral-700">
            メールアドレス
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-bold text-neutral-700">
            パスワード
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400"
          />
        </div>
        <button
          type="submit"
          className="mt-2 rounded-full bg-neutral-900 px-4 py-2.5 text-sm font-bold text-white hover:opacity-90"
        >
          ログイン
        </button>
      </form>

      <p className="mt-6 text-sm text-neutral-600">
        アカウントをお持ちでないですか?{" "}
        <Link href="/signup" className="font-bold text-emerald-800">
          会員登録
        </Link>
      </p>
    </div>
  );
}
