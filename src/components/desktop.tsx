"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Folder,
  Gamepad2,
  Layers,
  Mail,
  SquareTerminal,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { DesktopIcon, type IconTone } from "@/components/retro/desktop-icon";
import { OsWindow } from "@/components/retro/os-window";
import { BootWindow } from "@/components/retro/boot-window";
import { Taskbar } from "@/components/retro/taskbar";
import { ProfileApp } from "@/components/apps/profile";
import { WorksApp } from "@/components/apps/works";
import { ExperienceApp } from "@/components/apps/experience";
import { StackApp } from "@/components/apps/stack";
import { ContactApp } from "@/components/apps/contact";
import { TerminalApp } from "@/components/apps/terminal";
import { GameApp } from "@/components/apps/game";
import type { AppId, AppProps } from "@/lib/apps";
import { COMPACT_QUERY, useCompact } from "@/lib/use-compact";

const BOOT_KEY = "portfolio-booted";

const apps: Record<
  AppId,
  {
    icon: LucideIcon;
    tone: IconTone;
    label: string;
    path: string;
    bar: string;
    width: string;
    body?: string;
    Content: (props: AppProps) => React.ReactNode;
  }
> = {
  profile: {
    icon: UserRound,
    tone: "green",
    label: "about",
    path: "profile",
    bar: "bg-foreground text-background",
    width: "w-[min(44rem,100%)]",
    Content: ProfileApp,
  },
  works: {
    icon: Folder,
    tone: "accent",
    label: "projects",
    path: "works",
    bar: "bg-foreground text-background",
    width: "w-[min(62rem,100%)]",
    Content: WorksApp,
  },
  experience: {
    icon: Briefcase,
    tone: "red",
    label: "experience",
    path: "experience",
    bar: "bg-foreground text-background",
    width: "w-[min(40rem,100%)]",
    Content: ExperienceApp,
  },
  stack: {
    icon: Layers,
    tone: "pink",
    label: "stack",
    path: "stack",
    bar: "bg-foreground text-background",
    width: "w-[min(52rem,100%)]",
    Content: StackApp,
  },
  contact: {
    icon: Mail,
    tone: "cream",
    label: "contact",
    path: "contact",
    bar: "bg-foreground text-background",
    width: "w-[min(30rem,100%)]",
    Content: ContactApp,
  },
  terminal: {
    icon: SquareTerminal,
    tone: "green",
    label: "terminal",
    path: "terminal",
    bar: "bg-foreground text-background",
    width: "w-[min(46rem,100%)]",
    body: "p-0 sm:p-0",
    Content: TerminalApp,
  },
  game: {
    icon: Gamepad2,
    tone: "pink",
    label: "game",
    path: "arcade",
    bar: "bg-foreground text-background",
    width: "w-[min(28rem,100%)]",
    Content: GameApp,
  },
};

const leftIcons: AppId[] = ["profile", "works", "experience", "terminal"];
const rightIcons: AppId[] = ["stack", "contact", "game"];

interface OpenWindow {
  id: AppId;
  arg?: string;
  z: number;
  offset: { x: number; y: number };
}

