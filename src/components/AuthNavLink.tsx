import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AuthNavLink() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <Link href="/mypage" className="text-sm font-bold text-emerald-800 hover:opacity-70">
        マイページ
      </Link>
    );
  }

  return (
    <Link href="/login" className="text-sm font-bold text-emerald-800 hover:opacity-70">
      ログイン
    </Link>
  );
}
