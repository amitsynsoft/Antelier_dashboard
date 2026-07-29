"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { WorkflowActionType } from "../../types"
import { ACTION_TYPE_META, PREDEFINED_INTEGRATIONS } from "../../config"

import { Select } from "@/components/ui/select"

interface AddActionModalProps {
  isOpen: boolean
  onClose: () => void
  onAddAction: (type: WorkflowActionType, title: string, desc: string) => void
}

export function AddActionModal({
  isOpen,
  onClose,
  onAddAction,
}: AddActionModalProps) {
  const [activeTab, setActiveTab] = React.useState<"predefined" | "custom">("predefined")
  const [customActionTitle, setCustomActionTitle] = React.useState("")
  const [customActionDesc, setCustomActionDesc] = React.useState("")
  const [customActionType, setCustomActionType] = React.useState<WorkflowActionType>("crm")

  if (!isOpen) return null

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customActionTitle.trim()) return
    onAddAction(
      customActionType,
      customActionTitle.trim(),
      customActionDesc.trim() || "Custom configured business action"
    )
    setCustomActionTitle("")
    setCustomActionDesc("")
    onClose()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-xl rounded-3xl border border-border bg-card p-6 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div>
              <h3 className="text-lg font-extrabold text-foreground">
                Add Workflow Action
              </h3>
              <p className="text-xs text-muted-foreground">
                Select an integration or create a custom action
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex border-b border-border/60">
            <button
              type="button"
              onClick={() => setActiveTab("predefined")}
              className={`border-b-2 px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "predefined"
                  ? "border-orange-600 text-orange-600 dark:text-orange-400"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Predefined Integrations
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("custom")}
              className={`border-b-2 px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "custom"
                  ? "border-orange-600 text-orange-600 dark:text-orange-400"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              + Create Custom Action
            </button>
          </div>

          {activeTab === "predefined" ? (
            <div className="grid max-h-[340px] grid-cols-1 gap-2.5 overflow-y-auto pr-1 sm:grid-cols-2">
              {PREDEFINED_INTEGRATIONS.map((item, i) => {
                const meta = ACTION_TYPE_META[item.type]
                const IconComp = meta.icon
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      onAddAction(item.type, item.title, item.description)
                      onClose()
                    }}
                    className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-3.5 text-left transition-all hover:border-orange-500/50 hover:bg-orange-500/5 cursor-pointer"
                  >
                    <div
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${meta.colorClass}`}
                    >
                      <IconComp className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-foreground">
                        {item.title}
                      </h4>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-snug">
                        {item.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-foreground">
                  Action Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Trigger Zapier Webhook & Send SMS"
                  value={customActionTitle}
                  onChange={(e) => setCustomActionTitle(e.target.value)}
                  className="h-11 w-full rounded-xl border border-border/70 bg-muted/20 px-3.5 text-sm font-medium text-foreground focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-foreground">
                  Action Category
                </label>
                <Select
                  value={customActionType}
                  onChange={(val) =>
                    setCustomActionType(val as WorkflowActionType)
                  }
                  options={[
                    { value: "crm", label: "CRM Integration" },
                    { value: "calendar", label: "Calendar Integration" },
                    { value: "email", label: "Email Service" },
                    { value: "whatsapp", label: "WhatsApp API" },
                    { value: "call", label: "Voice Call Staff" },
                    { value: "notification", label: "Team Notification" },
                    { value: "ticket", label: "Support Desk Ticket" },
                    { value: "finance", label: "Finance & Payment" },
                    { value: "webhook", label: "Custom Webhook" },
                    { value: "custom", label: "Cloud Function Script" },
                  ]}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-foreground">
                  Action Description
                </label>
                <input
                  type="text"
                  placeholder="Brief description of what this custom action performs"
                  value={customActionDesc}
                  onChange={(e) => setCustomActionDesc(e.target.value)}
                  className="h-11 w-full rounded-xl border border-border/70 bg-muted/20 px-3.5 text-sm text-foreground focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-border/70 px-4 py-2.5 text-xs font-bold text-muted-foreground hover:bg-muted cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-orange-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-orange-500 shadow-2xs cursor-pointer"
                >
                  Add Custom Action
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
