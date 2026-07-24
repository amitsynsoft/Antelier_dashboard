"use client"

import * as React from "react"
import { recentActivityFeedMock } from "@/mock/dashboard-data"
import { FileText, Sliders, MessageSquare, GitFork, Clock } from "lucide-react"

export function RecentActivityFeed() {
  const getIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "prompt":
        return <Sliders className="h-4 w-4 text-purple-500" />
      case "integration":
        return <MessageSquare className="h-4 w-4 text-emerald-500" />
      case "workflow":
        return <GitFork className="h-4 w-4 text-indigo-500" />
      case "business":
        return <Clock className="h-4 w-4 text-amber-500" />
      default:
        return <Clock className="h-4 w-4 text-primary" />
    }
  }

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs space-y-4 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-foreground">Recent Activity</h3>
        <a
          href="#activity-logs"
          className="text-xs font-semibold text-primary hover:underline"
        >
          View all
        </a>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-3.5">
        {recentActivityFeedMock.map((item) => (
          <div key={item.id} className="flex items-start gap-3 text-xs">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted/50 border border-border/40">
              {getIcon(item.type)}
            </div>

            <div className="flex-1 space-y-0.5 overflow-hidden">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-foreground truncate">
                  {item.title}
                </span>
                <span className="text-[11px] text-muted-foreground font-mono shrink-0">
                  {item.timeAgo}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground truncate">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
