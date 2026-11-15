import fs from "fs";
import path from "path";

export type SlopeArc = {
  from: number;
  to: number;
  type: "up" | "down";
};

export type BracketStat = {
  bracket: number;
  record: string;
  winRate: number;
  placeRate: number;
  showRate: number;
  badges?: string[];
  paceBreakdown?: { style: string; rate: number }[];
};

export type PaceStat = {
  style: string;
  winRate: number;
  placeRate: number;
  showRate: number;
};

export type FavoriteStat = {
  rank: number;
  record: string;
  winRate: number;
  placeRate: number;
  showRate: number;
  estimatedReturnRate?: number;
};

export type JockeyStat = {
  name: string;
  record: string;
  favoriteRecord?: string;
  longshotRecord?: string;
};

export type SireStat = {
  name: string;
  lineage?: string;
  placedCount: number;
  favoriteCount: number;
  longshotCount: number;
};

export type LineageGroupStat = {
  group: string;
  count: number;
  share: number;
};

export type CourseStats = {
  sourceLabel: string;
  sourceUrl: string;
  asOf?: string;
  caveat?: string;
  bracketStats?: BracketStat[];
  paceStats?: PaceStat[];
  favoriteStats?: FavoriteStat[];
  jockeyTop10?: JockeyStat[];
  sireTop10?: SireStat[];
  lineageGroupStats?: LineageGroupStat[];
  baseTimes?: Record<string, string>;
  unavailable?: string[];
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
  stats?: CourseStats;
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
