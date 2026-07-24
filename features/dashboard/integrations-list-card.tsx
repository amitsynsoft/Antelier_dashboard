"use client"

import * as React from "react"
import Image from "next/image"
import { integrationsDashboardMock } from "@/mock/dashboard-data"
import { ArrowRight, CheckCircle2, Plus } from "lucide-react"

export function IntegrationsListCard() {
  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs space-y-4 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-foreground">Integrations</h3>
        <a
          href="#integrations"
          className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
        >
          <span>View all</span>
        </a>
      </div>

      {/* List of Integrations */}
      <div className="space-y-3">
        {integrationsDashboardMock.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/20 p-3 hover:bg-muted/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              {/* Integration Brand Badge */}
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background border border-border/60 shadow-2xs p-1 relative">
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-foreground">
                {item.name}
              </span>
            </div>

            {item.connected ? (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <span>Connected</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
            ) : (
              <button
                type="button"
                className="cursor-pointer inline-flex items-center gap-1 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground shadow-2xs hover:bg-muted transition-colors"
              >
                <span>Connect</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
