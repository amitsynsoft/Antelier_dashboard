"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, X, Zap, CheckCircle2 } from "lucide-react"
import { IntentWorkflow } from "../../types"

interface TestWorkflowModalProps {
  isOpen: boolean
  onClose: () => void
  workflow: IntentWorkflow
}

export function TestWorkflowModal({
  isOpen,
  onClose,
  workflow,
}: TestWorkflowModalProps) {
  const [testMessage, setTestMessage] = React.useState(
    "Hi, I want to become a new client and check pricing for your services."
  )
  const [isSimulating, setIsSimulating] = React.useState(false)
  const [testLogs, setTestLogs] = React.useState<
    { step: string; status: string; detail: string }[] | null
  >(null)

  if (!isOpen) return null

  const handleStartSimulation = () => {
    setIsSimulating(true)
    setTestLogs(null)

    setTimeout(() => {
      setIsSimulating(false)
      const logs = [
        {
          step: `1. Intent Classification`,
          status: "Match Found",
          detail: `Detected Intent "${workflow.intentName}" (Confidence Score: 94.8% >= threshold ${workflow.confidenceThreshold}%)`,
        },
        ...workflow.actions.map((act, index) => ({
          step: `${index + 2}. Action Execution: ${act.title}`,
          status: "Success",
          detail: `Executed [${act.type.toUpperCase()}] integration payload: "${act.description}" in ${
            120 + index * 45
          }ms`,
        })),
      ]
      setTestLogs(logs)
    }, 1200)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4 text-orange-500 fill-current" />
              <h3 className="text-base font-extrabold text-foreground">
                Test Workflow: {workflow.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-foreground">
              Simulated Customer Message Input
            </label>
            <textarea
              rows={3}
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              className="w-full rounded-2xl border border-border/70 bg-muted/20 p-3 text-xs text-foreground focus:border-orange-500 focus:outline-none"
            />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleStartSimulation}
                disabled={isSimulating}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-orange-600 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-orange-500 disabled:opacity-50"
              >
                {isSimulating ? (
                  <>
                    <Zap className="h-3.5 w-3.5 animate-spin" />
                    <span>Evaluating Intent & Actions...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Simulate Intent Execution</span>
                  </>
                )}
              </button>
            </div>

            {testLogs && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4"
              >
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                  <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                    Execution Result: SUCCESS
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    Total Execution Time: 384ms
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  {testLogs.map((log, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <div>
                        <span className="font-bold text-foreground">
                          {log.step}:{" "}
                        </span>
                        <span className="text-muted-foreground">
                          {log.detail}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
