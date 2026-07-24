"use client"

import * as React from "react"
import { AppShell } from "@/components/shell/app-shell"
import { WelcomeHeader } from "@/features/dashboard/welcome-header"
import { WorkspaceCompletionCard } from "@/features/dashboard/workspace-completion-card"
import { KpiGrid } from "@/features/dashboard/kpi-grid"
import { QuickActionsGrid } from "@/features/dashboard/quick-actions-grid"
import { AiAssistantOverviewCard } from "@/features/dashboard/ai-assistant-overview-card"
import { IntegrationsListCard } from "@/features/dashboard/integrations-list-card"
import { KnowledgeBaseChartCard } from "@/features/dashboard/knowledge-base-chart-card"
import { PromptStudioSummaryCard } from "@/features/dashboard/prompt-studio-summary-card"
import { RecentActivityFeed } from "@/features/dashboard/recent-activity-feed"
import { BottomTestBanner } from "@/features/dashboard/bottom-test-banner"

// Settings Sub-views
import { BusinessProfileView } from "@/features/settings/business-profile-view"
import { KnowledgeBaseView } from "@/features/settings/knowledge-base-view"
import { AiAssistantView } from "@/features/settings/ai-assistant-view"
import { IntegrationsView } from "@/features/settings/integrations-view"

export default function DashboardPage() {
  const [toastMessage, setToastMessage] = React.useState<string | null>(null)
  const [currentHash, setCurrentHash] = React.useState<string>("")

  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash)
    }
    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const renderContent = () => {
    if (currentHash === "#business-profile") {
      return <BusinessProfileView />
    }
    if (currentHash === "#knowledge-base") {
      return <KnowledgeBaseView />
    }
    if (currentHash === "#prompt-studio" || currentHash === "#ai-instructions") {
      return <AiAssistantView />
    }
    if (currentHash === "#integrations") {
      return <IntegrationsView />
    }

    return (
      <div className="space-y-6 max-w-7xl mx-auto pb-8 animate-in fade-in-50">
        {/* Welcome Header */}
        <WelcomeHeader onTestAi={() => triggerToast("Opening AI Assistant test environment...")} />

        {/* Row 1: Workspace Configuration Card (92% Complete) + AI Assistant Status Card */}
        <WorkspaceCompletionCard />

        {/* Row 2: 5 High-Impact KPI Metric Cards */}
        <KpiGrid />

        {/* Row 3: 3-Column Grid (Quick Actions, AI Assistant Overview, Integrations) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          <QuickActionsGrid />
          <AiAssistantOverviewCard />
          <IntegrationsListCard />
        </div>

        {/* Row 4: 3-Column Grid (Knowledge Base Chart, Prompt Studio Summary, Recent Activity) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          <KnowledgeBaseChartCard />
          <PromptStudioSummaryCard />
          <RecentActivityFeed />
        </div>

        {/* Row 5: Bottom AI Test Banner */}
        <BottomTestBanner onTestAi={() => triggerToast("Launching AI Assistant simulator...")} />
      </div>
    )
  }

  return (
    <AppShell>
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4.5 py-3 rounded-xl border border-primary/30 bg-popover text-foreground shadow-2xl animate-in slide-in-from-bottom-5">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-sm font-semibold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-sm text-muted-foreground hover:text-foreground ml-2 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {renderContent()}
    </AppShell>
  )
}
