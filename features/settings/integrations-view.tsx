"use client"

import * as React from "react"
import Image from "next/image"
import { AppPage, PageHeader } from "@/components/layout/app-page"
import { integrationsDashboardMock } from "@/mock/dashboard-data"
import { Plug, Check } from "lucide-react"

export function IntegrationsView() {
  const [integrations, setIntegrations] = React.useState(integrationsDashboardMock)
  const [toastMsg, setToastMsg] = React.useState<string | null>(null)

  const toggleConnection = (id: string, name: string) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, connected: !item.connected } : item
      )
    )
    setToastMsg(`Updated connection status for ${name}`)
    setTimeout(() => setToastMsg(null), 3000)
  }

  return (
    <AppPage>
      <PageHeader
        title="Integrations & Data Pipelines"
        subtitle="Connect third-party enterprise tools, CRMs, messaging channels, and database webhooks."
        icon={<Plug className="h-5 w-5" />}
      />

      {toastMsg && (
        <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold shadow-2xs">
          {toastMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-3xl border border-border/70 bg-card shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted border border-border/60 p-2">
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={36}
                  height={36}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">{item.name}</h3>
                <span
                  className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-full border mt-0.5 ${
                    item.connected
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                      : "bg-muted text-muted-foreground border-border"
                  }`}
                >
                  {item.connected ? "Connected & Active" : "Disconnected"}
                </span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Sync intake submissions, lead scoring, and appointment bookings with {item.name}.
            </p>

            <button
              type="button"
              onClick={() => toggleConnection(item.id, item.name)}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                item.connected
                  ? "border border-border bg-card text-foreground hover:bg-muted"
                  : "bg-primary text-primary-foreground shadow-2xs hover:opacity-95"
              }`}
            >
              {item.connected ? "Configure Integration" : "Connect Integration"}
            </button>
          </div>
        ))}
      </div>
    </AppPage>
  )
}
