"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

export function Clock({ className }: { className?: string }) {
  const locale = useLocale();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  const text = now
    ? now.toLocaleTimeString(locale === "pt" ? "pt-BR" : "en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--:--";

  return (
    <span
      suppressHydrationWarning
      className={cn(
        "rounded-full border-2 bg-background px-3 py-0.5 font-mono text-xs font-bold tabular-nums",
        className,
      )}
    >
      {text}
    </span>
  );
}
