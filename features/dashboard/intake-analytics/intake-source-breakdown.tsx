"use client"

import * as React from "react"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"
import { PieChart as PieIcon } from "lucide-react"
import { intakeSourceShareMock } from "@/mock/mock-intake-data"

export function IntakeSourceBreakdown() {
  const totalIntakes = intakeSourceShareMock.reduce((acc, curr) => acc + curr.count, 0)

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
      {/* Title Header */}
      <div className="border-b border-border/50 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold tracking-tight text-foreground">
              Intake Source Breakdown
            </h3>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <PieIcon className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Percentage distribution of customer enquiries across channels
        </p>
      </div>

      {/* Donut Chart Canvas with Center Stat */}
      <div className="relative my-3 flex h-[200px] w-full items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={intakeSourceShareMock}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="count"
            >
              {intakeSourceShareMock.map((entry) => (
                <Cell key={entry.name} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload
                  return (
                    <div className="rounded-xl border border-border/80 bg-popover px-3 py-2 shadow-xl">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs font-bold text-foreground">
                          {item.name}
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-xs font-semibold text-muted-foreground">
                        {item.count} intakes ({item.percentage}%)
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Donut Center Overlay Label */}
        <div className="pointer-events-none absolute flex flex-col items-center justify-center text-center">
          <span className="font-mono text-2xl font-extrabold text-foreground">
            {totalIntakes.toLocaleString()}
          </span>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Total Intakes
          </span>
        </div>
      </div>

      {/* Channel Breakdown List */}
      <div className="grid grid-cols-2 gap-2.5 border-t border-border/50 pt-3">
        {intakeSourceShareMock.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-xl border border-border/40 bg-muted/20 px-2.5 py-1.5"
          >
            <div className="flex items-center gap-1.5 truncate">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs font-medium text-foreground truncate">
                {item.name}
              </span>
            </div>
            <span className="font-mono text-xs font-bold text-muted-foreground">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
