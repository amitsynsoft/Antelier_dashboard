"use client"

import * as React from "react"
import { kpiMetrics } from "@/mock/dashboard-data"
import { MessageSquare, FileText, Plug, GitFork, Users, TrendingUp, Minus, LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  MessageSquare,
  FileText,
  Plug,
  GitFork,
  Users
}

export function KpiGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {kpiMetrics.map((metric) => {
        const IconComponent = iconMap[metric.icon] || MessageSquare
        const isUp = metric.trend === "up"

        return (
          <div
            key={metric.id}
            className="rounded-2xl border border-border/80 bg-card p-4 shadow-2xs hover:border-primary/40 transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground truncate">
                {metric.title}
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                <IconComponent className="h-4 w-4" />
              </div>
            </div>

            <div>
              <div className="text-2xl font-extrabold text-foreground tracking-tight">
                {metric.value}
              </div>

              <div className="flex items-center gap-1.5 mt-1 text-xs">
                {isUp ? (
                  <span className="inline-flex items-center gap-0.5 font-bold text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {metric.change}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-0.5 font-medium text-muted-foreground">
                    <Minus className="h-3.5 w-3.5" />
                    {metric.change}
                  </span>
                )}
                {metric.trendLabel && (
                  <span className="text-muted-foreground text-[11px] truncate">
                    {metric.trendLabel}
                  </span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
