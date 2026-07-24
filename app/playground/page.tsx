import { AppShell } from "@/components/shell/app-shell"
import { PlaygroundView } from "@/features/playground/playground-view"

export const metadata = {
  title: "AI Playground | AntelierHub",
  description: "Simulate real-time conversations and test AI assistant performance.",
}

export default function PlaygroundPage() {
  return (
    <AppShell>
      <PlaygroundView />
    </AppShell>
  )
}
