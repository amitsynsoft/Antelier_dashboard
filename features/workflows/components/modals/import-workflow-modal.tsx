"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface ImportWorkflowModalProps {
  isOpen: boolean
  onClose: () => void
  onImportSuccess: () => void
}

export function ImportWorkflowModal({
  isOpen,
  onClose,
  onImportSuccess,
}: ImportWorkflowModalProps) {
  if (!isOpen) return null

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
            <h3 className="text-base font-extrabold text-foreground">
              Import Workflow JSON
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Paste intent workflow JSON configuration to import directly into your
              workspace library.
            </p>
            <textarea
              rows={6}
              placeholder={`{\n  "title": "Custom Lead Router",\n  "intentName": "Lead Inquiry",\n  "confidenceThreshold": 80,\n  "actions": [...]\n}`}
              className="w-full rounded-2xl border border-border/70 bg-muted/20 p-3 font-mono text-[11px] text-foreground focus:border-orange-500 focus:outline-none"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-border/70 px-4 py-2 text-xs font-bold text-muted-foreground hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose()
                  onImportSuccess()
                }}
                className="rounded-xl bg-orange-600 px-4 py-2 text-xs font-bold text-white hover:bg-orange-500"
              >
                Import Workflow
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
