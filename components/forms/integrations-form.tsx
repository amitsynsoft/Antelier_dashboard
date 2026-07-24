"use client"

import * as React from "react"
import { useWorkspace } from "@/context/workspace-context"
import { Grid, Database, Megaphone, MessageSquare, Code, HardDrive, Check, Zap } from "lucide-react"

interface IntegrationsFormProps {
  onSavedNotice?: () => void
  showTitle?: boolean
}

export function IntegrationsForm({ onSavedNotice, showTitle = false }: IntegrationsFormProps) {
  const { state, updateIntegrations } = useWorkspace()
  const data = state.integrations

  const toggleIntegration = (key: keyof typeof data) => {
    if (typeof data[key] === "boolean") {
      updateIntegrations({ [key]: !data[key] })
      onSavedNotice?.()
    }
  }

  return (
    <div className="space-y-6">
      {showTitle && (
        <div className="space-y-1 pb-4 border-b border-border/50">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Grid className="h-5 w-5 text-primary" />
            Enterprise Integrations & Webhook Connectors
          </h2>
          <p className="text-xs text-muted-foreground">
            Connect AntelierHub to your CRM, Slack workspace, and data warehouse for real-time lead routing.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Salesforce Toggle */}
        <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-background border border-border/50 text-blue-500">
                <Database className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">Salesforce Enterprise CRM</h4>
                <span className="text-[10px] text-muted-foreground">Bi-directional lead sync</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={data.salesforce}
              onChange={() => toggleIntegration("salesforce")}
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
            />
          </div>

          {data.salesforce && (
            <div className="pt-2 border-t border-border/40 space-y-1">
              <label className="text-[11px] font-mono text-muted-foreground">Salesforce Org ID</label>
              <input
                type="text"
                value={data.salesforceOrgId || ""}
                onChange={(e) => {
                  updateIntegrations({ salesforceOrgId: e.target.value })
                  onSavedNotice?.()
                }}
                className="w-full h-8 px-2.5 text-xs font-mono bg-background border border-input rounded-md text-foreground"
              />
            </div>
          )}
        </div>

        {/* HubSpot Toggle */}
        <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-background border border-border/50 text-amber-500">
                <Megaphone className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">HubSpot Marketing Suite</h4>
                <span className="text-[10px] text-muted-foreground">Campaign attribution & scoring</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={data.hubspot}
              onChange={() => toggleIntegration("hubspot")}
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
            />
          </div>
        </div>

        {/* Slack Toggle */}
        <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-background border border-border/50 text-emerald-500">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">Slack Enterprise Grid</h4>
                <span className="text-[10px] text-muted-foreground">Instant intake SLA alerts</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={data.slack}
              onChange={() => toggleIntegration("slack")}
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
            />
          </div>

          {data.slack && (
            <div className="pt-2 border-t border-border/40 space-y-1">
              <label className="text-[11px] font-mono text-muted-foreground">Alert Channel</label>
              <input
                type="text"
                value={data.slackChannel || ""}
                onChange={(e) => {
                  updateIntegrations({ slackChannel: e.target.value })
                  onSavedNotice?.()
                }}
                className="w-full h-8 px-2.5 text-xs font-mono bg-background border border-input rounded-md text-foreground"
              />
            </div>
          )}
        </div>

        {/* Snowflake Toggle */}
        <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-background border border-border/50 text-cyan-500">
                <HardDrive className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">Snowflake Data Lake</h4>
                <span className="text-[10px] text-muted-foreground">Telemetry stream export</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={data.snowflake}
              onChange={() => toggleIntegration("snowflake")}
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Webhook Endpoint Configuration */}
      <div className="space-y-1.5 pt-2 border-t border-border/40">
        <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
          <Code className="h-3.5 w-3.5 text-primary" />
          Primary Webhook Listener Endpoint (REST / HTTP POST)
        </label>
        <input
          type="url"
          value={data.webhookUrl}
          onChange={(e) => {
            updateIntegrations({ webhookUrl: e.target.value })
            onSavedNotice?.()
          }}
          placeholder="https://api.yourcompany.com/v1/webhooks/intake"
          className="w-full h-9 px-3 text-xs font-mono bg-muted/30 border border-input rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
        />
      </div>
    </div>
  )
}
