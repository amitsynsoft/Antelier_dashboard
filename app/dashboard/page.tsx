"use client"

import * as React from "react"
import { AppShell } from "@/components/shell/app-shell"
import { AppPage } from "@/components/layout/app-page"
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
      return (
        <AppPage>
          <BusinessProfileView />
        </AppPage>
      )
    }
    if (currentHash === "#knowledge-base") {
      return (
        <AppPage>
          <KnowledgeBaseView />
        </AppPage>
      )
    }
    if (
      currentHash === "#prompt-studio" ||
      currentHash === "#ai-instructions"
    ) {
      return (
        <AppPage>
          <AiAssistantView />
        </AppPage>
      )
    }
    if (currentHash === "#integrations") {
      return (
        <AppPage>
          <IntegrationsView />
        </AppPage>
      )
    }

    return (
      <AppPage>
        {/* Welcome Header */}
        <WelcomeHeader
          onTestAi={() =>
            triggerToast("Opening AI Assistant test environment...")
          }
        />

        {/* Row 1: Workspace Configuration Card (92% Complete) */}
        <WorkspaceCompletionCard />

        {/* Row 2: 5 High-Impact KPI Metric Cards */}
        <KpiGrid />

        {/* Row 3: 3-Column Grid (Quick Actions, AI Assistant Overview, Integrations) */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          {/* <QuickActionsGrid /> */}
          <AiAssistantOverviewCard />
          <IntegrationsListCard />
        </div>

        {/* Row 4: 3-Column Grid (Knowledge Base Chart, Prompt Studio Summary, Recent Activity) */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          <KnowledgeBaseChartCard />
          <PromptStudioSummaryCard />
          <RecentActivityFeed />
        </div>

        {/* Row 5: Bottom AI Test Banner */}
        <BottomTestBanner
          onTestAi={() => triggerToast("Launching AI Assistant simulator...")}
        />
      </AppPage>
    )
  }

  return (
    <AppShell>
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed right-6 bottom-6 z-50 flex animate-in items-center gap-3 rounded-xl border border-primary/30 bg-popover px-4.5 py-3 text-foreground shadow-2xl slide-in-from-bottom-5">
          <div className="h-2.5 w-2.5 animate-ping rounded-full bg-emerald-500" />
          <span className="text-sm font-semibold">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 cursor-pointer text-sm font-bold text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>
      )}

      {renderContent()}
    </AppShell>
  )
}
