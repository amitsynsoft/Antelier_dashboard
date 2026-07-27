"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useWorkspace } from "@/context/workspace-context"
import { INTEGRATIONS_CATALOG, IntegrationDefinition } from "@/features/integrations/data/integrations-data"
import { OAuthModal } from "@/features/integrations/components/oauth-modal"
import { IntegrationLogsModal } from "@/features/integrations/components/integration-logs-modal"
import { ArrowRight, Sliders, Terminal, Plug } from "lucide-react"

export function IntegrationsListCard() {
  const {
    isIntegrationConnected,
    getIntegrationAccount,
    disconnectIntegration
  } = useWorkspace()

  // Top featured integrations on dashboard
  const featuredIds = ["hubspot", "gmail", "whatsapp", "voice_agent", "gcal"]
  const featuredIntegrations = INTEGRATIONS_CATALOG.filter((item) =>
    featuredIds.includes(item.id)
  )

  const [selectedOAuthItem, setSelectedOAuthItem] = React.useState<IntegrationDefinition | null>(null)
  const [oauthStep, setOauthStep] = React.useState<1 | 4 | 5>(1)
  const [isOAuthOpen, setIsOAuthOpen] = React.useState(false)

  const [selectedLogsItem, setSelectedLogsItem] = React.useState<IntegrationDefinition | null>(null)
  const [isLogsOpen, setIsLogsOpen] = React.useState(false)

  const openConnect = (item: IntegrationDefinition) => {
    setSelectedOAuthItem(item)
    setOauthStep(1)
    setIsOAuthOpen(true)
  }

  const openConfigure = (item: IntegrationDefinition) => {
    setSelectedOAuthItem(item)
    setOauthStep(4)
    setIsOAuthOpen(true)
  }

  const openLogs = (id: string) => {
    const target = INTEGRATIONS_CATALOG.find((item) => item.id === id)
    if (target) {
      setSelectedLogsItem(target)
      setIsLogsOpen(true)
    }
  }

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs space-y-4 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-foreground">Integrations Status</h3>
          <p className="text-[11px] text-muted-foreground">Active OAuth connectors & sync health</p>
        </div>
        <Link
          href="/integrations"
          className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
        >
          <span>Manage all</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* List of Integrations */}
      <div className="space-y-2.5">
        {featuredIntegrations.map((item) => {
          const isConnected = isIntegrationConnected(item.id)
          const account = getIntegrationAccount(item.id)

          return (
            <div
              key={item.id}
              className={`flex items-center justify-between rounded-xl border p-2.5 transition-all ${
                isConnected
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-border/50 bg-muted/20 hover:bg-muted/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background border border-border/60 shadow-2xs p-1 relative overflow-hidden shrink-0">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={24}
                    height={24}
                    className="h-5 w-5 object-contain"
                    unoptimized
                  />
                </div>
                <div>
                  <span className="text-xs font-bold text-foreground block">
                    {item.name}
                  </span>
                  {isConnected && (
                    <span className="text-[10px] text-muted-foreground truncate max-w-[140px] block font-mono">
                      {account}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {isConnected ? (
                  <>
                    <button
                      type="button"
                      onClick={() => openLogs(item.id)}
                      title="View Logs"
                      className="p-1 rounded-md border border-border hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                    >
                      <Terminal className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openConfigure(item)}
                      className="inline-flex cursor-pointer items-center gap-1 px-2.5 py-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all"
                    >
                      <span>Connected</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => openConnect(item)}
                    className="cursor-pointer inline-flex items-center gap-1 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground shadow-2xs hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <span>Connect</span>
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* OAuth Connection Modal */}
      <OAuthModal
        integration={selectedOAuthItem}
        isOpen={isOAuthOpen}
        initialStep={oauthStep}
        onClose={() => setIsOAuthOpen(false)}
        onOpenLogs={(id) => openLogs(id)}
      />

      {/* Integration Logs Modal */}
      <IntegrationLogsModal
        integration={selectedLogsItem}
        isOpen={isLogsOpen}
        onClose={() => setIsLogsOpen(false)}
      />
    </div>
  )
}
