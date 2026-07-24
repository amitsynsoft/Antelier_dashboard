"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { AppPage, PageHeader } from "@/components/layout/app-page"
import { activityCenterMock, ActivityLogEntry } from "@/mock/dashboard-data"
import {
  Clock,
  Search,
  Download,
  X,
  GitFork,
  ShieldCheck,
  Bot,
} from "lucide-react"

export function ActivityCenterView() {
  const [activeTab, setActiveTab] = React.useState<"AI Activity" | "Workflow Executions" | "Audit History">(
    "AI Activity"
  )
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedEntry, setSelectedEntry] = React.useState<ActivityLogEntry | null>(null)
  const [exportToast, setExportToast] = React.useState<string | null>(null)

  const filteredLogs = activityCenterMock.filter((item) => {
    const matchesTab = item.category === activeTab
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.detail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.actor.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  const handleExportCsv = () => {
    setExportToast("Exported 5 activity log entries to CSV!")
    setTimeout(() => setExportToast(null), 3000)
  }

  return (
    <AppPage>
      {/* Standardized Page Header */}
      <PageHeader
        title="Unified Activity Center"
        subtitle="Real-time audit trails for AI inference, automation workflow executions, and security events."
        icon={<Clock className="h-5 w-5" />}
        actions={
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs sm:text-sm font-semibold text-foreground shadow-2xs hover:bg-muted transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
        }
      />

      {/* Export Toast Feedback */}
      {exportToast && (
        <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold shadow-2xs">
          {exportToast}
        </div>
      )}

      {/* Main Tabs & Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          {(["AI Activity", "Workflow Executions", "Audit History"] as const).map((tab) => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab.toLowerCase()}...`}
            className="w-full rounded-xl border border-border/70 bg-muted/40 pl-9 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Activity Logs Feed & Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className={selectedEntry ? "lg:col-span-7" : "lg:col-span-12"}>
          <div className="rounded-3xl border border-border/70 bg-card shadow-xs overflow-hidden">
            <div className="divide-y divide-border/50">
              {filteredLogs.length === 0 ? (
                <div className="p-12 text-center text-xs text-muted-foreground">
                  No log entries found for "{searchQuery}" in {activeTab}.
                </div>
              ) : (
                filteredLogs.map((log) => {
                  const isSelected = selectedEntry?.id === log.id
                  return (
                    <div
                      key={log.id}
                      onClick={() => setSelectedEntry(log)}
                      className={`p-4 transition-colors cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? "bg-primary/10"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 overflow-hidden">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted border border-border/60">
                          {log.category === "AI Activity" ? (
                            <Bot className="h-4.5 w-4.5 text-primary" />
                          ) : log.category === "Workflow Executions" ? (
                            <GitFork className="h-4.5 w-4.5 text-amber-500" />
                          ) : (
                            <ShieldCheck className="h-4.5 w-4.5 text-emerald-500" />
                          )}
                        </div>

                        <div className="flex flex-col text-left overflow-hidden space-y-0.5">
                          <span className="text-xs font-bold text-foreground truncate">
                            {log.title}
                          </span>
                          <span className="text-[11px] text-muted-foreground truncate">
                            {log.detail}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] font-mono text-muted-foreground">
                            {log.timestamp}
                          </span>
                          <span className="text-[10px] font-semibold text-primary">
                            {log.actor}
                          </span>
                        </div>

                        <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
                          {log.status}
                        </span>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>

        {/* LOG DETAIL DRAWER (5 cols) */}
        {selectedEntry && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 rounded-3xl border border-border/70 bg-card p-5 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                  Log Inspection Drawer
                </span>
                <h3 className="text-sm font-bold text-foreground mt-0.5">
                  {selectedEntry.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEntry(null)}
                className="text-muted-foreground hover:text-foreground p-1 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-2xl border border-border/60 bg-muted/20 space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Detailed Payload
                </span>
                <p className="text-xs font-semibold text-foreground leading-relaxed">
                  {selectedEntry.detail}
                </p>
              </div>

              <div className="p-3 rounded-2xl border border-border/60 bg-muted/20 space-y-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Execution Metadata
                </span>
                <div className="space-y-1.5 text-xs">
                  {Object.entries(selectedEntry.metadata).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between border-b border-border/30 pb-1 last:border-0">
                      <span className="text-muted-foreground font-medium">{key}:</span>
                      <span className="font-mono font-bold text-foreground">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </AppPage>
  )
}
