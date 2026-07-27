"use client"

import * as React from "react"
import { AppPage, PageHeader } from "@/components/layout/app-page"
import { KnowledgeBaseForm } from "@/components/forms/knowledge-base-form"
import { useWorkspace } from "@/context/workspace-context"
import { FileText, CheckCircle2, Check } from "lucide-react"

export function KnowledgeBaseView() {
  const { unskipStep } = useWorkspace()

  const handleSaved = () => {
    unskipStep(2)
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
            onClick={handleSaved}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-2xs transition-all hover:opacity-95 sm:text-sm"
          >
            <Check className="h-4 w-4" />

            <span>Save Changes</span>
          </button>
        }
      />

      <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-xs">
        <KnowledgeBaseForm onSavedNotice={handleSaved} />
      </div>
    </AppPage>
  )
}
