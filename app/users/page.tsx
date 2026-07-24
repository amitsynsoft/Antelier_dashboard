import { AppShell } from "@/components/shell/app-shell"
import { UsersPermissionsView } from "@/features/users/users-permissions-view"

export const metadata = {
  title: "Users & Permissions | AntelierHub",
  description: "Manage workspace team members, access roles, and permissions.",
}

export default function UsersPage() {
  return (
    <AppShell>
      <UsersPermissionsView />
    </AppShell>
  )
}
