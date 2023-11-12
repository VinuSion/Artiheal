import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        special:
          "bg-gradient-to-r from-indigo-400 to-primary hover:from-indigo-500 hover:to-primary text-white font-bold shadow-lg transition-transform duration-300 ease-in-out",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-solid border-2 rounded-lg text-primary-foreground transition-all duration-300 hover:scale-110",
        secondary:
          "bg-secondary text-secondary-foreground hover:opacity-80",
        tertiary:
          "bg-background text-primary hover:bg-secondary/80",
        icon: "border-solid border-2 rounded-lg text-primary-foreground bg-transparent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-7 w-7 rounded-md",
        sm: "h-9 rounded-full px-3",
        lg: "h-11 rounded-md px-8",
        sp: "h-12 w-full max-w",
        icon: "h-10 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
