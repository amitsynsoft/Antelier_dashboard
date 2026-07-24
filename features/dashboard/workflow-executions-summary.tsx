"use client"

import * as React from "react"
import { SectionCard } from "@/components/ui/section-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { workflowExecutionsMock } from "@/mock/dashboard-data"
import { WorkflowExecution, WorkflowStatus } from "@/types"
import { Bot, Play, CheckCircle2, AlertTriangle, RefreshCw, Clock, ArrowRight } from "lucide-react"

export function WorkflowExecutionsSummary() {
  const getStatusBadge = (status: WorkflowStatus) => {
    switch (status) {
      case "running":
        return <StatusBadge variant="cyan" pulse>Executing</StatusBadge>
      case "success":
        return <StatusBadge variant="success">Completed</StatusBadge>
      case "warning":
        return <StatusBadge variant="warning">Step Flagged</StatusBadge>
      case "failed":
        return <StatusBadge variant="destructive">Retrying</StatusBadge>
      default:
        return <StatusBadge variant="neutral">Queued</StatusBadge>
    }
  }

  return (
    <SectionCard
      title="Automated Intake Workflows"
      subtitle="Execution engine telemetry & automated step verification"
      icon={Bot}
      action={
        <button
          type="button"
          className="text-sm font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1.5"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Live Stream</span>
        </button>
      }
    >
      <div className="space-y-4">
        {workflowExecutionsMock.map((wf) => {
          const progressPercent = Math.round((wf.completedSteps / wf.totalSteps) * 100)

          return (
            <div
              key={wf.id}
              className="p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                    <Play className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-foreground tracking-tight">
                      {wf.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      Triggered by: <span className="font-semibold text-foreground">{wf.trigger}</span> • Target: <span className="font-mono font-medium">{wf.affectedEntity}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {getStatusBadge(wf.status)}
                </div>
              </div>

              {/* Progress Bar & Runtime */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>
                    Steps Completed: <strong className="text-foreground font-bold">{wf.completedSteps}/{wf.totalSteps}</strong> ({progressPercent}%)
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    Runtime: {wf.duration}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      wf.status === "running"
                        ? "bg-cyan-500 animate-pulse"
                        : wf.status === "success"
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </SectionCard>
  )
}
