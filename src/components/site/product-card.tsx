import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BoardArt } from "./board-art";
import { formatPrice, type Product } from "@/lib/products";

const badgeStyles: Record<string, string> = {
  Limited: "bg-primary text-primary-foreground",
  New: "bg-foreground text-background",
  Restock: "bg-chart-3 text-background",
  "1 of 1": "bg-flame text-background",
  "Sold Out": "bg-muted text-muted-foreground",
};

export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.stock <= 0;
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative flex flex-col overflow-hidden border border-border bg-card transition-colors hover:border-primary"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-muted to-background">
        {/* badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
          {soldOut && (
            <Badge className={cn("rounded-none font-mono text-[10px] uppercase tracking-wider", badgeStyles["Sold Out"])}>
              Sold Out
            </Badge>
          )}
          {product.badges?.map((b) => (
            <Badge
              key={b}
              className={cn(
                "rounded-none font-mono text-[10px] uppercase tracking-wider",
                badgeStyles[b],
              )}
            >
              {b}
            </Badge>
          ))}
        </div>

        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-105",
              soldOut && "opacity-50 grayscale",
            )}
          />
        ) : (
          <div
            className={cn(
              "absolute inset-0 p-6 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3",
              soldOut && "opacity-40 grayscale",
            )}
          >
            <BoardArt from={product.art.from} to={product.art.to} label={product.name} />
          </div>
        )}

        <div className="absolute right-3 top-3 grid size-9 -translate-y-1 place-items-center bg-primary text-primary-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </div>
      </div>

      <div className="flex items-start justify-between gap-3 border-t border-border p-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {product.category}
          </p>
          <h3 className="mt-1 font-display text-lg uppercase leading-tight tracking-wide">
            {product.name}
          </h3>
        </div>
        <div className="text-right">
          <p className="font-display text-lg text-primary">
            {formatPrice(product.price)}
          </p>
          {product.compareAtPrice && (
            <p className="font-mono text-xs text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
