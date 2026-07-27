"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { IntentCategory } from "../../types"

interface AddWorkflowModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateWorkflow: (title: string, category: IntentCategory, desc: string) => void
}

export function AddWorkflowModal({
  isOpen,
  onClose,
  onCreateWorkflow,
}: AddWorkflowModalProps) {
  const [newWfTitle, setNewWfTitle] = React.useState("")
  const [newWfCategory, setNewWfCategory] = React.useState<IntentCategory>("Client & Sales")
  const [newWfDescription, setNewWfDescription] = React.useState("")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newWfTitle.trim()) return
    onCreateWorkflow(newWfTitle.trim(), newWfCategory, newWfDescription.trim())
    setNewWfTitle("")
    setNewWfDescription("")
    onClose()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h3 className="text-lg font-extrabold text-foreground">
              Create Intent Workflow
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-foreground">
                Workflow Intent Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. VIP Concierge Request"
                value={newWfTitle}
                onChange={(e) => setNewWfTitle(e.target.value)}
                className="h-11 w-full rounded-xl border border-border/70 bg-muted/20 px-3.5 text-sm font-medium text-foreground focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-foreground">
                Category
              </label>
              <select
                value={newWfCategory}
                onChange={(e) => setNewWfCategory(e.target.value as IntentCategory)}
                className="h-11 w-full rounded-xl border border-border/70 bg-muted/20 px-3.5 text-sm font-medium text-foreground focus:border-orange-500 focus:outline-none"
              >
                <option value="Client & Sales">Client & Sales</option>
                <option value="Scheduling">Scheduling</option>
                <option value="Support">Support</option>
                <option value="Billing">Billing</option>
                <option value="Notifications">Notifications</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-foreground">
                Short Description
              </label>
              <textarea
                rows={3}
                placeholder="What does this workflow automate?"
                value={newWfDescription}
                onChange={(e) => setNewWfDescription(e.target.value)}
                className="w-full rounded-xl border border-border/70 bg-muted/20 p-3.5 text-sm text-foreground focus:border-orange-500 focus:outline-none"
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
                Create Workflow
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
