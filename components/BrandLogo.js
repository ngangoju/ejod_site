import { useId } from "react";

const WORDMARK_PATHS = [
  "M 15 0 L 70 0 A 30 30 0 0 1 100 30 L 100 70 A 30 30 0 0 1 70 100 L 15 100 L 25 80 L 70 80 A 10 10 0 0 0 80 70 L 80 60 L 30 60 L 30 40 L 80 40 L 80 30 A 10 10 0 0 0 70 20 L 25 20 Z",
  "M 160 0 L 180 0 L 180 70 A 30 30 0 0 1 120 70 L 140 70 A 10 10 0 0 0 160 70 Z",
  "M 240 0 A 50 50 0 0 1 290 50 A 50 50 0 0 1 240 100 A 50 50 0 0 1 190 50 A 50 50 0 0 1 240 0 Z M 240 20 A 30 30 0 0 0 210 50 A 30 30 0 0 0 240 80 A 30 30 0 0 0 270 50 A 30 30 0 0 0 240 20 Z",
  "M 305 45 L 335 45 L 335 55 L 305 55 Z",
  "M 350 0 L 390 0 A 50 50 0 0 1 440 50 A 50 50 0 0 1 390 100 L 350 100 Z M 370 20 L 370 80 L 390 80 A 30 30 0 0 0 390 20 Z",
];

const E_MARK_PATH =
  "M 15 0 L 70 0 A 30 30 0 0 1 100 30 L 100 70 A 30 30 0 0 1 70 100 L 15 100 L 25 80 L 70 80 A 10 10 0 0 0 80 70 L 80 60 L 30 60 L 30 40 L 80 40 L 80 30 A 10 10 0 0 0 70 20 L 25 20 Z";

export default function BrandLogo({
  className = "",
  showTagline = true,
  title = "EJOD",
}) {
  const id = useId().replace(/:/g, "");
  const warmGradientId = `brand-logo-warm-${id}`;
  const coolGradientId = `brand-logo-cool-${id}`;
  const shellGradientId = `brand-logo-shell-${id}`;
  const wordmarkGradientId = `brand-logo-wordmark-${id}`;
  const glowId = `brand-logo-glow-${id}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 680 160"
      className={className}
      preserveAspectRatio="xMinYMid meet"
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id={warmGradientId} x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#FF8A5B" />
          <stop offset="55%" stopColor="#FF6B35" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id={coolGradientId} x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#7DD3FC" />
        </linearGradient>
        <linearGradient id={shellGradientId} x1="20%" x2="85%" y1="15%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0A0E1A" />
        </linearGradient>
        <linearGradient id={wordmarkGradientId} x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.82" />
        </linearGradient>
        <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#FF6B35" floodOpacity="0.18" />
          <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#06B6D4" floodOpacity="0.14" />
        </filter>
      </defs>

      <g transform="translate(0, 8)" filter={`url(#${glowId})`}>
        <circle cx="62" cy="62" r="54" fill="#FF6B35" opacity="0.08" />
        <path
          d="M 18 34 A 52 52 0 0 1 95 18"
          fill="none"
          stroke={`url(#${coolGradientId})`}
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M 28 107 A 52 52 0 0 0 103 90"
          fill="none"
          stroke={`url(#${coolGradientId})`}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
        <circle cx="101" cy="22" r="5.5" fill="#06B6D4" />
        <circle cx="19" cy="103" r="4.5" fill="#F59E0B" opacity="0.85" />
        <polygon
          points="62,0 120,33 120,99 62,132 4,99 4,33"
          fill={`url(#${shellGradientId})`}
          stroke={`url(#${warmGradientId})`}
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
        <polygon
          points="62,13 108,39 108,93 62,119 16,93 16,39"
          fill="#FFFFFF"
          opacity="0.05"
        />
        <path
          d="M 16 38 L 62 12 L 108 38"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.16"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <g transform="translate(31, 37) scale(0.56)">
          <path d={E_MARK_PATH} fill={`url(#${warmGradientId})`} />
          <path
            d="M 20 22 L 68 22 A 8 8 0 0 1 76 30"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.4"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M 36 50 L 82 50"
            fill="none"
            stroke={`url(#${coolGradientId})`}
            strokeWidth="7"
            strokeLinecap="round"
          />
        </g>
      </g>

      <g transform="translate(156, 14)">
        <g fill={`url(#${wordmarkGradientId})`} fillRule="evenodd">
          {WORDMARK_PATHS.map((path, index) => (
            <path key={index} d={path} />
          ))}
        </g>

        {showTagline ? (
          <g transform="translate(6, 126)">
            <line x1="0" y1="0" x2="42" y2="0" stroke="#FF6B35" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
            <line x1="330" y1="0" x2="372" y2="0" stroke="#FF6B35" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
            <text
              x="186"
              y="6"
              textAnchor="middle"
              fill="#FF6B35"
              fontSize="17"
              fontWeight="800"
              letterSpacing="6.2"
            >
              MEDICAL • EDUCATION • XR
            </text>
          </g>
        ) : null}
      </g>
    </svg>
  );
}
