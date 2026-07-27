"use client"

import * as React from "react"
import {
  BarChart3,
  PhoneCall,
  MessageSquare,
  Mail,
  MessageCircle,
  TrendingUp,
} from "lucide-react"
import { intakeOverviewChannels, IntakeChannelOverview } from "@/mock/mock-intake-data"

const iconMap: Record<string, React.ElementType> = {
  BarChart3,
  PhoneCall,
  MessageSquare,
  Mail,
  MessageCircle,
}

export function IntakeOverviewCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {intakeOverviewChannels.map((channel: IntakeChannelOverview) => {
        const IconComponent = iconMap[channel.icon] || BarChart3
        const isTotal = channel.id === "total"

        return (
          <div
            key={channel.id}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-4 transition-all duration-200 hover:shadow-md ${
              isTotal
                ? "border-primary/40 bg-gradient-to-br from-primary/10 via-card to-card shadow-2xs"
                : "border-border/80 bg-card hover:border-primary/30"
            }`}
          >
            {/* Top row: Label & Icon */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-semibold text-muted-foreground truncate">
                  {channel.label}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground/80 truncate">
                  {channel.subtitle}
                </p>
              </div>
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105 ${
                  isTotal
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-primary/10 text-primary"
                }`}
              >
                <IconComponent className="h-4.5 w-4.5" />
              </div>
            </div>

            {/* Middle row: Count & Trend */}
            <div className="mt-4">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                  {channel.count.toLocaleString()}
                </span>
                <span className="inline-flex items-center gap-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-3 w-3" />
                  {channel.change}
                </span>
              </div>

              {/* Bottom detail text */}
              <p className="mt-2 text-[11px] font-medium text-muted-foreground border-t border-border/40 pt-2 truncate">
                {channel.detailText}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
