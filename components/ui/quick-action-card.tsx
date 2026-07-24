import * as React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon, ArrowUpRight } from "lucide-react"

interface QuickActionCardProps {
  title: string
  description: string
  icon: LucideIcon
  onClick?: () => void
  badge?: string
  colorVariant?: "primary" | "purple" | "emerald" | "amber"
  className?: string
}

const colorStyles = {
  primary: "group-hover:border-primary/50 group-hover:bg-primary/5 text-primary",
  purple: "group-hover:border-purple-500/50 group-hover:bg-purple-500/5 text-purple-500",
  emerald: "group-hover:border-emerald-500/50 group-hover:bg-emerald-500/5 text-emerald-500",
  amber: "group-hover:border-amber-500/50 group-hover:bg-amber-500/5 text-amber-500"
}

export function QuickActionCard({
  title,
  description,
  icon: Icon,
  onClick,
  badge,
  colorVariant = "primary",
  className
}: QuickActionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group text-left relative flex flex-col justify-between p-4 rounded-xl border bg-card/70 backdrop-blur-xs text-card-foreground shadow-2xs transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer w-full",
        colorStyles[colorVariant],
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/60 text-foreground group-hover:scale-105 transition-transform">
            <Icon className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-1.5">
            {badge && (
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-secondary text-secondary-foreground border">
                {badge}
              </span>
            )}
            <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <h4 className="text-sm font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </button>
  )
}
