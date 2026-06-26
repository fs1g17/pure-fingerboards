"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type BoardArtProps = {
  from: string;
  to: string;
  label?: string;
  className?: string;
  /** vertical = deck stood up (cards), horizontal = laid flat (hero) */
  orientation?: "vertical" | "horizontal";
};

/**
 * A generated, top-down fingerboard deck graphic used as a tasteful
 * placeholder until real product photography is added.
 */
export function BoardArt({
  from,
  to,
  label = "PURE",
  className,
  orientation = "vertical",
}: BoardArtProps) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 160 480"
      className={cn(
        "h-full w-full",
        orientation === "horizontal" && "rotate-90",
        className,
      )}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`${label} fingerboard deck`}
    >
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <pattern
          id={`grip-${id}`}
          width="9"
          height="9"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="rgba(0,0,0,0.18)" />
        </pattern>
        <filter id={`shadow-${id}`} x="-30%" y="-10%" width="160%" height="120%">
          <feDropShadow
            dx="0"
            dy="14"
            stdDeviation="16"
            floodColor="rgba(0,0,0,0.55)"
          />
        </filter>
      </defs>

      {/* deck silhouette: rounded nose/tail with a subtle waist */}
      <g filter={`url(#shadow-${id})`}>
        <path
          d="M80 12
             C 120 12 138 30 138 70
             L 134 200
             C 132 230 132 250 134 280
             L 138 410
             C 138 450 120 468 80 468
             C 40 468 22 450 22 410
             L 26 280
             C 28 250 28 230 26 200
             L 22 70
             C 22 30 40 12 80 12 Z"
          fill={`url(#grad-${id})`}
          stroke="rgba(0,0,0,0.45)"
          strokeWidth="2"
        />
        <path
          d="M80 12
             C 120 12 138 30 138 70
             L 134 200
             C 132 230 132 250 134 280
             L 138 410
             C 138 450 120 468 80 468
             C 40 468 22 450 22 410
             L 26 280
             C 28 250 28 230 26 200
             L 22 70
             C 22 30 40 12 80 12 Z"
          fill={`url(#grip-${id})`}
          opacity="0.5"
        />
        {/* center spine / graphic stripe */}
        <rect
          x="74"
          y="40"
          width="12"
          height="400"
          rx="6"
          fill="rgba(255,255,255,0.12)"
        />
        {/* brand mark */}
        <text
          x="80"
          y="250"
          textAnchor="middle"
          transform="rotate(-90 80 250)"
          fill="rgba(255,255,255,0.85)"
          fontFamily="var(--font-display), sans-serif"
          fontSize="34"
          letterSpacing="6"
        >
          {label.toUpperCase()}
        </text>
      </g>
    </svg>
  );
}
