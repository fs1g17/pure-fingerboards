"use client";

import { useState } from "react";
import { Lock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InterestCounter } from "@/components/site/interest-counter";

export function AdminInterestPanel({ isAdmin }: { isAdmin: boolean }) {
  const [authed, setAuthed] = useState(isAdmin);
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/admin/interest/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });

      if (!res.ok) {
        setError("Wrong password. Copy-paste it carefully and try again.");
        return;
      }

      setAuthed(true);
      setKey("");
    } catch {
      setError("Could not sign in. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/interest/login", { method: "DELETE" });
    setAuthed(false);
  }

  if (!authed) {
    return (
      <form onSubmit={handleLogin} className="mx-auto max-w-sm space-y-5">
        <div className="space-y-2">
          <Label htmlFor="admin-key" className="font-mono text-xs uppercase tracking-widest">
            Admin key
          </Label>
          <Input
            id="admin-key"
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            required
            placeholder="Enter your private key"
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="w-full font-display uppercase tracking-widest"
        >
          <Lock className="size-4" />
          {submitting ? "Checking…" : "View stats"}
        </Button>
      </form>
    );
  }

  return (
    <div className="mx-auto max-w-md text-center">
      <InterestCounter />
      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Unique riders who tried to buy
      </p>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleLogout}
        className="mt-8 font-mono text-xs uppercase tracking-widest"
      >
        <LogOut className="size-4" />
        Sign out
      </Button>
    </div>
  );
}
