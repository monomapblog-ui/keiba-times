import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Cookie-free client for anonymous, session-independent reads/writes
// (e.g. view counting) so callers don't force dynamic rendering just by
// touching Supabase.
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
