"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { IntegrationDefinition } from "../data/integrations-data"
import {
  X,
  RefreshCw,
  Terminal,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Code
} from "lucide-react"

interface IntegrationLogsModalProps {
  integration: IntegrationDefinition | null
  isOpen: boolean
  onClose: () => void
}

export function IntegrationLogsModal({
  integration,
  isOpen,
  onClose
}: IntegrationLogsModalProps) {
  const [copiedId, setCopiedId] = React.useState<string | null>(null)
  const [expandedLogId, setExpandedLogId] = React.useState<string | null>(null)

  if (!isOpen || !integration) return null

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-background/80 backdrop-blur-sm p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        className="w-full max-w-xl h-full max-h-[92vh] rounded-3xl border border-border bg-card text-card-foreground shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/60 bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-background border border-border p-1.5 shrink-0 shadow-2xs">
              <Image
                src={integration.icon}
                alt={integration.name}
                width={24}
                height={24}
                className="h-5 w-5 object-contain"
                unoptimized
              />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary" />
                {integration.name} API & Sync Logs
              </h2>
              <p className="text-[11px] text-muted-foreground">
                Real-time API payloads, status codes, and latency telemetry
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer border border-border/40"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Logs Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 font-mono text-xs">
          {integration.mockLogs.map((log) => {
            const isExpanded = expandedLogId === log.id

            return (
              <div
                key={log.id}
                className="rounded-2xl border border-border/70 bg-muted/30 overflow-hidden shadow-xs transition-all"
              >
                {/* Log Header Row */}
                <div
                  onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                  className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        log.status === 200 || log.status === 201
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                          : "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30"
                      }`}
                    >
                      {log.status}
                    </span>
                    <span className="font-bold text-foreground text-xs">{log.event}</span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {log.latencyMs}ms
                    </span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>

                <div className="px-3.5 pb-3 pt-0 text-[11px] text-muted-foreground">
                  {log.payloadSummary}
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-border/50 bg-background/80 p-4 space-y-3 text-[11px]">
                    {log.requestPayload && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-muted-foreground">
                            Request Payload (JSON)
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(log.requestPayload!, `req-${log.id}`)}
                            className="text-[10px] font-semibold text-primary hover:underline flex items-center gap-1"
                          >
                            {copiedId === `req-${log.id}` ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            {copiedId === `req-${log.id}` ? "Copied" : "Copy"}
                          </button>
                        </div>
                        <pre className="p-3 rounded-xl bg-muted/50 border border-border/60 text-foreground overflow-x-auto text-[10px]">
                          {log.requestPayload}
                        </pre>
                      </div>
                    )}

                    {log.responseBody && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-muted-foreground">
                            Response Body (JSON)
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(log.responseBody!, `res-${log.id}`)}
                            className="text-[10px] font-semibold text-primary hover:underline flex items-center gap-1"
                          >
                            {copiedId === `res-${log.id}` ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            {copiedId === `res-${log.id}` ? "Copied" : "Copy"}
                          </button>
                        </div>
                        <pre className="p-3 rounded-xl bg-muted/50 border border-border/60 text-foreground overflow-x-auto text-[10px]">
                          {log.responseBody}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/60 bg-muted/20 flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-mono">
            Showing {integration.mockLogs.length} recent events
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-primary text-primary-foreground hover:opacity-90 cursor-pointer"
          >
            Close Logs
          </button>
        </div>
      </motion.div>
    </div>
  )
}
