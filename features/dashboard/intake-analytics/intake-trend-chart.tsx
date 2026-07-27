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
  Legend,
} from "recharts"
import { Calendar, TrendingUp } from "lucide-react"
import { intakeTrend7Days, intakeTrend30Days } from "@/mock/mock-intake-data"

type TimeframeOption = "7d" | "30d"

export function IntakeTrendChart() {
  const [timeframe, setTimeframe] = React.useState<TimeframeOption>("7d")

  const data = timeframe === "7d" ? intakeTrend7Days : intakeTrend30Days

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
      {/* Header with Title and 7D / 30D Filter Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/50 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold tracking-tight text-foreground">
              Intake Volume Trend
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-primary">
              <TrendingUp className="h-3 w-3" />
              Live Operations
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Multi-channel client contact volume over time (AI Voice, Web Chat, Email & WhatsApp)
          </p>
        </div>

        {/* Timeframe Toggle Button Pill */}
        <div className="flex items-center gap-1 rounded-xl border border-border bg-muted/40 p-1 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setTimeframe("7d")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              timeframe === "7d"
                ? "bg-card text-foreground shadow-xs border border-border/80"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Last 7 Days</span>
          </button>

          <button
            type="button"
            onClick={() => setTimeframe("30d")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              timeframe === "30d"
                ? "bg-card text-foreground shadow-xs border border-border/80"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Last 30 Days</span>
          </button>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="mt-5 h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorVoice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorChat" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorEmail" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorWhatsapp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              className="stroke-border/40"
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              className="text-[11px] font-mono text-muted-foreground"
              dy={5}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              className="text-[11px] font-mono text-muted-foreground"
            />

            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-xl border border-border/80 bg-popover p-3 shadow-xl backdrop-blur-md">
                      <p className="mb-2 font-mono text-xs font-bold text-foreground">
                        {label} Intake Breakdown
                      </p>
                      <div className="space-y-1">
                        {payload.map((entry: { name?: any; value?: any; color?: string }) => (
                          <div
                            key={entry.name}
                            className="flex items-center justify-between gap-4 text-xs font-medium"
                          >
                            <div className="flex items-center gap-1.5">
                              <span
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: entry.color }}
                              />
                              <span className="text-muted-foreground capitalize">
                                {entry.name}:
                              </span>
                            </div>
                            <span className="font-mono font-bold text-foreground">
                              {entry.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />

            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: "10px", fontSize: "11px" }}
              formatter={(value: string) => (
                <span className="font-semibold text-foreground capitalize">
                  {value === "voice"
                    ? "Voice Calls"
                    : value === "chat"
                    ? "Website Chat"
                    : value === "email"
                    ? "Email Intake"
                    : "WhatsApp"}
                </span>
              )}
            />

            <Area
              type="monotone"
              dataKey="voice"
              name="voice"
              stroke="#3B82F6"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorVoice)"
            />

            <Area
              type="monotone"
              dataKey="chat"
              name="chat"
              stroke="#10B981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorChat)"
            />

            <Area
              type="monotone"
              dataKey="email"
              name="email"
              stroke="#8B5CF6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorEmail)"
            />

            <Area
              type="monotone"
              dataKey="whatsapp"
              name="whatsapp"
              stroke="#F59E0B"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorWhatsapp)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
