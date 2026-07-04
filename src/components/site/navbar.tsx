"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { Logo } from "./logo";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isBrandPage = ["/shop", "/about", "/contact"].some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div
        className={cn(
          "container-edge flex items-center justify-between gap-4",
          isBrandPage ? "h-20 md:h-24" : "h-16 md:h-[4.5rem]",
        )}
      >
        {!isBrandPage ? <Logo size="sm" /> : <span className="hidden sm:block sm:w-24" />}

        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "font-display uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground",
                isBrandPage ? "text-base" : "text-sm",
                isActive(item.href) && "text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/shop"
            className={cn(
              buttonVariants({ size: isBrandPage ? "lg" : "default" }),
              "hidden font-display uppercase tracking-wider sm:inline-flex",
            )}
          >
            <ShoppingBag className="size-4" />
            Shop Drops
          </Link>

          {isBrandPage ? <Logo size="md" /> : null}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "md:hidden",
              )}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="font-display text-2xl uppercase tracking-wider">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1 px-4">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-3 font-display text-lg uppercase tracking-wide"
                >
                  Home
                </Link>
                {site.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-border py-3 font-display text-lg uppercase tracking-wide"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/shop"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants(),
                    "mt-6 font-display uppercase tracking-wider",
                  )}
                >
                  <ShoppingBag className="size-4" />
                  Shop Drops
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
