"use client"

import * as React from "react"
import { useWorkspace, BusinessProfileData } from "@/context/workspace-context"
import { notify } from "@/lib/toast"
import { Select } from "@/components/ui/select"
import { PhoneInput } from "@/components/ui/phone-input"
import { Building2, Sparkles, Check, Globe } from "lucide-react"

interface BusinessProfileFormProps {
  onSavedNotice?: () => void
  showTitle?: boolean
}

export function BusinessProfileForm({
  onSavedNotice,
  showTitle = false,
}: BusinessProfileFormProps) {
  const { state, updateBusinessProfile } = useWorkspace()
  const data = state.businessProfile

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    updateBusinessProfile({ [name]: value })
  }

  const handleSave = () => {
    updateBusinessProfile({})
    notify.success("Business profile saved!", {
      description: "Company details and intake positioning saved successfully.",
    })
    onSavedNotice?.()
  }

  const brandTones: Array<{
    id: BusinessProfileData["brandTone"]
    title: string
    desc: string
  }> = [
    {
      id: "consultative",
      title: "Consultative",
      desc: "Insightful, professional, solution-oriented guidance.",
    },
    {
      id: "formal",
      title: "Formal Enterprise",
      desc: "Strictly institutional, precise, and security-focused.",
    },
    {
      id: "direct",
      title: "Direct & Fast",
      desc: "Concise, outcome-driven, minimal back-and-forth.",
    },
    {
      id: "friendly",
      title: "Friendly & Warm",
      desc: "Approachable, empathetic, conversational tone.",
    },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      {showTitle && (
        <div className="space-y-1 border-b border-border/50 pb-3 sm:pb-4">
          <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold tracking-tight text-foreground">
            <Building2 className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-primary shrink-0" />
            <span>Business Profile & Intake Positioning</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Configure your enterprise branding, target customer segments, and
            primary intake objectives.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3.5 sm:gap-5 sm:grid-cols-2">
        {/* Company Name */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-sm font-semibold text-foreground">
            Organization Legal Name
          </label>
          <input
            type="text"
            name="companyName"
            value={data.companyName}
            onChange={handleInputChange}
            placeholder="e.g. Antelier Tech Global"
            className="h-10 sm:h-11 w-full rounded-xl border border-input bg-muted/30 px-3 sm:px-3.5 text-xs sm:text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>

        {/* Industry */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-sm font-semibold text-foreground">
            Primary Industry Segment
          </label>
          <Select
            value={data.industry}
            onChange={(val) => updateBusinessProfile({ industry: val })}
            options={[
              "Enterprise Software & AI",
              "Financial Services & Fintech",
              "Healthcare & BioTech",
              "Logistics & Supply Chain",
              "Media & Entertainment",
              "Professional Services & Legal",
            ]}
          />
        </div>

        {/* Target Tier */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-sm font-semibold text-foreground">
            Target Customer Segment
          </label>
          <input
            type="text"
            name="targetTier"
            value={data.targetTier}
            onChange={handleInputChange}
            placeholder="e.g. Fortune 500 & Mid-Market"
            className="h-10 sm:h-11 w-full rounded-xl border border-input bg-muted/30 px-3 sm:px-3.5 text-xs sm:text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>

        {/* Support Email */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-sm font-semibold text-foreground">
            Intake Escalation Email
          </label>
          <input
            type="email"
            name="supportEmail"
            value={data.supportEmail || ""}
            onChange={handleInputChange}
            placeholder="e.g. intake-ops@antelier.io"
            className="h-10 sm:h-11 w-full rounded-xl border border-input bg-muted/30 px-3 sm:px-3.5 text-xs sm:text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>

        {/* Company Website URL */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-sm font-semibold text-foreground">
            Organization Website URL
          </label>
          <div className="relative">
            <Globe className="pointer-events-none absolute top-3 left-3 sm:top-3.5 sm:left-3.5 h-4 w-4 text-muted-foreground" />
            <input
              type="url"
              name="companyWebsite"
              value={data.companyWebsite || ""}
              onChange={handleInputChange}
              placeholder="https://company.com"
              className="h-10 sm:h-11 w-full rounded-xl border border-input bg-muted/30 pr-3 sm:pr-3.5 pl-9 sm:pl-10 text-xs sm:text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
            />
          </div>
        </div>

        {/* Company Contact Number */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-sm font-semibold text-foreground">
            Organization Contact Number
          </label>
          <PhoneInput
            value={data.contactNumber || ""}
            onChange={(val) => updateBusinessProfile({ contactNumber: val })}
            placeholder="(555) 234-5678"
          />
        </div>
      </div>

      {/* Primary Intake Goal */}
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-xs sm:text-sm font-semibold text-foreground">
          Primary Client Intake Objective
        </label>
        <textarea
          name="primaryIntakeGoal"
          value={data.primaryIntakeGoal}
          onChange={handleInputChange}
          rows={3}
          placeholder="Describe what your AI intake agents should achieve during prospect conversations..."
          className="w-full resize-none rounded-xl border border-input bg-muted/30 p-3 sm:p-3.5 text-xs sm:text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
        />
      </div>

      {/* Brand Voice / Tone Selector */}
      <div className="space-y-2 sm:space-y-2.5">
        <label className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-foreground">
          <Sparkles className="h-4 w-4 text-primary shrink-0" />
          <span>AI Persona Brand Tone & Style</span>
        </label>
        <div className="grid grid-cols-1 gap-2.5 sm:gap-3.5 sm:grid-cols-2">
          {brandTones.map((tone) => {
            const isSelected = data.brandTone === tone.id
            return (
              <button
                key={tone.id}
                type="button"
                onClick={() => {
                  updateBusinessProfile({ brandTone: tone.id })
                }}
                className={`cursor-pointer rounded-xl border p-3 sm:p-3.5 text-left transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10 ring-1 ring-primary"
                    : "border-border/60 bg-muted/20 hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-bold text-foreground">
                    {tone.title}
                  </span>
                  {isSelected && <Check className="h-4 w-4 text-primary shrink-0" />}
                </div>
                <p className="mt-1 text-[11px] sm:text-xs leading-relaxed text-muted-foreground">
                  {tone.desc}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Standalone Settings Save Bar (Only visible when not embedded in wizard) */}
      {!showTitle && (
        <div className="flex items-center justify-end border-t border-border/50 pt-4">
          <button
            type="button"
            onClick={handleSave}
            className="flex h-10 sm:h-11 cursor-pointer items-center gap-2 rounded-xl bg-primary px-5 sm:px-6 text-xs sm:text-sm font-bold text-primary-foreground shadow-sm transition-all hover:opacity-90"
          >
            <Check className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            <span>Save Changes</span>
          </button>
        </div>
      )}
    </div>
  )
}
