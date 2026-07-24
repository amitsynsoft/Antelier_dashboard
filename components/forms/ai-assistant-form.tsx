"use client"

import * as React from "react"
import { useWorkspace } from "@/context/workspace-context"
import { Bot, Sparkles, Sliders, ShieldAlert, Cpu, MessageSquare } from "lucide-react"

interface AiAssistantFormProps {
  onSavedNotice?: () => void
  showTitle?: boolean
}

export function AiAssistantForm({ onSavedNotice, showTitle = false }: AiAssistantFormProps) {
  const { state, updateAiAssistant } = useWorkspace()
  const data = state.aiAssistant

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateAiAssistant({ [name]: value })
    onSavedNotice?.()
  }

  const models = [
    { id: "gpt-4o", name: "GPT-4o Enterprise", provider: "OpenAI", badge: "Default" },
    { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", badge: "Legal & RFP" },
    { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", provider: "Google DeepMind", badge: "2M Context" }
  ]

  return (
    <div className="space-y-6">
      {showTitle && (
        <div className="space-y-1 pb-4 border-b border-border/50">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Assistant Instructions & Model Configuration
          </h2>
          <p className="text-xs text-muted-foreground">
            Configure system prompts, LLM engine parameters, and automatic human AE escalation thresholds.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Agent Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">AI Agent Name</label>
          <input
            type="text"
            name="agentName"
            value={data.agentName}
            onChange={handleInputChange}
            placeholder="e.g. Antelier Enterprise Intake Copilot"
            className="w-full h-9 px-3 text-xs bg-muted/30 border border-input rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>

        {/* Escalation Role */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Escalation Handoff Target Role</label>
          <input
            type="text"
            name="escalationRole"
            value={data.escalationRole}
            onChange={handleInputChange}
            placeholder="e.g. Senior Enterprise AE"
            className="w-full h-9 px-3 text-xs bg-muted/30 border border-input rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>
      </div>

      {/* Primary Model Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
          <Cpu className="h-3.5 w-3.5 text-primary" />
          Primary Reasoning Model Architecture
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {models.map((m) => {
            const isSelected = data.primaryModel === m.id
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  updateAiAssistant({ primaryModel: m.id as any })
                  onSavedNotice?.()
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/10 ring-1 ring-primary"
                    : "border-border/60 bg-muted/20 hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">{m.name}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-secondary text-secondary-foreground">
                    {m.badge}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground block mt-1">{m.provider}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* System Instructions Prompt */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-foreground">System Persona Prompt (Core Directive)</label>
          <span className="text-[10px] font-mono text-muted-foreground">Markdown Supported</span>
        </div>
        <textarea
          name="systemPrompt"
          value={data.systemPrompt}
          onChange={handleInputChange}
          rows={4}
          className="w-full p-3 text-xs font-mono bg-muted/30 border border-input rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:outline-none leading-relaxed"
        />
      </div>

      {/* Welcome Greeting Template */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground">Initial Session Welcome Greeting</label>
        <textarea
          name="greetingMessage"
          value={data.greetingMessage}
          onChange={handleInputChange}
          rows={2}
          className="w-full p-3 text-xs bg-muted/30 border border-input rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:outline-none leading-relaxed"
        />
      </div>

      {/* Handoff Score Slider */}
      <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
              Automatic AE Handoff Threshold Score
            </span>
            <p className="text-[11px] text-muted-foreground">
              Leads scoring at or above this score trigger immediate CRM provisioning and AE notifications.
            </p>
          </div>
          <span className="text-base font-mono font-bold text-primary px-3 py-1 rounded bg-primary/10 border border-primary/20">
            {data.handoffScoreThreshold} / 100
          </span>
        </div>

        <input
          type="range"
          min="50"
          max="95"
          step="5"
          value={data.handoffScoreThreshold}
          onChange={(e) => {
            updateAiAssistant({ handoffScoreThreshold: Number(e.target.value) })
            onSavedNotice?.()
          }}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </div>
    </div>
  )
}
