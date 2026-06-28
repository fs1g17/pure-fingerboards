"use client";

import { useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice, type Product } from "@/lib/products";

export function CheckoutForm({ product }: { product: Product }) {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    try {
      const res = await fetch("/api/interest", { method: "POST" });
      if (!res.ok) throw new Error("Request failed");

      toast.error("Oops! Sorry — the transaction failed.", {
        description: "Checkout isn't live yet. Please try again soon.",
      });
    } catch {
      toast.error("Oops! Sorry — the transaction failed.", {
        description: "Checkout isn't live yet. Try again soon.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email" className="font-mono text-xs uppercase tracking-widest">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="font-mono text-xs uppercase tracking-widest">
          Name on card
        </Label>
        <Input
          id="name"
          name="name"
          required
          autoComplete="cc-name"
          placeholder="Full name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="card" className="font-mono text-xs uppercase tracking-widest">
          Card number
        </Label>
        <Input
          id="card"
          name="card"
          required
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="4242 4242 4242 4242"
          maxLength={19}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="expiry" className="font-mono text-xs uppercase tracking-widest">
            Expiry
          </Label>
          <Input
            id="expiry"
            name="expiry"
            required
            autoComplete="cc-exp"
            placeholder="MM / YY"
            maxLength={7}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvc" className="font-mono text-xs uppercase tracking-widest">
            CVC
          </Label>
          <Input
            id="cvc"
            name="cvc"
            required
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="123"
            maxLength={4}
          />
        </div>
      </div>

      <div className="flex items-start gap-3 border border-border bg-card/50 p-4 text-xs text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
        <p>
          Demo checkout only — card details are not stored or charged. This
          page is a placeholder until real payments go live.
        </p>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="w-full font-display text-base uppercase tracking-widest"
      >
        <Lock className="size-4" />
        {submitting ? "Processing…" : `Confirm & Pay ${formatPrice(product.price)}`}
      </Button>
    </form>
  );
}
