"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  BookOpen,
  FastForward,
  X,
  Sparkles,
  Building2,
  FileText,
  Bot,
  Grid,
  Zap,
  Clock,
} from "lucide-react"
import { useWorkspace } from "@/context/workspace-context"

export function WorkspaceCompletionCard() {
  const router = useRouter()
  const { state, openWizard, setCurrentStep } = useWorkspace()
  const [isGuideOpen, setIsGuideOpen] = React.useState(false)

  // Calculate dynamic completion status for each setup step
  const isBusinessProfileComplete = Boolean(
    state.businessProfile?.companyName?.trim?.() &&
      state.businessProfile?.primaryIntakeGoal?.trim?.()
  )
  const isBusinessProfileSkipped = state.skippedSteps.includes(1)
  const isBusinessProfileInProgress = Boolean(
    state.businessProfile?.companyName?.trim?.() ||
      state.businessProfile?.primaryIntakeGoal?.trim?.()
  )

  const isKnowledgeBaseComplete = Boolean(
    (state.knowledgeBase?.uploadedFiles?.length || 0) > 0 ||
      (state.knowledgeBase?.scrapeUrls?.length || 0) > 0
  )
  const isKnowledgeBaseSkipped = state.skippedSteps.includes(2)
  const isKnowledgeBaseInProgress =
    (state.knowledgeBase?.sourcesCount || 0) > 0

  const isPromptStudioComplete = Boolean(
    state.aiAssistant?.agentName?.trim?.() &&
      state.aiAssistant?.systemPrompt?.trim?.()
  )
  const isPromptStudioSkipped = state.skippedSteps.includes(3)
  const isPromptStudioInProgress = Boolean(
    state.aiAssistant?.agentName?.trim?.() ||
      state.aiAssistant?.systemPrompt?.trim?.()
  )

  const isIntegrationsComplete = Boolean(
    state.integrations?.hubspot ||
      (typeof state.integrations?.webhookUrl === "string" &&
        state.integrations.webhookUrl.trim()) ||
      (state.integrations?.connectedMap &&
        Object.values(state.integrations.connectedMap).some(Boolean))
  )
  const isIntegrationsSkipped = state.skippedSteps.includes(4)

  const isWorkflowBuilderComplete = Boolean(
    isBusinessProfileComplete &&
      isKnowledgeBaseComplete &&
      isPromptStudioComplete &&
      isIntegrationsComplete
  )

  const steps = [
    {
      number: 1,
      title: "Business Profile",
      description: "Company details, target intake goals, & brand tone.",
      icon: Building2,
      estimatedTime: "2 mins",
      status: isBusinessProfileComplete
        ? ("completed" as const)
        : isBusinessProfileSkipped
        ? ("skipped" as const)
        : isBusinessProfileInProgress
        ? ("in_progress" as const)
        : ("pending" as const),
    },
    {
      number: 2,
      title: "Knowledge Base",
      description: "Upload SOPs, PDFs, and website URLs for AI RAG.",
      icon: FileText,
      estimatedTime: "3 mins",
      status: isKnowledgeBaseComplete
        ? ("completed" as const)
        : isKnowledgeBaseSkipped
        ? ("skipped" as const)
        : isKnowledgeBaseInProgress
        ? ("in_progress" as const)
        : ("pending" as const),
    },
    {
      number: 3,
      title: "Prompt Studio",
      description: "AI assistant persona, directives, and guardrails.",
      icon: Bot,
      estimatedTime: "3 mins",
      status: isPromptStudioComplete
        ? ("completed" as const)
        : isPromptStudioSkipped
        ? ("skipped" as const)
        : isPromptStudioInProgress
        ? ("in_progress" as const)
        : ("pending" as const),
    },
    {
      number: 4,
      title: "Integrations",
      description: "HubSpot CRM, WhatsApp, Voice Agent, Gmail & Webhooks.",
      icon: Grid,
      estimatedTime: "2 mins",
      status: isIntegrationsComplete
        ? ("completed" as const)
        : isIntegrationsSkipped
        ? ("skipped" as const)
        : ("pending" as const),
    },
    {
      number: 5,
      title: "Workflow Builder",
      description: "Intent recognition rules & automated CRM routing.",
      icon: Zap,
      estimatedTime: "2 mins",
      status: isWorkflowBuilderComplete
        ? ("completed" as const)
        : ("pending" as const),
    },
  ]

  const completedSteps = steps.filter((s) => s.status === "completed").length
  const skippedSteps = steps.filter((s) => s.status === "skipped").length
  const completionPercentage = Math.round(
    (completedSteps / steps.length) * 100
  )

  // Hide the hero section completely when workspace configuration is 100% complete
  if (completionPercentage === 100) {
    return null
  }

  const handleStartWizard = (stepNumber?: number) => {
    const targetStep =
      stepNumber ||
      steps.find((s) => s.status === "skipped" || s.status === "pending")
        ?.number ||
      1
    setCurrentStep(targetStep)
    openWizard()
    router.push("/workspace-setup")
  }

  return (
    <>
      {/* Single Unified Hero Card Banner */}
      <div className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-r from-card via-card/95 to-primary/5 p-6 shadow-xs lg:flex-row">
        {/* Sub-Section 1: Progress Stat & Action CTAs */}
        <div className="w-full flex-1 space-y-5">
          <div>
            <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
              Workspace Configuration
            </p>
            <h2 className="mt-1.5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {completionPercentage}% Complete
            </h2>
          </div>

          {/* Smooth Progress Bar */}
          <div className="max-w-md space-y-2">
            <div className="h-3 w-full overflow-hidden rounded-full border border-border/40 bg-muted/80 p-0.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full rounded-full bg-primary shadow-2xs"
              />
            </div>
            <p className="text-xs font-medium text-muted-foreground">
              {completedSteps} of {steps.length} setup forms configured
              {skippedSteps > 0 ? `, ${skippedSteps} step(s) skipped` : ""}.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => handleStartWizard()}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-semibold text-primary-foreground shadow-2xs transition-all hover:opacity-95 sm:text-sm"
            >
              <span>
                {skippedSteps > 0
                  ? "Configure Skipped Steps"
                  : completedSteps > 0
                  ? "Continue Setup Wizard"
                  : "Start Setup Wizard"}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsGuideOpen(true)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold text-foreground shadow-2xs transition-all hover:bg-muted/70 sm:text-sm"
            >
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>View Setup Guide</span>
            </button>
          </div>
        </div>

        {/* Sub-Section 2: Dynamic Step Checklist Table Box */}
        <div className="w-full shrink-0 space-y-3.5 rounded-2xl border border-border/60 bg-card p-4 shadow-xs sm:p-5 lg:w-[320px]">
          {steps.map((step) => {
            const isCompleted = step.status === "completed"
            const isSkipped = step.status === "skipped"
            const isInProgress = step.status === "in_progress"

            return (
              <div
                key={step.title}
                onClick={() => handleStartWizard(step.number)}
                className="flex cursor-pointer items-center justify-between py-0.5 text-xs transition-colors hover:text-primary sm:text-sm"
              >
                <div className="flex items-center gap-2.5">
                  {isCompleted ? (
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                  ) : isSkipped ? (
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-amber-500 bg-amber-500/20 text-amber-600 dark:text-amber-400">
                      <FastForward className="h-3 w-3" />
                    </div>
                  ) : isInProgress ? (
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-amber-500 text-amber-500">
                      <Circle className="h-2 w-2 fill-current" />
                    </div>
                  ) : (
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border bg-muted/40 text-muted-foreground">
                      <Circle className="h-2 w-2" />
                    </div>
                  )}
                  <span className="font-semibold text-foreground">
                    {step.title}
                  </span>
                </div>

                <span
                  className={
                    isCompleted
                      ? "text-xs font-semibold text-muted-foreground"
                      : isSkipped
                      ? "text-xs font-bold text-amber-600 dark:text-amber-400"
                      : isInProgress
                      ? "text-xs font-bold text-amber-600 dark:text-amber-400"
                      : "text-xs font-medium text-muted-foreground/70"
                  }
                >
                  {isCompleted
                    ? "Completed"
                    : isSkipped
                    ? "Skipped"
                    : isInProgress
                    ? "In Progress"
                    : "Not Configured"}
                </span>
              </div>
            )
          })}
        </div>

        {/* Sub-Section 3: Mascot Avatar with Smooth Non-Flickering Concentric Pulse */}
        <div className="relative flex min-h-[270px] w-full shrink-0 flex-col items-center justify-center py-2 text-center lg:w-[340px]">
          {/* Smooth Concentric Rings Container */}
          <div className="relative my-1 flex h-64 w-full items-center justify-center sm:h-72">
            {/* Smooth Radiating Ring 1 */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute h-52 w-52 rounded-full border-2 border-primary/30 bg-primary/5 sm:h-60 sm:w-60"
            />

            {/* Smooth Radiating Ring 2 (Staggered) */}
            <motion.div
              animate={{
                scale: [1.1, 1.25, 1.1],
                opacity: [0.2, 0.45, 0.2],
              }}
              transition={{
                duration: 4,
                delay: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute h-52 w-52 rounded-full border-2 border-primary/20 bg-primary/5 sm:h-60 sm:w-60"
            />

            {/* Mascot Avatar Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => handleStartWizard()}
              className="relative z-10 flex h-52 w-52 cursor-pointer items-center justify-center overflow-hidden rounded-full border-4 border-card bg-card shadow-2xl sm:h-60 sm:w-60"
            >
              <Image
                src="/images/hero-bot.png"
                alt="AI Assistant"
                width={240}
                height={240}
                priority
                className="h-full w-full scale-110 object-cover"
              />
            </motion.div>
          </div>

          {/* Bottom Status Pill Badge */}
          <div
            className={`relative z-10 mt-1 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold shadow-2xs backdrop-blur-xs ${
              completedSteps > 0 || skippedSteps > 0
                ? "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "border-border bg-muted/60 text-muted-foreground"
            }`}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
            <span>
              Setup Pending ({completedSteps}/5 Configured
              {skippedSteps > 0 ? `, ${skippedSteps} Skipped` : ""})
            </span>
          </div>
        </div>
      </div>

      {/* Dedicated Interactive Setup Guide Popup Modal */}
      <AnimatePresence>
        {isGuideOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-3xl border border-border bg-popover p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-border/50 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <BookOpen className="h-4 w-4" />
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      Workspace Setup & Onboarding Guide
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Follow these 5 essential setup steps to bring your AI client intake assistant online.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsGuideOpen(false)}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Steps Guide Cards List */}
              <div className="space-y-3.5">
                {steps.map((step) => {
                  const IconComp = step.icon
                  const isCompleted = step.status === "completed"
                  const isSkipped = step.status === "skipped"

                  return (
                    <div
                      key={step.number}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border/70 bg-muted/20 p-4 transition-all hover:border-primary/40 hover:bg-muted/40"
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold ${
                            isCompleted
                              ? "bg-emerald-500 text-white"
                              : isSkipped
                              ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <IconComp className="h-5 w-5" />
                          )}
                        </div>

                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-muted-foreground">
                              Step {step.number}
                            </span>
                            <h4 className="font-bold text-sm text-foreground">
                              {step.title}
                            </h4>
                            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {step.estimatedTime}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setIsGuideOpen(false)
                          handleStartWizard(step.number)
                        }}
                        className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold shadow-2xs transition-all cursor-pointer shrink-0 ${
                          isCompleted
                            ? "border border-border bg-card text-foreground hover:bg-muted"
                            : "bg-primary text-primary-foreground hover:opacity-90"
                        }`}
                      >
                        <span>{isCompleted ? "Edit Step" : "Configure Now"}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )
                })}
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between border-t border-border/50 pt-4">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Estimated total setup time: ~12 minutes
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsGuideOpen(false)}
                    className="rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted cursor-pointer"
                  >
                    Close Guide
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsGuideOpen(false)
                      handleStartWizard()
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-sm hover:opacity-90 cursor-pointer"
                  >
                    <span>Launch Setup Wizard</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
