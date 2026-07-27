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
import {
  Plug,
  Search,
  Sliders,
  Terminal,
  RefreshCw,
  Power,
} from "lucide-react"

export function IntegrationsView() {
  const {
    isIntegrationConnected,
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

  const handleDisconnect = (item: IntegrationDefinition) => {
    disconnectIntegration(item.id)
    notify.warning(`Disconnected ${item.name}`, {
      description: `Removed OAuth tokens and active webhooks for ${item.name}.`,
    })
  }

  return (
    <AppPage>
      <PageHeader
        title="Integrations & OAuth Connections"
        subtitle="Connect third-party enterprise tools, CRMs, messaging channels, and AI voice engines via simulated OAuth 2.0."
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
          const isConnected = isIntegrationConnected(item.id)
          const connectedAccount = getIntegrationAccount(item.id)

          return (
            <div
              key={item.id}
              className={`flex flex-col justify-between space-y-5 rounded-3xl border bg-card p-6 transition-all duration-200 ${
                isConnected
                  ? "border-emerald-500/40 shadow-sm ring-1 ring-emerald-500/10"
                  : "border-border/70 shadow-2xs hover:border-border"
              }`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border p-2.5 shadow-2xs"
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

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${
                      isConnected
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "border-border bg-muted text-muted-foreground"
                    }`}
                  >
                    {isConnected && (
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    )}
                    {isConnected ? "Connected" : "Disconnected"}
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-muted-foreground">
                  {item.shortDescription}
                </p>

                {/* Connected Details snippet */}
                {isConnected && (
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
                )}
              </div>

              {/* Card Actions */}
              <div className="space-y-2 border-t border-border/50 pt-2">
                {isConnected ? (
                  <div className="space-y-2">
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
                        onClick={() => openLogsModal(item.id)}
                        className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-bold text-foreground transition-colors hover:bg-muted"
                      >
                        <Terminal className="h-3.5 w-3.5 text-blue-500" />
                        <span>View Logs</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <button
                        type="button"
                        onClick={() => openConnectModal(item)}
                        className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                      >
                        <RefreshCw className="h-3 w-3" />
                        <span>Reconnect OAuth</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDisconnect(item)}
                        className="flex items-center gap-1 text-[11px] font-semibold text-red-500 hover:underline"
                      >
                        <Power className="h-3 w-3" />
                        <span>Disconnect</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => openConnectModal(item)}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-2xs transition-all hover:opacity-95"
                  >
                    <Plug className="h-4 w-4" />
                    <span>Connect Integration</span>
                  </button>
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
    </AppPage>
  )
}
