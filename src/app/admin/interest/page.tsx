import type { Metadata } from "next";
import { AdminInterestPanel } from "@/components/site/admin-interest-panel";
import { isAdminRequest } from "@/lib/interest-admin";

export const metadata: Metadata = {
  title: "Interest stats",
  robots: { index: false, follow: false },
};

export default async function AdminInterestPage() {
  const isAdmin = await isAdminRequest();

  return (
    <section className="container-edge py-16 md:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
        Private
      </p>
      <h1 className="mt-2 font-display text-4xl uppercase tracking-tight sm:text-5xl">
        Buyer interest
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Only you can see this page. Shoppers never see these numbers.
      </p>
      <div className="mt-10 border border-border bg-card p-8 md:p-12">
        <AdminInterestPanel isAdmin={isAdmin} />
      </div>
    </section>
  );
}
