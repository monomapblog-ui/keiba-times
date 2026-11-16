const GRADE_STYLE: Record<string, string> = {
  "GⅠ": "bg-amber-50 text-amber-900",
  "GⅡ": "bg-sky-50 text-sky-900",
  "GⅢ": "bg-neutral-100 text-neutral-700",
};

export function gradeClass(grade: string) {
  const key = grade.replace("J・", "");
  return GRADE_STYLE[key] ?? "bg-neutral-100 text-neutral-700";
}

export function formatRaceDate(date: string, dow: string) {
  const [, m, d] = date.split("-");
  return `${Number(m)}月${Number(d)}日(${dow.replace("祝日・", "")})`;
}
