"use client"

import * as React from "react"
import { useWorkspace } from "@/context/workspace-context"
import { FileText } from "lucide-react"

export function KnowledgeBaseChartCard() {
  const { state } = useWorkspace()
  const kb = state.knowledgeBase

  const pdfCount = kb.uploadedFiles.length
  const urlCount = kb.scrapeUrls.length
  const totalDocs = Math.max(1, pdfCount + urlCount)

  const categories = [
    { name: "Uploaded Collateral & PDFs", count: pdfCount, color: "#3B82F6" },
    { name: "Active Documentation Scrapers", count: urlCount, color: "#F59E0B" },
    { name: "Vector Index Refresh", count: kb.syncInterval === "realtime" ? 1 : 2, color: "#10B981" },
  ]

  const radius = 42
  const circumference = 2 * Math.PI * radius
  let accumulatedAngle = 0

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs space-y-4 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-foreground">Knowledge Base Corpus</h3>
        <a
          href="#knowledge-base"
          className="text-xs font-semibold text-primary hover:underline"
        >
          Manage Corpus
        </a>
      </div>

      {/* Donut Chart & Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center py-2">
        {/* SVG Donut Chart Container */}
        <div className="relative flex items-center justify-center">
          <svg className="h-36 w-36 transform -rotate-90" viewBox="0 0 100 100">
            {categories.map((cat, idx) => {
              const strokeDasharray = `${(cat.count / totalDocs) * circumference} ${circumference}`
              const strokeDashoffset = -accumulatedAngle
              accumulatedAngle += (cat.count / totalDocs) * circumference

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
              {pdfCount + urlCount}
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">
              Total Docs
            </span>
          </div>
        </div>

        {/* Legend Breakdown */}
        <div className="space-y-2.5">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2 truncate">
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
      <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Sync Interval: <strong className="text-foreground capitalize">{kb.syncInterval}</strong></span>
        </div>
        <span className="font-mono text-[10px]">OCR: {kb.autoParsePdf ? "ON" : "OFF"}</span>
      </div>
    </div>
  )
}
