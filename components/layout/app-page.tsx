"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AppPageProps {
  children: React.ReactNode
  className?: string
}

export function AppPage({ children, className }: AppPageProps) {
  return (
    <div className={cn("w-full max-w-7xl mx-auto space-y-6 pb-8 animate-in fade-in-50 duration-200", className)}>
      {children}
    </div>
  )
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  badge?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

export function PageHeader({
  title,
  subtitle,
  icon,
  badge,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5 pt-1",
        className
      )}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          {icon && (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary shadow-2xs">
              {icon}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              {title}
            </h1>
            {badge && <div>{badge}</div>}
          </div>
        </div>
        {subtitle && (
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-3xl">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2.5 shrink-0 sm:self-end">{actions}</div>
      )}
    </div>
  )
}

interface PageSectionProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  actions?: React.ReactNode
  className?: string
}

export function PageSection({
  children,
  title,
  subtitle,
  actions,
  className,
}: PageSectionProps) {
  return (
    <section className={cn("space-y-3.5", className)}>
      {(title || subtitle || actions) && (
        <div className="flex items-center justify-between gap-4 px-1">
          <div>
            {title && (
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider text-muted-foreground/80">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  )
}

interface PageGridProps {
  children: React.ReactNode
  cols?: 1 | 2 | 3 | 4 | 5 | 12
  className?: string
}

export function PageGrid({ children, cols = 12, className }: PageGridProps) {
  const colMap = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
    12: "grid-cols-1 lg:grid-cols-12",
  }

  return (
    <div className={cn("grid gap-6", colMap[cols], className)}>
      {children}
    </div>
  )
}
