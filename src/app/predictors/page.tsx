import PredictorCard from "@/components/PredictorCard";
import { getAllPredictors } from "@/lib/content";

export const metadata = { title: "予想家一覧 | 競馬タイムズ" };

export default function PredictorsPage() {
  const predictors = getAllPredictors();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-6 font-serif text-xl font-bold text-neutral-900">予想家一覧</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {predictors.map((predictor) => (
          <PredictorCard key={predictor.slug} predictor={predictor} />
        ))}
      </div>
    </div>
  );
}
