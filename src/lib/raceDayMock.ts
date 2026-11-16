import type { Article, GradedRace } from "@/lib/content";

// NOTE: JRA does not publish a machine-readable full race-card feed (every
// 1R-12R, headcount, conditions) that this project has access to. The only
// race-level data this site holds is the graded-race calendar in
// content/graded-races.json. To demonstrate the "race list by meeting day"
// UI pattern at a realistic density, the two undercard rows on each venue
// card below are illustrative placeholders (generic condition-class races,
// not real race names) — only the graded race row is real data.
export type RaceRow = {
  number: number;
  name: string;
  grade?: string;
  surface: "芝" | "ダート";
  distance: number;
  headcount: number;
  condition: string;
  isGraded: boolean;
  isMock: boolean;
  articleHref?: string;
  chaos: "順当" | "荒れ" | "大荒れ";
};

export type VenueCard = {
  venue: string;
  races: RaceRow[];
};

export type RaceDay = {
  date: string;
  dow: string;
  venues: VenueCard[];
};

const MOCK_UNDERCARD: { name: string; surface: "芝" | "ダート"; distance: number; headcount: number }[] = [
  { name: "3歳未勝利", surface: "芝", distance: 1800, headcount: 16 },
  { name: "3歳以上1勝クラス", surface: "ダート", distance: 1200, headcount: 14 },
];

function chaosFor(headcount: number): RaceRow["chaos"] {
  if (headcount >= 16) return "大荒れ";
  if (headcount >= 13) return "荒れ";
  return "順当";
}

export function buildRaceDays(
  upcomingGradedRaces: GradedRace[],
  articlesByRace: Record<string, Article[]>,
  maxDays = 5,
): RaceDay[] {
  const byDate = new Map<string, { dow: string; races: GradedRace[] }>();
  for (const race of upcomingGradedRaces) {
    const entry = byDate.get(race.date) ?? { dow: race.dow, races: [] };
    entry.races.push(race);
    byDate.set(race.date, entry);
  }

  return Array.from(byDate.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .slice(0, maxDays)
    .map(([date, { dow, races }]) => {
      const byVenue = new Map<string, GradedRace[]>();
      for (const race of races) {
        byVenue.set(race.venue, [...(byVenue.get(race.venue) ?? []), race]);
      }

      const venues: VenueCard[] = Array.from(byVenue.entries()).map(([venue, venueRaces]) => {
        const mockRows: RaceRow[] = MOCK_UNDERCARD.map((m, i) => ({
          number: 9 + i,
          name: m.name,
          surface: m.surface,
          distance: m.distance,
          headcount: m.headcount,
          condition: m.surface === "芝" ? "良" : "稍重",
          isGraded: false,
          isMock: true,
          chaos: chaosFor(m.headcount),
        }));

        const gradedRows: RaceRow[] = venueRaces.map((race, i) => {
          const surface = race.course.includes("ダート") ? "ダート" : "芝";
          const distanceMatch = race.course.match(/[\d,]+/);
          const distance = distanceMatch ? Number(distanceMatch[0].replace(/,/g, "")) : 0;
          const article = (articlesByRace[race.name] ?? [])[0];
          const headcount = 16;
          return {
            number: 11 + i,
            name: race.name,
            grade: race.grade,
            surface,
            distance,
            headcount,
            condition: race.ageSex,
            isGraded: true,
            isMock: false,
            articleHref: article ? `/articles/${article.slug}` : undefined,
            chaos: chaosFor(headcount),
          };
        });

        return { venue, races: [...mockRows, ...gradedRows] };
      });

      return { date, dow, venues };
    });
}
