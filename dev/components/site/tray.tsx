import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The standard container. Level 2 depth: a translucent glass card.
 * Pass `glow` for a featured item lit in its own colour (level 3).
 */
export function Tray({
  children,
  className,
  coreClassName,
  glow,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  coreClassName?: string;
  glow?: { c1: string; c2: string };
  as?: "div" | "article" | "figure" | "li";
}) {
  const style = glow ? ({ "--c1": glow.c1, "--c2": glow.c2 } as CSSProperties) : undefined;
  return (
    <Tag className={cn(glow ? "glass-glow" : "glass overflow-hidden", className)} style={style}>
      <div className={coreClassName}>{children}</div>
    </Tag>
  );
}
