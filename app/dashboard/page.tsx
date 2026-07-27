"use client"

import * as React from "react"
import { notify } from "@/lib/toast"
import { AppShell } from "@/components/shell/app-shell"
import { AppPage } from "@/components/layout/app-page"
import { WelcomeHeader } from "@/features/dashboard/welcome-header"
import { WorkspaceCompletionCard } from "@/features/dashboard/workspace-completion-card"

// Intake Operational Analytics Feature Suite
import {
  IntakeOverviewCards,
  IntakeTrendChart,
  IntakeSourceBreakdown,
  IntentCategoriesCard,
  RecentIntakesTable,
} from "@/features/dashboard/intake-analytics"

// Settings Sub-views for Hash Navigation
import { BusinessProfileView } from "@/features/settings/business-profile-view"
import { KnowledgeBaseView } from "@/features/settings/knowledge-base-view"
import { AiAssistantView } from "@/features/settings/ai-assistant-view"
import { IntegrationsView } from "@/features/settings/integrations-view"

export default function DashboardPage() {
  const [currentHash, setCurrentHash] = React.useState<string>("")

  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash)
    }
    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

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
            notify.info("Opening AI Assistant simulator environment...", {
              description:
                "Interactive voice and chat testing panel launching.",
            })
          }
        />

        {/* Section 1: Hero Section (Conditional: Only visible when workspace setup < 100%) */}
        <WorkspaceCompletionCard />

        {/* Section 2: Intake Overview Touchpoint Cards */}
        <IntakeOverviewCards />

        {/* Section 3: Intake Trend Chart & Source Breakdown */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <IntakeTrendChart />
          </div>
          <div className="lg:col-span-1">
            <IntakeSourceBreakdown />
          </div>
        </div>

        {/* Section 4: Intent Categories Classification */}
        {/* <IntentCategoriesCard /> */}

        {/* Section 5: Recent Intakes Live Operational Log Table */}
        <RecentIntakesTable />
      </AppPage>
    )
  }

  return <AppShell>{renderContent()}</AppShell>
}
