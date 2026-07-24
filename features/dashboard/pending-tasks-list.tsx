"use client"

import * as React from "react"
import { SectionCard } from "@/components/ui/section-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { pendingTasksMock, upcomingRemindersMock } from "@/mock/dashboard-data"
import { PendingTask, PriorityLevel } from "@/types"
import { CheckSquare, Calendar, Clock, AlertCircle, CheckCircle2, MapPin } from "lucide-react"

export function PendingTasksList() {
  const [tasks, setTasks] = React.useState<PendingTask[]>(pendingTasksMock)

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "completed" ? "pending" : "completed" }
          : t
      )
    )
  }

  const getPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case "urgent":
        return <StatusBadge variant="destructive">Urgent</StatusBadge>
      case "high":
        return <StatusBadge variant="warning">High</StatusBadge>
      case "medium":
        return <StatusBadge variant="info">Medium</StatusBadge>
      default:
        return <StatusBadge variant="neutral">Low</StatusBadge>
    }
  }

  return (
    <SectionCard
      title="Pending Approvals & SLA Tasks"
      subtitle="Requires human signoff or prompt validation"
      icon={CheckSquare}
    >
      <div className="space-y-3">
        {tasks.map((task) => {
          const isCompleted = task.status === "completed"

          return (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`group flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                isCompleted
                  ? "border-border/40 bg-muted/10 opacity-60"
                  : "border-border/70 bg-card hover:bg-muted/30"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                <div
                  className={`h-4.5 w-4.5 rounded border flex items-center justify-center transition-colors ${
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-input bg-background group-hover:border-primary"
                  }`}
                >
                  {isCompleted && <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" />}
                </div>
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span
                    className={`text-sm font-semibold tracking-tight ${
                      isCompleted ? "line-through text-muted-foreground" : "text-foreground"
                    }`}
                  >
                    {task.title}
                  </span>
                  {getPriorityBadge(task.priority)}
                </div>

                <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground font-mono pt-1">
                  <span>Target: {task.clientRef}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    Due {task.dueDate}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </SectionCard>
  )
}
