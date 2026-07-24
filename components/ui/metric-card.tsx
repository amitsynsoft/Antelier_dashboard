import * as React from "react"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus, LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  trend?: "up" | "down" | "neutral"
  trendLabel?: string
  sparkline?: number[]
  description?: string
  icon?: LucideIcon
  className?: string
  badgeText?: string
}

export function MetricCard({
  title,
  value,
  change,
  trend = "neutral",
  trendLabel,
  sparkline,
  description,
  icon: Icon,
  className,
  badgeText
}: MetricCardProps) {
  // Simple sparkline renderer using SVG polyline
  const renderSparkline = () => {
    if (!sparkline || sparkline.length < 2) return null
    const min = Math.min(...sparkline)
    const max = Math.max(...sparkline)
    const range = max - min || 1
    const height = 28
    const width = 80
    
    const points = sparkline
      .map((val, idx) => {
        const x = (idx / (sparkline.length - 1)) * width
        const y = height - ((val - min) / range) * (height - 4) - 2
        return `${x.toFixed(1)},${y.toFixed(1)}`
      })
      .join(" ")

    const strokeColor = trend === "up" ? "#10b981" : trend === "down" ? "#f43f5e" : "#6366f1"

    return (
      <div className="h-8 w-20 flex items-center justify-end">
        <svg width={width} height={height} className="overflow-visible">
          <polyline
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
        </svg>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between p-5 rounded-xl border bg-card/60 backdrop-blur-sm text-card-foreground shadow-xs transition-all duration-200 hover:shadow-md hover:border-border/80 hover:bg-card/90",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </span>
          {Icon && (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <Icon className="h-4 w-4" />
            </div>
          )}
          {badgeText && !Icon && (
            <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-secondary text-secondary-foreground border">
              {badgeText}
            </span>
          )}
        </div>

        <div className="flex items-baseline justify-between gap-2">
          <div className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground font-mono">
            {value}
          </div>
          {sparkline && renderSparkline()}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/40 text-xs sm:text-sm">
        {change && (
          <div className="flex items-center gap-1.5 font-medium">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-xs font-semibold",
                trend === "up" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                trend === "down" && "bg-rose-500/10 text-rose-600 dark:text-rose-400",
                trend === "neutral" && "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400"
              )}
            >
              {trend === "up" && <TrendingUp className="h-3.5 w-3.5" />}
              {trend === "down" && <TrendingDown className="h-3.5 w-3.5" />}
              {trend === "neutral" && <Minus className="h-3.5 w-3.5" />}
              {change}
            </span>
            {trendLabel && <span className="text-muted-foreground text-xs sm:text-sm truncate">{trendLabel}</span>}
          </div>
        )}
        {description && !change && (
          <span className="text-muted-foreground text-xs sm:text-sm truncate">{description}</span>
        )}
      </div>
    </div>
  )
}
