"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function FavoriteButton({ predictorSlug }: { predictorSlug: string }) {
  const [userId, setUserId] = useState<string | null | undefined>(undefined);
  const [isFavorite, setIsFavorite] = useState(false);
  const [pending, setPending] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      const uid = data.user?.id ?? null;
      setUserId(uid);
      if (uid) {
        supabase
          .from("favorites")
          .select("id")
          .eq("predictor_slug", predictorSlug)
          .maybeSingle()
          .then(({ data: row }) => {
            if (active) setIsFavorite(Boolean(row));
          });
      }
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [predictorSlug]);

  if (userId === undefined) {
    return <span className="text-sm text-neutral-400">読み込み中...</span>;
  }

  if (userId === null) {
    return (
      <Link href="/login" className="text-sm font-bold text-emerald-800">
        ログインしてお気に入り登録
      </Link>
    );
  }

  const toggle = async () => {
    setPending(true);
    if (isFavorite) {
      await supabase.from("favorites").delete().eq("predictor_slug", predictorSlug).eq("user_id", userId);
      setIsFavorite(false);
    } else {
      await supabase.from("favorites").insert({ predictor_slug: predictorSlug, user_id: userId });
      setIsFavorite(true);
    }
    setPending(false);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      className={`rounded-full px-4 py-1.5 text-sm font-bold ${
        isFavorite ? "bg-emerald-50 text-emerald-900" : "bg-neutral-100 text-neutral-700"
      }`}
    >
      {isFavorite ? "★ お気に入り登録済み" : "☆ お気に入りに登録"}
    </button>
  );
}
