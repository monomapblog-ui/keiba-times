import Link from "next/link";
import type { Predictor } from "@/lib/content";

export default function PredictorCard({ predictor }: { predictor: Predictor }) {
  return (
    <Link
      href={`/predictors/${predictor.slug}`}
      className="flex gap-4 rounded-lg border border-neutral-200 p-5 transition hover:border-neutral-400"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-lg font-bold text-white">
        {predictor.name.slice(0, 1)}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h2 className="font-serif text-base font-bold text-neutral-900">{predictor.name}</h2>
        <p className="text-xs font-bold text-emerald-800">{predictor.specialty}</p>
        <p className="text-sm text-neutral-600">{predictor.bio}</p>
      </div>
    </Link>
  );
}
