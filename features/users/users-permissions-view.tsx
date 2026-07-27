"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { notify } from "@/lib/toast"
import { AppPage, PageHeader } from "@/components/layout/app-page"
import { usersListMock, UserItem } from "@/mock/dashboard-data"
import { Users, UserPlus, Search, X } from "lucide-react"

export function UsersPermissionsView() {
  const [users, setUsers] = React.useState<UserItem[]>(usersListMock)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedRole, setSelectedRole] = React.useState<string>("All Roles")
  const [selectedUser, setSelectedUser] = React.useState<UserItem | null>(null)
  const [inviteModalOpen, setInviteModalOpen] = React.useState(false)
  const [inviteEmail, setInviteEmail] = React.useState("")
  const [inviteRole, setInviteRole] = React.useState<UserItem["role"]>("Agent")

  const filteredUsers = users.filter((u) => {
    const matchesRole = selectedRole === "All Roles" || u.role === selectedRole
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.team.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesRole && matchesSearch
  })

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail.trim()) return

    const newUser: UserItem = {
      id: `u-${Date.now()}`,
      name: inviteEmail.split("@")[0],
      email: inviteEmail,
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      role: inviteRole,
      team: "Clinical Operations",
      status: "Invited",
      lastActive: "Pending Invite",
    }

    setUsers((prev) => [newUser, ...prev])
    setInviteModalOpen(false)
    setInviteEmail("")
    notify.success(`Invitation email sent!`, {
      description: `Sent invite to "${inviteEmail}" with role ${inviteRole}`,
    })
  }

  return (
    <AppPage>
      {/* Standardized Page Header */}
      <PageHeader
        title="Users & Team Permissions"
        subtitle="Manage workspace members, role allocations, team permissions, and seat licenses."
        icon={<Users className="h-5 w-5" />}
        actions={
          <button
            type="button"
            onClick={() => setInviteModalOpen(true)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-2xs transition-all hover:opacity-95 sm:text-sm"
          >
            <UserPlus className="h-4 w-4" />
            <span>Invite Team Member</span>
          </button>
        }
      />

      {/* KPI Cards Header */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <div className="space-y-1 rounded-2xl border border-border/70 bg-card p-4 shadow-2xs">
          <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
            Total Team Members
          </span>
          <p className="text-2xl font-extrabold text-foreground">
            {users.length}
          </p>
        </div>

        <div className="space-y-1 rounded-2xl border border-border/70 bg-card p-4 shadow-2xs">
          <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
            Active Seat Licenses
          </span>
          <p className="text-2xl font-extrabold text-foreground">
            {users.filter((u) => u.status === "Active").length} / 10
          </p>
        </div>

        <div className="space-y-1 rounded-2xl border border-border/70 bg-card p-4 shadow-2xs">
          <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
            Admin Roles
          </span>
          <p className="text-2xl font-extrabold text-foreground">
            {
              users.filter(
                (u) => u.role === "Workspace Owner" || u.role === "AI Admin"
              ).length
            }
          </p>
        </div>

        <div className="space-y-1 rounded-2xl border border-border/70 bg-card p-4 shadow-2xs">
          <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
            Department Teams
          </span>
          <p className="text-2xl font-extrabold text-foreground">4</p>
        </div>
      </div>

      {/* Filter & Search Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-border/60 pb-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            "All Roles",
            "Workspace Owner",
            "AI Admin",
            "Operations Manager",
            "Agent",
          ].map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setSelectedRole(role)}
              className={`cursor-pointer rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                selectedRole === role
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute top-2.5 left-3 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users, emails, teams..."
            className="w-full rounded-xl border border-border/70 bg-muted/40 py-1.5 pr-3 pl-9 text-xs text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Users Table Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className={selectedUser ? "lg:col-span-7" : "lg:col-span-12"}>
          <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-xs">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border/60 bg-muted/20 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  <th className="p-3.5">User</th>
                  <th className="p-3.5">Role</th>
                  <th className="hidden p-3.5 sm:table-cell">Team</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Last Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-xs">
                {filteredUsers.map((u) => {
                  const isSelected = selectedUser?.id === u.id
                  return (
                    <tr
                      key={u.id}
                      onClick={() => setSelectedUser(u)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? "bg-primary/10" : "hover:bg-muted/50"
                      }`}
                    >
                      <td className="p-3.5">
                        <div className="flex items-center gap-2.5">
                          <Image
                            src={u.avatar}
                            alt={u.name}
                            width={32}
                            height={32}
                            className="h-8 w-8 rounded-full border border-border object-cover"
                          />
                          <div>
                            <p className="leading-tight font-bold text-foreground">
                              {u.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {u.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${
                            u.role === "Workspace Owner"
                              ? "border-primary/20 bg-primary/10 text-primary"
                              : "border-border/60 bg-muted text-foreground"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>

                      <td className="hidden p-3.5 font-semibold text-muted-foreground sm:table-cell">
                        {u.team}
                      </td>

                      <td className="p-3.5">
                        <span
                          className={`rounded px-2.5 py-0.5 text-xs font-bold ${
                            u.status === "Active"
                              ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
                              : "border border-amber-500/30 bg-amber-500/10 text-amber-600"
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>

                      <td className="p-3.5 text-right font-mono text-[11px] text-muted-foreground">
                        {u.lastActive}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {selectedUser && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4 rounded-3xl border border-border/70 bg-card p-5 shadow-xs lg:col-span-5"
          >
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <span className="text-[10px] font-bold tracking-wider text-primary uppercase">
                User Profile & Access
              </span>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="cursor-pointer p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2 text-center">
              <Image
                src={selectedUser.avatar}
                alt={selectedUser.name}
                width={64}
                height={64}
                className="mx-auto h-16 w-16 rounded-full border-2 border-primary/20 object-cover"
              />
              <h3 className="text-base font-bold text-foreground">
                {selectedUser.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                {selectedUser.email}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-muted/20 p-3 text-xs">
                <span className="font-medium text-muted-foreground">
                  Assigned Role:
                </span>
                <span className="font-bold text-primary">
                  {selectedUser.role}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-muted/20 p-3 text-xs">
                <span className="font-medium text-muted-foreground">
                  Department Team:
                </span>
                <span className="font-bold text-foreground">
                  {selectedUser.team}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-muted/20 p-3 text-xs">
                <span className="font-medium text-muted-foreground">
                  Status:
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {selectedUser.status}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* INVITE USER MODAL DIALOG */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-background/80 p-4 backdrop-blur-sm fade-in-50">
          <div className="w-full max-w-md space-y-4 rounded-3xl border border-border bg-popover p-6 text-popover-foreground shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">
                  Invite Team Member
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInviteModalOpen(false)}
                className="cursor-pointer text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSendInvite} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold text-foreground">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="e.g. sarah@aetherhealth.org"
                  className="w-full rounded-xl border border-border/70 bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-foreground">
                  Role Privilege
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) =>
                    setInviteRole(e.target.value as UserItem["role"])
                  }
                  className="w-full rounded-xl border border-border/70 bg-background px-3 py-2.5 text-xs font-semibold text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                >
                  <option value="Agent">Agent (Intake & Response)</option>
                  <option value="Operations Manager">Operations Manager</option>
                  <option value="AI Admin">AI Admin (Prompts & RAG)</option>
                  <option value="Workspace Owner">Workspace Owner</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="cursor-pointer px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-2xs transition-opacity hover:opacity-95"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppPage>
  )
}
