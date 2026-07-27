"use client"

import * as React from "react"
import Image from "next/image"
import { useWorkspace } from "@/context/workspace-context"
import { INTEGRATIONS_CATALOG, IntegrationDefinition } from "@/features/integrations/data/integrations-data"
import { OAuthModal } from "@/features/integrations/components/oauth-modal"
import { IntegrationLogsModal } from "@/features/integrations/components/integration-logs-modal"
import {
  Grid,
  Plug,
  Sliders,
} from "lucide-react"

interface IntegrationsFormProps {
  onSavedNotice?: () => void
  showTitle?: boolean
}

export function IntegrationsForm({
  onSavedNotice,
  showTitle = false,
}: IntegrationsFormProps) {
  const {
    isIntegrationConnected,
    getIntegrationAccount,
    disconnectIntegration
  } = useWorkspace()

  // Onboarding wizard strictly displays 4 key integrations
  const wizardIntegrationIds = ["hubspot", "gmail", "whatsapp", "voice_agent"]
  const wizardIntegrations = INTEGRATIONS_CATALOG.filter((item) =>
    wizardIntegrationIds.includes(item.id)
  )

  const [selectedModalItem, setSelectedModalItem] = React.useState<IntegrationDefinition | null>(null)
  const [modalStep, setModalStep] = React.useState<1 | 4 | 5>(1)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const [selectedLogsItem, setSelectedLogsItem] = React.useState<IntegrationDefinition | null>(null)
  const [isLogsOpen, setIsLogsOpen] = React.useState(false)

  const openConnectModal = (item: IntegrationDefinition) => {
    setSelectedModalItem(item)
    setModalStep(1)
    setIsModalOpen(true)
    onSavedNotice?.()
  }

  const openConfigureModal = (item: IntegrationDefinition) => {
    setSelectedModalItem(item)
    setModalStep(4)
    setIsModalOpen(true)
    onSavedNotice?.()
  }

  const openLogsModal = (id: string) => {
    const target = INTEGRATIONS_CATALOG.find((item) => item.id === id)
    if (target) {
      setSelectedLogsItem(target)
      setIsLogsOpen(true)
    }
  }

  return (
    <div className="space-y-6">
      {showTitle && (
        <div className="space-y-1 border-b border-border/50 pb-4">
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
            <Grid className="h-5 w-5 text-primary" />
            Workspace Core Connectors
          </h2>
          <p className="text-sm text-muted-foreground">
            Connect your primary CRM, email ingestion, messaging, and AI voice channels.
          </p>
        </div>
      )}

      {/* 4 Core Integration Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {wizardIntegrations.map((item) => {
          const isConnected = isIntegrationConnected(item.id)
          const connectedAccount = getIntegrationAccount(item.id)

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 bg-muted/20 ${
                isConnected
                  ? "border-emerald-500/40 bg-emerald-500/5 shadow-xs"
                  : "border-border/60 hover:border-border"
              }`}
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl border p-2 shrink-0 bg-background shadow-2xs"
                      style={{ borderColor: `${item.brandColor}40` }}
                    >
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={28}
                        height={28}
                        className="h-6 w-6 object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{item.name}</h4>
                      <span className="text-xs text-muted-foreground font-medium">{item.category}</span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full border ${
                      isConnected
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                        : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {isConnected && <span className="h-2 w-2 rounded-full bg-emerald-500" />}
                    {isConnected ? "Connected" : "Not Connected"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.shortDescription}
                </p>

                {isConnected && (
                  <div className="p-3 rounded-xl bg-background/80 border border-emerald-500/20 text-xs font-mono flex items-center justify-between">
                    <span className="text-muted-foreground">Account:</span>
                    <span className="font-bold text-foreground truncate max-w-[180px]">
                      {connectedAccount}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2.5 pt-3 border-t border-border/40">
                {isConnected ? (
                  <>
                    <button
                      type="button"
                      onClick={() => openConfigureModal(item)}
                      className="flex-1 py-2.5 px-3 rounded-xl border border-border bg-background hover:bg-muted text-xs font-bold text-foreground flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Sliders className="h-4 w-4 text-primary" />
                      <span>Configure</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => disconnectIntegration(item.id)}
                      className="py-2.5 px-3 rounded-xl border border-border bg-background hover:bg-red-500/10 text-xs font-bold text-red-500 transition-colors cursor-pointer"
                    >
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => openConnectModal(item)}
                    className="w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold transition-all hover:opacity-95 shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plug className="h-4 w-4" />
                    <span>Connect OAuth</span>
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* OAuth Connection Modal inside Wizard */}
      <OAuthModal
        integration={selectedModalItem}
        isOpen={isModalOpen}
        initialStep={modalStep}
        onClose={() => setIsModalOpen(false)}
        onOpenLogs={(id) => openLogsModal(id)}
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
