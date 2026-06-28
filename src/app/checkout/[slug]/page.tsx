import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BoardArt } from "@/components/site/board-art";
import { CheckoutForm } from "@/components/site/checkout-form";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatPrice, getProduct, products } from "@/lib/products";

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
    title: `Checkout — ${product.name}`,
    description: `Complete your order for ${product.name}.`,
  };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || product.stock <= 0) notFound();

  return (
    <>
      <div className="container-edge pt-8">
        <Link
          href={`/product/${product.slug}`}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to product
        </Link>
      </div>

      <section className="container-edge py-8 md:py-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
          Secure checkout
        </p>
        <h1 className="mt-2 font-display text-5xl uppercase leading-[0.9] tracking-tight sm:text-6xl">
          Payment
        </h1>
        <p className="mt-3 max-w-lg text-muted-foreground">
          Enter your details below to complete your order.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-sm uppercase tracking-widest text-muted-foreground">
              Order summary
            </h2>

            <div className="mt-6 flex gap-4">
              <div className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden border border-border bg-gradient-to-br from-muted to-background sm:w-28">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 p-3">
                    <BoardArt
                      from={product.art.from}
                      to={product.art.to}
                      label={product.name}
                    />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {product.category}
                </p>
                <h3 className="mt-1 font-display text-2xl uppercase leading-tight tracking-wide">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{product.tagline}</p>
              </div>
            </div>

            <Separator className="my-6" />

            <dl className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatPrice(product.price)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="text-primary">Calculated next</dd>
              </div>
              <Separator />
              <div className="flex items-end justify-between">
                <dt className="font-display text-sm uppercase tracking-widest">Total</dt>
                <dd className="font-display text-3xl text-primary">
                  {formatPrice(product.price)}
                </dd>
              </div>
            </dl>
          </div>

          <div className={cn("border border-border bg-card p-6 md:p-8")}>
            <h2 className="font-display text-sm uppercase tracking-widest text-muted-foreground">
              Card details
            </h2>
            <div className="mt-6">
              <CheckoutForm product={product} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
