"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, FileCode, FileSpreadsheet, Image as ImageIcon } from "lucide-react"
import { UploadFileItem } from "./types"
import { UploadProgress } from "./upload-progress"
import { UploadErrorState } from "./upload-error-state"
import { UploadSuccessState } from "./upload-success-state"

interface UploadQueueProps {
  items: UploadFileItem[]
  onRemoveItem: (id: string) => void
  onRetryItem: (id: string) => void
}

function getFileIcon(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase()
  if (ext === "json" || ext === "js" || ext === "ts") {
    return <FileCode className="h-4.5 w-4.5 shrink-0 text-violet-500" />
  }
  if (ext === "csv" || ext === "xlsx" || ext === "xls") {
    return <FileSpreadsheet className="h-4.5 w-4.5 shrink-0 text-emerald-500" />
  }
  if (ext === "png" || ext === "jpg" || ext === "jpeg" || ext === "svg" || ext === "webp") {
    return <ImageIcon className="h-4.5 w-4.5 shrink-0 text-amber-500" />
  }
  return <FileText className="h-4.5 w-4.5 shrink-0 text-primary" />
}

export function UploadQueue({
  items,
  onRemoveItem,
  onRetryItem,
}: UploadQueueProps) {
  if (!items.length) return null

  const successCount = items.filter((i) => i.stage === "success").length
  const activeUploads = items.filter((i) => i.stage !== "success" && i.stage !== "error").length

  return (
    <div className="space-y-2.5 pt-1">
      <div className="flex items-center justify-between font-mono text-xs font-semibold text-muted-foreground uppercase">
        <span>
          Uploaded Documents ({successCount}/{items.length})
        </span>
        {activeUploads > 0 && (
          <span className="text-primary font-bold animate-pulse">
            Uploading & Indexing ({activeUploads} active)...
          </span>
        )}
      </div>

      <div className="space-y-2 max-h-[340px] overflow-y-auto pr-0.5">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className={`flex flex-col gap-2 rounded-xl border p-2.5 sm:p-3.5 text-xs sm:text-sm transition-all min-w-0 w-full overflow-hidden ${
                item.stage === "error"
                  ? "border-rose-500/40 bg-rose-500/5"
                  : item.stage !== "success"
                  ? "border-primary/40 bg-primary/5"
                  : "border-border/60 bg-card hover:border-primary/30"
              }`}
            >
              {item.stage === "success" ? (
                <div className="flex items-center gap-2.5 min-w-0 w-full overflow-hidden">
                  {getFileIcon(item.name)}
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <UploadSuccessState
                      fileName={item.name}
                      formattedSize={item.formattedSize}
                      onRemove={() => onRemoveItem(item.id)}
                    />
                  </div>
                </div>
              ) : item.stage === "error" ? (
                <div className="space-y-2 min-w-0 w-full overflow-hidden">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {getFileIcon(item.name)}
                    <span className="font-semibold text-foreground truncate min-w-0">
                      {item.name}
                    </span>
                  </div>
                  <UploadErrorState
                    errorMessage={item.errorMessage || "Upload processing failed"}
                    onRetry={() => onRetryItem(item.id)}
                    onDismiss={() => onRemoveItem(item.id)}
                  />
                </div>
              ) : (
                <div className="space-y-2 min-w-0 w-full overflow-hidden">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {getFileIcon(item.name)}
                    <span className="font-semibold text-foreground truncate min-w-0">
                      {item.name}
                    </span>
                  </div>
                  <UploadProgress progress={item.progress} stage={item.stage} />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
