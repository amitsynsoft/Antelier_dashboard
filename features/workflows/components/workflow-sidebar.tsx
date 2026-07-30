"use client"

import * as React from "react"
import {
  Building2,
  Calendar,
  ShieldAlert,
  CreditCard,
  LifeBuoy,
  Plus,
} from "lucide-react"
import { IntentWorkflow } from "../types"

interface WorkflowSidebarProps {
  workflows: IntentWorkflow[]
  selectedWorkflowId: string
  onSelectWorkflow: (id: string) => void
  onToggleStatus: (id: string, e: React.MouseEvent) => void
  onOpenAddWorkflow: () => void
}

export function WorkflowSidebar({
  workflows,
  selectedWorkflowId,
  onSelectWorkflow,
  onToggleStatus,
  onOpenAddWorkflow,
}: WorkflowSidebarProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-extrabold tracking-wider text-muted-foreground uppercase">
          Workflow Library ({workflows.length})
        </span>
      </div>

      <div className="space-y-3">
        {workflows.map((wf) => {
          const isSelected = wf.id === selectedWorkflowId
          const isActive = wf.status === "Active"

          return (
            <div
              key={wf.id}
              onClick={() => onSelectWorkflow(wf.id)}
              className={`group relative cursor-pointer rounded-2xl border p-3.5 sm:p-4 transition-all min-w-0 ${
                isSelected
                  ? "border-orange-500/60 bg-orange-500/5 shadow-xs ring-1 ring-orange-500/20"
                  : "border-border/70 bg-card hover:border-border hover:bg-muted/40"
              }`}
            >
              <div className="flex items-start justify-between gap-2.5 sm:gap-3 min-w-0">
                <div className="flex items-start gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div className="mt-0.5 flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-500 font-bold">
                    {wf.title.toLowerCase().includes("client") ? (
                      <Building2 className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                    ) : wf.title.toLowerCase().includes("appointment") ? (
                      <Calendar className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-blue-500" />
                    ) : wf.title.toLowerCase().includes("urgent") ? (
                      <ShieldAlert className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-rose-500" />
                    ) : wf.title.toLowerCase().includes("invoice") ? (
                      <CreditCard className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-amber-500" />
                    ) : (
                      <LifeBuoy className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-sky-500" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-orange-600 dark:group-hover:text-orange-400 truncate">
                      {wf.title}
                    </h4>
                    <p className="mt-0.5 sm:mt-1 line-clamp-2 text-[11px] sm:text-xs text-muted-foreground leading-snug">
                      {wf.description}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-1.5 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isActive
                          ? "bg-emerald-500 animate-pulse"
                          : "bg-muted-foreground"
                      }`}
                    />
                    {isActive ? "Active" : "Inactive"}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => onToggleStatus(wf.id, e)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isActive ? "bg-orange-600" : "bg-muted-foreground/30"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                        isActive ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )
        })}

        <button
          type="button"
          onClick={onOpenAddWorkflow}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-orange-500/30 bg-orange-500/5 py-3 text-xs font-bold text-orange-600 transition-all hover:border-orange-500/60 hover:bg-orange-500/10 dark:text-orange-400"
        >
          <Plus className="h-4 w-4" />
          <span>Add Custom Workflow</span>
        </button>
      </div>
    </div>
  )
}
