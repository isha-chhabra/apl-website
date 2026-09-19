import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Stands in for a photo until the real one arrives.
 * Swap it for <Image> and keep the same wrapper sizing.
 */
export function PhotoPlaceholder({
  label = "Photo coming soon",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("ph", className)} role="img" aria-label={label}>
      <div className="ph-hatch absolute inset-0" aria-hidden="true" />
      <div className="relative grid justify-items-center gap-2 p-4 text-center font-mono text-[12.5px] leading-snug">
        <Camera className="size-7 text-brand-ink" strokeWidth={1.5} aria-hidden="true" />
        <span>{label}</span>
      </div>
    </div>
  );
}
