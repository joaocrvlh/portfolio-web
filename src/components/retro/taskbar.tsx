"use client";

import Image from "next/image";
import {
  Github,
  LayoutGrid,
  Linkedin,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { LangSwitcher } from "@/components/lang-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Clock } from "@/components/retro/clock";
import { socials } from "@/lib/links";
import { cn } from "@/lib/utils";

export interface TaskbarItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface TaskbarProps {
  items: TaskbarItem[];
  focusedId: string | null;
  onSelect: (id: string) => void;
  compact: boolean;
  onHome: () => void;
  homeLabel: string;
}

const dock = [
  {
    label: "LinkedIn",
    href: socials.linkedin,
    icon: Linkedin,
    className: "bg-background text-foreground",
    external: true,
  },
  {
    label: "GitHub",
    href: socials.github,
    icon: Github,
    className: "bg-foreground text-background",
    external: true,
  },
  {
    label: "Email",
    href: socials.email,
    icon: Mail,
    className: "bg-secondary text-secondary-foreground",
    external: false,
  },
];

export function Taskbar({
  items,
  focusedId,
  onSelect,
  compact,
  onHome,
  homeLabel,
}: TaskbarProps) {
  return (
    <div
      style={{ animationDelay: "0.2s" }}
      className={cn(
        "animate-slide-up absolute inset-x-0 bottom-0 z-[900] flex h-(--taskbar) items-center justify-between gap-3 border-t-2 bg-background px-3 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_0_0_var(--retro-shadow)]",
        !compact && "sm:grid sm:grid-cols-[1fr_auto_1fr] sm:px-6",
      )}
    >
      {compact && (
        <button
          type="button"
          aria-label={homeLabel}
          title={homeLabel}
          onClick={onHome}
          disabled={items.length === 0}
          className="flex size-11 shrink-0 items-center justify-center rounded-2xl border-2 bg-background shadow-retro-sm transition-[translate,box-shadow,opacity] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-40"
        >
          <LayoutGrid className="size-5" />
        </button>
      )}
      <div
        className={cn(
          "hidden min-w-0 items-center gap-2 overflow-hidden",
          !compact && "sm:flex",
        )}
      >
        <span className="mr-1 hidden shrink-0 items-center gap-2 2xl:flex">
          <Image
            src="/images/avatar.png"
            alt=""
            width={28}
            height={28}
            className="size-7 rounded-full border-2 object-cover"
          />
          <span className="font-mono text-xs font-bold">joaocrvlh.dev</span>
        </span>
        {items.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            aria-pressed={focusedId === id}
            className={cn(
              "flex h-9 shrink-0 items-center gap-2 rounded-full border-2 px-3 text-xs font-bold transition-colors",
              focusedId === id
                ? "bg-foreground text-background"
                : "bg-background hover:bg-accent",
            )}
          >
            <Icon className="size-4" aria-hidden />
            <span className="hidden 2xl:inline">{label}</span>
          </button>
        ))}
      </div>

      <div className={cn("flex items-center gap-3", !compact && "sm:gap-4")}>
        {dock.map(({ label, href, icon: Icon, className, external }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            className={cn(
              "flex size-11 items-center justify-center rounded-2xl border-2 shadow-retro-sm transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 hover:scale-110 active:scale-95 sm:size-14",
              className,
            )}
          >
            <Icon className="size-5 sm:size-7" />
          </a>
        ))}
      </div>

      <div className="flex items-center justify-end gap-1.5">
        <Clock className="hidden md:inline-block" />
        <LangSwitcher />
        <ThemeToggle />
      </div>
    </div>
  );
}
