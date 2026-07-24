"use client"

import * as React from "react"
import { knowledgeBaseBreakdownMock } from "@/mock/dashboard-data"

export function KnowledgeBaseChartCard() {
  const data = knowledgeBaseBreakdownMock

  // Calculate SVG Donut chart segments
  const radius = 42
  const circumference = 2 * Math.PI * radius
  let accumulatedAngle = 0

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs space-y-4 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-foreground">Knowledge Base</h3>
        <a
          href="#knowledge-base"
          className="text-xs font-semibold text-primary hover:underline"
        >
          View all
        </a>
      </div>

      {/* Donut Chart & Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center py-2">
        {/* SVG Donut Chart Container */}
        <div className="relative flex items-center justify-center">
          <svg className="h-36 w-36 transform -rotate-90" viewBox="0 0 100 100">
            {data.categories.map((cat, idx) => {
              const strokeDasharray = `${(cat.count / data.totalDocs) * circumference} ${circumference}`
              const strokeDashoffset = -accumulatedAngle
              accumulatedAngle += (cat.count / data.totalDocs) * circumference

              return (
                <circle
                  key={idx}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke={cat.color}
                  strokeWidth="12"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                />
              )
            })}
          </svg>

          {/* Donut Center Label */}
          <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-2xl font-extrabold text-foreground tracking-tight">
              {data.totalDocs}
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">
              Total Docs
            </span>
          </div>
        </div>

        {/* Legend Breakdown */}
        <div className="space-y-2">
          {data.categories.map((cat) => (
            <div
              key={cat.name}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-muted-foreground font-medium truncate">
                  {cat.name}
                </span>
              </div>
              <span className="font-bold text-foreground ml-2">{cat.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Indicator */}
      <div className="pt-2 border-t border-border/50 flex items-center gap-1.5 text-xs text-muted-foreground">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span>Last indexed: {data.lastIndexed}</span>
      </div>
    </div>
  )
}
