import { AppShell } from "@/components/shell/app-shell"
import { WorkflowBuilderView } from "@/features/workflows/workflow-builder-view"

export const metadata = {
  title: "Workflow Builder | AntelierHub",
  description: "Visual automation engine for business logic and integrations.",
}

export default function WorkflowsPage() {
  return (
    <AppShell>
      <WorkflowBuilderView />
    </AppShell>
  )
}
