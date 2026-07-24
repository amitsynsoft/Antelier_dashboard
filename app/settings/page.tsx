import { AppShell } from "@/components/shell/app-shell"
import { BusinessProfileView } from "@/features/settings/business-profile-view"

export const metadata = {
  title: "Settings | AntelierHub",
  description: "Global workspace settings and platform preferences.",
}

export default function SettingsPage() {
  return (
    <AppShell>
      <BusinessProfileView />
    </AppShell>
  )
}
