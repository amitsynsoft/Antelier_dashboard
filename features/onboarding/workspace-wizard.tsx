"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useWorkspace } from "@/context/workspace-context"
import { BusinessProfileForm } from "@/components/forms/business-profile-form"
import { KnowledgeBaseForm } from "@/components/forms/knowledge-base-form"
import { AiAssistantForm } from "@/components/forms/ai-assistant-form"
import { IntegrationsForm } from "@/components/forms/integrations-form"
import {
  Sparkles,
  Building2,
  FileText,
  Bot,
  Grid,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
  ShieldCheck,
  Zap,
  Check,
  FastForward,
  AlertCircle
} from "lucide-react"

export function WorkspaceWizard() {
  const {
    state,
    setCurrentStep,
    skipStep,
    completeWizard,
    closeWizard,
    completionPercentage
  } = useWorkspace()

  const [savedMessage, setSavedMessage] = React.useState<string | null>(null)

  if (!state.showWizardModal) return null

  const handleSavedNotice = () => {
    setSavedMessage("Progress auto-saved")
    setTimeout(() => setSavedMessage(null), 2500)
  }

  const steps = [
    { number: 1, title: "Business Profile", icon: Building2 },
    { number: 2, title: "Knowledge Base", icon: FileText },
    { number: 3, title: "AI Assistant", icon: Bot },
    { number: 4, title: "Integrations", icon: Grid },
    { number: 5, title: "Finish", icon: CheckCircle2 }
  ]

  const nextStep = () => {
    if (state.currentStep < 5) {
      setCurrentStep(state.currentStep + 1)
    } else {
      completeWizard()
    }
  }

  const prevStep = () => {
    if (state.currentStep > 1) {
      setCurrentStep(state.currentStep - 1)
    }
  }

  const handleSkipStep = () => {
    skipStep(state.currentStep)
    if (state.currentStep < 5) {
      setCurrentStep(state.currentStep + 1)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-md">
      {/* Container */}
      <div className="relative w-full max-w-4xl rounded-2xl border border-border bg-popover text-popover-foreground shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/60 bg-muted/20">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold shadow-md">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground tracking-tight">
                AntelierHub Workspace Setup Wizard
              </h2>
              <p className="text-xs text-muted-foreground">
                Configure essential AI client intake parameters or skip individual steps to set up later.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {savedMessage && (
              <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                {savedMessage}
              </span>
            )}
            <button
              type="button"
              onClick={closeWizard}
              className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer border border-border/40"
              title="Close Wizard"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Stepper Navigation */}
        <div className="px-4 sm:px-6 py-3 border-b border-border/40 bg-card">
          <div className="flex items-center justify-between gap-1.5 sm:gap-2.5 w-full">
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
                  className={`flex items-center gap-1.5 sm:gap-2 rounded-full text-xs transition-all cursor-pointer border ${
                    isActive
                      ? "bg-primary/15 text-primary border-primary/40 ring-2 ring-primary/20 shadow-2xs font-extrabold flex-1 justify-center px-3.5 py-2"
                      : isCompleted
                      ? "bg-emerald-500/10 text-foreground border-emerald-500/30 hover:bg-emerald-500/20 px-2 sm:px-2.5 py-1.5 font-semibold"
                      : isSkipped
                      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/20 px-2 sm:px-2.5 py-1.5 font-semibold"
                      : "bg-background text-muted-foreground border-border/50 hover:bg-muted hover:text-foreground px-2 sm:px-2.5 py-1.5 font-medium"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-[11px] font-mono font-bold shrink-0 transition-colors ${
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

                  <span className={`whitespace-nowrap ${isActive ? "font-bold" : "hidden sm:inline font-semibold text-[11px] max-w-[110px] truncate"}`}>
                    {step.title}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Step Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <motion.div
            key={state.currentStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="w-full"
          >
            {state.currentStep === 1 && (
              <BusinessProfileForm onSavedNotice={handleSavedNotice} showTitle />
            )}
            {state.currentStep === 2 && (
              <KnowledgeBaseForm onSavedNotice={handleSavedNotice} showTitle />
            )}
            {state.currentStep === 3 && (
              <AiAssistantForm onSavedNotice={handleSavedNotice} showTitle />
            )}
            {state.currentStep === 4 && (
              <IntegrationsForm onSavedNotice={handleSavedNotice} showTitle />
            )}
            {state.currentStep === 5 && (
              <div className="space-y-6 text-center py-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 ring-2 ring-emerald-500/20 shadow-inner mx-auto">
                  <ShieldCheck className="h-8 w-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">
                    Workspace Setup Overview
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Review your workspace configuration status. Any skipped steps can be completed anytime from your dashboard.
                  </p>
                </div>

                {/* Progress Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left pt-4 max-w-2xl mx-auto">
                  <div className="p-3 rounded-xl border border-border/60 bg-muted/20">
                    <span className="text-xs uppercase font-mono font-bold text-muted-foreground tracking-wider">Business Profile</span>
                    <div className="text-sm font-bold text-foreground truncate mt-0.5">
                      {state.skippedSteps.includes(1) ? (
                        <span className="text-amber-600 dark:text-amber-400 font-medium">Skipped</span>
                      ) : state.businessProfile.companyName ? (
                        state.businessProfile.companyName
                      ) : (
                        <span className="text-muted-foreground">Not Configured</span>
                      )}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl border border-border/60 bg-muted/20">
                    <span className="text-xs uppercase font-mono font-bold text-muted-foreground tracking-wider">Knowledge Base</span>
                    <div className="text-sm font-bold text-foreground truncate mt-0.5">
                      {state.skippedSteps.includes(2) ? (
                        <span className="text-amber-600 dark:text-amber-400 font-medium">Skipped</span>
                      ) : (state.knowledgeBase.uploadedFiles.length + state.knowledgeBase.scrapeUrls.length) > 0 ? (
                        `${state.knowledgeBase.uploadedFiles.length + state.knowledgeBase.scrapeUrls.length} Sources`
                      ) : (
                        <span className="text-muted-foreground">Not Configured</span>
                      )}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl border border-border/60 bg-muted/20">
                    <span className="text-xs uppercase font-mono font-bold text-muted-foreground tracking-wider">AI Model</span>
                    <div className="text-sm font-bold text-foreground truncate mt-0.5">
                      {state.skippedSteps.includes(3) ? (
                        <span className="text-amber-600 dark:text-amber-400 font-medium">Skipped</span>
                      ) : state.aiAssistant.agentName ? (
                        state.aiAssistant.primaryModel
                      ) : (
                        <span className="text-muted-foreground">Not Configured</span>
                      )}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl border border-border/60 bg-muted/20">
                    <span className="text-xs uppercase font-mono font-bold text-muted-foreground tracking-wider">Connectors</span>
                    <div className="text-sm font-bold text-foreground truncate mt-0.5">
                      {state.skippedSteps.includes(4) ? (
                        <span className="text-amber-600 dark:text-amber-400 font-medium">Skipped</span>
                      ) : (
                        state.integrations.hubspot ||
                        Boolean(typeof state.integrations.webhookUrl === "string" && state.integrations.webhookUrl.trim()) ||
                        Boolean(state.integrations.connectedMap && Object.values(state.integrations.connectedMap).some(Boolean))
                      ) ? (
                        "Connected"
                      ) : (
                        <span className="text-muted-foreground">Not Configured</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Footer Action Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border/60 bg-muted/20">
          <button
            type="button"
            onClick={prevStep}
            disabled={state.currentStep === 1}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-mono hidden sm:inline">
              Step {state.currentStep} of 5
            </span>

            {state.currentStep < 5 && (
              <button
                type="button"
                onClick={handleSkipStep}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 transition-colors cursor-pointer"
              >
                <span>Skip Step</span>
                <FastForward className="h-3.5 w-3.5" />
              </button>
            )}

            {state.currentStep < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-2xs cursor-pointer"
              >
                <span>Save & Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={completeWizard}
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-md cursor-pointer"
              >
                <Zap className="h-4 w-4" />
                <span>Complete & Open Dashboard</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
