import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllRacecourses, getRacecourseBySlug } from "@/lib/courses";

export function generateStaticParams() {
  return getAllRacecourses().map((course) => ({ course: course.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ course: string }> }) {
  const { course: courseSlug } = await params;
  const course = getRacecourseBySlug(courseSlug);
  if (!course) return {};
  return { title: `${course.name}競馬場の特徴 | 競馬タイムズ`, description: course.summary };
}

export default async function CourseOverviewPage({ params }: { params: Promise<{ course: string }> }) {
  const { course: courseSlug } = await params;
  const course = getRacecourseBySlug(courseSlug);
  if (!course) notFound();

  const bySurface = course.distances.reduce<Record<string, typeof course.distances>>((acc, d) => {
    (acc[d.surface] ??= []).push(d);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link href="/courses" className="mb-4 inline-block text-sm text-neutral-600 hover:opacity-70">
        ← 競馬場一覧
      </Link>

      <div className="mb-8 flex items-baseline gap-3">
        <h1 className="font-serif text-2xl font-bold text-neutral-900">{course.name}競馬場</h1>
        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-700">
          {course.turnDirection === "right" ? "右回り" : "左回り"}
        </span>
      </div>

      <p className="mb-10 max-w-2xl text-sm leading-relaxed text-neutral-700">{course.summary}</p>

      {Object.entries(bySurface).map(([surface, distances]) => (
        <div key={surface} className="mb-10">
          <h2 className="mb-4 font-serif text-base font-bold text-neutral-900">{surface}コース</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {distances.map((d) => (
              <Link
                key={d.slug}
                href={`/courses/${course.slug}/${d.slug}`}
                className="flex flex-col items-center gap-1 rounded-xl border border-neutral-200 py-5 text-center hover:border-neutral-400"
              >
                <span className="text-lg font-bold text-neutral-900">{d.distance}m</span>
                {d.courseType && (
                  <span className="text-[11px] text-neutral-500">{d.courseType.split("(")[0]}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
