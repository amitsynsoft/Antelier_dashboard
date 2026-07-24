"use client"

import * as React from "react"
import { SectionCard } from "@/components/ui/section-card"
import { DataTable, Column } from "@/components/ui/data-table"
import { StatusBadge, StatusVariant } from "@/components/ui/status-badge"
import { SearchInput } from "@/components/ui/search-input"
import { FilterBar, FilterOption } from "@/components/ui/filter-bar"
import { aiConversationsMock } from "@/mock/dashboard-data"
import { AiConversation, IntakeStatus } from "@/types"
import { Bot, ExternalLink, ShieldAlert, Sparkles, Filter, ChevronRight } from "lucide-react"

export function AiConversationsSummary() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeFilter, setActiveFilter] = React.useState<string>("all")

  const filterOptions: FilterOption[] = [
    { id: "all", label: "All Intakes", count: aiConversationsMock.length },
    { id: "active", label: "Active", count: aiConversationsMock.filter((c) => c.status === "active").length },
    { id: "qualifying", label: "Qualifying", count: aiConversationsMock.filter((c) => c.status === "qualifying").length },
    { id: "review_needed", label: "Review Needed", count: aiConversationsMock.filter((c) => c.status === "review_needed").length },
    { id: "escalated", label: "Escalated", count: aiConversationsMock.filter((c) => c.status === "escalated").length }
  ]

  const filteredData = React.useMemo(() => {
    return aiConversationsMock.filter((item) => {
      const matchesSearch =
        item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contactEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.aiAgentAssigned.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesFilter =
        activeFilter === "all" ? true : item.status === activeFilter

      return matchesSearch && matchesFilter
    })
  }, [searchQuery, activeFilter])

  const getStatusBadge = (status: IntakeStatus) => {
    switch (status) {
      case "active":
        return <StatusBadge variant="cyan" pulse>In Session</StatusBadge>
      case "qualifying":
        return <StatusBadge variant="info">AI Scoring</StatusBadge>
      case "review_needed":
        return <StatusBadge variant="warning">Human Signoff</StatusBadge>
      case "completed":
        return <StatusBadge variant="success">AE Provisioned</StatusBadge>
      case "escalated":
        return <StatusBadge variant="destructive" pulse>SLA Escalated</StatusBadge>
      default:
        return <StatusBadge variant="neutral">Draft</StatusBadge>
    }
  }

  const columns: Column<AiConversation>[] = [
    {
      header: "Client Account",
      cell: (item) => (
        <div className="flex flex-col">
          <span className="font-bold text-sm text-foreground tracking-tight group-hover:text-primary transition-colors">
            {item.clientName}
          </span>
          <span className="text-xs text-muted-foreground mt-0.5">{item.contactEmail}</span>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground font-semibold">
              {item.companySize}
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
              {item.estimatedValue}
            </span>
          </div>
        </div>
      )
    },
    {
      header: "Lead Score & Risk",
      cell: (item) => (
        <div className="flex flex-col space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  item.leadScore >= 90
                    ? "bg-emerald-500"
                    : item.leadScore >= 80
                    ? "bg-blue-500"
                    : "bg-amber-500"
                }`}
                style={{ width: `${item.leadScore}%` }}
              />
            </div>
            <span className="text-sm font-mono font-bold text-foreground">{item.leadScore}/100</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {item.riskLevel === "high" && <ShieldAlert className="h-3.5 w-3.5 text-rose-500 shrink-0" />}
            <span className="capitalize font-medium">{item.riskLevel} risk</span>
          </div>
        </div>
      )
    },
    {
      header: "Intake Channel",
      cell: (item) => (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-muted/60 text-foreground border border-border/50">
          {item.channel}
        </span>
      )
    },
    {
      header: "AI Agent & Stage",
      cell: (item) => (
        <div className="flex flex-col space-y-0.5">
          <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <Bot className="h-4 w-4 text-primary shrink-0" />
            {item.aiAgentAssigned}
          </span>
          <span className="text-xs text-muted-foreground truncate max-w-[200px]">
            {item.currentStage}
          </span>
        </div>
      )
    },
    {
      header: "Status",
      cell: (item) => getStatusBadge(item.status)
    },
    {
      header: "",
      className: "text-right",
      cell: () => (
        <button
          type="button"
          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          title="Open Conversation Session"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )
    }
  ]

  return (
    <SectionCard
      title="Live AI Client Intake Sessions"
      subtitle="Real-time multi-channel prospect qualification & workflow progress"
      icon={Sparkles}
      action={
        <button
          type="button"
          className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
        >
          <span>View All Intakes ({aiConversationsMock.length})</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <FilterBar
            options={filterOptions}
            activeId={activeFilter}
            onChange={setActiveFilter}
            className="flex-1"
          />
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery("")}
            placeholder="Search prospect name, agent..."
            containerClassName="sm:w-64"
          />
        </div>

        <DataTable
          data={filteredData}
          columns={columns}
          keyExtractor={(item) => item.id}
          pageSize={5}
        />
      </div>
    </SectionCard>
  )
}
