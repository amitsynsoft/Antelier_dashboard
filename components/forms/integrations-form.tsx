"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useWorkspace } from "@/context/workspace-context"
import { INTEGRATIONS_CATALOG } from "@/features/integrations/data/integrations-data"
import { Grid, Check, Sparkles } from "lucide-react"

interface IntegrationsFormProps {
  onSavedNotice?: () => void
  showTitle?: boolean
}

export function IntegrationsForm({
  onSavedNotice,
  showTitle = false,
}: IntegrationsFormProps) {
  const { isIntegrationEnabled, toggleIntegrationEnabled } = useWorkspace()

  // Onboarding wizard displays 4 key integrations to choose from
  const wizardIntegrationIds = ["hubspot", "gmail", "whatsapp", "voice_agent"]
  const wizardIntegrations = INTEGRATIONS_CATALOG.filter((item) =>
    wizardIntegrationIds.includes(item.id)
  )

  const handleToggle = (id: string) => {
    toggleIntegrationEnabled(id)
    onSavedNotice?.()
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {showTitle && (
        <div className="space-y-1 border-b border-border/50 pb-3 sm:pb-4">
          <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold tracking-tight text-foreground">
            <Grid className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-primary shrink-0" />
            <span>Select Workspace Integrations</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Choose which communication channels and tools to enable for your workspace.
          </p>
        </div>
      )}

      {/* Info Notice Banner */}
      <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl border border-primary/20 bg-primary/5 p-3 sm:p-4 text-xs sm:text-sm leading-relaxed text-foreground">
        <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10 text-primary">
          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </div>
        <div>
          <span className="font-bold text-foreground">No authentication required now. </span>
          Select the integrations your workspace intends to use. You can authenticate OAuth accounts and API keys anytime from <span className="font-semibold text-primary">Dashboard → Integrations</span>.
        </div>
      </div>

      {/* 4 Core Integration Cards */}
      <div className="grid grid-cols-1 gap-3.5 sm:gap-5 sm:grid-cols-2">
        {wizardIntegrations.map((item) => {
          const isEnabled = isIntegrationEnabled(item.id)

          return (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`group relative flex cursor-pointer flex-col justify-between space-y-3 sm:space-y-4 rounded-xl sm:rounded-2xl border p-3.5 sm:p-5 transition-all duration-200 select-none ${
                isEnabled
                  ? "border-primary bg-gradient-to-br from-primary/5 via-card to-card shadow-sm ring-1 ring-primary/20"
                  : "border-border/70 bg-card hover:border-border hover:shadow-2xs"
              }`}
            >
              <div className="space-y-2.5 sm:space-y-3.5">
                {/* Top Row: Icon, Title & Custom Switch */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div
                      className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border p-2 sm:p-2.5 bg-background shadow-2xs"
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
                        className="h-6 w-6 sm:h-7 sm:w-7 object-contain"
                        unoptimized
                      />
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm sm:text-base font-bold text-foreground leading-tight truncate">
                        {item.name}
                      </h4>
                      <span className="mt-0.5 sm:mt-1 inline-block rounded-md bg-muted/50 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-semibold text-muted-foreground">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Custom Animated Toggle Switch */}
                  <div
                    className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isEnabled ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  >
                    <motion.span
                      animate={{ x: isEnabled ? (typeof window !== "undefined" && window.innerWidth < 640 ? 16 : 20) : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="pointer-events-none inline-block h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-white shadow-md ring-0"
                    />
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {item.shortDescription}
                </p>
              </div>

              {/* Status Pill Footer */}
              <div className="border-t border-border/40 pt-2.5 sm:pt-3 flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1 sm:gap-1.5 rounded-full border px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-bold transition-all ${
                    isEnabled
                      ? "border-primary/30 bg-primary/10 text-primary shadow-2xs"
                      : "border-border/60 bg-muted/40 text-muted-foreground"
                  }`}
                >
                  {isEnabled ? (
                    <>
                      <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[3]" />
                      <span>Selected for Workspace</span>
                    </>
                  ) : (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
                      <span>Not Selected</span>
                    </>
                  )}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
