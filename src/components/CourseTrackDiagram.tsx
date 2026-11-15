import type { SlopeArc } from "@/lib/courses";

type Point = { x: number; y: number };

const W = 140; // half-width of each straight (straight runs from -W to +W)
const R = 55; // turn radius
const CX = 220;
const CY = 125;

// Stadium perimeter parametrized by t in [0, 1), t=0 at bottom-center (finish line),
// increasing in the clockwise direction as drawn. Total perimeter = 2*(2W) + 2*PI*R.
const STRAIGHT = 2 * W;
const ARC = Math.PI * R;
const PERIMETER = 2 * STRAIGHT + 2 * ARC;

function rawPoint(len: number): Point {
  // len measured clockwise from bottom-center, along the un-mirrored (right-handed) layout.
  let d = ((len % PERIMETER) + PERIMETER) % PERIMETER;

  // 1) bottom straight, right half: bottom-center -> bottom-right corner
  if (d <= STRAIGHT / 2) {
    return { x: CX + d, y: CY + R };
  }
  d -= STRAIGHT / 2;

  // 2) right turn: bottom-right corner -> top-right corner (sweeping right side)
  if (d <= ARC) {
    const theta = d / R; // 0 .. PI
    return { x: CX + W + R * Math.sin(theta), y: CY + R * Math.cos(theta) };
  }
  d -= ARC;

  // 3) top straight, full width: top-right corner -> top-left corner
  if (d <= STRAIGHT) {
    return { x: CX + W - d, y: CY - R };
  }
  d -= STRAIGHT;

  // 4) left turn: top-left corner -> bottom-left corner
  if (d <= ARC) {
    const theta = d / R; // 0 .. PI
    return { x: CX - W - R * Math.sin(theta), y: CY - R * Math.cos(theta) };
  }
  d -= ARC;

  // 5) bottom straight, left half: bottom-left corner -> bottom-center
  return { x: CX - W + d, y: CY + R };
}

function pointAt(t: number, mirror: boolean): Point {
  const len = t * PERIMETER;
  const p = rawPoint(len);
  if (!mirror) return p;
  return { x: 2 * CX - p.x, y: p.y };
}

function describeArc(t0: number, t1: number, mirror: boolean): string {
  const steps = 24;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = t0 + ((t1 - t0) * i) / steps;
    const p = pointAt(t, mirror);
    d += `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)} `;
  }
  return d;
}

function trackOutlinePath(mirror: boolean): string {
  return describeArc(0, 1, mirror) + "Z";
}

export default function CourseTrackDiagram({
  turnDirection,
  startAngle,
  slopeArcs,
  finalStraightSlope,
}: {
  turnDirection: "right" | "left";
  startAngle: number;
  slopeArcs: SlopeArc[];
  finalStraightSlope: "up" | "down" | "none" | "unknown";
}) {
  const mirror = turnDirection === "right";
  const startT = ((startAngle % 360) + 360) % 360 / 360;
  const startPoint = pointAt(startT, mirror);
  const finishPoint = pointAt(0, mirror);

  const homeStraightSlopeArc =
    finalStraightSlope === "up" || finalStraightSlope === "down"
      ? { from: -0.04, to: 0.04, type: finalStraightSlope }
      : null;

  return (
    <svg viewBox="0 0 440 260" className="h-auto w-full" role="img" aria-label="コース概念図">
      <title>コース概念図(模式図・縮尺は正確ではありません)</title>

      <path
        d={trackOutlinePath(mirror)}
        fill="none"
        stroke="var(--track-line)"
        strokeWidth={14}
        strokeLinejoin="round"
      />
      <path
        d={trackOutlinePath(mirror)}
        fill="none"
        stroke="var(--track-surface)"
        strokeWidth={10}
        strokeLinejoin="round"
      />

      {slopeArcs.map((arc, i) => {
        const from = ((arc.from % 360) + 360) % 360 / 360;
        let to = ((arc.to % 360) + 360) % 360 / 360;
        if (to <= from) to += 1;
        const color = arc.type === "up" ? "var(--slope-up)" : "var(--slope-down)";
        return (
          <path
            key={i}
            d={describeArc(from, to, mirror)}
            fill="none"
            stroke={color}
            strokeWidth={5}
            strokeLinecap="round"
          />
        );
      })}

      {homeStraightSlopeArc && (
        <path
          d={describeArc(homeStraightSlopeArc.from, homeStraightSlopeArc.to, mirror)}
          fill="none"
          stroke={homeStraightSlopeArc.type === "up" ? "var(--slope-up)" : "var(--slope-down)"}
          strokeWidth={5}
          strokeLinecap="round"
        />
      )}

      {/* finish line */}
      <line
        x1={finishPoint.x}
        y1={finishPoint.y - 11}
        x2={finishPoint.x}
        y2={finishPoint.y + 11}
        stroke="var(--finish-line)"
        strokeWidth={3}
      />
      <text x={finishPoint.x} y={finishPoint.y + 30} textAnchor="middle" className="diagram-label">
        ゴール
      </text>

      {/* start marker */}
      <circle cx={startPoint.x} cy={startPoint.y} r={5} fill="var(--start-marker)" />
      <text
        x={startPoint.x}
        y={startPoint.y + (startPoint.y > CY ? 26 : -18)}
        textAnchor="middle"
        className="diagram-label"
      >
        スタート
      </text>

      <text x={CX} y={16} textAnchor="middle" className="diagram-caption">
        {turnDirection === "right" ? "右回り" : "左回り"}(模式図)
      </text>

      <style>{`
        :root { --track-line: #d4d4d4; --track-surface: #ecfdf5; --slope-up: #dc4a3f; --slope-down: #2a78d6; --finish-line: #171717; --start-marker: #171717; }
        @media (prefers-color-scheme: dark) {
          :root:not([data-theme="light"]) { --track-line: #525252; --track-surface: #052e23; --slope-up: #ef6a5f; --slope-down: #3987e5; --finish-line: #e5e5e5; --start-marker: #e5e5e5; }
        }
        :root[data-theme="dark"] { --track-line: #525252; --track-surface: #052e23; --slope-up: #ef6a5f; --slope-down: #3987e5; --finish-line: #e5e5e5; --start-marker: #e5e5e5; }
        .diagram-label { font-size: 13px; fill: #171717; font-weight: 700; }
        .diagram-caption { font-size: 11px; fill: #737373; font-weight: 700; }
      `}</style>
    </svg>
  );
}