export function Desktop() {
  const t = useTranslations("Desktop");
  const tNav = useTranslations("Navbar");
  const [phase, setPhase] = useState<"init" | "boot" | "ready">("init");
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const topZ = useRef(10);
  const areaRef = useRef<HTMLDivElement>(null);
  const compact = useCompact();

  const openApp = useCallback((id: AppId, arg?: string) => {
    const z = ++topZ.current;
    const wide = !window.matchMedia(COMPACT_QUERY).matches;
    setWindows((ws) =>
      ws.some((w) => w.id === id)
        ? ws.map((w) =>
            w.id === id ? { ...w, z, ...(arg !== undefined && { arg }) } : w,
          )
        : [
            ...ws,
            {
              id,
              arg,
              z,
              offset: wide
                ? { x: (ws.length % 4) * 28 - 42, y: (ws.length % 4) * 22 - 33 }
                : { x: 0, y: 0 },
            },
          ],
    );
  }, []);

  const closeApp = useCallback((id: AppId) => {
    setWindows((ws) => ws.filter((w) => w.id !== id));
  }, []);

  const finishBoot = useCallback(() => {
    try {
      sessionStorage.setItem(BOOT_KEY, "1");
    } catch {}
    setPhase("ready");
    openApp("profile");
  }, [openApp]);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(BOOT_KEY) === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setTimeout(() => {
      if (seen || reduce) {
        setPhase("ready");
        openApp("profile");
      } else {
        setPhase("boot");
      }
    }, 0);
    return () => clearTimeout(id);
  }, [openApp]);

  const focused = windows.length
    ? windows.reduce((a, b) => (b.z > a.z ? b : a))
    : null;

  useEffect(() => {
    if (!focused) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeApp(focused.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focused, closeApp]);

  const ready = phase === "ready";
  const openIds = new Set(windows.map((w) => w.id));

  const renderIcons = (ids: AppId[], baseDelay: number) =>
    ids.map((id, i) => {
      const app = apps[id];
      return (
        <DesktopIcon
          key={id}
          label={tNav(app.label)}
          icon={app.icon}
          tone={app.tone}
          active={openIds.has(id)}
          delay={baseDelay + i * 0.1}
          onClick={() => openApp(id)}
        />
      );
    });

  return (
    <main className="fixed inset-0 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-(--taskbar) flex flex-col items-center justify-center px-24 sm:px-32">
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ delay: 0.7 }}
          className="mt-3 font-mono text-xs font-bold tracking-[0.3em] text-wordmark uppercase sm:text-sm"
        >
          joaocrvlh.dev
        </motion.p>
      </div>

      {ready && (
        <>
          <div className="absolute top-5 bottom-[calc(var(--taskbar)+1rem)] left-3 z-[5] flex flex-col flex-wrap content-start gap-x-3 gap-y-5 sm:top-10 sm:left-8 sm:gap-y-8">
            {renderIcons(leftIcons, 0.2)}
          </div>
          <div className="absolute top-5 right-3 bottom-[calc(var(--taskbar)+1rem)] z-[5] flex flex-col flex-wrap-reverse content-start items-end gap-x-3 gap-y-5 sm:top-10 sm:right-8 sm:gap-y-8">
            {renderIcons(rightIcons, 0.35)}
          </div>
        </>
      )}

      <div
        ref={areaRef}
        className="pointer-events-none absolute inset-x-0 top-0 bottom-(--taskbar)"
      >
        <AnimatePresence>
          {phase === "boot" && (
            <motion.div
              key="boot"
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto absolute inset-0 flex items-center justify-center p-3"
            >
              <BootWindow onDone={finishBoot} />
            </motion.div>
          )}
          {windows.map((w) => {
            const app = apps[w.id];
            return (
              <OsWindow
                key={w.id}
                title={`C:\\JOAO\\${app.path}`}
                closeLabel={t("close")}
                zIndex={w.z}
                offset={w.offset}
                constraintsRef={areaRef}
                className={app.width}
                barClassName={app.bar}
                bodyClassName={app.body}
                compact={compact}
                onFocus={() => openApp(w.id)}
                onClose={() => closeApp(w.id)}
              >
                <app.Content onOpen={openApp} arg={w.arg} />
              </OsWindow>
            );
          })}
        </AnimatePresence>
      </div>

      {ready && (
        <Taskbar
          items={windows.map((w) => ({
            id: w.id,
            label: tNav(apps[w.id].label),
            icon: apps[w.id].icon,
          }))}
          focusedId={focused?.id ?? null}
          onSelect={(id) => openApp(id as AppId)}
          compact={compact}
          onHome={() => setWindows([])}
          homeLabel={t("home")}
        />
      )}
    </main>
  );
}
