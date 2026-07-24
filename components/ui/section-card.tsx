import * as React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  badge?: React.ReactNode
  icon?: LucideIcon
  action?: React.ReactNode
  footer?: React.ReactNode
  noPadding?: boolean
}

export function SectionCard({
  title,
  subtitle,
  badge,
  icon: Icon,
  action,
  footer,
  noPadding = false,
  className,
  children,
  ...props
}: SectionCardProps) {
  const hasHeader = title || subtitle || action || badge || Icon

  return (
    <div
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-xs transition-all duration-200 hover:border-border/90 flex flex-col justify-between overflow-hidden",
        className
      )}
      {...props}
    >
      <div>
        {hasHeader && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-border/50 bg-muted/20">
            <div className="flex items-center gap-2.5">
              {Icon && (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  {title && <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">{title}</h3>}
                  {badge}
                </div>
                {subtitle && <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
              </div>
            </div>
            {action && <div className="flex items-center gap-2 shrink-0">{action}</div>}
          </div>
        )}
        <div className={cn(noPadding ? "p-0" : "p-5")}>{children}</div>
      </div>

      {footer && (
        <div className="px-5 py-3 border-t border-border/50 bg-muted/20 text-xs sm:text-sm text-muted-foreground">
          {footer}
        </div>
      )}
    </div>
  )
}
