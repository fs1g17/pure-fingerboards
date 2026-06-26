import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Brand mark. Uses a styled wordmark by default. When you drop a logo at
 * /public/brand/logo.svg, swap the wordmark for:
 *   <Image src={site.logo} alt={site.name} width={140} height={32} priority />
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn("group inline-flex items-center gap-2", className)}
    >
      <span className="grid h-8 w-8 place-items-center bg-primary text-primary-foreground font-display text-xl leading-none shadow-[3px_3px_0_0_rgba(0,0,0,0.6)] transition-transform group-hover:-translate-y-0.5">
        P
      </span>
      <span className="font-display text-xl uppercase tracking-wider">
        Pure<span className="text-primary">.</span>
      </span>
    </Link>
  );
}
