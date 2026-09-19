import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex min-h-7 items-center gap-2 rounded-full border px-3 font-mono text-xs leading-none tracking-[0.02em]";

export function Tag({
  children,
  tone = "plain",
  className,
}: {
  children: ReactNode;
  tone?: "plain" | "ok" | "warn";
  className?: string;
}) {
  return (
    <span
      className={cn(
        base,
        tone === "plain" && "border-line bg-sunken text-ink",
        tone === "ok" && "border-transparent bg-ok-tint text-ok-ink",
        tone === "warn" && "border-transparent bg-warn-tint text-warn-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** A small coloured dot, always paired with the category name. */
export function CapDot({ color, className }: { color: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("size-3 shrink-0 rounded-full shadow-[inset_0_0_0_2px_rgb(255_255_255/0.3)]", className)}
      style={{ background: color }}
    />
  );
}
