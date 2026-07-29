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
        subtitle="Upload a document with your pricing, services, and policies so your AI can answer customer questions from it."
        icon={<FileText className="h-5 w-5" />}
      />

      <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-xs">
        <KnowledgeBaseForm onSavedNotice={handleSaved} />
      </div>
    </AppPage>
  )
}
