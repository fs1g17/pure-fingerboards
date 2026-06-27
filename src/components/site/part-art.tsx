"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type PartArtProps = {
  className?: string;
  label?: string;
};

export function TruckArt({ className, label = "Trucks" }: PartArtProps) {
  const id = useId().replace(/:/g, "");

  return (
    <figure className={cn("flex flex-col items-center gap-2", className)}>
      <svg
        viewBox="0 0 120 120"
        className="w-full drop-shadow-lg"
        role="img"
        aria-label={`${label} illustration`}
      >
        <defs>
          <linearGradient id={`truck-metal-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d4d4d8" />
            <stop offset="100%" stopColor="#71717a" />
          </linearGradient>
          <linearGradient id={`truck-accent-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.88 0.23 130)" />
            <stop offset="100%" stopColor="oklch(0.62 0.18 130)" />
          </linearGradient>
        </defs>
        <rect x="8" y="52" width="104" height="16" rx="4" fill={`url(#truck-metal-${id})`} />
        <rect x="46" y="44" width="28" height="32" rx="3" fill="#3f3f46" stroke="#52525b" />
        <rect x="52" y="36" width="16" height="12" rx="2" fill={`url(#truck-accent-${id})`} />
        <circle cx="24" cy="68" r="14" fill="#27272a" stroke="#52525b" strokeWidth="2" />
        <circle cx="96" cy="68" r="14" fill="#27272a" stroke="#52525b" strokeWidth="2" />
        <circle cx="24" cy="68" r="5" fill={`url(#truck-metal-${id})`} />
        <circle cx="96" cy="68" r="5" fill={`url(#truck-metal-${id})`} />
        <path
          d="M18 68 H102"
          stroke="#a1a1aa"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <figcaption className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </figcaption>
    </figure>
  );
}

export function WheelArt({ className, label = "Wheels" }: PartArtProps) {
  const id = useId().replace(/:/g, "");

  return (
    <figure className={cn("flex flex-col items-center gap-2", className)}>
      <svg
        viewBox="0 0 120 120"
        className="w-full drop-shadow-lg"
        role="img"
        aria-label={`${label} illustration`}
      >
        <defs>
          <radialGradient id={`wheel-core-${id}`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fafafa" />
            <stop offset="55%" stopColor="#a1a1aa" />
            <stop offset="100%" stopColor="#52525b" />
          </radialGradient>
          <radialGradient id={`wheel-urethane-${id}`} cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="oklch(0.92 0.08 130)" />
            <stop offset="100%" stopColor="oklch(0.55 0.16 130)" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="60" r="42" fill={`url(#wheel-urethane-${id})`} stroke="#14532d" strokeWidth="2" />
        <circle cx="60" cy="60" r="28" fill={`url(#wheel-core-${id})`} />
        <circle cx="60" cy="60" r="8" fill="#27272a" />
        <circle cx="42" cy="42" r="4" fill="rgba(255,255,255,0.35)" />
      </svg>
      <figcaption className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </figcaption>
    </figure>
  );
}

export function GripArt({ className, label = "Grip" }: PartArtProps) {
  const id = useId().replace(/:/g, "");

  return (
    <figure className={cn("flex flex-col items-center gap-2", className)}>
      <svg
        viewBox="0 0 120 120"
        className="w-full drop-shadow-lg"
        role="img"
        aria-label={`${label} illustration`}
      >
        <defs>
          <pattern id={`grip-dots-${id}`} width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="rgba(255,255,255,0.18)" />
          </pattern>
        </defs>
        <rect
          x="34"
          y="16"
          width="52"
          height="88"
          rx="18"
          fill="#18181b"
          stroke="#3f3f46"
          strokeWidth="2"
        />
        <rect x="34" y="16" width="52" height="88" rx="18" fill={`url(#grip-dots-${id})`} />
        <rect x="56" y="28" width="8" height="64" rx="4" fill="oklch(0.88 0.23 130 / 0.35)" />
      </svg>
      <figcaption className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </figcaption>
    </figure>
  );
}
