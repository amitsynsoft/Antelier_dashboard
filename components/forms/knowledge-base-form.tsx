"use client"

import * as React from "react"
import { useWorkspace } from "@/context/workspace-context"
import { FileText, UploadCloud, Link as LinkIcon, Trash2, Plus, CheckCircle2, RefreshCw } from "lucide-react"

interface KnowledgeBaseFormProps {
  onSavedNotice?: () => void
  showTitle?: boolean
}

export function KnowledgeBaseForm({ onSavedNotice, showTitle = false }: KnowledgeBaseFormProps) {
  const { state, updateKnowledgeBase } = useWorkspace()
  const data = state.knowledgeBase
  const [newUrl, setNewUrl] = React.useState("")

  const handleAddUrl = () => {
    if (newUrl.trim()) {
      const updated = [...data.scrapeUrls, newUrl.trim()]
      updateKnowledgeBase({ scrapeUrls: updated, sourcesCount: data.uploadedFiles.length + updated.length })
      setNewUrl("")
      onSavedNotice?.()
    }
  }

  const handleRemoveUrl = (url: string) => {
    const updated = data.scrapeUrls.filter((u) => u !== url)
    updateKnowledgeBase({ scrapeUrls: updated, sourcesCount: data.uploadedFiles.length + updated.length })
    onSavedNotice?.()
  }

  const handleRemoveFile = (file: string) => {
    const updated = data.uploadedFiles.filter((f) => f !== file)
    updateKnowledgeBase({ uploadedFiles: updated, sourcesCount: updated.length + data.scrapeUrls.length })
    onSavedNotice?.()
  }

  const handleFileUploadMock = () => {
    const sampleFiles = [
      "Enterprise_SOC2_Compliance_Report.pdf",
      "SLA_Guarantee_Addendum_2026.pdf",
      "API_Endpoint_Schema_v2.json"
    ]
    const nextFile = sampleFiles[data.uploadedFiles.length % sampleFiles.length]
    if (!data.uploadedFiles.includes(nextFile)) {
      const updated = [...data.uploadedFiles, nextFile]
      updateKnowledgeBase({ uploadedFiles: updated, sourcesCount: updated.length + data.scrapeUrls.length })
      onSavedNotice?.()
    }
  }

  return (
    <div className="space-y-6">
      {showTitle && (
        <div className="space-y-1 pb-4 border-b border-border/50">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Knowledge Base & Data Ingestion
          </h2>
          <p className="text-xs text-muted-foreground">
            Feed your AI intake agents with enterprise whitepapers, security collateral, and RFP documentation.
          </p>
        </div>
      )}

      {/* File Upload Dropzone */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-foreground">Upload Security & Product Collateral</label>
        <div
          onClick={handleFileUploadMock}
          className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border/80 rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer text-center group"
        >
          <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform mb-2">
            <UploadCloud className="h-6 w-6" />
          </div>
          <span className="text-xs font-bold text-foreground">Click to upload collateral files</span>
          <span className="text-[11px] text-muted-foreground mt-0.5">Supports PDF, DOCX, CSV, JSON (Up to 50MB per file)</span>
        </div>

        {/* Uploaded Files List */}
        {data.uploadedFiles.length > 0 && (
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-mono uppercase font-semibold text-muted-foreground">
              Uploaded Documents ({data.uploadedFiles.length})
            </span>
            <div className="space-y-1.5">
              {data.uploadedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-border/60 bg-card text-xs"
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="h-4 w-4 text-primary shrink-0" />
                    <span className="font-semibold text-foreground truncate">{file}</span>
                    <span className="px-1.5 py-0.2 text-[9px] font-mono rounded bg-emerald-500/10 text-emerald-500">
                      Vectorized
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(file)}
                    className="p-1 text-muted-foreground hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Website & Documentation Web Scrapers */}
      <div className="space-y-2 pt-2 border-t border-border/40">
        <label className="text-xs font-semibold text-foreground">Active Documentation Scraping URLs</label>
        <div className="flex gap-2">
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="https://yourcompany.com/docs"
            className="flex-1 h-9 px-3 text-xs bg-muted/30 border border-input rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="px-3 h-9 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 flex items-center gap-1"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add URL</span>
          </button>
        </div>

        {/* URL List */}
        {data.scrapeUrls.length > 0 && (
          <div className="space-y-1.5 pt-2">
            {data.scrapeUrls.map((url, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-lg border border-border/60 bg-card text-xs"
              >
                <div className="flex items-center gap-2 truncate">
                  <LinkIcon className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                  <span className="font-mono text-muted-foreground truncate">{url}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveUrl(url)}
                  className="p-1 text-muted-foreground hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sync Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border/40">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Vector Index Refresh Frequency</label>
          <select
            value={data.syncInterval}
            onChange={(e) => {
              updateKnowledgeBase({ syncInterval: e.target.value as any })
              onSavedNotice?.()
            }}
            className="w-full h-9 px-3 text-xs bg-muted/30 border border-input rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          >
            <option value="realtime">Real-time Webhook</option>
            <option value="hourly">Hourly Auto Sync</option>
            <option value="daily">Daily Cron Sync</option>
            <option value="weekly">Weekly Sync</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-muted/20 mt-auto">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-foreground">Auto-Parse PDF Tables & OCR</div>
            <div className="text-[10px] text-muted-foreground">Extract custom SLA tables automatically</div>
          </div>
          <input
            type="checkbox"
            checked={data.autoParsePdf}
            onChange={(e) => {
              updateKnowledgeBase({ autoParsePdf: e.target.checked })
              onSavedNotice?.()
            }}
            className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
          />
        </div>
      </div>
    </div>
  )
}
