import { AppShell } from "@/components/shell/app-shell"
import { BusinessProfileView } from "@/features/settings/business-profile-view"

export const metadata = {
  title: "Business Profile | AntelierHub",
  description: "Configure enterprise brand identity and intake positioning.",
}

export default function BusinessProfilePage() {
  return (
    <AppShell>
      <BusinessProfileView />
    </AppShell>
  )
}
