"use client";

import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { formatPrice, type Product } from "@/lib/products";

export function AddToBag({ product }: { product: Product }) {
  const soldOut = product.stock <= 0;

  return (
    <Button
      size="lg"
      disabled={soldOut}
      onClick={() =>
        toast.success(`${product.name} reserved`, {
          description: `${formatPrice(product.price)} — checkout is coming soon. We'll hold your spot in the drop.`,
        })
      }
      className="w-full font-display text-base uppercase tracking-widest sm:w-auto"
    >
      <ShoppingBag className="size-5" />
      {soldOut ? "Sold Out" : "Add to Bag"}
    </Button>
  );
}
