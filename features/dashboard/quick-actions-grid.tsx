"use client"

import * as React from "react"
import { quickActionsMock } from "@/mock/dashboard-data"
import {
  Upload,
  Sliders,
  Sparkles,
  PlusCircle,
  GitFork,
  UserPlus,
  Zap,
  ArrowRight,
  LucideIcon
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Upload,
  Sliders,
  Sparkles,
  PlusCircle,
  GitFork,
  UserPlus
}

export function QuickActionsGrid() {
  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs space-y-4 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <Zap className="h-4.5 w-4.5 text-primary" />
          <span>Quick Actions</span>
        </h3>
      </div>

      {/* 2x3 Grid of Action Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickActionsMock.map((action) => {
          const Icon = iconMap[action.icon] || Sparkles

          return (
            <a
              key={action.id}
              href={action.href}
              className="group flex items-start gap-3 rounded-xl border border-border/60 bg-muted/20 p-3.5 hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon className="h-4.5 w-4.5" />
              </div>

              <div className="space-y-0.5 overflow-hidden">
                <h4 className="text-xs sm:text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                  {action.title}
                </h4>
                <p className="text-[11px] text-muted-foreground truncate">
                  {action.description}
                </p>
              </div>
            </a>
          )
        })}
      </div>

      {/* Footer Link */}
      <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Need help getting started?</span>
        <a
          href="#docs"
          className="font-semibold text-primary inline-flex items-center gap-1 hover:underline"
        >
          <span>View Documentation</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  )
}
