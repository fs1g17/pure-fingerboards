import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Ruler, Layers, PaintBucket, PackageCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/site/marquee";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Pure Fingerboards is a small workshop making handmade wooden fingerboards in limited runs. No mass production — just real wood, real concave, and a love of the craft.",
};

const steps = [
  {
    icon: Layers,
    t: "Press",
    d: "We cold-press 5 plies of hard maple over hand-built molds for a genuine, durable concave.",
  },
  {
    icon: Ruler,
    t: "Shape",
    d: "Each deck is cut, sanded and refined by hand until the shape and kicks feel just right.",
  },
  {
    icon: PaintBucket,
    t: "Finish",
    d: "Graphics are printed or hand-painted, then sealed. The 1-of-1 drops are signed & numbered.",
  },
  {
    icon: PackageCheck,
    t: "Ship",
    d: "We assemble, quality-check and pack every order by hand before it goes out the door.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        className="relative overflow-hidden"
        kicker="Our Story"
        title={
          <>
            Made by hand.
            <br />
            <span className="text-primary">Built to ride.</span>
          </>
        }
      >
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Pure Fingerboards started on a workbench, not a factory line. No
          factory line. In the pursuit of getting away from plastic boards with
          fake concave, we started pressing our own from real maple. What
          started as a hobby became a small workshop producing limited runs of
          boards for our discerning riders.
        </p>
        <p className="mt-4 max-w-xl text-muted-foreground">
          All of our products are handmade in small batches. That means every
          board is slightly different. Drops are limited, and once they are sold
          out, they will never be available again. That&apos;s the point.
        </p>
      </PageHero>

      <div className="border-b border-border bg-primary py-3 text-primary-foreground">
        <Marquee items={["NO MASS PRODUCTION", "REAL MAPLE", "SMALL BATCHES", "MADE WITH CARE"]} />
      </div>

      {/* STATS */}
      <section className="container-edge grid gap-6 py-16 sm:grid-cols-3 md:py-20">
        {[
          { n: "5-Ply", l: "Hard maple, every deck" },
          { n: "100%", l: "Handmade & hand-checked" },
          { n: "1/1", l: "Signed, numbered drops" },
        ].map((s) => (
          <div key={s.l} className="border border-border bg-card p-8 text-center">
            <p className="font-display text-5xl text-primary">{s.n}</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {s.l}
            </p>
          </div>
        ))}
      </section>

      {/* PROCESS */}
      <section className="border-y border-border bg-card/40">
        <div className="container-edge py-16 md:py-24">
          <SectionHeading kicker="The Craft" title="How a Board is Made" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.t} className="relative border border-border bg-background p-6">
                <span className="absolute right-4 top-4 font-display text-4xl text-foreground/10">
                  0{i + 1}
                </span>
                <div className="grid size-12 place-items-center bg-primary text-primary-foreground">
                  <step.icon className="size-6" />
                </div>
                <h3 className="mt-5 font-display text-xl uppercase tracking-wide">
                  {step.t}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-edge py-16 text-center md:py-24">
        <h2 className="mx-auto max-w-2xl font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl">
          Want one of your own?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Browse the latest drop and grab a board before the run sells out.
        </p>
        <Link
          href="/shop"
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-8 font-display text-base uppercase tracking-widest",
          )}
        >
          Shop the Drop
          <ArrowRight className="size-5" />
        </Link>
      </section>
    </>
  );
}
