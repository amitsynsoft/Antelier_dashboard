"use client"

import * as React from "react"
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
  RotateCcw
} from "lucide-react"

export function WorkspaceWizard() {
  const {
    state,
    setCurrentStep,
    skipWizard,
    completeWizard,
    closeWizard,
    resetWorkspace,
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-md animate-in fade-in-50">
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
                Configure essential AI client intake parameters before live deployment.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {savedMessage && (
              <span className="text-[11px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 animate-pulse">
                {savedMessage}
              </span>
            )}
            <button
              type="button"
              onClick={skipWizard}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
            >
              Skip for now
            </button>
            <button
              type="button"
              onClick={closeWizard}
              className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Stepper Navigation */}
        <div className="px-6 py-3 border-b border-border/40 bg-card overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between min-w-[550px]">
            {steps.map((step) => {
              const StepIcon = step.icon
              const isActive = state.currentStep === step.number
              const isCompleted = state.currentStep > step.number

              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setCurrentStep(step.number)}
                  className={`flex items-center gap-2 text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "text-primary font-bold"
                      : isCompleted
                      ? "text-foreground hover:text-primary"
                      : "text-muted-foreground hover:text-foreground opacity-60"
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-mono font-bold border transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                        : isCompleted
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                        : "bg-muted text-muted-foreground border-border/60"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : step.number}
                  </div>
                  <span>{step.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Step Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
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
                  Workspace Readiness Score: {completionPercentage}%
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Your AI Client Intake platform is operational. Agents are vectorized and ready to qualify incoming leads.
                </p>
              </div>

              {/* Progress Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left pt-4 max-w-2xl mx-auto">
                <div className="p-3 rounded-xl border border-border/60 bg-muted/20">
                  <span className="text-xs uppercase font-mono font-bold text-muted-foreground tracking-wider">Org Name</span>
                  <div className="text-sm font-bold text-foreground truncate mt-0.5">
                    {state.businessProfile.companyName}
                  </div>
                </div>
                <div className="p-3 rounded-xl border border-border/60 bg-muted/20">
                  <span className="text-xs uppercase font-mono font-bold text-muted-foreground tracking-wider">Knowledge Base</span>
                  <div className="text-sm font-bold text-foreground truncate mt-0.5">
                    {state.knowledgeBase.uploadedFiles.length + state.knowledgeBase.scrapeUrls.length} Sources
                  </div>
                </div>
                <div className="p-3 rounded-xl border border-border/60 bg-muted/20">
                  <span className="text-xs uppercase font-mono font-bold text-muted-foreground tracking-wider">AI Model</span>
                  <div className="text-sm font-bold text-foreground truncate mt-0.5">
                    {state.aiAssistant.primaryModel}
                  </div>
                </div>
                <div className="p-3 rounded-xl border border-border/60 bg-muted/20">
                  <span className="text-xs uppercase font-mono font-bold text-muted-foreground tracking-wider">Connectors</span>
                  <div className="text-sm font-bold text-foreground truncate mt-0.5">
                    {state.integrations.salesforce ? "Salesforce " : ""}{state.integrations.slack ? "+ Slack" : ""}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Action Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border/60 bg-muted/20">
          <button
            type="button"
            onClick={prevStep}
            disabled={state.currentStep === 1}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono hidden sm:inline">
              Step {state.currentStep} of 5
            </span>
            {state.currentStep < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-2xs cursor-pointer"
              >
                <span>Save & Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={completeWizard}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-md cursor-pointer"
              >
                <Zap className="h-4 w-4" />
                <span>Complete & Launch Dashboard</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
