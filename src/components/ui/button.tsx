// shadcn-style Button (primitive copy, MIT). Tweak freely.
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
  {
    variants: {
      variant: {
        primary: "bg-accent text-bg hover:bg-accent-2 shadow-glow",
        outline: "bg-transparent text-ink border border-line-2 hover:bg-ink/5",
        ghost: "bg-transparent text-ink hover:bg-ink/5",
        // Variantes para secciones oscuras (.section-dark)
        "primary-on-dark": "bg-accent text-ink-on-dark hover:bg-accent-2 shadow-glow",
        "outline-on-dark": "bg-transparent text-ink-on-dark border border-line-on-dark-2 hover:bg-ink-on-dark/10",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-12 px-6",
        lg: "h-[60px] px-8 text-[15px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
  },
);
Button.displayName = "Button";
