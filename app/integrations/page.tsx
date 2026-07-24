import { AppShell } from "@/components/shell/app-shell"
import { IntegrationsView } from "@/features/settings/integrations-view"

export const metadata = {
  title: "Integrations | AntelierHub",
  description: "Connect third-party enterprise tools, CRMs, and webhooks.",
}

export default function IntegrationsPage() {
  return (
    <AppShell>
      <IntegrationsView />
    </AppShell>
  )
}
