import type { Metadata } from "next";
import Link from "next/link";
import { Marquee } from "@/components/site/marquee";
import { ProductCard } from "@/components/site/product-card";
import { cn } from "@/lib/utils";
import { categories, products, type Category } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop handmade Pure Fingerboards — completes, decks, trucks, wheels and grip tape. Limited drops, restocked regularly.",
};

const filters: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  ...categories.map((c) => ({ key: c.key, label: c.label })),
];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = (category ?? "all") as Category | "all";

  const filtered =
    active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <>
      <section className="border-b border-border">
        <div className="container-edge py-14 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            The Shop
          </p>
          <h1 className="mt-3 font-display text-5xl uppercase leading-[0.9] tracking-tight sm:text-7xl">
            Cop a <span className="text-primary">Board</span>
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Handmade completes, decks and pro parts. Small-batch and
            limited — when it&apos;s gone, it&apos;s gone.
          </p>
        </div>
      </section>

      <div className="border-b border-border bg-foreground py-2.5 text-background">
        <Marquee items={["FREE STICKERS WITH EVERY ORDER", "LIMITED RUNS", "RESTOCKS DROP WEEKLY"]} fast />
      </div>

      <section className="container-edge py-10 md:py-14">
        {/* filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <Link
              key={f.key}
              href={f.key === "all" ? "/shop" : `/shop?category=${f.key}`}
              className={cn(
                "border px-4 py-2 font-display text-sm uppercase tracking-widest transition-colors",
                active === f.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-foreground",
              )}
            >
              {f.label}
            </Link>
          ))}
        </div>

        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </p>

        {filtered.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <div className="mt-10 border border-dashed border-border p-16 text-center">
            <p className="font-display text-2xl uppercase tracking-wide">
              Nothing here yet
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              This category is restocking. Check back soon.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
