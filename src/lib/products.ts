/**
 * PRODUCT DATA
 * ------------------------------------------------------------------
 * This is the single source of truth for the shop. Edit / replace the
 * `products` array below with your real lineup. Every field is typed,
 * so your editor will warn you if something's missing.
 *
 * No real product photos yet? Leave `image` undefined and the site
 * renders a generated streetwear board graphic using `art.from` /
 * `art.to` colors. When you have photos, drop them in /public/products/
 * and set `image: "/products/your-file.jpg"`.
 */

export type Category = "complete" | "deck" | "trucks" | "wheels" | "tape";

export type ProductBadge = "Limited" | "New" | "Restock" | "Sold Out" | "1 of 1";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  /** Price in whole currency units (e.g. dollars). */
  price: number;
  /** Optional crossed-out "was" price for drops/sales. */
  compareAtPrice?: number;
  tagline: string;
  description: string;
  /** Bullet spec list shown on the product page. */
  specs: string[];
  badges?: ProductBadge[];
  /** Optional highlighted warning shown on the product page (e.g. "deck only"). */
  warning?: string;
  /** Units available. 0 = sold out. */
  stock: number;
  featured?: boolean;
  /** Optional real photo path, e.g. "/products/midnight.jpg". */
  image?: string;
  /** Optional extra photos shown as gallery thumbnails after the main image. */
  gallery?: string[];
  /** Fallback generated graphic colors (CSS colors). */
  art: { from: string; to: string };
};

export const categories: {
  key: Category;
  label: string;
  blurb: string;
}[] = [
  { key: "complete", label: "Completes", blurb: "Ready-to-ride, fully built" },
  { key: "deck", label: "Decks", blurb: "Handmade wooden decks" },
  { key: "trucks", label: "Trucks", blurb: "CNC'd performance trucks" },
  { key: "wheels", label: "Wheels", blurb: "Urethane bearing wheels" },
  { key: "tape", label: "Grip Tape", blurb: "Foam & sandpaper grip" },
];

export const currency = "£";

// ⬇️ REPLACE THESE WITH YOUR REAL PRODUCTS ⬇️
export const products: Product[] = [
  {
    slug: "summit-deck",
    name: "Summit",
    category: "deck",
    price: 12,
    tagline: "Minimal mountain & rising-sun graphic on a blacked-out 5-ply.",
    description:
      "A calm, minimal summit scene — mountain, treeline and a rising red sun — printed on a hand-finished deck. Pressed from 5-ply hard maple and sealed matte. Note: this is the fingerboard deck with the graphic only — it does not come with trucks or wheels.",
    specs: [
      "32mm 5-ply hard maple deck",
      "Mountain & rising-sun graphic",
      "Matte sealed finish",
      "Deck only — no trucks or wheels",
    ],
    badges: ["New"],
    warning:
      "Deck only — this does NOT come with wheels or trucks. You get the fingerboard with the graphic.",
    stock: 10,
    featured: true,
    image: "/products/summit-deck.png",
    gallery: ["/products/oni-side.png"],
    art: { from: "#1c2b3a", to: "#0a0a0a" },
  },
  {
    slug: "hanami-ride-deck",
    name: "Hanami ride",
    category: "deck",
    price: 12,
    tagline: "Mount Fuji & cherry blossom hanami graphic on a 5-ply.",
    description:
      "A serene hanami scene — Mount Fuji, sakura blossoms and a reflected lake — printed on a hand-finished deck. Pressed from 5-ply hard maple and sealed matte. Note: this is the fingerboard deck with the graphic only — it does not come with trucks or wheels.",
    specs: [
      "32mm 5-ply hard maple deck",
      "Mount Fuji & sakura hanami graphic",
      "Matte sealed finish",
      "Deck only — no trucks or wheels",
    ],
    badges: ["New"],
    warning:
      "Deck only — this does NOT come with wheels or trucks. You get the fingerboard with the graphic.",
    stock: 10,
    featured: true,
    image: "/products/hanami-ride.png",
    gallery: ["/products/oni-side.png"],
    art: { from: "#1c2b3a", to: "#0a0a0a" },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function featuredProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function formatPrice(value: number): string {
  return `${currency}${value.toFixed(0)}`;
}
