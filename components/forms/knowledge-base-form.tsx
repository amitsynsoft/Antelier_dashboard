"use client"

import * as React from "react"
import { useWorkspace, KnowledgeBaseData } from "@/context/workspace-context"
import { FileUploader } from "@/components/ui/file-uploader"
import { notify } from "@/lib/toast"
import {
  FileText,
  Link as LinkIcon,
  Trash2,
  Plus,
  CheckCircle2,
  Check,
} from "lucide-react"

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
  const [newUrl, setNewUrl] = React.useState("")

  const handleFilesChange = (fileNames: string[]) => {
    updateKnowledgeBase({
      uploadedFiles: fileNames,
      sourcesCount: fileNames.length + data.scrapeUrls.length,
    })
  }

  const handleAddUrl = () => {
    if (newUrl.trim()) {
      const updated = [...data.scrapeUrls, newUrl.trim()]
      updateKnowledgeBase({
        scrapeUrls: updated,
        sourcesCount: data.uploadedFiles.length + updated.length,
      })
      notify.success("Documentation URL added!", {
        description: `Active web scraper target: ${newUrl.trim()}`,
      })
      setNewUrl("")
      onSavedNotice?.()
    }
  }

  const handleRemoveUrl = (url: string) => {
    const updated = data.scrapeUrls.filter((u) => u !== url)
    updateKnowledgeBase({
      scrapeUrls: updated,
      sourcesCount: data.uploadedFiles.length + updated.length,
    })
    notify.info("Web scraper URL removed", {
      description: url,
    })
    onSavedNotice?.()
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
          onUploadComplete={(name) => {
            notify.success(`Document indexed!`, {
              description: `"${name}" processed & added to vector store.`,
            })
          }}
        />
      </div>

      {/* Website & Documentation Web Scrapers */}
      <div className="space-y-2 border-t border-border/40 pt-3">
        <label className="text-sm font-semibold text-foreground">
          Active Documentation Scraping URLs
        </label>
        <div className="flex gap-2.5">
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="https://yourcompany.com/docs"
            className="h-11 flex-1 rounded-xl border border-input bg-muted/30 px-3.5 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="flex h-11 cursor-pointer items-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground shadow-2xs hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            <span>Add URL</span>
          </button>
        </div>

        {/* URL List */}
        {data.scrapeUrls.length > 0 && (
          <div className="space-y-2 pt-2">
            {data.scrapeUrls.map((url, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-card p-3 text-sm"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <LinkIcon className="h-4 w-4 shrink-0 text-blue-500" />
                  <span className="truncate font-mono text-xs text-muted-foreground">
                    {url}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveUrl(url)}
                  className="cursor-pointer p-1.5 text-muted-foreground transition-colors hover:text-rose-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sync Settings */}
      <div className="grid grid-cols-1 gap-5 border-t border-border/40 pt-3 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Vector Index Refresh Frequency
          </label>
          <select
            value={data.syncInterval}
            onChange={(e) => {
              updateKnowledgeBase({
                syncInterval: e.target
                  .value as KnowledgeBaseData["syncInterval"],
              })
              notify.info("Vector index refresh frequency updated", {
                description: `Frequency set to: ${e.target.value}`,
              })
              onSavedNotice?.()
            }}
            className="h-11 w-full rounded-xl border border-input bg-muted/30 px-3.5 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          >
            <option value="realtime">Real-time Webhook</option>
            <option value="hourly">Hourly Auto Sync</option>
            <option value="daily">Daily Cron Sync</option>
            <option value="weekly">Weekly Sync</option>
          </select>
        </div>

        <div className="mt-auto flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-3.5">
          <div className="space-y-0.5">
            <div className="text-sm font-bold text-foreground">
              Auto-Parse PDF Tables & OCR
            </div>
            <div className="text-xs text-muted-foreground">
              Extract custom SLA tables automatically
            </div>
          </div>
          <input
            type="checkbox"
            checked={data.autoParsePdf}
            onChange={(e) => {
              updateKnowledgeBase({ autoParsePdf: e.target.checked })
              notify.info("PDF OCR Settings saved", {
                description: `Auto-parsing ${e.target.checked ? "enabled" : "disabled"}.`,
              })
              onSavedNotice?.()
            }}
            className="h-5 w-5 cursor-pointer rounded-lg border-input text-primary focus:ring-primary"
          />
        </div>
      </div>

      {!showTitle && (
        <div className="flex items-center justify-between border-t border-border/50 pt-4">
          <span className="text-xs text-muted-foreground">
            Changes auto-saved to workspace vector store.
          </span>
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
