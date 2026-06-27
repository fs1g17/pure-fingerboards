"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { type Product } from "@/lib/products";

export function BuyNow({ product }: { product: Product }) {
  const soldOut = product.stock <= 0;
  const [pending, setPending] = useState(false);

  async function handleBuy() {
    setPending(true);
    try {
      const res = await fetch("/api/interest", { method: "POST" });
      if (!res.ok) throw new Error("Request failed");

      const { count, isNew } = (await res.json()) as {
        count: number;
        isNew: boolean;
      };

      const peopleLabel =
        count === 1 ? "person has" : "people have";

      toast.error("Oops! Sorry — the transaction failed.", {
        description: isNew
          ? `Checkout isn't live yet, but we've got you on the list. ${count} ${peopleLabel} already tried to buy.`
          : `Checkout isn't live yet. ${count} ${peopleLabel} tried to buy so far.`,
      });
    } catch {
      toast.error("Oops! Sorry — the transaction failed.", {
        description: "Checkout isn't live yet. Try again soon.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <Button
      size="lg"
      disabled={soldOut || pending}
      onClick={handleBuy}
      className="w-full font-display text-base uppercase tracking-widest sm:w-auto"
    >
      <CreditCard className="size-5" />
      {soldOut ? "Sold Out" : pending ? "Processing…" : "Buy Now"}
    </Button>
  );
}
