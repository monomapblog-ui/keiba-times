import Link from "next/link";
import type { Predictor } from "@/lib/content";

export default function PredictorCard({ predictor }: { predictor: Predictor }) {
  return (
    <Link
      href={`/predictors/${predictor.slug}`}
      className="block rounded-lg border border-black/10 p-5 transition hover:border-black/30 dark:border-white/15 dark:hover:border-white/40"
    >
      <h2 className="mb-1 text-lg font-semibold">{predictor.name}</h2>
      <p className="mb-2 text-xs text-neutral-500">{predictor.specialty}</p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{predictor.bio}</p>
    </Link>
  );
}
