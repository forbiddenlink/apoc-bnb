import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98] relative overflow-hidden",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-black hover:bg-primary/90 shadow-[0_0_10px_rgba(57,255,20,0.3)] hover:shadow-[0_0_20px_rgba(57,255,20,0.5)] border border-transparent uppercase tracking-wider font-bold",
                destructive:
                    "bg-accent/10 text-accent border border-accent/50 hover:bg-accent/20 hover:border-accent hover:shadow-[0_0_15px_rgba(255,0,60,0.3)] uppercase tracking-wider font-bold",
                outline:
                    "border border-white/10 bg-black/40 text-foreground hover:bg-white/5 hover:border-primary/50 hover:text-primary backdrop-blur-sm",
                secondary:
                    "bg-secondary text-black hover:bg-secondary/90 shadow-[0_0_10px_rgba(212,175,55,0.3)] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] uppercase tracking-wider font-bold",
                ghost: "hover:bg-white/5 hover:text-primary",
                link: "text-primary underline-offset-4 hover:underline",
                // Tactical / HUD variants
                tactical: "bg-transparent text-primary border border-primary/30 hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_10px_rgba(57,255,20,0.2)] uppercase tracking-[0.15em] font-bold relative group",
                "tactical-gold": "bg-transparent text-secondary border border-secondary/30 hover:bg-secondary/10 hover:border-secondary hover:shadow-[0_0_10px_rgba(212,175,55,0.2)] uppercase tracking-[0.15em] font-bold",
            },
            size: {
                default: "h-10 px-6 py-2",
                sm: "h-8 rounded-sm px-3 text-xs",
                lg: "h-12 rounded-sm px-8 text-base",
                xl: "h-14 rounded-sm px-10 text-lg",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
