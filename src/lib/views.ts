import { createPublicClient } from "@/lib/supabase/public";

export async function recordView(slug: string) {
  try {
    const supabase = createPublicClient();
    await supabase.from("article_views").insert({ slug });
  } catch {
    // best-effort view counting; never let this break the page
  }
}

export type PopularArticle = { slug: string; count: number };

export async function getTopViewedSlugs(hours: number | null, limit = 5): Promise<PopularArticle[]> {
  const supabase = createPublicClient();
  let query = supabase.from("article_views").select("slug");

  if (hours !== null) {
    const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
    query = query.gte("viewed_at", since);
  }

  const { data, error } = await query;
  if (error || !data) return [];

  const counts = new Map<string, number>();
  for (const row of data) {
    counts.set(row.slug, (counts.get(row.slug) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
