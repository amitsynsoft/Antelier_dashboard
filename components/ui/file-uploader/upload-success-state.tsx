"use client"

import * as React from "react"
import { FileCheck2, Trash2 } from "lucide-react"

interface UploadSuccessStateProps {
  fileName: string
  formattedSize?: string
  onRemove?: () => void
}

export function UploadSuccessState({
  fileName,
  formattedSize,
  onRemove,
}: UploadSuccessStateProps) {
  return (
    <div className="flex items-center justify-between gap-2 sm:gap-3 min-w-0 w-full overflow-hidden">
      <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 flex-1 overflow-hidden">
        <span className="truncate text-xs sm:text-sm font-semibold text-foreground min-w-0">
          {fileName}
        </span>
        {formattedSize && (
          <span className="font-mono text-[10px] sm:text-xs text-muted-foreground shrink-0 hidden xs:inline">
            ({formattedSize})
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto">
        <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 sm:px-2 sm:py-0.5 font-mono text-[9px] sm:text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
          <FileCheck2 className="h-3 w-3 shrink-0" />
          <span>Vectorized</span>
        </span>

        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="p-1 text-muted-foreground transition-colors hover:text-rose-500 cursor-pointer shrink-0"
            title="Remove file"
          >
            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
