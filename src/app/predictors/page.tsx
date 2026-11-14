import PredictorCard from "@/components/PredictorCard";
import { getAllPredictors } from "@/lib/content";

export const metadata = { title: "予想家一覧 | 競馬予想メディア" };

export default function PredictorsPage() {
  const predictors = getAllPredictors();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">予想家一覧</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {predictors.map((predictor) => (
          <PredictorCard key={predictor.slug} predictor={predictor} />
        ))}
      </div>
    </div>
  );
}
