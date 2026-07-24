"use client"

import * as React from "react"
import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { IntegrationsForm } from "@/components/forms/integrations-form"
import { Grid, Check } from "lucide-react"

export function IntegrationsView() {
  const [savedNotice, setSavedNotice] = React.useState(false)

  const triggerSaveNotice = () => {
    setSavedNotice(true)
    setTimeout(() => setSavedNotice(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8 animate-in fade-in-50">
      <PageHeader
        title="Enterprise Integrations & Webhooks"
        description="Connect Salesforce, HubSpot, Slack, and configure real-time REST webhook listeners."
        badge={
          savedNotice && (
            <span className="px-2.5 py-0.5 text-xs font-mono font-semibold rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1 animate-pulse">
              <Check className="h-3 w-3" />
              Connectors Synced
            </span>
          )
        }
      />

      <SectionCard>
        <IntegrationsForm onSavedNotice={triggerSaveNotice} />
      </SectionCard>
    </div>
  )
}
