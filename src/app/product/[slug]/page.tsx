import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ShieldCheck, Truck, TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BoardArt } from "@/components/site/board-art";
import { ProductGallery } from "@/components/site/product-gallery";
import { ProductCard } from "@/components/site/product-card";
import { BuyNow } from "@/components/site/buy-now";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";
import {
  formatPrice,
  getProduct,
  products,
} from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: product.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const soldOut = product.stock <= 0;
  const lowStock = !soldOut && product.stock <= 5;
  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);
  const fill = related.length < 4
    ? products.filter((p) => p.slug !== product.slug && !related.includes(p)).slice(0, 4 - related.length)
    : [];
  const suggestions = [...related, ...fill].slice(0, 4);

  const galleryImages = product.image
    ? [product.image, ...(product.gallery ?? [])]
    : [];

  const badgeOverlay = (
    <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-1.5">
      {soldOut && (
        <Badge className="rounded-none bg-muted font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Sold Out
        </Badge>
      )}
      {product.badges?.map((b) => (
        <Badge
          key={b}
          className="rounded-none bg-primary font-mono text-[10px] uppercase tracking-wider text-primary-foreground"
        >
          {b}
        </Badge>
      ))}
    </div>
  );

  return (
    <>
      <div className="container-edge pt-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to shop
        </Link>
      </div>

      <section className="container-edge grid gap-10 py-8 md:grid-cols-2 md:py-12">
        {/* media */}
        {galleryImages.length > 0 ? (
          <ProductGallery
            images={galleryImages}
            alt={product.name}
            soldOut={soldOut}
          >
            {badgeOverlay}
          </ProductGallery>
        ) : (
          <div className="relative aspect-[4/5] overflow-hidden border border-border bg-gradient-to-br from-muted to-background">
            {badgeOverlay}
            <div className={cn("absolute inset-0 p-10", soldOut && "opacity-50 grayscale")}>
              <BoardArt from={product.art.from} to={product.art.to} label={product.name} />
            </div>
          </div>
        )}

        {/* info */}
        <div className="flex flex-col">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            {product.category}
          </p>
          <h1 className="mt-2 font-display text-5xl uppercase leading-[0.9] tracking-tight sm:text-6xl">
            {product.name}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{product.tagline}</p>

          <div className="mt-6 flex items-end gap-3">
            <span className="font-display text-4xl text-primary">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="mb-1 font-mono text-lg text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* stock */}
          <div className="mt-3 font-mono text-xs uppercase tracking-widest">
            {soldOut ? (
              <span className="text-muted-foreground">Out of stock — restock soon</span>
            ) : lowStock ? (
              <span className="text-flame">Only {product.stock} left in this drop</span>
            ) : (
              <span className="text-primary">In stock</span>
            )}
          </div>

          {product.warning && (
            <div className="mt-6 flex items-start gap-3 border border-flame/50 bg-flame/10 p-4">
              <TriangleAlert className="mt-0.5 size-5 shrink-0 text-flame" />
              <div>
                <p className="font-display text-sm uppercase tracking-widest text-flame">
                  Warning
                </p>
                <p className="mt-1 text-sm text-foreground/90">{product.warning}</p>
              </div>
            </div>
          )}

          <div className="mt-8">
            <BuyNow product={product} />
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <Separator className="my-8" />

          <h2 className="font-display text-sm uppercase tracking-widest text-muted-foreground">
            Specs
          </h2>
          <ul className="mt-4 space-y-2">
            {product.specs.map((s) => (
              <li key={s} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 border border-border p-4">
              <Truck className="size-5 text-primary" />
              <div>
                <p className="font-display text-sm uppercase tracking-wide">
                  Worldwide shipping
                </p>
                <p className="text-xs text-muted-foreground">Packed & tracked</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border border-border p-4">
              <ShieldCheck className="size-5 text-primary" />
              <div>
                <p className="font-display text-sm uppercase tracking-wide">
                  Handmade quality
                </p>
                <p className="text-xs text-muted-foreground">Checked by hand</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {suggestions.length > 0 && (
        <section className="container-edge py-16 md:py-24">
          <SectionHeading kicker="You might also like" title="More to Ride" />
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {suggestions.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
