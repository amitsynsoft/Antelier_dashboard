"use client"

import * as React from "react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"
import {
  Zap,
  Bot,
  UserCheck,
  CheckCircle,
  Star,
  Activity,
} from "lucide-react"
import { aiPerformanceMetricsMock, performanceTrendMock } from "@/mock/mock-intake-data"

export function AiPerformanceAnalytics() {
  const metrics = [
    {
      id: "response-time",
      title: "Avg Response Speed",
      value: aiPerformanceMetricsMock.avgResponseTimeSec,
      subtext: "< 2s SLA target",
      icon: Zap,
      accent: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      id: "automation-rate",
      title: "Automation Rate",
      value: `${aiPerformanceMetricsMock.automationRate}%`,
      subtext: "1,081 zero-touch intakes",
      icon: Bot,
      accent: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      id: "escalation-rate",
      title: "Escalation Rate",
      value: `${aiPerformanceMetricsMock.escalationRate}%`,
      subtext: "160 warm AE handoffs",
      icon: UserCheck,
      accent: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    },
    {
      id: "resolution-rate",
      title: "AI Resolution Rate",
      value: `${aiPerformanceMetricsMock.aiResolutionRate}%`,
      subtext: "First contact resolution",
      icon: CheckCircle,
      accent: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      id: "csat",
      title: "Customer Satisfaction",
      value: `${aiPerformanceMetricsMock.csatScore} / 5.0`,
      subtext: aiPerformanceMetricsMock.csatRating,
      icon: Star,
      accent: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
    },
  ]

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold tracking-tight text-foreground">
              AI Performance & SLA Analytics
            </h3>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-primary">
              Operational Quality
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Response latency, automation efficacy, handoff ratios, and CSAT scores
          </p>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Activity className="h-5 w-5" />
        </div>
      </div>

      {/* Top 5 Metric Badges */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {metrics.map((m) => {
          const IconComponent = m.icon
          return (
            <div
              key={m.id}
              className="rounded-xl border border-border/60 bg-muted/20 p-3 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-muted-foreground truncate">
                  {m.title}
                </span>
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg border ${m.accent}`}
                >
                  <IconComponent className="h-3.5 w-3.5" />
                </div>
              </div>

              <div>
                <p className="text-lg font-extrabold tracking-tight text-foreground sm:text-xl">
                  {m.value}
                </p>
                <p className="text-[10px] font-medium text-muted-foreground truncate">
                  {m.subtext}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recharts Performance Trend Chart */}
      <div className="mt-5 border-t border-border/50 pt-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-foreground">
            AI Resolution & CSAT Trend Over Time
          </p>
          <span className="font-mono text-[11px] text-muted-foreground">
            Weekly SLA Standard
          </span>
        </div>

        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={performanceTrendMock}
              margin={{ top: 5, right: 10, left: -25, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorResolution" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/40" />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                className="text-[10px] font-mono text-muted-foreground"
              />

              <YAxis
                domain={[75, 95]}
                axisLine={false}
                tickLine={false}
                className="text-[10px] font-mono text-muted-foreground"
              />

              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-xl border border-border/80 bg-popover p-2.5 shadow-xl">
                        <p className="font-mono text-xs font-bold text-foreground mb-1">
                          {label} Quality
                        </p>
                        <div className="space-y-0.5 text-xs">
                          <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
                            Resolution Rate: {payload[0].value}%
                          </p>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />

              <Area
                type="monotone"
                dataKey="resolutionRate"
                stroke="#10B981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorResolution)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
