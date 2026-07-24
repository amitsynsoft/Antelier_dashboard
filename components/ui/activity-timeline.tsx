import * as React from "react"
import { cn } from "@/lib/utils"
import { ActivityItem } from "@/types"
import { CheckCircle2, AlertTriangle, Info, XCircle, Bot, User, ArrowRight } from "lucide-react"

interface ActivityTimelineProps {
  activities: ActivityItem[]
  className?: string
}

export function ActivityTimeline({ activities, className }: ActivityTimelineProps) {
  const getStatusIcon = (status: ActivityItem["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
      case "warning":
        return <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
      case "error":
        return <XCircle className="h-3.5 w-3.5 text-rose-500" />
      default:
        return <Info className="h-3.5 w-3.5 text-blue-500" />
    }
  }

  return (
    <div className={cn("relative pl-4 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border/60", className)}>
      {activities.map((item) => (
        <div key={item.id} className="relative flex items-start gap-3.5 group">
          <div className="absolute -left-[21px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-background border border-border shadow-2xs group-hover:scale-110 transition-transform">
            {getStatusIcon(item.status)}
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground tracking-tight">{item.title}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-muted text-muted-foreground">
                  <Bot className="h-3 w-3" />
                  {item.userOrBotName}
                </span>
              </div>
              <span className="text-xs font-mono text-muted-foreground">{item.timestamp}</span>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>

            {item.metadata && (
              <div className="flex flex-wrap gap-2 pt-1">
                {Object.entries(item.metadata).map(([key, val]) => (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded bg-muted/60 text-foreground border border-border/40"
                  >
                    <span className="text-muted-foreground">{key}:</span>
                    <span className="font-semibold">{val}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
