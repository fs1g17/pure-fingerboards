export const site = {
  name: "Pure Fingerboards",
  short: "PURE",
  tagline: "Handmade fingerboards. Built to ride, made to last.",
  description:
    "Pure Fingerboards crafts handmade, limited-run wooden fingerboards and pro parts. Real wood, real concave, one-of-a-kind graphics. Cop a drop before it's gone.",
  url: "https://purefingerboards.com",
  email: "purefingerboards.alex@gmail.com",
  // Logo at /public/brand/logo.png
  logo: "/brand/logo.png",
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

export function gmailComposeUrl(email: string = site.email) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
}
