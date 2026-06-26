export const site = {
  name: "Pure Fingerboards",
  short: "PURE",
  tagline: "Handmade fingerboards. Built to ride, made to last.",
  description:
    "Pure Fingerboards crafts handmade, limited-run wooden fingerboards and pro parts. Real wood, real concave, one-of-a-kind graphics. Cop a drop before it's gone.",
  url: "https://purefingerboards.com",
  email: "hello@purefingerboards.com",
  // Logo: drop your file at /public/brand/logo.svg (or .png) and it'll appear automatically.
  logo: "/brand/logo.svg",
  socials: {
    instagram: "https://instagram.com/purefingerboards",
    tiktok: "https://tiktok.com/@purefingerboards",
    youtube: "https://youtube.com/@purefingerboards",
  },
  nav: [
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type Site = typeof site;
