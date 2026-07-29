"use client"

import * as React from "react"
import { useWorkspace, KnowledgeBaseData } from "@/context/workspace-context"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { FileUploader } from "@/components/ui/file-uploader/file-uploader"
import { notify } from "@/lib/toast"
import { FileText, Check, Lightbulb } from "lucide-react"

interface KnowledgeBaseFormProps {
  onSavedNotice?: () => void
  showTitle?: boolean
}

export function KnowledgeBaseForm({
  onSavedNotice,
  showTitle = false,
}: KnowledgeBaseFormProps) {
  const { state, updateKnowledgeBase } = useWorkspace()
  const data = state.knowledgeBase

  const handleFilesChange = (fileNames: string[]) => {
    updateKnowledgeBase({
      uploadedFiles: fileNames,
      sourcesCount: fileNames.length + (data.scrapeUrls?.length || 0),
    })
  }

  return (
    <div className="space-y-6">
      {showTitle && (
        <div className="space-y-1 border-b border-border/50 pb-4">
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
            <FileText className="h-5 w-5 text-primary" />
            Knowledge Base & Data Ingestion
          </h2>
          <p className="text-sm text-muted-foreground">
            Feed your AI intake agents with enterprise whitepapers, security
            collateral, and RFP documentation.
          </p>
        </div>
      )}

      {/* Tip Banner */}
      <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs leading-relaxed text-foreground sm:text-sm">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
          <Lightbulb className="h-4 w-4" />
        </div>
        <div>
          <span className="font-bold text-foreground">Tip: </span>
          Include anything a customer might ask — prices, packages, service
          areas, hours, common questions. The clearer the document, the better
          the answers.
        </div>
      </div>

      {/* Enterprise Reusable FileUploader Suite */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          Upload Security & Product Collateral
        </label>

        <FileUploader
          mode="multiple"
          maxSizeMB={50}
          maxFiles={15}
          value={data.uploadedFiles}
          onFilesChange={handleFilesChange}
        />
      </div>

      {!showTitle && (
        <div className="flex items-center justify-end border-t border-border/50 pt-4">
          <button
            type="button"
            onClick={() => {
              updateKnowledgeBase({})
              notify.success("Knowledge Base saved & indexed!", {
                description: "Vector database status and RAG pipeline updated.",
              })
              onSavedNotice?.()
            }}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-2xs transition-all hover:opacity-90"
          >
            <Check className="h-4 w-4" />

            <span>Save Changes</span>
          </button>
        </div>
      )}
    </div>
  )
}
