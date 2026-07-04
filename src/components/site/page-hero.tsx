import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  kicker: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  children?: React.ReactNode;
};

export function PageHero({
  kicker,
  title,
  description,
  className,
  children,
}: PageHeroProps) {
  return (
    <section className={cn("border-b border-border", className)}>
      <div className="container-edge py-16 md:py-24">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="max-w-2xl flex-1">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary sm:text-sm">
              {kicker}
            </p>
            <h1 className="mt-3 font-display text-5xl uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                {description}
              </p>
            ) : null}
            {children}
          </div>

          <Logo
            size="lg"
            className="mx-auto ml-auto self-center lg:mx-0 lg:shrink-0"
          />
        </div>
      </div>
    </section>
  );
}
