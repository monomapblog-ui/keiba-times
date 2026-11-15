import Link from "next/link";
import { notFound } from "next/navigation";
import CourseTrackDiagram from "@/components/CourseTrackDiagram";
import { getAllRacecourses, getCourseDistance } from "@/lib/courses";

export function generateStaticParams() {
  return getAllRacecourses().flatMap((course) =>
    course.distances.map((d) => ({ course: course.slug, distance: d.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ course: string; distance: string }>;
}) {
  const { course: courseSlug, distance: distanceSlug } = await params;
  const found = getCourseDistance(courseSlug, distanceSlug);
  if (!found) return {};
  const { course, distance } = found;
  return {
    title: `${course.name}競馬場 ${distance.surface}${distance.distance}mの特徴 | 競馬タイムズ`,
    description: distance.tendency,
  };
}

const SLOPE_LABEL: Record<string, string> = {
  up: "上り坂",
  down: "下り坂",
  none: "坂なし",
  unknown: "不明",
};

export default async function CourseDistancePage({
  params,
}: {
  params: Promise<{ course: string; distance: string }>;
}) {
  const { course: courseSlug, distance: distanceSlug } = await params;
  const found = getCourseDistance(courseSlug, distanceSlug);
  if (!found) notFound();
  const { course, distance: d } = found;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-neutral-600">
        <Link href="/courses" className="hover:opacity-70">
          競馬場一覧
        </Link>
        <span>/</span>
        <Link href={`/courses/${course.slug}`} className="hover:opacity-70">
          {course.name}競馬場
        </Link>
      </div>

      <h1 className="mb-6 font-serif text-2xl font-bold text-neutral-900">
        {course.name} {d.surface}{d.distance}m
        {d.courseType && <span className="ml-2 text-base font-medium text-neutral-500">({d.courseType})</span>}
      </h1>

      <div className="mb-8 rounded-xl border border-neutral-200 bg-white p-6">
        <CourseTrackDiagram
          turnDirection={course.turnDirection}
          startAngle={d.startAngle}
          slopeArcs={d.slopeArcs}
          finalStraightSlope={d.finalStraightSlope}
        />
        <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-neutral-500">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-[#dc4a3f]" />
            上り坂
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-[#2a78d6]" />
            下り坂
          </span>
        </div>
      </div>

      <dl className="mb-10 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-bold text-neutral-500">回り方</dt>
          <dd className="mt-1 text-sm text-neutral-900">
            {course.turnDirection === "right" ? "右回り" : "左回り"}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-bold text-neutral-500">最後の直線</dt>
          <dd className="mt-1 text-sm text-neutral-900">
            {d.finalStraightLength ? `${d.finalStraightLength}m` : "不明"}
            {d.finalStraightSlope !== "unknown" && `(${SLOPE_LABEL[d.finalStraightSlope]})`}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-bold text-neutral-500">スタート位置</dt>
          <dd className="mt-1 text-sm text-neutral-900">{d.startPosition}</dd>
        </div>
        <div>
          <dt className="text-xs font-bold text-neutral-500">坂の情報</dt>
          <dd className="mt-1 text-sm text-neutral-900">{d.slopeInfo}</dd>
        </div>
      </dl>

      <div className="mb-10 rounded-xl bg-neutral-50 p-6">
        <h2 className="mb-2 font-serif text-sm font-bold text-neutral-900">傾向</h2>
        <p className="text-sm leading-relaxed text-neutral-700">{d.tendency}</p>
      </div>

      {d.mainRaces && d.mainRaces.length > 0 && (
        <div className="mb-10">
          <h2 className="mb-3 font-serif text-sm font-bold text-neutral-900">主な開催レース</h2>
          <div className="flex flex-wrap gap-2">
            {d.mainRaces.map((race) => (
              <Link
                key={race}
                href={`/schedule`}
                className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-bold text-neutral-700 hover:border-neutral-400"
              >
                {race}
              </Link>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-neutral-400">
        ※ コース図は模式図であり、縮尺・形状は正確ではありません。距離や坂の数値はJRA公式情報を基にしていますが、一部確認が取れていない項目は「不明」としています。
      </p>

      <Link
        href={`/courses/${course.slug}`}
        className="mt-8 inline-block text-sm font-bold text-emerald-800 hover:opacity-70"
      >
        ← {course.name}競馬場の他の距離を見る
      </Link>
    </div>
  );
}
