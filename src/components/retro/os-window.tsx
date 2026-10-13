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
  closing?: boolean;
  onClosed: () => void;
  children: ReactNode;
}

function DeferredContent({ children }: { children: ReactNode }) {
  const ready = useDeferredValue(true, false);
  return ready ? children : null;
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
  closing = false,
  onClosed,
  children,
}: OsWindowProps) {
  const controls = useDragControls();
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
        drag={!compact && !closing}
        dragControls={controls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={constraintsRef}
        style={compact ? { x: 0, y: 0 } : { x: offset.x, y: offset.y }}
        onPointerDown={closing ? undefined : onFocus}
        onAnimationEnd={(e) => {
          if (closing && e.target === e.currentTarget) onClosed();
        }}
        className={cn(
          "pointer-events-auto flex max-h-full flex-col overflow-hidden rounded-2xl sm:max-h-[calc(100%-3rem)] border-2 bg-background shadow-retro-lg outline-none",
          className,
          compact && "size-full sm:max-h-full",
          closing
            ? cn("pointer-events-none", compact ? "animate-sheet-out" : "animate-window-out")
            : compact
              ? "animate-sheet-in"
              : "animate-window-in",
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
          <DeferredContent>{children}</DeferredContent>
        </div>
      </motion.div>
    </div>
  );
}
