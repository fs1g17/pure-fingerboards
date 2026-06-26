import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  reverse?: boolean;
  fast?: boolean;
};

export function Marquee({ items, className, reverse, fast }: MarqueeProps) {
  const loop = [...items, ...items];
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden whitespace-nowrap",
        className,
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center",
          fast ? "animate-marquee-fast" : "animate-marquee",
          reverse && "marquee-reverse",
        )}
      >
        {loop.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display text-2xl uppercase tracking-wide sm:text-3xl">
              {item}
            </span>
            <span
              aria-hidden
              className="mx-6 text-2xl text-primary sm:mx-8 sm:text-3xl"
            >
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
