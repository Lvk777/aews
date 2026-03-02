import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-500 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border active:scale-95 shadow-lg shadow-black/5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-primary/20 hover:border-primary/50 hover:shadow-[0_0_20px_var(--primary-glow)] hover:scale-[1.02] dark:hover:shadow-[0_0_25px_var(--primary-glow)]",
        destructive:
          "bg-destructive text-white border-destructive/20 hover:bg-destructive/90 hover:border-destructive/50 hover:shadow-red/40 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]",
        outline:
          "border-border bg-surface-1 hover:bg-surface-2 hover:text-accent-foreground hover:border-border/80 dark:bg-input/30 dark:border-input dark:hover:bg-input/50 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-0.5",
        secondary:
          "bg-secondary text-secondary-foreground border-secondary/20 hover:bg-secondary/80 hover:border-secondary/50 hover:shadow-lg hover:shadow-primary-glow/10",
        ghost:
          "border-transparent hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hover:shadow-sm",
        link: "text-primary underline-offset-4 hover:underline border-transparent shadow-none",
        settings: "bg-surface-1 border-border hover:border-primary-main/40 text-text-dim hover:text-primary-main shadow-xl hover:shadow-[0_0_25px_var(--primary-glow)]",
        glow: "bg-primary text-primary-foreground border-primary/40 shadow-[0_0_20px_var(--primary-glow)] hover:shadow-[0_0_40px_var(--primary-glow)] hover:scale-[1.05] hover:border-primary/60 dark:shadow-[0_0_30px_var(--primary-glow)] dark:hover:shadow-[0_0_50px_var(--primary-glow)]",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-xl gap-1.5 px-4 text-[10px]",
        lg: "h-13 rounded-[1.5rem] px-8 text-base",
        icon: "size-11",
        "icon-sm": "size-9",
        "icon-lg": "size-13",
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
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn("group relative overflow-hidden", buttonVariants({ variant, size, className }))}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2">{props.children}</span>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[inherit] shadow-[inset_0_0_25px_rgba(255,255,255,0.2)]" />
    </Comp>
  )
}

export { Button, buttonVariants }
