"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { IntegrationDefinition } from "../data/integrations-data"
import { useWorkspace, AiAssistantData } from "@/context/workspace-context"
import { notify } from "@/lib/toast"
import {
  X,
  Sparkles,
  Bot,
} from "lucide-react"

interface IntegrationPromptStudioModalProps {
  integration: IntegrationDefinition | null
  isOpen: boolean
  onClose: () => void
}

export function IntegrationPromptStudioModal({
  integration,
  isOpen,
  onClose,
}: IntegrationPromptStudioModalProps) {
  const { getIntegrationPromptStudio, updateIntegrationPromptStudio } =
    useWorkspace()

  const [formData, setFormData] = React.useState<AiAssistantData>({
    agentName: "",
    avatar: "",
    primaryModel: "gpt-4o",
    systemPrompt: "",
    greetingMessage: "",
    handoffScoreThreshold: 85,
    escalationRole: "",
  })

  const [prevKey, setPrevKey] = React.useState<string | null>(null)
  const currentKey = isOpen && integration ? integration.id : null

  if (currentKey !== prevKey) {
    setPrevKey(currentKey)
    if (integration && isOpen) {
      setFormData(getIntegrationPromptStudio(integration.id))
    }
  }

  if (!isOpen || !integration) return null

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    updateIntegrationPromptStudio(integration.id, formData)
    notify.success(`Prompt Studio updated for ${integration.name}!`, {
      description: "AI directives saved successfully.",
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-3xl max-h-[95vh] sm:max-h-[92vh] rounded-2xl sm:rounded-3xl border border-border bg-card text-card-foreground shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2 px-3.5 py-3 sm:px-6 sm:py-4 border-b border-border/60 bg-muted/20">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div
              className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border p-1.5 sm:p-2 shadow-2xs"
              style={{
                backgroundColor: integration.accentBg,
                borderColor: `${integration.brandColor}40`,
              }}
            >
              <Image
                src={integration.icon}
                alt={integration.name}
                width={28}
                height={28}
                className="h-5 w-5 sm:h-6 sm:w-6 object-contain"
                unoptimized
              />
            </div>
            <div className="min-w-0">
              <h2 className="text-xs sm:text-base font-bold text-foreground flex items-center gap-1.5 truncate">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
                <span className="truncate">{integration.name} — Prompt Studio</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-muted-foreground truncate">
                Configure AI directives for {integration.name}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer border border-border/40 shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {integration.id === "gmail" ? (
            /* Single Text Field for Gmail Directive */
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-foreground">
                  System Persona Prompt (Core Directive)
                </label>
                <span className="font-mono text-[11px] text-muted-foreground">
                  Markdown Supported
                </span>
              </div>
              <textarea
                name="systemPrompt"
                value={formData.systemPrompt}
                onChange={handleInputChange}
                rows={8}
                placeholder="Define core system directives, email reply rules, and persona constraints..."
                className="w-full rounded-xl border border-input bg-muted/30 p-3.5 font-mono text-xs leading-relaxed text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Agent Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">
                    AI Agent Name
                  </label>
                  <input
                    type="text"
                    name="agentName"
                    value={formData.agentName}
                    onChange={handleInputChange}
                    placeholder="e.g. Ava (Clinical Intake Copilot)"
                    className="h-10 w-full rounded-xl border border-input bg-muted/30 px-3.5 text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                {/* Escalation Target Role */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">
                    Escalation Handoff Target Role
                  </label>
                  <input
                    type="text"
                    name="escalationRole"
                    value={formData.escalationRole}
                    onChange={handleInputChange}
                    placeholder="e.g. Duty Triage Nurse"
                    className="h-10 w-full rounded-xl border border-input bg-muted/30 px-3.5 text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* System Persona Prompt */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground">
                    System Persona Prompt (Core Directive)
                  </label>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    Markdown Supported
                  </span>
                </div>
                <textarea
                  name="systemPrompt"
                  value={formData.systemPrompt}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Define core system directives, compliance guidelines, and persona constraints..."
                  className="w-full rounded-xl border border-input bg-muted/30 p-3.5 font-mono text-xs leading-relaxed text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              {/* Initial Session Welcome Greeting */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">
                  Initial Session Welcome Greeting
                </label>
                <textarea
                  name="greetingMessage"
                  value={formData.greetingMessage}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Greeting message sent when initiating session..."
                  className="w-full rounded-xl border border-input bg-muted/30 p-3.5 text-xs leading-relaxed text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border/60 bg-muted/20 px-6 py-4">
          <span className="text-xs text-muted-foreground">
            Changes saved to {integration.name} Prompt Studio configuration.
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl border border-border bg-card px-4 py-2 text-xs font-bold text-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-primary px-5 py-2 text-xs font-bold text-primary-foreground shadow-2xs hover:opacity-95 transition-all"
            >
              <Bot className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
