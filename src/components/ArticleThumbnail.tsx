const THEMES = {
  gold: {
    bgFrom: "#1a0f05",
    bgTo: "#3a1a05",
    stripe1: "#D4AF37",
    stripe2: "#8B2E2E",
    line: "#D4AF37",
  },
  crimson: {
    bgFrom: "#190505",
    bgTo: "#3d0a0a",
    stripe1: "#E11D48",
    stripe2: "#D4AF37",
    line: "#F4C430",
  },
  teal: {
    bgFrom: "#031a16",
    bgTo: "#07342c",
    stripe1: "#0F9D82",
    stripe2: "#D4AF37",
    line: "#5EEAD4",
  },
  blue: {
    bgFrom: "#040c1a",
    bgTo: "#0a2540",
    stripe1: "#2563EB",
    stripe2: "#D4AF37",
    line: "#93C5FD",
  },
} as const;

export type ThumbnailTheme = keyof typeof THEMES;

export default function ArticleThumbnail({
  lines,
  tag,
  theme = "gold",
}: {
  lines: string[];
  tag: string;
  theme?: ThumbnailTheme;
}) {
  const c = THEMES[theme];
  const gradientId = `bg-${theme}`;
  const lineHeight = 48;
  const startY = lines.length === 1 ? 168 : 150 - ((lines.length - 2) * lineHeight) / 2;

  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label={lines.join("")}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c.bgFrom} />
          <stop offset="100%" stopColor={c.bgTo} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${gradientId})`} />
      <polygon points="0,300 130,300 240,0 110,0" fill={c.stripe1} opacity="0.85" />
      <polygon points="150,300 210,300 320,0 260,0" fill={c.stripe2} opacity="0.75" />
      <g stroke={c.line} strokeWidth="3" opacity="0.45">
        <line x1="0" y1="235" x2="150" y2="235" />
        <line x1="0" y1="253" x2="115" y2="253" />
        <line x1="0" y1="271" x2="175" y2="271" />
      </g>
      <rect x="16" y="16" width={tag.length * 15 + 32} height="30" rx="15" fill="rgba(0,0,0,0.55)" />
      <text
        x={16 + (tag.length * 15 + 32) / 2}
        y={37}
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill="#FFFFFF"
        fontFamily="'Zen Kaku Gothic New', sans-serif"
      >
        {tag}
      </text>
      {lines.map((line, i) => (
        <text
          key={i}
          x="20"
          y={startY + i * lineHeight}
          fontSize="42"
          fontWeight="900"
          fontFamily="'Zen Kaku Gothic New', sans-serif"
          stroke={c.bgFrom}
          strokeWidth="7"
          strokeLinejoin="round"
          paintOrder="stroke"
          fill="#F4C430"
        >
          {line}
        </text>
      ))}
      <text
        x="384"
        y="288"
        textAnchor="end"
        fontSize="12"
        fontWeight="700"
        letterSpacing="0.1em"
        fill="rgba(255,255,255,0.55)"
        fontFamily="'Zen Kaku Gothic New', sans-serif"
      >
        競馬タイムズ
      </text>
    </svg>
  );
}
