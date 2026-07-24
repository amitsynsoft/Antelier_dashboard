import { AppShell } from "@/components/shell/app-shell"
import { KnowledgeBaseView } from "@/features/settings/knowledge-base-view"

export const metadata = {
  title: "Knowledge Base | AntelierHub",
  description: "Manage RAG documents, SOPs, and web scrapers.",
}

export default function KnowledgeBasePage() {
  return (
    <AppShell>
      <KnowledgeBaseView />
    </AppShell>
  )
}
