"use client"

import * as React from "react"
import { useWorkspace } from "@/context/workspace-context"
import { MessageSquare, FileText, Plug, GitFork, Users, TrendingUp } from "lucide-react"

export function KpiGrid() {
  const { state } = useWorkspace()

  // Dynamic metrics computed directly from workspace configuration state for 5 core integrations
  const coreIntegrationIds = ["hubspot", "gmail", "whatsapp", "voice_agent", "gcal"]
  const activeIntegrationsCount = coreIntegrationIds.filter((id) => {
    if (state.integrations?.connectedMap && state.integrations.connectedMap[id] !== undefined) {
      return Boolean(state.integrations.connectedMap[id])
    }
    if (id === "hubspot") return Boolean(state.integrations?.hubspot)
    if (id === "gmail") return Boolean(typeof state.integrations?.webhookUrl === "string" && state.integrations.webhookUrl.trim())
    return false
  }).length

  const totalDocuments = state.knowledgeBase.uploadedFiles.length + state.knowledgeBase.scrapeUrls.length

  const metrics = [
    {
      id: "conversations",
      title: "Total AI Conversations",
      value: "1,284",
      change: "+18.4%",
      trendLabel: "vs last week",
      icon: MessageSquare,
    },
    {
      id: "knowledge",
      title: "Knowledge Base Corpus",
      value: totalDocuments > 0 ? `${totalDocuments} Indexed` : "4 Indexed",
      change: "Active RAG",
      trendLabel: "vector store",
      icon: FileText,
    },
    {
      id: "integrations",
      title: "Active Integrations",
      value: `${activeIntegrationsCount} / 5 Active`,
      change: `${activeIntegrationsCount} Live`,
      trendLabel: "CRM sync",
      icon: Plug,
    },
    {
      id: "workflows",
      title: "Workflow Automation Runs",
      value: "842 Runs",
      change: "99.8%",
      trendLabel: "pass rate",
      icon: GitFork,
    },
    {
      id: "leads",
      title: "Qualified Leads Passed",
      value: "392 Leads",
      change: "+12.1%",
      trendLabel: "to sales team",
      icon: Users,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {metrics.map((metric) => {
        const IconComponent = metric.icon

        return (
          <div
            key={metric.id}
            className="rounded-2xl border border-border/80 bg-card p-4 shadow-2xs hover:border-primary/40 transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground truncate">
                {metric.title}
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                <IconComponent className="h-4 w-4" />
              </div>
            </div>

            <div>
              <div className="text-xl font-extrabold text-foreground tracking-tight">
                {metric.value}
              </div>

              <div className="flex items-center gap-1.5 mt-1 text-xs">
                <span className="inline-flex items-center gap-0.5 font-bold text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {metric.change}
                </span>
                <span className="text-muted-foreground text-[11px] truncate">
                  {metric.trendLabel}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
