"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RetroWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  actions?: ReactNode;
  delay?: number;
  reveal?: boolean;
}

export function RetroWindow({
  title,
  children,
  className,
  bodyClassName,
  actions,
  delay = 0,
  reveal = true,
}: RetroWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 28 }}
      whileInView={reveal ? { opacity: 1, scale: 1, y: 0 } : undefined}
      animate={reveal ? undefined : { opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay }}
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border-2 bg-background text-foreground shadow-retro-lg",
        className,
      )}
    >
      <div className="flex h-9 shrink-0 items-center gap-3 border-b-2 bg-accent px-3 text-accent-foreground">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-3.5 rounded-full border-2 bg-background" />
          <span className="size-3.5 rounded-full border-2 bg-background" />
        </div>
        <span className="min-w-0 flex-1 truncate text-center font-mono text-xs font-bold tracking-wide uppercase">
          {title}
        </span>
        <div className="flex min-w-[2.6rem] justify-end">{actions}</div>
      </div>
      <div className={cn("flex-1 p-5 md:p-8", bodyClassName)}>{children}</div>
    </motion.div>
  );
}
