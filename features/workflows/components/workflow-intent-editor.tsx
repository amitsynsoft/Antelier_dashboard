"use client"

import * as React from "react"
import { Sliders, X, Plus, Sparkles, Check } from "lucide-react"
import { notify } from "@/lib/toast"
import { IntentWorkflow } from "../types"

interface WorkflowIntentEditorProps {
  workflow: IntentWorkflow
  onUpdateWorkflow: (updates: Partial<IntentWorkflow>) => void
  onAddPhrase: (phrase: string) => void
  onRemovePhrase: (index: number) => void
}

export function WorkflowIntentEditor({
  workflow,
  onUpdateWorkflow,
  onAddPhrase,
  onRemovePhrase,
}: WorkflowIntentEditorProps) {
  const [newPhraseInput, setNewPhraseInput] = React.useState("")

  const handleAdd = () => {
    if (!newPhraseInput.trim()) return
    onAddPhrase(newPhraseInput.trim())
    setNewPhraseInput("")
  }

  const handleSave = () => {
    notify.success(`Saved intent rules for "${workflow.title}"!`, {
      description: "Matching confidence threshold and fallback rules saved.",
    })
  }

  return (
    <div className="space-y-6 rounded-3xl border border-border/70 bg-card p-6 shadow-xs">
      <div className="border-b border-border/50 pb-3 space-y-1">
        <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
          <Sparkles className="h-4.5 w-4.5 text-orange-500" />
          Customer Intent & Classification Rules
        </h3>
        <p className="text-xs text-muted-foreground">
          Configure how AI recognizes user intent from inbound voice calls, chat sessions, and email messages.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Intent Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Intent Trigger Name
          </label>
          <input
            type="text"
            value={workflow.intentName}
            onChange={(e) => onUpdateWorkflow({ intentName: e.target.value })}
            placeholder="e.g. New Client Inquiry"
            className="h-11 w-full rounded-xl border border-input bg-muted/30 px-3.5 text-sm text-foreground focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>

        {/* Fallback Workflow */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Fallback Workflow Handoff
          </label>
          <select
            value={workflow.fallbackWorkflow}
            onChange={(e) =>
              onUpdateWorkflow({ fallbackWorkflow: e.target.value })
            }
            className="h-11 w-full rounded-xl border border-input bg-muted/30 px-3.5 text-sm text-foreground focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Support Escalation">Support Escalation</option>
            <option value="Human Transfer">Human Transfer to AE</option>
          </select>
        </div>
      </div>

      {/* Intent Description */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          Intent Functional Description
        </label>
        <textarea
          rows={3}
          value={workflow.intentDescription}
          onChange={(e) =>
            onUpdateWorkflow({ intentDescription: e.target.value })
          }
          placeholder="Describe what this customer intent represents..."
          className="w-full resize-none rounded-xl border border-input bg-muted/30 p-3.5 text-sm text-foreground focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      {/* Example Phrases */}
      <div className="space-y-2.5">
        <label className="text-sm font-semibold text-foreground flex items-center justify-between">
          <span>Trained Example Customer Phrases</span>
          <span className="font-mono text-xs text-muted-foreground font-normal">
            {workflow.examplePhrases.length} phrases configured
          </span>
        </label>

        <div className="flex flex-wrap gap-2 pb-1">
          {workflow.examplePhrases.map((phrase, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-muted/30 px-3 py-1.5 text-xs font-semibold text-foreground shadow-2xs"
            >
              <span>&ldquo;{phrase}&rdquo;</span>
              <button
                type="button"
                onClick={() => onRemovePhrase(idx)}
                className="text-muted-foreground hover:text-rose-500 transition-colors cursor-pointer"
                title="Remove phrase"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <input
            type="text"
            placeholder="Add new trained phrase (e.g. 'I want to speak with sales')..."
            value={newPhraseInput}
            onChange={(e) => setNewPhraseInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="h-11 flex-1 rounded-xl border border-input bg-muted/30 px-3.5 text-sm text-foreground focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex h-11 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl bg-orange-600 px-4 text-xs font-bold text-white shadow-2xs hover:bg-orange-500 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Add Phrase</span>
          </button>
        </div>
      </div>

      {/* Confidence Threshold */}
      <div className="space-y-3 rounded-2xl border border-border/60 bg-muted/20 p-5">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="flex items-center gap-2 text-sm font-bold text-foreground">
              <Sliders className="h-4 w-4 text-orange-500" />
              AI Matching Confidence Threshold
            </span>
            <p className="text-xs text-muted-foreground">
              Minimum confidence score required by NLU to execute this intent workflow.
            </p>
          </div>
          <span className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3.5 py-1.5 font-mono text-base font-bold text-orange-600 dark:text-orange-400">
            {workflow.confidenceThreshold}%
          </span>
        </div>

        <input
          type="range"
          min={50}
          max={95}
          step={5}
          value={workflow.confidenceThreshold}
          onChange={(e) =>
            onUpdateWorkflow({ confidenceThreshold: Number(e.target.value) })
          }
          className="h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-orange-600"
        />
      </div>

      {/* Save Button Action Bar */}
      <div className="flex items-center justify-between border-t border-border/50 pt-4">
        <span className="text-xs text-muted-foreground">
          Changes auto-saved to workflow rules engine.
        </span>
        <button
          type="button"
          onClick={handleSave}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-orange-500 transition-all"
        >
          <Check className="h-4 w-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  )
}
