import * as React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon, Inbox } from "lucide-react"

interface EmptyStateProps {
  title: string
  description: string
  icon?: LucideIcon
  action?: React.ReactNode
  className?: string
}

export function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  action,
  className
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-xl border border-dashed border-border/80 bg-muted/10",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground mb-4 shadow-inner ring-1 ring-border/50">
        <Icon className="h-7 w-7 text-primary/80" />
      </div>
      <h3 className="text-base font-semibold text-foreground tracking-tight mb-1">{title}</h3>
      <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  )
}
