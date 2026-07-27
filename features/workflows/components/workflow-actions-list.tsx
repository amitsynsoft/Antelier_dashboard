"use client"

import * as React from "react"
import {
  GripVertical,
  ChevronDown,
  ChevronUp,
  Trash2,
  Plus,
  Sparkles,
  Calendar,
  PhoneCall,
  Users,
  MessageSquare,
  Zap,
} from "lucide-react"
import { IntentWorkflow, WorkflowActionType } from "../types"
import { ACTION_TYPE_META } from "../config"

interface WorkflowActionsListProps {
  workflow: IntentWorkflow
  onMoveAction: (index: number, direction: "up" | "down") => void
  onDeleteAction: (id: string) => void
  onOpenAddAction: () => void
  onQuickAddAction: (type: WorkflowActionType, title: string, desc: string) => void
}

export function WorkflowActionsList({
  workflow,
  onMoveAction,
  onDeleteAction,
  onOpenAddAction,
  onQuickAddAction,
}: WorkflowActionsListProps) {
  return (
    <div className="space-y-6 rounded-3xl border border-border/70 bg-card p-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <div className="space-y-1">
          <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
            <Zap className="h-4.5 w-4.5 text-orange-500" />
            Automated Action Execution Flow
          </h3>
          <p className="text-xs text-muted-foreground">
            Sequential business actions executed automatically when intent triggers.
          </p>
        </div>

        <span className="rounded-xl border border-orange-500/20 bg-orange-500/10 px-3 py-1 font-mono text-xs font-bold text-orange-600 dark:text-orange-400">
          {workflow.actions.length} Action Steps
        </span>
      </div>

      {/* Ordered Actions Flow List */}
      <div className="space-y-3.5">
        {workflow.actions.map((action, index) => {
          const meta = ACTION_TYPE_META[action.type] || ACTION_TYPE_META.custom
          const IconComp = meta.icon

          return (
            <React.Fragment key={action.id}>
              {index > 0 && (
                <div className="flex items-center justify-center py-0.5">
                  <div className="flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-[11px] font-mono font-bold text-muted-foreground shadow-2xs">
                    <ChevronDown className="h-3.5 w-3.5 text-orange-500 animate-pulse" />
                    <span>Then execute Step {index + 1}</span>
                  </div>
                </div>
              )}

              <div className="group relative flex items-center justify-between rounded-2xl border border-border/70 bg-muted/20 p-4 shadow-2xs transition-all hover:border-orange-500/50 hover:bg-card">
                <div className="flex items-center gap-3.5">
                  <div className="cursor-grab text-muted-foreground hover:text-foreground transition-colors">
                    <GripVertical className="h-5 w-5" />
                  </div>

                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${meta.colorClass}`}
                  >
                    <IconComp className="h-5 w-5" />
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-extrabold text-orange-600 dark:text-orange-400">
                        Step {index + 1}
                      </span>
                      <h4 className="text-sm font-bold text-foreground">
                        {action.title}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => onMoveAction(index, "up")}
                    disabled={index === 0}
                    className="rounded-xl border border-border/50 bg-background p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 cursor-pointer"
                    title="Move Step Up"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onMoveAction(index, "down")}
                    disabled={index === workflow.actions.length - 1}
                    className="rounded-xl border border-border/50 bg-background p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 cursor-pointer"
                    title="Move Step Down"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteAction(action.id)}
                    className="rounded-xl border border-border/50 bg-background p-1.5 text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500 cursor-pointer"
                    title="Delete Action Step"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </React.Fragment>
          )
        })}
      </div>

      {/* Add Action Button */}
      <button
        type="button"
        onClick={onOpenAddAction}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-orange-500/30 bg-orange-500/5 py-3.5 text-xs font-bold text-orange-600 transition-all hover:border-orange-500/60 hover:bg-orange-500/10 dark:text-orange-400"
      >
        <Plus className="h-4.5 w-4.5" />
        <span>Add Action Step</span>
      </button>

      {/* Suggested Quick Actions */}
      <div className="space-y-2.5 pt-3 border-t border-border/50">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-extrabold text-muted-foreground uppercase tracking-wider font-mono">
            <Sparkles className="h-3.5 w-3.5 text-orange-500" />
            Quick Preset Action Cards
          </span>
          <button
            type="button"
            onClick={onOpenAddAction}
            className="text-xs font-bold text-orange-600 hover:underline dark:text-orange-400 cursor-pointer"
          >
            Browse All Integrations
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              onQuickAddAction(
                "calendar",
                "Check Calendar",
                "Check practitioner calendar availability"
              )
            }
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-border/70 bg-card px-3 py-2 text-xs font-semibold text-foreground hover:bg-orange-500/10 hover:text-orange-600 transition-all shadow-2xs"
          >
            <Calendar className="h-4 w-4 text-blue-500" />
            <span>Check Calendar</span>
          </button>

          <button
            type="button"
            onClick={() =>
              onQuickAddAction(
                "call",
                "Notify Staff (Call)",
                "Call on-call staff member immediately"
              )
            }
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-border/70 bg-card px-3 py-2 text-xs font-semibold text-foreground hover:bg-orange-500/10 hover:text-orange-600 transition-all shadow-2xs"
          >
            <PhoneCall className="h-4 w-4 text-rose-500" />
            <span>Notify Staff (Call)</span>
          </button>

          <button
            type="button"
            onClick={() =>
              onQuickAddAction(
                "notification",
                "Create Task",
                "Create internal task assignment"
              )
            }
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-border/70 bg-card px-3 py-2 text-xs font-semibold text-foreground hover:bg-orange-500/10 hover:text-orange-600 transition-all shadow-2xs"
          >
            <Users className="h-4 w-4 text-purple-500" />
            <span>Create Task</span>
          </button>

          <button
            type="button"
            onClick={() =>
              onQuickAddAction(
                "whatsapp",
                "Send SMS",
                "Dispatch Twilio SMS notification"
              )
            }
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-border/70 bg-card px-3 py-2 text-xs font-semibold text-foreground hover:bg-orange-500/10 hover:text-orange-600 transition-all shadow-2xs"
          >
            <MessageSquare className="h-4 w-4 text-green-500" />
            <span>Send SMS</span>
          </button>
        </div>
      </div>
    </div>
  )
}
