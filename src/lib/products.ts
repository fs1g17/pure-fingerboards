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
  /** Units available. 0 = sold out. */
  stock: number;
  featured?: boolean;
  /** Optional real photo path, e.g. "/products/midnight.jpg". */
  image?: string;
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

export const currency = "$";

// ⬇️ REPLACE THESE WITH YOUR REAL PRODUCTS ⬇️
export const products: Product[] = [
  {
    slug: "acid-rain-complete",
    name: "Acid Rain",
    category: "complete",
    price: 64,
    compareAtPrice: 79,
    tagline: "Our flagship complete. Built, broken-in, ready to shred.",
    description:
      "The Acid Rain complete is a fully assembled, ride-ready setup pressed from 5-ply hard maple with a deep mellow concave. Paired with our CNC trucks, urethane wheels, and foam grip — dialed straight out of the box.",
    specs: [
      "32mm 5-ply hard maple deck",
      "Mellow concave, mold #2",
      "CNC aluminium trucks + lock nuts",
      "Bearing-free urethane wheels",
      "Pre-applied foam grip tape",
    ],
    badges: ["Limited"],
    stock: 8,
    featured: true,
    art: { from: "#c6ff3a", to: "#0b3d1a" },
  },
  {
    slug: "midnight-oil-deck",
    name: "Midnight Oil",
    category: "deck",
    price: 32,
    tagline: "Blacked-out 5-ply with a steep kick.",
    description:
      "Hand-pressed in small batches, the Midnight Oil deck runs a steeper kick and pronounced concave for poppier flips. Sealed with a matte finish and stamped with the Pure mark.",
    specs: [
      "33.5mm 5-ply hard maple",
      "Steep kicks, deep concave, mold #4",
      "Matte sealed finish",
      "Sold as deck only",
    ],
    badges: ["New"],
    stock: 14,
    featured: true,
    art: { from: "#3a3a3a", to: "#0a0a0a" },
  },
  {
    slug: "sunburst-1of1-deck",
    name: "Sunburst 1/1",
    category: "deck",
    price: 49,
    tagline: "One-of-one hand-painted graphic. When it's gone, it's gone.",
    description:
      "A true one-off. Each Sunburst is individually hand-painted, so no two are alike. The one you see is the one you get — signed and numbered on the underside.",
    specs: [
      "32mm 5-ply hard maple",
      "Hand-painted, signed & numbered",
      "Medium concave, mold #2",
      "Truly 1 of 1",
    ],
    badges: ["1 of 1"],
    stock: 1,
    featured: true,
    art: { from: "#ff8a00", to: "#ff2d55" },
  },
  {
    slug: "og-stamp-complete",
    name: "OG Stamp",
    category: "complete",
    price: 59,
    tagline: "Clean wood, classic shape, full setup.",
    description:
      "A no-nonsense complete for purists. Natural wood top, our OG stamped graphic underneath, and a balanced shape that suits any style of riding.",
    specs: [
      "32mm 5-ply hard maple deck",
      "Medium concave, mold #1",
      "CNC aluminium trucks",
      "Urethane wheels",
      "Foam grip applied",
    ],
    stock: 11,
    art: { from: "#d9c2a3", to: "#7a5a36" },
  },
  {
    slug: "cnc-pro-trucks",
    name: "CNC Pro Trucks",
    category: "trucks",
    price: 22,
    tagline: "Precision-milled aluminium. Tunable & tough.",
    description:
      "A pair of our CNC-milled aluminium trucks with adjustable lock-nuts and a responsive feel. Drop-in upgrade for any 32–34mm deck.",
    specs: [
      "CNC aluminium baseplate & hanger",
      "Adjustable lock nuts",
      "Fits 32–34mm decks",
      "Sold as a pair",
    ],
    badges: ["Restock"],
    stock: 25,
    art: { from: "#b9c7d6", to: "#3b4757" },
  },
  {
    slug: "street-urethane-wheels",
    name: "Street Urethane",
    category: "wheels",
    price: 12,
    tagline: "Grippy urethane that rolls smooth and true.",
    description:
      "A set of four urethane wheels poured for a smooth, true roll with just enough grip for tech lines. Available colorways rotate with each batch.",
    specs: [
      "Set of 4 urethane wheels",
      "Single-color batch pour",
      "Smooth, true roll",
      "Fits CNC Pro trucks",
    ],
    stock: 40,
    art: { from: "#c6ff3a", to: "#2b6b1f" },
  },
  {
    slug: "foam-grip-tape",
    name: "Foam Grip Tape",
    category: "tape",
    price: 6,
    tagline: "Tacky foam grip cut to fit.",
    description:
      "Pre-cut foam grip with a tacky top layer for locked-in flips. Peel, stick, ride. Two sheets per pack.",
    specs: [
      "2 pre-cut foam sheets",
      "Tacky high-grip top",
      "Easy peel-and-stick backing",
      "Trim-to-fit any deck",
    ],
    stock: 60,
    art: { from: "#1c1c1c", to: "#000000" },
  },
  {
    slug: "toxic-drop-complete",
    name: "Toxic Drop",
    category: "complete",
    price: 72,
    tagline: "Limited acid-green drop. Numbered run of 20.",
    description:
      "Our boldest complete yet — a numbered run of 20 finished in toxic acid green with blacked-out hardware. Each one carries its number on the tail.",
    specs: [
      "32mm 5-ply hard maple deck",
      "Numbered /20",
      "Blacked-out CNC trucks",
      "Acid-green urethane wheels",
      "Foam grip applied",
    ],
    badges: ["Limited"],
    stock: 0,
    featured: true,
    art: { from: "#aaff00", to: "#103a00" },
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
