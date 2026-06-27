import Link from "next/link";
import { ArrowRight, Hammer, Sparkles, TreePine, Truck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/site/marquee";
import { HeroShowcase } from "@/components/site/hero-showcase";
import { BoardArt } from "@/components/site/board-art";
import { ProductCard } from "@/components/site/product-card";
import { SectionHeading } from "@/components/site/section-heading";
import { categories, featuredProducts, products } from "@/lib/products";

export default function Home() {
  const featured = featuredProducts();
  const newest = products.slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_0%,oklch(0.88_0.23_130/0.15),transparent_70%)]" />
        <div className="container-edge relative py-16 md:py-24">
          <div className="max-w-3xl">
            <Badge className="mb-6 rounded-none bg-primary font-mono text-xs uppercase tracking-widest text-primary-foreground">
              <Sparkles className="size-3" />
              New drop live now
            </Badge>
            <h1 className="font-display text-6xl uppercase leading-[0.85] tracking-tight sm:text-7xl lg:text-8xl">
              Ride
              <br />
              <span className="text-primary">Something</span>
              <br />
              <span className="text-stroke">Pure</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Handmade wooden fingerboards & pro parts. Real concave, real wood,
              one-of-a-kind graphics. Built in small batches and gone fast.
            </p>
          </div>

          <HeroShowcase />

          <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/shop"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "font-display text-base uppercase tracking-widest",
                )}
              >
                Shop the Drop
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href="/about"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "font-display text-base uppercase tracking-widest",
                )}
              >
                Our Story
              </Link>
            </div>

            <div className="mt-10 flex gap-8">
              {[
                { n: "100%", l: "Handmade" },
                { n: "5-Ply", l: "Hard Maple" },
                { n: "1/1", l: "Drops" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-3xl text-primary">{s.n}</p>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex h-[360px] items-center justify-center md:h-[520px]">
            <div className="absolute font-display text-[14rem] leading-none text-foreground/[0.04] sm:text-[20rem]">
              PURE
            </div>
            <div className="animate-float-board h-full w-auto drop-shadow-2xl">
              <BoardArt from="#c6ff3a" to="#0b3d1a" label="Pure" />
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-b border-border bg-foreground py-3 text-background">
        <Marquee
          items={[
            "PURE FINGERBOARDS",
            "HANDMADE IN SMALL BATCHES",
            "LIMITED DROPS",
            "REAL WOOD CONCAVE",
          ]}
        />
      </div>

      {/* FEATURED DROPS */}
      <section className="container-edge py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading kicker="Cop before it's gone" title="Featured Drops" />
          <Link
            href="/shop"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "font-display uppercase tracking-widest",
            )}
          >
            View all
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="border-y border-border bg-card/40">
        <div className="container-edge py-16 md:py-24">
          <SectionHeading kicker="Build your setup" title="Shop by Category" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.key}
                href={`/shop?category=${c.key}`}
                className="group flex items-center justify-between border border-border bg-background p-6 transition-colors hover:border-primary"
              >
                <div>
                  <h3 className="font-display text-2xl uppercase tracking-wide">
                    {c.label}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.blurb}</p>
                </div>
                <ArrowRight className="size-6 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="container-edge py-16 md:py-24">
        <SectionHeading
          kicker="Why Pure"
          title="No Mass Production. Ever."
          align="center"
          className="mx-auto max-w-2xl"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Hammer,
              t: "Handmade",
              d: "Every deck is pressed, shaped, and finished by hand in small batches.",
            },
            {
              icon: TreePine,
              t: "Real Wood",
              d: "5-ply hard maple with a genuine concave you can actually feel.",
            },
            {
              icon: Sparkles,
              t: "1-of-1 Graphics",
              d: "Hand-painted and numbered drops. No two boards are the same.",
            },
            {
              icon: Truck,
              t: "Ships Worldwide",
              d: "Securely packed and sent anywhere skaters push pavement.",
            },
          ].map((f) => (
            <div
              key={f.t}
              className="border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <div className="grid size-12 place-items-center bg-primary text-primary-foreground">
                <f.icon className="size-6" />
              </div>
              <h3 className="mt-5 font-display text-xl uppercase tracking-wide">
                {f.t}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEWEST */}
      <section className="container-edge pb-16 md:pb-24">
        <SectionHeading kicker="Fresh off the press" title="Latest In" />
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {newest.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section className="relative overflow-hidden border-y border-border bg-primary text-primary-foreground">
        <div className="container-edge flex flex-col items-center gap-6 py-16 text-center md:py-20">
          <h2 className="font-display text-4xl uppercase leading-[0.9] tracking-tight sm:text-6xl">
            Drops sell out.
            <br />
            Don&apos;t sleep on it.
          </h2>
          <p className="max-w-xl text-primary-foreground/80">
            New limited boards land regularly. Get in early, build your setup,
            and ride something nobody else has.
          </p>
          <Link
            href="/shop"
            className={cn(
              buttonVariants({ size: "lg", variant: "secondary" }),
              "font-display text-base uppercase tracking-widest",
            )}
          >
            Shop Now
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
