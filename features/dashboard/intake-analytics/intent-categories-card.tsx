"use client"

import * as React from "react"
import { Sparkles, BrainCircuit, ArrowUpRight, CheckCircle2 } from "lucide-react"
import { intentCategoriesMock, IntentCategory } from "@/mock/mock-intake-data"

export function IntentCategoriesCard() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold tracking-tight text-foreground">
              Detected Customer Intents
            </h3>
            <span className="flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-primary">
              <Sparkles className="h-3 w-3" />
              98.4% AI Accuracy
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Top customer request classifications & triggered automated workflows
          </p>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <BrainCircuit className="h-5 w-5" />
        </div>
      </div>

      {/* Intents List Grid */}
      <div className="mt-4 space-y-3.5">
        {intentCategoriesMock.map((intent: IntentCategory) => (
          <div
            key={intent.id}
            className="group rounded-xl border border-border/60 bg-muted/20 p-3 transition-all hover:border-primary/30 hover:bg-muted/30"
          >
            {/* Top row: Name, Badge, Count */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs text-foreground sm:text-sm">
                  {intent.name}
                </span>
                <span
                  className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold ${intent.badgeColor}`}
                >
                  {intent.percentage}% of total
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-foreground">
                  {intent.count} intakes
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                  <CheckCircle2 className="h-3 w-3" />
                  {intent.accuracyScore}%
                </span>
              </div>
            </div>

            {/* Description & Action */}
            <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between text-xs">
              <p className="text-muted-foreground text-[11px] truncate">
                {intent.description}
              </p>
              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-primary shrink-0">
                <span>{intent.primaryAction}</span>
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>

            {/* Progress bar line */}
            <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-muted/80">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${intent.percentage * 2.5}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
