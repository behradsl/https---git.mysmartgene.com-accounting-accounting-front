import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import type { ReactNode } from "react"

type TypographyProps = {
  asChild?: boolean
  variant?: "h1" | "h2" | "h3" | "h4" | "p" | "small"
  className?: string
  children: ReactNode
}

const typographyVariants = {
  h1: "text-4xl font-bold leading-tight",
  h2: "text-3xl font-semibold leading-snug",
  h3: "text-2xl font-semibold leading-relaxed",
  h4: "text-xl font-medium leading-normal",
  p: "text-base leading-relaxed",
  small: "text-sm leading-snug"
}

export const Typography = ({
  asChild,
  variant = "p",
  className,
  children
}: TypographyProps) => {
  const Comp = asChild ? Slot : variant
  return (
    <Comp className={cn(typographyVariants[variant], className)}>
      {children}
    </Comp>
  )
}
