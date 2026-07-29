"use client"

import * as React from "react"
import Image from "next/image"
import { notify } from "@/lib/toast"
import { AppPage, PageHeader } from "@/components/layout/app-page"
import { useWorkspace } from "@/context/workspace-context"
import {
  INTEGRATIONS_CATALOG,
  IntegrationDefinition,
} from "../integrations/data/integrations-data"
import { OAuthModal } from "../integrations/components/oauth-modal"
import { IntegrationLogsModal } from "../integrations/components/integration-logs-modal"
import { IntegrationPromptStudioModal } from "../integrations/components/integration-prompt-studio-modal"
import {
  Plug,
  Search,
  Sliders,
  Sparkles,
  RefreshCw,
  Power,
  Ban,
  AlertTriangle,
  CheckCircle2,
  Lock,
} from "lucide-react"

export function IntegrationsView() {
  const {
    isIntegrationConnected,
    isIntegrationEnabled,
    toggleIntegrationEnabled,
    getIntegrationAccount,
    disconnectIntegration,
  } = useWorkspace()

  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All")

  // Modal states
  const [selectedOAuthIntegration, setSelectedOAuthIntegration] =
    React.useState<IntegrationDefinition | null>(null)
  const [oauthStep, setOauthStep] = React.useState<1 | 4 | 5>(1)
  const [isOAuthOpen, setIsOAuthOpen] = React.useState(false)

  const [selectedLogsIntegration, setSelectedLogsIntegration] =
    React.useState<IntegrationDefinition | null>(null)
  const [isLogsOpen, setIsLogsOpen] = React.useState(false)

  const [selectedPromptStudioIntegration, setSelectedPromptStudioIntegration] =
    React.useState<IntegrationDefinition | null>(null)
  const [isPromptStudioOpen, setIsPromptStudioOpen] = React.useState(false)

  const categories = [
    "All",
    "CRM & Sales",
    "Messaging & Chat",
    "Voice & AI",
    "Calendar & Email",
  ]

  const filteredIntegrations = INTEGRATIONS_CATALOG.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const openConnectModal = (item: IntegrationDefinition) => {
    setSelectedOAuthIntegration(item)
    setOauthStep(1)
    setIsOAuthOpen(true)
  }

  const openConfigureModal = (item: IntegrationDefinition) => {
    setSelectedOAuthIntegration(item)
    setOauthStep(4)
    setIsOAuthOpen(true)
  }

  const openLogsModal = (id: string) => {
    const target = INTEGRATIONS_CATALOG.find((item) => item.id === id)
    if (target) {
      setSelectedLogsIntegration(target)
      setIsLogsOpen(true)
    }
  }

  const openPromptStudioModal = (item: IntegrationDefinition) => {
    setSelectedPromptStudioIntegration(item)
    setIsPromptStudioOpen(true)
  }

  const handleDisconnect = (item: IntegrationDefinition) => {
    disconnectIntegration(item.id)
    notify.warning(`Disconnected ${item.name}`, {
      description: `Removed OAuth tokens and active webhooks for ${item.name}.`,
    })
  }

  const handleToggleEnable = (item: IntegrationDefinition) => {
    const nextState = !isIntegrationEnabled(item.id)
    toggleIntegrationEnabled(item.id)
    if (nextState) {
      notify.success(`Enabled ${item.name} for Workspace`, {
        description: `You can now connect your ${item.name} account.`,
      })
    } else {
      notify.info(`Disabled ${item.name}`, {
        description: `${item.name} is now disabled for workspace triggers.`,
      })
    }
  }

  return (
    <AppPage>
      <PageHeader
        title="Integrations & Channel Operations"
        subtitle="Manage enabled workspace channels and connect third-party CRMs, email tools, messaging platforms, and AI voice engines."
        icon={<Plug className="h-5 w-5" />}
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col items-stretch justify-between gap-4 rounded-2xl border border-border/70 bg-card p-4 shadow-2xs md:flex-row md:items-center">
        {/* Category Tabs */}
        <div className="flex scrollbar-none items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "border border-border/40 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative min-w-[240px]">
          <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search integrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-xl border border-input bg-background pr-3 pl-9 text-xs font-medium text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredIntegrations.map((item) => {
          const isEnabled = isIntegrationEnabled(item.id)
          const isConnected = isEnabled && isIntegrationConnected(item.id)
          const connectedAccount = getIntegrationAccount(item.id)
          const isErrorState = connectedAccount === "error"

          return (
            <div
              key={item.id}
              className={`flex flex-col justify-between space-y-5 rounded-3xl border bg-card p-6 transition-all duration-200 ${
                !isEnabled
                  ? "border-border/40 bg-muted/10 opacity-75 hover:opacity-100 hover:border-border/70"
                  : isErrorState
                  ? "border-rose-500/40 bg-rose-500/5 shadow-sm"
                  : isConnected
                  ? "border-emerald-500/40 shadow-sm ring-1 ring-emerald-500/10"
                  : "border-primary/40 bg-card shadow-2xs hover:border-primary"
              }`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border p-2.5 shadow-2xs transition-all"
                      style={{
                        backgroundColor: item.accentBg,
                        borderColor: `${item.brandColor}40`,
                      }}
                    >
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={32}
                        height={32}
                        className="h-7 w-7 object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground">
                        {item.name}
                      </h3>
                      <span className="block text-[10px] font-semibold text-muted-foreground">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Visual State Badges */}
                  {!isEnabled ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[11px] font-bold text-muted-foreground">
                      <Lock className="h-3 w-3" />
                      <span>Disabled</span>
                    </span>
                  ) : isConnected ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                      <span>Connected</span>
                    </span>
                  ) : isErrorState ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-[11px] font-bold text-rose-600 dark:text-rose-400">
                      <AlertTriangle className="h-3 w-3" />
                      <span>Connection Error</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                      <span>Not Connected</span>
                    </span>
                  )}
                </div>

                <p className="text-xs leading-relaxed text-muted-foreground">
                  {item.shortDescription}
                </p>

                {/* State Details Panel */}
                {!isEnabled ? (
                  <div className="rounded-xl border border-border/50 bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">Not Enabled for Workspace. </span>
                    Enable this integration first to allow channel connection and workflow routing.
                  </div>
                ) : isConnected ? (
                  <div className="space-y-1 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-muted-foreground">
                        Account:
                      </span>
                      <span className="max-w-[170px] truncate font-bold text-foreground">
                        {connectedAccount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-muted-foreground">
                        Health:
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        ● Operational 100%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-muted-foreground">
                        Last Sync:
                      </span>
                      <span className="text-muted-foreground">Just now</span>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">Enabled for Workspace. </span>
                    Click Connect Integration below to authorize your third-party account.
                  </div>
                )}
              </div>

              {/* Card Action Controls */}
              <div className="space-y-2 border-t border-border/50 pt-3">
                {!isEnabled ? (
                  <button
                    type="button"
                    onClick={() => handleToggleEnable(item)}
                    className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-bold text-foreground shadow-2xs transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Enable Integration</span>
                  </button>
                ) : isConnected ? (
                  <div className="space-y-2">
                    {item.hasPromptStudio !== false ? (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => openConfigureModal(item)}
                          className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-bold text-foreground transition-colors hover:bg-muted"
                        >
                          <Sliders className="h-3.5 w-3.5 text-primary" />
                          <span>Configure</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => openPromptStudioModal(item)}
                          className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-bold text-foreground transition-colors hover:bg-muted hover:border-primary/40"
                        >
                          <Sparkles className="h-3.5 w-3.5 text-primary" />
                          <span>Prompt Studio</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => openConfigureModal(item)}
                        className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-bold text-foreground transition-colors hover:bg-muted"
                      >
                        <Sliders className="h-3.5 w-3.5 text-primary" />
                        <span>Configure</span>
                      </button>
                    )}

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <button
                        type="button"
                        onClick={() => openConnectModal(item)}
                        className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline cursor-pointer"
                      >
                        <RefreshCw className="h-3 w-3" />
                        <span>Reconnect OAuth</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDisconnect(item)}
                        className="flex items-center gap-1 text-[11px] font-semibold text-red-500 hover:underline cursor-pointer"
                      >
                        <Power className="h-3 w-3" />
                        <span>Disconnect</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => openConnectModal(item)}
                      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-2xs transition-all hover:opacity-95"
                    >
                      <Plug className="h-4 w-4" />
                      <span>Connect Integration</span>
                    </button>

                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => handleToggleEnable(item)}
                        className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <Ban className="h-3 w-3" />
                        <span>Disable Integration</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* OAuth Connection Modal */}
      <OAuthModal
        integration={selectedOAuthIntegration}
        isOpen={isOAuthOpen}
        initialStep={oauthStep}
        onClose={() => setIsOAuthOpen(false)}
        onOpenLogs={(id) => openLogsModal(id)}
      />

      {/* Integration Logs Drawer */}
      <IntegrationLogsModal
        integration={selectedLogsIntegration}
        isOpen={isLogsOpen}
        onClose={() => setIsLogsOpen(false)}
      />

      {/* Integration Prompt Studio Modal */}
      <IntegrationPromptStudioModal
        integration={selectedPromptStudioIntegration}
        isOpen={isPromptStudioOpen}
        onClose={() => setIsPromptStudioOpen(false)}
      />
    </AppPage>
  )
}
