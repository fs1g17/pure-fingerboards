"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // No backend wired yet — simulate a send so the UX is complete.
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Message sent", {
        description: "Thanks for reaching out — we'll hit you back soon.",
      });
    }, 700);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="font-mono text-xs uppercase tracking-widest">
            Name
          </Label>
          <Input id="name" name="name" required placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="font-mono text-xs uppercase tracking-widest">
            Email
          </Label>
          <Input id="email" name="email" type="email" required placeholder="you@email.com" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject" className="font-mono text-xs uppercase tracking-widest">
          Subject
        </Label>
        <Input id="subject" name="subject" placeholder="Custom order, wholesale, restock…" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="font-mono text-xs uppercase tracking-widest">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell us what you're after."
        />
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="w-full font-display text-base uppercase tracking-widest sm:w-auto"
      >
        <Send className="size-4" />
        {submitting ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
