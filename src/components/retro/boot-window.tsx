"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { RetroWindow } from "@/components/retro/window";
import { RetroComputer } from "@/components/retro/illustrations";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SEGMENTS = 16;

export function BootWindow({ onDone }: { onDone: () => void }) {
  const t = useTranslations("Hero");
  const tDesktop = useTranslations("Desktop");
  const [filled, setFilled] = useState(0);
  const done = filled >= SEGMENTS;

  useEffect(() => {
    const id = setInterval(() => {
      setFilled((f) => {
        if (f >= SEGMENTS) {
          clearInterval(id);
          return f;
        }
        return f + 1;
      });
    }, 170);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!done) return;
    const id = setTimeout(onDone, 700);
    return () => clearTimeout(id);
  }, [done, onDone]);

  return (
    <RetroWindow
      title={t("installer.title")}
      className="w-full max-w-2xl"
      bodyClassName="grid gap-5 p-5 sm:grid-cols-[12rem_1fr] sm:gap-6 sm:p-6"
    >
      <div className="flex items-center justify-center rounded-2xl border-2 bg-secondary p-4">
        <RetroComputer className="w-full max-w-[9rem] sm:max-w-none" />
      </div>

      <div className="flex min-w-0 flex-col justify-between gap-5">
        <div className="space-y-2">
          <p className="font-mono text-xs font-bold tracking-wide text-accent-text uppercase">
            João Carvalho · v1.0
          </p>
          <p className="text-2xl leading-tight font-black tracking-tight sm:text-3xl">
            joaocrvlh.dev
          </p>
          <p className="text-sm font-medium text-muted-foreground">
            {t("installer.tagline")}
          </p>
        </div>

        <div className="space-y-3">
          <p
            className={cn(
              "font-mono text-xs",
              done ? "font-bold" : "text-muted-foreground",
            )}
            aria-live="polite"
          >
            {done ? `✓ ${t("installer.done")}` : t("installer.eta")}
          </p>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round((filled / SEGMENTS) * 100)}
            className="flex gap-1 rounded-lg border-2 bg-background p-1"
          >
            {Array.from({ length: SEGMENTS }, (_, i) => (
              <span
                key={i}
                className={cn(
                  "h-4 flex-1 rounded-sm",
                  i < filled ? "bg-foreground" : "bg-muted",
                )}
              />
            ))}
          </div>
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={onDone}>
              {tDesktop("skip")}
            </Button>
          </div>
        </div>
      </div>
    </RetroWindow>
  );
}
