"use client"

import * as React from "react"
import { SectionCard } from "@/components/ui/section-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { connectedIntegrationsMock } from "@/mock/dashboard-data"
import { ConnectedIntegration } from "@/types"
import {
  Grid,
  Database,
  Megaphone,
  MessageSquare,
  HardDrive,
  LifeBuoy,
  Zap,
  CheckCircle2,
  AlertCircle,
  RefreshCcw,
  LucideIcon
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Database,
  Megaphone,
  MessageSquare,
  HardDrive,
  LifeBuoy,
  Zap
}

export function IntegrationsGrid() {
  return (
    <SectionCard
      title="Connected Enterprise Ecosystem"
      subtitle="Bi-directional CRM, ERP, & Communication pipeline health"
      icon={Grid}
      action={
        <span className="text-xs font-mono font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          6 Active Connectors
        </span>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {connectedIntegrationsMock.map((item) => {
          const Icon = iconMap[item.icon] || Database

          return (
            <div
              key={item.id}
              className="group p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-background border border-border/60 text-foreground group-hover:scale-105 transition-transform">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground tracking-tight">
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-muted-foreground uppercase font-mono">
                      {item.category}
                    </span>
                  </div>
                </div>

                {item.status === "healthy" && (
                  <StatusBadge variant="success" showDot={false}>
                    Healthy
                  </StatusBadge>
                )}
                {item.status === "syncing" && (
                  <StatusBadge variant="cyan" pulse showDot={false}>
                    Syncing
                  </StatusBadge>
                )}
                {item.status === "degraded" && (
                  <StatusBadge variant="warning" showDot={false}>
                    Degraded
                  </StatusBadge>
                )}
              </div>

              <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span>Latency: <strong className="text-foreground">{item.latencyMs}ms</strong></span>
                <span>{item.eventsProcessed}</span>
              </div>
            </div>
          )
        })}
      </div>
    </SectionCard>
  )
}
