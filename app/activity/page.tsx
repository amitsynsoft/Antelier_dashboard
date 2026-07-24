import { AppShell } from "@/components/shell/app-shell"
import { ActivityCenterView } from "@/features/activity/activity-center-view"

export const metadata = {
  title: "Activity Center | AntelierHub",
  description: "Unified activity logs for AI, workflows, and audit history.",
}

export default function ActivityPage() {
  return (
    <AppShell>
      <ActivityCenterView />
    </AppShell>
  )
}
