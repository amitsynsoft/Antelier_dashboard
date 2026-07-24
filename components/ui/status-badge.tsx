import * as React from "react"
import { cn } from "@/lib/utils"

export type StatusVariant = 
  | "success"
  | "warning"
  | "destructive"
  | "info"
  | "neutral"
  | "purple"
  | "cyan"

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: StatusVariant
  pulse?: boolean
  showDot?: boolean
  children: React.ReactNode
}

const variantStyles: Record<StatusVariant, { badge: string; dot: string }> = {
  success: {
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-500"
  },
  warning: {
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    dot: "bg-amber-500"
  },
  destructive: {
    badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    dot: "bg-rose-500"
  },
  info: {
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    dot: "bg-blue-500"
  },
  neutral: {
    badge: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
    dot: "bg-zinc-500"
  },
  purple: {
    badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    dot: "bg-purple-500"
  },
  cyan: {
    badge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
    dot: "bg-cyan-500"
  }
}

export function StatusBadge({
  variant = "neutral",
  pulse = false,
  showDot = true,
  className,
  children,
  ...props
}: StatusBadgeProps) {
  const styles = variantStyles[variant] || variantStyles.neutral

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border transition-colors",
        styles.badge,
        className
      )}
      {...props}
    >
      {showDot && (
        <span className="relative flex h-2 w-2">
          {pulse && (
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                styles.dot
              )}
            />
          )}
          <span className={cn("relative inline-flex rounded-full h-2 w-2", styles.dot)} />
        </span>
      )}
      {children}
    </span>
  )
}
