import type { Metadata } from "next";
import { Mail, Clock } from "lucide-react";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/site/contact-form";
import { InstagramIcon } from "@/components/site/brand-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Pure Fingerboards — custom orders, wholesale, restock requests or just to say what's up.",
};

const faqs = [
  {
    q: "Do you take custom orders?",
    a: "Yes. We do limited custom graphics and shapes depending on workload. Drop us a message with what you're after and we'll let you know what's possible.",
  },
  {
    q: "How limited are the drops?",
    a: "Most boards are made in small numbered runs, and the 1-of-1 pieces are exactly that — once they sell out, they're gone for good.",
  },
  {
    q: "When do you restock?",
    a: "New batches and restocks land regularly. Follow us on Instagram or send a restock request and we'll keep you posted.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship worldwide. Everything is packed by hand and sent with tracking.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-edge py-14 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            Get in touch
          </p>
          <h1 className="mt-3 font-display text-5xl uppercase leading-[0.9] tracking-tight sm:text-7xl">
            Holler at <span className="text-primary">Us</span>
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Custom orders, wholesale, restock requests, or just to talk boards —
            we read everything.
          </p>
        </div>
      </section>

      <section className="container-edge grid gap-12 py-14 md:grid-cols-[1.4fr_1fr] md:py-20">
        <div className="border border-border bg-card p-6 sm:p-8">
          <h2 className="font-display text-2xl uppercase tracking-wide">
            Send a message
          </h2>
          <p className="mt-1 mb-6 text-sm text-muted-foreground">
            Fill this out and we&apos;ll get back to you.
          </p>
          <ContactForm />
        </div>

        <div className="space-y-4">
          <InfoRow icon={Mail} title="Email" value={site.email} href={`mailto:${site.email}`} />
          <InfoRow
            icon={InstagramIcon}
            title="Instagram"
            value="@purefingerboards"
            href={site.socials.instagram}
          />
          <InfoRow icon={Clock} title="Response time" value="Usually within 1–2 days" />

          <div className="border border-border bg-primary p-6 text-primary-foreground">
            <p className="font-display text-xl uppercase tracking-wide">
              Custom builds
            </p>
            <p className="mt-2 text-sm text-primary-foreground/80">
              Want a one-off graphic or a specific shape? Tell us your idea in
              the form and we&apos;ll see what we can make happen.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card/40">
        <div className="container-edge py-16 md:py-20">
          <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl">
            FAQ
          </h2>
          <Accordion multiple={false} className="mt-8 max-w-3xl">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left font-display text-lg uppercase tracking-wide">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}

function InfoRow({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-4 border border-border bg-card p-5 transition-colors hover:border-primary">
      <div className="grid size-11 place-items-center bg-primary text-primary-foreground">
        <Icon className="size-5" />
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
        <p className="font-display text-lg uppercase tracking-wide">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
}
