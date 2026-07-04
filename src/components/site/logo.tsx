import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

const sizeClasses = {
  sm: "size-12 sm:size-14",
  md: "size-14 sm:size-[4.25rem] md:size-20",
  lg: "size-44 sm:size-52 md:size-60 lg:size-64 xl:size-72",
} as const;

export function Logo({
  className,
  size = "sm",
}: {
  className?: string;
  size?: keyof typeof sizeClasses;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn("group inline-flex shrink-0 items-center", className)}
    >
      <Image
        src={site.logo}
        alt={site.name}
        width={1024}
        height={1024}
        className={cn(
          "rounded-md bg-white object-contain p-0.5 shadow-sm transition-transform group-hover:-translate-y-0.5",
          sizeClasses[size],
        )}
        priority
      />
    </Link>
  );
}
