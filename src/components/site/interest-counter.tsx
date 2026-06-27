"use client";

import { useEffect, useState } from "react";

export function InterestCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/interest")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.count === "number") setCount(data.count);
      })
      .catch(() => {});
  }, []);

  return (
    <p className="font-display text-5xl text-primary">
      {count ?? "—"}
    </p>
  );
}
