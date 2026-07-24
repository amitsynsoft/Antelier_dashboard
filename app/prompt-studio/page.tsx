import { AppShell } from "@/components/shell/app-shell"
import { AiAssistantView } from "@/features/settings/ai-assistant-view"

export const metadata = {
  title: "Prompt Studio | AntelierHub",
  description: "Configure system prompts, persona tone, and AI safety rules.",
}

export default function PromptStudioPage() {
  return (
    <AppShell>
      <AiAssistantView />
    </AppShell>
  )
}
