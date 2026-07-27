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
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 truncate">
        <span className="truncate font-semibold text-foreground">
          {fileName}
        </span>
        {formattedSize && (
          <span className="font-mono text-xs text-muted-foreground shrink-0">
            ({formattedSize})
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
          <FileCheck2 className="h-3 w-3" />
          Vectorized
        </span>

        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="p-1 text-muted-foreground transition-colors hover:text-rose-500 cursor-pointer"
            title="Remove file"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
