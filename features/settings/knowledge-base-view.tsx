"use client"

import * as React from "react"
import { AppPage, PageHeader } from "@/components/layout/app-page"
import { FileText, Upload, Trash2 } from "lucide-react"

export function KnowledgeBaseView() {
  const [files, setFiles] = React.useState([
    "Enterprise_Security_Whitepaper_2026.pdf",
    "Standard_Master_Services_Agreement.docx",
    "API_Integration_Capabilities_Guide.pdf",
    "Patient_Registration_SOP_2026.pdf"
  ])
  const [toastMsg, setToastMsg] = React.useState<string | null>(null)

  const handleUpload = () => {
    const newDoc = `Policy_Document_${Date.now().toString().slice(-4)}.pdf`
    setFiles((prev) => [newDoc, ...prev])
    setToastMsg(`Uploaded and indexed ${newDoc} into RAG database!`)
    setTimeout(() => setToastMsg(null), 3000)
  }

  const handleDelete = (docName: string) => {
    setFiles((prev) => prev.filter((f) => f !== docName))
    setToastMsg(`Removed ${docName} from knowledge base.`)
    setTimeout(() => setToastMsg(null), 3000)
  }

  return (
    <AppPage>
      <PageHeader
        title="Knowledge Base & RAG Indexing"
        subtitle="Manage uploaded SOPs, policy whitepapers, web scrapers, and auto-parse retrieval settings."
        icon={<FileText className="h-5 w-5" />}
        actions={
          <button
            type="button"
            onClick={handleUpload}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs sm:text-sm font-semibold text-primary-foreground shadow-2xs hover:opacity-95 transition-all"
          >
            <Upload className="h-4 w-4" />
            <span>Upload Document</span>
          </button>
        }
      />

      {toastMsg && (
        <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold shadow-2xs">
          {toastMsg}
        </div>
      )}

      {/* RAG Knowledge Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl border border-border/70 bg-card space-y-1 shadow-2xs">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Total Indexed Documents
          </span>
          <p className="text-2xl font-extrabold text-foreground">{files.length}</p>
        </div>

        <div className="p-4 rounded-2xl border border-border/70 bg-card space-y-1 shadow-2xs">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Last Index Sync
          </span>
          <p className="text-2xl font-extrabold text-foreground">2m ago</p>
        </div>

        <div className="p-4 rounded-2xl border border-border/70 bg-card space-y-1 shadow-2xs">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Embedding Model
          </span>
          <p className="text-lg font-extrabold text-primary truncate">text-embedding-3</p>
        </div>
      </div>

      {/* Document List */}
      <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-foreground">Indexed Document Corpus</h3>

        <div className="divide-y divide-border/50">
          {files.map((doc, i) => (
            <div key={i} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <FileText className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">{doc}</p>
                  <p className="text-xs text-muted-foreground">PDF Document • 1.4 MB • Status: Indexed</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDelete(doc)}
                className="text-rose-500 hover:bg-rose-500/10 p-2 rounded-xl transition-colors cursor-pointer"
                title="Delete document"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppPage>
  )
}
