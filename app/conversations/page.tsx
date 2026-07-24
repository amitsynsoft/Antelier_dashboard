import { AppShell } from "@/components/shell/app-shell"
import { ConversationsInboxView } from "@/features/conversations/conversations-inbox-view"

export const metadata = {
  title: "Conversations | AntelierHub",
  description: "Unified multi-channel AI and human conversation inbox.",
}

export default function ConversationsPage() {
  return (
    <AppShell>
      <ConversationsInboxView />
    </AppShell>
  )
}
