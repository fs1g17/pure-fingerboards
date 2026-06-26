import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  kicker?: string;
  title: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  kicker,
  title,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {kicker && (
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-primary">
          <span className="h-px w-6 bg-primary" />
          {kicker}
        </span>
      )}
      <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}
