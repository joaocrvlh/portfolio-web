import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RetroWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  actions?: ReactNode;
}

export function RetroWindow({
  title,
  children,
  className,
  bodyClassName,
  actions,
}: RetroWindowProps) {
  return (
    <div
      className={cn(
        "animate-window-in flex flex-col overflow-hidden rounded-2xl border-2 bg-background text-foreground shadow-retro-lg",
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
    </div>
  );
}
