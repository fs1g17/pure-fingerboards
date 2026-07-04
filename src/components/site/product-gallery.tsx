"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

const HOVER_ZOOM = 2.5;

export function ProductGallery({
  images,
  alt,
  soldOut,
  children,
}: {
  images: string[];
  alt: string;
  soldOut?: boolean;
  children?: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const surfaceRef = useRef<HTMLDivElement>(null);

  const src = images[active] ?? images[0];

  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = surfaceRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/5] overflow-hidden border border-border bg-gradient-to-br from-muted to-background">
        {children}

        <div
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onMouseMove={handleMove}
          onClick={() => {
            setZoomed(false);
            setOpen(true);
          }}
          className="absolute inset-0 cursor-zoom-in p-6 sm:p-8"
          role="button"
          tabIndex={0}
          aria-label={`Zoom into ${alt}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setZoomed(false);
              setOpen(true);
            }
          }}
        >
          <div ref={surfaceRef} className="relative h-full w-full">
            <Image
              key={src}
              src={src}
              alt={alt}
              fill
              quality={90}
              sizes="(max-width: 768px) 100vw, 900px"
              className={cn(
                "object-contain",
                soldOut && "opacity-60 grayscale",
              )}
              style={{
                transform: `scale(${hovering ? HOVER_ZOOM : 1})`,
                transformOrigin: `${origin.x}% ${origin.y}%`,
                transition: hovering ? "none" : "transform 200ms ease-out",
                willChange: "transform",
              }}
              priority
            />
          </div>
          <span
            className={cn(
              "pointer-events-none absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 bg-background/80 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground backdrop-blur transition-opacity",
              hovering ? "opacity-0" : "opacity-100",
            )}
          >
            <ZoomIn className="size-3.5" />
            Hover to zoom
          </span>
        </div>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "relative aspect-square overflow-hidden border bg-gradient-to-br from-muted to-background transition-colors",
                i === active
                  ? "border-primary"
                  : "border-border hover:border-primary/60",
              )}
            >
              <Image
                src={img}
                alt={`${alt} — view ${i + 1}`}
                fill
                sizes="120px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} — full image`}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 grid size-10 place-items-center border border-white/20 bg-black/50 text-white transition-colors hover:border-primary hover:text-primary"
          >
            <X className="size-5" />
          </button>

          <div
            className={cn(
              "max-h-full max-w-6xl overflow-auto",
              zoomed ? "cursor-zoom-out" : "cursor-zoom-in",
            )}
            onClick={(e) => {
              e.stopPropagation();
              setZoomed((z) => !z);
            }}
          >
            {/* Plain img at native resolution so quality isn't downscaled */}
            <img
              src={src}
              alt={alt}
              className={cn(
                "mx-auto block h-auto origin-top transition-all duration-200",
                zoomed ? "w-[200%] max-w-none sm:w-[150%]" : "max-h-[85vh] w-auto",
              )}
            />
          </div>

          <p className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-white/70">
            {zoomed ? "Click image to zoom out" : "Click image to zoom in"} · Esc to close
          </p>
        </div>
      )}
    </div>
  );
}
