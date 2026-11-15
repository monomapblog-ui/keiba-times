import Link from "next/link";
import { getAllRacecourses } from "@/lib/courses";

export const metadata = { title: "競馬場コース特徴 | 競馬タイムズ" };

export default function CoursesPage() {
  const courses = getAllRacecourses();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-2 font-serif text-xl font-bold text-neutral-900">競馬場コース特徴</h1>
      <p className="mb-8 text-sm text-neutral-600">
        GI開催のある主要競馬場のコース特徴を、距離ごとにまとめています。坂の位置や直線の長さは、レースの予想にもそのまま使える基礎情報です。
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {courses.map((course) => (
          <Link
            key={course.slug}
            href={`/courses/${course.slug}`}
            className="flex flex-col items-center gap-2 rounded-xl border border-neutral-200 p-6 text-center hover:border-neutral-400"
          >
            <span className="font-serif text-lg font-bold text-neutral-900">{course.name}</span>
            <span className="text-xs text-neutral-500">
              {course.turnDirection === "right" ? "右回り" : "左回り"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
