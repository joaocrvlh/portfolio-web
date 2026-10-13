"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const tones = {
  cream: "bg-background",
  accent: "bg-secondary text-secondary-foreground",
  green: "bg-foreground text-background",
  red: "bg-muted text-foreground",
  pink: "bg-accent text-accent-foreground",
} as const;

export type IconTone = keyof typeof tones;

interface DesktopIconProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  active?: boolean;
  tone?: IconTone;
  className?: string;
  delay?: number;
}

export function DesktopIcon({
  label,
  icon: Icon,
  onClick,
  active,
  tone = "cream",
  className,
  delay = 0,
}: DesktopIconProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 20, delay }}
      whileHover={{ y: -4 }}
      whileTap={{ y: 1 }}
      className={cn(
        "group flex w-16 flex-col items-center gap-2 text-center outline-offset-4 sm:w-20",
        className,
      )}
    >
      <span
        className={cn(
          "relative flex size-12 items-center justify-center rounded-2xl border-2 shadow-retro-sm transition-colors group-hover:bg-foreground group-hover:text-background sm:size-14",
          tones[tone],
        )}
      >
        <Icon className="size-6 sm:size-7" strokeWidth={2} aria-hidden />
        {active && (
          <span className="absolute -bottom-[9px] left-1/2 h-1.5 w-5 -translate-x-1/2 rounded-full border-2 bg-primary" />
        )}
      </span>
      <span className="rounded-full bg-background px-2.5 py-0.5 text-[10px] leading-tight font-bold text-foreground ring-2 ring-border transition-colors group-hover:bg-foreground group-hover:text-background sm:text-[11px]">
        {label}
      </span>
    </motion.button>
  );
}
