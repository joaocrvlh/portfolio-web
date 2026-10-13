import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AppHeading({
  children,
  as: Tag = "h2",
  className,
}: {
  children: ReactNode;
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "border-b-[3px] border-border pb-2 text-2xl leading-tight font-bold",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
