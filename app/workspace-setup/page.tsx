"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { notify } from "@/lib/toast"
import { useWorkspace } from "@/context/workspace-context"
import { BusinessProfileForm } from "@/components/forms/business-profile-form"
import { KnowledgeBaseForm } from "@/components/forms/knowledge-base-form"
import { IntegrationsForm } from "@/components/forms/integrations-form"
import {
  Building2,
  FileText,
  Grid,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Check,
  FastForward,
} from "lucide-react"

export default function WorkspaceSetupPage() {
  const router = useRouter()
  const { state, setCurrentStep, skipStep, completeWizard } = useWorkspace()

  const handleFinish = () => {
    // completeWizard()

    router.push("/dashboard")
  }

  const steps = [
    { number: 1, title: "Business Profile", icon: Building2 },
    { number: 2, title: "Knowledge Base", icon: FileText },
    { number: 3, title: "Integrations", icon: Grid },
    { number: 4, title: "Finish", icon: CheckCircle2 },
  ]

  const nextStep = () => {
    if (state.currentStep < 4) {
      setCurrentStep(state.currentStep + 1)
    } else {
      handleFinish()
    }
  }

  const prevStep = () => {
    if (state.currentStep > 1) {
      setCurrentStep(state.currentStep - 1)
    }
  }

  const handleSkipStep = () => {
    skipStep(state.currentStep)

    if (state.currentStep < 4) {
      setCurrentStep(state.currentStep + 1)
    }
  }

  const progressPercent = Math.round((state.currentStep / 4) * 100)

  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-muted/30 font-sans selection:bg-primary/20 dark:bg-background">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-20 w-full border-b border-border/60 bg-background/95 px-3 py-2.5 shadow-2xs backdrop-blur-md sm:px-8 sm:py-3.5">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0E1A24] shadow-2xs sm:h-7 sm:w-7 dark:bg-stone-100">
                <span className="h-2 w-2 rounded-full bg-[#D97349] sm:h-2.5 sm:w-2.5" />
              </span>
              <span className="font-serif text-lg leading-none font-bold tracking-tight text-foreground sm:text-xl">
                Antelier
              </span>
            </div>

            <span className="h-4 w-[1px] shrink-0 bg-border/80" />

            <div className="min-w-0">
              <h1 className="flex hidden items-center gap-1.5 truncate text-xs font-bold tracking-tight text-foreground sm:block sm:text-base">
                Workspace Setup Wizard
              </h1>
              <p className="hidden text-xs text-muted-foreground sm:block">
                Configure essential client intake parameters or skip individual
                steps to complete later
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleFinish}
              className="cursor-pointer rounded-full border border-border/80 bg-background px-3 py-1.5 text-[11px] font-medium text-nowrap text-muted-foreground shadow-2xs transition-all hover:bg-muted hover:text-foreground sm:px-4 sm:py-1.5 sm:text-xs"
            >
              <span>Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Centered Setup Viewport */}
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center space-y-4 px-3 py-4 sm:space-y-6 sm:px-6 sm:py-10">
        {/* Stepper Navigation Container */}
        <div className="space-y-3 rounded-xl border border-border/70 bg-card p-3.5 shadow-sm sm:space-y-4 sm:rounded-2xl sm:p-6">
          <div className="flex items-center justify-between pb-0.5 font-sans">
            <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
              <span className="shrink-0 rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-bold text-primary sm:text-xs">
                Step {state.currentStep} of 4
              </span>
              <h2 className="xs:max-w-[200px] max-w-[130px] truncate font-serif text-xs font-bold text-foreground sm:max-w-none sm:text-lg">
                {steps[state.currentStep - 1].title}
              </h2>
            </div>
            <span className="shrink-0 font-mono text-[10px] font-bold text-muted-foreground sm:text-xs">
              {progressPercent}% Complete
            </span>
          </div>

          {/* Progress Bar Line */}
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted sm:h-2">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Step Buttons Row */}
          <div className="flex w-full items-center justify-between gap-1 py-0.5 sm:gap-2.5">
            {steps.map((step) => {
              const isActive = state.currentStep === step.number
              const isSkipped = state.skippedSteps.includes(step.number)
              const isCompleted = state.currentStep > step.number && !isSkipped

              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setCurrentStep(step.number)}
                  title={`${step.title}${isSkipped ? " (Skipped)" : isCompleted ? " (Completed)" : ""}`}
                  className={`flex cursor-pointer items-center gap-1 rounded-xl border text-xs transition-all sm:gap-2 sm:rounded-2xl ${
                    isActive
                      ? "flex-1 justify-center border-primary/40 bg-primary/15 px-2.5 py-1.5 font-extrabold text-primary shadow-2xs ring-2 ring-primary/20 sm:px-3.5 sm:py-2.5"
                      : isCompleted
                        ? "border-emerald-500/30 bg-emerald-500/10 px-1.5 py-1.5 font-semibold text-foreground hover:bg-emerald-500/20 sm:px-3 sm:py-2"
                        : isSkipped
                          ? "border-amber-500/30 bg-amber-500/10 px-1.5 py-1.5 font-semibold text-amber-600 hover:bg-amber-500/20 sm:px-3 sm:py-2 dark:text-amber-400"
                          : "border-border/40 bg-background px-1.5 py-1.5 font-medium text-muted-foreground hover:text-foreground sm:px-3 sm:py-2"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg font-mono text-[10px] font-bold transition-colors sm:h-6 sm:w-6 sm:rounded-xl sm:text-[11px] ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : isCompleted
                          ? "bg-emerald-500 text-white"
                          : isSkipped
                            ? "bg-amber-500 text-white"
                            : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    ) : isSkipped ? (
                      <FastForward className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span
                    className={`text-xs whitespace-nowrap ${isActive ? "text-[11px] font-bold sm:text-xs" : "hidden max-w-[110px] truncate text-[11px] font-semibold sm:inline"}`}
                  >
                    {step.title}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Form Content Card */}
        <div className="space-y-4 rounded-xl border border-border/80 bg-card p-4 shadow-xl sm:space-y-6 sm:rounded-2xl sm:p-8">
          <motion.div
            key={state.currentStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="w-full"
          >
            {state.currentStep === 1 && <BusinessProfileForm showTitle />}
            {state.currentStep === 2 && <KnowledgeBaseForm showTitle />}
            {state.currentStep === 3 && <IntegrationsForm showTitle />}
            {state.currentStep === 4 && (
              <div className="space-y-4 py-3 text-center sm:space-y-6 sm:py-6">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 shadow-inner ring-2 ring-emerald-500/20 sm:h-16 sm:w-16">
                  <ShieldCheck className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <h2 className="font-serif text-xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Setup Overview
                  </h2>
                  <p className="mx-auto max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    Review your workspace configuration status below. Any
                    skipped steps can be completed anytime directly from the
                    dashboard.
                  </p>
                </div>

                {/* Summary Cards Grid */}
                <div className="mx-auto grid max-w-xl grid-cols-1 gap-2.5 pt-2 text-left sm:grid-cols-3 sm:pt-4">
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-3 sm:p-3.5">
                    <span className="font-mono text-[10px] font-bold tracking-wider text-muted-foreground uppercase sm:text-xs">
                      Business Profile
                    </span>
                    <div className="mt-0.5 truncate text-xs font-bold text-foreground sm:text-sm">
                      {state.skippedSteps.includes(1) ? (
                        <span className="font-medium text-amber-600 dark:text-amber-400">
                          Skipped
                        </span>
                      ) : state.businessProfile.companyName ? (
                        state.businessProfile.companyName
                      ) : (
                        <span className="text-muted-foreground">
                          Not Configured
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-3 sm:p-3.5">
                    <span className="font-mono text-[10px] font-bold tracking-wider text-muted-foreground uppercase sm:text-xs">
                      Knowledge Base
                    </span>
                    <div className="mt-0.5 truncate text-xs font-bold text-foreground sm:text-sm">
                      {state.skippedSteps.includes(2) ? (
                        <span className="font-medium text-amber-600 dark:text-amber-400">
                          Skipped
                        </span>
                      ) : state.knowledgeBase.uploadedFiles.length +
                          state.knowledgeBase.scrapeUrls.length >
                        0 ? (
                        `${state.knowledgeBase.uploadedFiles.length + state.knowledgeBase.scrapeUrls.length} Sources`
                      ) : (
                        <span className="text-muted-foreground">
                          Not Configured
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-3 sm:p-3.5">
                    <span className="font-mono text-[10px] font-bold tracking-wider text-muted-foreground uppercase sm:text-xs">
                      Connectors
                    </span>
                    <div className="mt-0.5 truncate text-xs font-bold text-foreground sm:text-sm">
                      {state.skippedSteps.includes(3) ? (
                        <span className="font-medium text-amber-600 dark:text-amber-400">
                          Skipped
                        </span>
                      ) : state.integrations.enabledMap ? (
                        `${Object.values(state.integrations.enabledMap).filter(Boolean).length} Enabled`
                      ) : (
                        "4 Enabled"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Embedded Wizard Primary Action Bar */}
          <div className="flex items-center justify-between gap-1.5 border-t border-border/60 pt-4 sm:gap-3 sm:pt-6">
            <button
              type="button"
              onClick={prevStep}
              disabled={state.currentStep === 1}
              className="flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-border bg-background px-3 text-xs font-bold text-muted-foreground shadow-2xs transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:gap-2 sm:px-5 sm:text-sm"
            >
              <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Back</span>
            </button>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
              {state.currentStep < 4 && (
                <button
                  type="button"
                  onClick={handleSkipStep}
                  className="flex h-9 shrink-0 cursor-pointer items-center gap-1 rounded-xl border border-amber-500/40 bg-amber-500/10 px-2.5 text-xs font-bold text-amber-600 transition-colors hover:bg-amber-500/20 sm:h-11 sm:gap-1.5 sm:px-5 sm:text-sm dark:text-amber-400"
                >
                  <span>
                    Skip<span className="xs:inline hidden"> Step</span>
                  </span>
                  <FastForward className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              )}

              {state.currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl bg-primary px-3.5 text-xs font-bold text-primary-foreground shadow-md transition-all hover:opacity-90 sm:h-11 sm:gap-2 sm:px-6 sm:text-sm"
                >
                  <span>
                    Save<span className="xs:inline hidden"> & Continue</span>
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinish}
                  className="flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 text-xs font-extrabold text-white shadow-md transition-all hover:bg-emerald-500 sm:h-11 sm:gap-2 sm:px-6 sm:text-sm"
                >
                  <Zap className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
                  <span>
                    Finish
                    <span className="xs:inline hidden"> & Open Dashboard</span>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border/40 bg-background/50 px-4 py-3 text-center font-mono text-[11px] text-muted-foreground sm:py-4 sm:text-xs">
        Antelier AI Client Intake Platform • Workspace Setup Wizard
      </footer>
    </div>
  )
}
