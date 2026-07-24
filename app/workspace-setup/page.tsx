"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useWorkspace } from "@/context/workspace-context"
import { BusinessProfileForm } from "@/components/forms/business-profile-form"
import { KnowledgeBaseForm } from "@/components/forms/knowledge-base-form"
import { AiAssistantForm } from "@/components/forms/ai-assistant-form"
import { IntegrationsForm } from "@/components/forms/integrations-form"
import {
  Building2,
  FileText,
  Bot,
  Grid,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Check
} from "lucide-react"

export default function WorkspaceSetupPage() {
  const router = useRouter()
  const {
    state,
    setCurrentStep,
    skipWizard,
    completeWizard,
    completionPercentage
  } = useWorkspace()

  const [savedMessage, setSavedMessage] = React.useState<string | null>(null)

  const handleSavedNotice = () => {
    setSavedMessage("Progress saved")
    setTimeout(() => setSavedMessage(null), 2500)
  }

  const handleSkip = () => {
    skipWizard()
    router.push("/dashboard")
  }

  const handleFinish = () => {
    completeWizard()
    router.push("/dashboard")
  }

  const steps = [
    { number: 1, title: "Business Profile", short: "Profile", icon: Building2 },
    { number: 2, title: "Knowledge Base", short: "Knowledge", icon: FileText },
    { number: 3, title: "AI Assistant", short: "AI Agent", icon: Bot },
    { number: 4, title: "Integrations", short: "Integrations", icon: Grid },
    { number: 5, title: "Finish", short: "Finish", icon: CheckCircle2 }
  ]

  const nextStep = () => {
    if (state.currentStep < 5) {
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

  const progressPercent = Math.round((state.currentStep / 5) * 100)

  return (
    <div className="min-h-screen w-full bg-muted/30 dark:bg-background font-sans flex flex-col justify-between selection:bg-primary/20">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-20 w-full border-b border-border/60 bg-background/95 backdrop-blur-md px-4 sm:px-8 py-3.5 shadow-2xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0E1A24] dark:bg-stone-100 shrink-0 shadow-2xs">
                <span className="h-2.5 w-2.5 rounded-full bg-[#D97349]" />
              </span>
              <span className="font-serif text-xl font-bold tracking-tight text-foreground leading-none">
                Antelier
              </span>
            </div>

            <span className="h-4 w-[1px] bg-border/80" />

            <div>
              <h1 className="text-sm sm:text-base font-bold text-foreground tracking-tight flex items-center gap-2">
                Workspace Setup
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Configure essential client intake parameters for live AI operation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {savedMessage && (
              <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5 animate-pulse">
                <Check className="h-3.5 w-3.5" />
                {savedMessage}
              </span>
            )}
            <button
              type="button"
              onClick={handleSkip}
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-all px-4 py-1.5 rounded-full border border-border/80 hover:bg-muted bg-background shadow-2xs cursor-pointer"
            >
              Skip for now
            </button>
          </div>
        </div>
      </header>

      {/* Main Centered Setup Viewport */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 flex flex-col justify-center">
        {/* Stepper Navigation Container */}
        <div className="bg-card border border-border/70 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-1 font-sans">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-md bg-primary/10 text-primary border border-primary/20">
                Step {state.currentStep} of 5
              </span>
              <h2 className="text-base sm:text-lg font-serif font-bold text-foreground">
                {steps[state.currentStep - 1].title}
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-muted-foreground">
              {progressPercent}% Complete
            </span>
          </div>

          {/* Progress Bar Line */}
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Step Buttons Row */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-3 pt-2">
            {steps.map((step) => {
              const isActive = state.currentStep === step.number
              const isCompleted = state.currentStep > step.number

              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setCurrentStep(step.number)}
                  className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1.5 sm:gap-2.5 p-2 sm:px-3.5 sm:py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    isActive
                      ? "bg-primary/10 text-primary border-primary/40 ring-1 ring-primary/30 shadow-2xs"
                      : isCompleted
                      ? "bg-muted/40 text-foreground border-border/50 hover:bg-muted"
                      : "bg-background text-muted-foreground/70 border-border/30 hover:text-foreground"
                  }`}
                >
                  <div
                    className={`flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg text-xs font-mono font-bold shrink-0 transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : isCompleted
                        ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? <Check className="h-3.5 w-3.5" /> : step.number}
                  </div>
                  <span className="hidden sm:inline truncate">{step.title}</span>
                  <span className="sm:hidden text-[10px] truncate">{step.short}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Elevated Form Content Card */}
        <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
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
            <div className="space-y-6 text-center py-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 ring-2 ring-emerald-500/20 shadow-inner mx-auto">
                <ShieldCheck className="h-8 w-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-foreground">
                  Setup Complete ({completionPercentage}%)
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Your AI Client Intake platform is now configured. Your AI agents are vectorized and ready to qualify prospective clients.
                </p>
              </div>

              {/* Summary Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left pt-4 max-w-2xl mx-auto">
                <div className="p-3.5 rounded-xl border border-border/60 bg-muted/20">
                  <span className="text-xs uppercase font-mono text-muted-foreground font-bold tracking-wider">Org Name</span>
                  <div className="text-sm font-bold text-foreground truncate mt-0.5">
                    {state.businessProfile.companyName}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl border border-border/60 bg-muted/20">
                  <span className="text-xs uppercase font-mono text-muted-foreground font-bold tracking-wider">Knowledge Base</span>
                  <div className="text-sm font-bold text-foreground truncate mt-0.5">
                    {state.knowledgeBase.uploadedFiles.length + state.knowledgeBase.scrapeUrls.length} Sources
                  </div>
                </div>
                <div className="p-3.5 rounded-xl border border-border/60 bg-muted/20">
                  <span className="text-xs uppercase font-mono text-muted-foreground font-bold tracking-wider">AI Model</span>
                  <div className="text-sm font-bold text-foreground truncate mt-0.5">
                    {state.aiAssistant.primaryModel}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl border border-border/60 bg-muted/20">
                  <span className="text-xs uppercase font-mono text-muted-foreground font-bold tracking-wider">Connectors</span>
                  <div className="text-sm font-bold text-foreground truncate mt-0.5">
                    {state.integrations.salesforce ? "Salesforce " : ""}{state.integrations.slack ? "+ Slack" : ""}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Embedded Step Action Bar */}
          <div className="pt-6 border-t border-border/60 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={prevStep}
              disabled={state.currentStep === 1}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-3">
              {state.currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-md cursor-pointer"
                >
                  <span>Save & Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinish}
                  className="flex items-center gap-2 px-6 py-2.5 text-xs font-extrabold rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-md cursor-pointer"
                >
                  <Zap className="h-4 w-4" />
                  <span>Finish & Open Dashboard</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs font-mono text-muted-foreground border-t border-border/40 bg-background/50">
        Antelier AI Client Intake Platform • Workspace Setup
      </footer>
    </div>
  )
}
