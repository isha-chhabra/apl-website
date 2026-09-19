import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowUpRight } from "lucide-react"
import { cn } from "cn"

/**
 * APL buttons. Pill shaped, 52px tall on phones so they are easy to hit.
 * Use `buttonVariants` on links (`<Link className={buttonVariants()}>`)
 * so navigation stays a real anchor.
 */
const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 touch-manipulation items-center justify-center gap-2.5 rounded-full border-[1.5px] font-semibold whitespace-nowrap select-none outline-none transition-[background-color,color,border-color,transform] duration-200 ease-soft focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default:
          "border-transparent text-(--btn-fg) [background:var(--btn-bg)] hover:[background:var(--btn-hover)] shadow-[0_10px_28px_-12px_rgb(240_120_90/0.7),inset_0_1px_0_rgb(255_255_255/0.35)]",
        line: "border-line-2 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-background",
        whatsapp: "border-transparent bg-[#128c4a] text-[#f4fff8] hover:bg-[#0f7a40]",
        ghost: "border-transparent text-ink hover:bg-lift",
        link: "min-h-11 border-transparent px-0 text-brand-ink hover:underline underline-offset-4",
      },
      size: {
        default: "min-h-[52px] px-6 text-base",
        sm: "min-h-11 px-[18px] text-[15px]",
        icon: "size-12 p-0",
        "icon-sm": "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

/** The circle with an arrow inside a main button. Nudges up and right on hover. */
function ButtonIsland({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "-mr-3.5 grid size-[34px] place-items-center rounded-full bg-[color-mix(in_srgb,var(--btn-fg)_18%,transparent)] transition-transform duration-300 ease-soft group-hover/button:translate-x-0.5 group-hover/button:-translate-y-px group-hover/button:scale-105",
        className
      )}
    >
      <ArrowUpRight className="size-[18px]" />
    </span>
  )
}

export { Button, ButtonIsland, buttonVariants }
