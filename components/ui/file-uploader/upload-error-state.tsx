"use client"

import * as React from "react"
import { AlertCircle, RefreshCw, X } from "lucide-react"

interface UploadErrorStateProps {
  errorMessage: string
  onRetry?: () => void
  onDismiss?: () => void
}

export function UploadErrorState({
  errorMessage,
  onRetry,
  onDismiss,
}: UploadErrorStateProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs font-semibold text-rose-600 dark:text-rose-400">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 shrink-0" />
        <span>⚠️ {errorMessage}</span>
      </div>

      <div className="flex items-center gap-2">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 cursor-pointer"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Retry</span>
          </button>
        )}

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="p-1 hover:text-rose-700 cursor-pointer"
            title="Dismiss error"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
