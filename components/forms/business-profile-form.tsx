"use client"

import * as React from "react"
import { useWorkspace, BusinessProfileData } from "@/context/workspace-context"
import { Building2, Target, Globe, Mail, Sparkles, Check } from "lucide-react"

interface BusinessProfileFormProps {
  onSavedNotice?: () => void
  showTitle?: boolean
}

export function BusinessProfileForm({ onSavedNotice, showTitle = false }: BusinessProfileFormProps) {
  const { state, updateBusinessProfile } = useWorkspace()
  const data = state.businessProfile

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateBusinessProfile({ [name]: value })
    onSavedNotice?.()
  }

  const brandTones: Array<{ id: BusinessProfileData["brandTone"]; title: string; desc: string }> = [
    { id: "consultative", title: "Consultative", desc: "Insightful, professional, solution-oriented guidance." },
    { id: "formal", title: "Formal Enterprise", desc: "Strictly institutional, precise, and security-focused." },
    { id: "direct", title: "Direct & Fast", desc: "Concise, outcome-driven, minimal back-and-forth." },
    { id: "friendly", title: "Friendly & Warm", desc: "Approachable, empathetic, conversational tone." }
  ]

  return (
    <div className="space-y-6">
      {showTitle && (
        <div className="space-y-1 pb-4 border-b border-border/50">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Business Profile & Intake Positioning
          </h2>
          <p className="text-xs text-muted-foreground">
            Configure your enterprise branding, target customer segments, and primary intake objectives.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Company Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Organization Legal Name</label>
          <input
            type="text"
            name="companyName"
            value={data.companyName}
            onChange={handleInputChange}
            placeholder="e.g. Antelier Tech Global"
            className="w-full h-9 px-3 text-xs bg-muted/30 border border-input rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>

        {/* Industry */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Primary Industry Segment</label>
          <select
            name="industry"
            value={data.industry}
            onChange={handleInputChange}
            className="w-full h-9 px-3 text-xs bg-muted/30 border border-input rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          >
            <option value="Enterprise Software & AI">Enterprise Software & AI</option>
            <option value="Financial Services & Fintech">Financial Services & Fintech</option>
            <option value="Healthcare & BioTech">Healthcare & BioTech</option>
            <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
            <option value="Media & Entertainment">Media & Entertainment</option>
            <option value="Professional Services & Legal">Professional Services & Legal</option>
          </select>
        </div>

        {/* Target Tier */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Target Customer Segment</label>
          <input
            type="text"
            name="targetTier"
            value={data.targetTier}
            onChange={handleInputChange}
            placeholder="e.g. Fortune 500 & Mid-Market"
            className="w-full h-9 px-3 text-xs bg-muted/30 border border-input rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>

        {/* Support Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Intake Escalation Email</label>
          <input
            type="email"
            name="supportEmail"
            value={data.supportEmail}
            onChange={handleInputChange}
            placeholder="e.g. intake-ops@antelier.io"
            className="w-full h-9 px-3 text-xs bg-muted/30 border border-input rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>
      </div>

      {/* Primary Intake Goal */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground">Primary Client Intake Objective</label>
        <textarea
          name="primaryIntakeGoal"
          value={data.primaryIntakeGoal}
          onChange={handleInputChange}
          rows={2}
          placeholder="Describe what your AI intake agents should achieve during prospect conversations..."
          className="w-full p-3 text-xs bg-muted/30 border border-input rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:outline-none resize-none"
        />
      </div>

      {/* Brand Voice / Tone Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          AI Persona Brand Tone & Style
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {brandTones.map((tone) => {
            const isSelected = data.brandTone === tone.id
            return (
              <button
                key={tone.id}
                type="button"
                onClick={() => {
                  updateBusinessProfile({ brandTone: tone.id })
                  onSavedNotice?.()
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/10 ring-1 ring-primary"
                    : "border-border/60 bg-muted/20 hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">{tone.title}</span>
                  {isSelected && <Check className="h-4 w-4 text-primary" />}
                </div>
                <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{tone.desc}</p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
