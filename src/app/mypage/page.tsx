import Link from "next/link";
import { redirect } from "next/navigation";
import { logout } from "@/app/auth/actions";
import PredictorCard from "@/components/PredictorCard";
import { getPredictorBySlug } from "@/lib/content";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "マイページ | 競馬タイムズ" };
export const instant = false;

export default async function MyPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: favorites } = await supabase
    .from("favorites")
    .select("predictor_slug")
    .eq("user_id", user.id);

  const predictors = (favorites ?? [])
    .map((f) => getPredictorBySlug(f.predictor_slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-10 flex items-start justify-between">
        <div>
          <h1 className="mb-1 font-serif text-xl font-bold text-neutral-900">マイページ</h1>
          <p className="text-sm text-neutral-600">{user.email}</p>
        </div>
        <form action={logout}>
          <button type="submit" className="text-sm font-bold text-neutral-600 hover:text-neutral-900">
            ログアウト
          </button>
        </form>
      </div>

      <h2 className="mb-4 font-serif text-lg font-bold text-neutral-900">お気に入りの予想家</h2>
      {predictors.length === 0 ? (
        <p className="text-sm text-neutral-600">
          まだお気に入り登録した予想家がいません。
          <Link href="/predictors" className="font-bold text-emerald-800">
            予想家一覧
          </Link>
          から登録してみましょう。
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {predictors.map((predictor) => (
            <PredictorCard key={predictor.slug} predictor={predictor} />
          ))}
        </div>
      )}
    </div>
  );
}
