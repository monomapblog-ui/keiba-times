import fs from "fs";
import path from "path";

export type SlopeArc = {
  from: number;
  to: number;
  type: "up" | "down";
};

export type CourseDistance = {
  slug: string;
  surface: "芝" | "ダート";
  distance: number;
  courseType?: string;
  startPosition: string;
  finalStraightLength: number | null;
  finalStraightSlope: "up" | "down" | "none" | "unknown";
  slopeInfo: string;
  tendency: string;
  mainRaces?: string[];
  startAngle: number;
  slopeArcs: SlopeArc[];
};

export type Racecourse = {
  slug: string;
  name: string;
  turnDirection: "right" | "left";
  summary: string;
  distances: CourseDistance[];
};

export function getAllRacecourses(): Racecourse[] {
  const filePath = path.join(process.cwd(), "content", "courses.json");
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as Racecourse[];
}

export function getRacecourseBySlug(slug: string): Racecourse | undefined {
  return getAllRacecourses().find((c) => c.slug === slug);
}

export function getCourseDistance(
  courseSlug: string,
  distanceSlug: string,
): { course: Racecourse; distance: CourseDistance } | undefined {
  const course = getRacecourseBySlug(courseSlug);
  if (!course) return undefined;
  const distance = course.distances.find((d) => d.slug === distanceSlug);
  if (!distance) return undefined;
  return { course, distance };
}
