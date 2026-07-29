"use client"

import * as React from "react"
import { useWorkspace } from "@/context/workspace-context"
import { notify } from "@/lib/toast"
import { Bot } from "lucide-react"

interface AiAssistantFormProps {
  onSavedNotice?: () => void
  showTitle?: boolean
}

export function AiAssistantForm({
  onSavedNotice,
  showTitle = false,
}: AiAssistantFormProps) {
  const { state, updateAiAssistant } = useWorkspace()
  const data = state.aiAssistant

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    updateAiAssistant({ [name]: value })
  }

  const handleSave = () => {
    updateAiAssistant({})
    notify.success("Prompt Studio settings saved!", {
      description:
        "AI model parameters, persona tone, and instructions updated.",
    })
    onSavedNotice?.()
  }

  return (
    <div className="space-y-6">
      {showTitle && (
        <div className="space-y-1 border-b border-border/50 pb-4">
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
            <Bot className="h-5 w-5 text-primary" />
            AI Assistant Instructions
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure system prompts, LLM engine parameters, and persona directives.
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Agent Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            AI Agent Name
          </label>
          <input
            type="text"
            name="agentName"
            value={data.agentName}
            onChange={handleInputChange}
            placeholder="e.g. Antelier Enterprise Intake Copilot"
            className="h-11 w-full rounded-xl border border-input bg-muted/30 px-3.5 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>

        {/* Escalation Role */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Escalation Handoff Target Role
          </label>
          <input
            type="text"
            name="escalationRole"
            value={data.escalationRole}
            onChange={handleInputChange}
            placeholder="e.g. Senior Enterprise AE"
            className="h-11 w-full rounded-xl border border-input bg-muted/30 px-3.5 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>
      </div>

      {/* System Instructions Prompt */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-foreground">
            System Persona Prompt (Core Directive)
          </label>
          <span className="font-mono text-xs text-muted-foreground">
            Markdown Supported
          </span>
        </div>
        <textarea
          name="systemPrompt"
          value={data.systemPrompt}
          onChange={handleInputChange}
          rows={5}
          className="w-full rounded-xl border border-input bg-muted/30 p-3.5 font-mono text-sm leading-relaxed text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
        />
      </div>

      {/* Welcome Greeting Template */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          Initial Session Welcome Greeting
        </label>
        <textarea
          name="greetingMessage"
          value={data.greetingMessage}
          onChange={handleInputChange}
          rows={3}
          className="w-full rounded-xl border border-input bg-muted/30 p-3.5 text-sm leading-relaxed text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
        />
      </div>

      {/* Standalone Settings Save Bar (Only visible when not embedded in wizard) */}
      {!showTitle && (
        <div className="flex items-center justify-between border-t border-border/50 pt-4">
          <span className="text-xs text-muted-foreground">
            Changes auto-saved to workspace AI assistant profile.
          </span>
          <button
            type="button"
            onClick={handleSave}
            className="flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:opacity-90"
          >
            <Bot className="h-4.5 w-4.5" />
            <span>Save Changes</span>
          </button>
        </div>
      )}
    </div>
  )
}
