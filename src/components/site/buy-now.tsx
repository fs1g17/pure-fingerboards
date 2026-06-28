import Link from "next/link";
import { CreditCard } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type Product } from "@/lib/products";

export function BuyNow({ product }: { product: Product }) {
  const soldOut = product.stock <= 0;

  if (soldOut) {
    return (
      <Button
        size="lg"
        disabled
        className="w-full font-display text-base uppercase tracking-widest sm:w-auto"
      >
        <CreditCard className="size-5" />
        Sold Out
      </Button>
    );
  }

  return (
    <Link
      href={`/checkout/${product.slug}`}
      className={cn(
        buttonVariants({ size: "lg" }),
        "w-full font-display text-base uppercase tracking-widest sm:w-auto",
      )}
    >
      <CreditCard className="size-5" />
      Buy Now
    </Link>
  );
}
