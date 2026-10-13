"use client";

import {
  useDeferredValue,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface OsWindowProps {
  title: string;
  closeLabel: string;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  offset: { x: number; y: number };
  constraintsRef: RefObject<HTMLElement | null>;
  className?: string;
  barClassName?: string;
  bodyClassName?: string;
  compact?: boolean;
  children: ReactNode;
}

export function OsWindow({
  title,
  closeLabel,
  onClose,
  onFocus,
  zIndex,
  offset,
  constraintsRef,
  className,
  barClassName = "bg-secondary text-secondary-foreground",
  bodyClassName,
  compact = false,
  children,
}: OsWindowProps) {
  const controls = useDragControls();
  const contentReady = useDeferredValue(true, false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && !el.contains(document.activeElement)) {
      el.focus({ preventScroll: true });
    }
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center p-2"
      style={{ zIndex }}
    >
      <motion.div
        ref={ref}
        role="dialog"
        aria-label={title}
        tabIndex={-1}
        drag={!compact}
        dragControls={controls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={constraintsRef}
        initial={
          compact
            ? { opacity: 0, transform: "translateY(40px)" }
            : { opacity: 0, scale: 0.9, x: offset.x, y: offset.y + 18 }
        }
        animate={
          compact
            ? { opacity: 1, transform: "translateY(0px)" }
            : { opacity: 1, scale: 1, y: offset.y }
        }
        exit={
          compact
            ? {
                opacity: 0,
                transform: "translateY(40px)",
                transition: { duration: 0.18, ease: "easeIn" },
              }
            : { opacity: 0, scale: 0.92, transition: { duration: 0.15 } }
        }
        transition={
          compact
            ? { type: "tween", duration: 0.26, ease: [0.22, 1, 0.36, 1] }
            : { type: "spring", stiffness: 320, damping: 26 }
        }
        onPointerDown={onFocus}
        className={cn(
          "pointer-events-auto flex max-h-full flex-col overflow-hidden rounded-2xl sm:max-h-[calc(100%-3rem)] border-2 bg-background shadow-retro-lg outline-none",
          className,
          compact && "size-full sm:max-h-full",
        )}
      >
        <div
          onPointerDown={(e) => {
            if (!compact) controls.start(e);
          }}
          className={cn(
            "flex shrink-0 items-center justify-between gap-3 border-b-2 pr-1.5 pl-4 select-none",
            compact
              ? "h-12"
              : "h-10 cursor-grab touch-none active:cursor-grabbing",
            barClassName,
          )}
        >
          <span className="truncate font-mono text-sm font-bold">{title}</span>
          <button
            type="button"
            aria-label={closeLabel}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onClose}
            className={cn(
              "flex shrink-0 items-center justify-center rounded-full border-2 bg-background text-foreground transition-transform hover:bg-foreground hover:text-background active:scale-90",
              compact ? "size-10" : "size-7",
            )}
          >
            <X className="size-4" strokeWidth={3} aria-hidden />
          </button>
        </div>
        <div
          className={cn(
            "min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-7",
            bodyClassName,
          )}
        >
          {contentReady ? children : null}
        </div>
      </motion.div>
    </div>
  );
}
