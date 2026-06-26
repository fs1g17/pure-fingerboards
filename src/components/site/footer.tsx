import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./logo";
import { Marquee } from "./marquee";
import { InstagramIcon, TikTokIcon, YouTubeIcon } from "./brand-icons";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="border-b border-border bg-primary text-primary-foreground">
        <Marquee
          items={["HANDMADE", "LIMITED DROPS", "REAL WOOD", "1 OF 1", "SHIPS WORLDWIDE"]}
          className="py-3"
          fast
        />
      </div>

      <div className="container-edge grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            {site.description}
          </p>
          <div className="mt-6 flex gap-3">
            <SocialLink href={site.socials.instagram} label="Instagram">
              <InstagramIcon />
            </SocialLink>
            <SocialLink href={site.socials.tiktok} label="TikTok">
              <TikTokIcon />
            </SocialLink>
            <SocialLink href={site.socials.youtube} label="YouTube">
              <YouTubeIcon />
            </SocialLink>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-widest text-muted-foreground">
            Shop
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <FooterLink href="/shop">All Products</FooterLink>
            <FooterLink href="/shop?category=complete">Completes</FooterLink>
            <FooterLink href="/shop?category=deck">Decks</FooterLink>
            <FooterLink href="/shop?category=trucks">Trucks & Parts</FooterLink>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-widest text-muted-foreground">
            Info
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href={`mailto:${site.email}`}>{site.email}</FooterLink>
          </ul>
        </div>
      </div>

      <div className="container-edge flex flex-col items-center justify-between gap-2 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p className="font-mono uppercase tracking-widest">
          Built by hand, one board at a time.
        </p>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-muted-foreground transition-colors hover:text-primary"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-10 place-items-center border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
    >
      {children}
    </a>
  );
}
