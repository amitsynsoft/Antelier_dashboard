"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { AppPage, PageHeader } from "@/components/layout/app-page"
import { usersListMock, UserItem } from "@/mock/dashboard-data"
import {
  Users,
  UserPlus,
  Search,
  CheckCircle2,
  X,
} from "lucide-react"

export function UsersPermissionsView() {
  const [users, setUsers] = React.useState<UserItem[]>(usersListMock)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedRole, setSelectedRole] = React.useState<string>("All Roles")
  const [selectedUser, setSelectedUser] = React.useState<UserItem | null>(null)
  const [inviteModalOpen, setInviteModalOpen] = React.useState(false)
  const [inviteEmail, setInviteEmail] = React.useState("")
  const [inviteRole, setInviteRole] = React.useState<UserItem["role"]>("Agent")
  const [toastMsg, setToastMsg] = React.useState<string | null>(null)

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
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      role: inviteRole,
      team: "Clinical Operations",
      status: "Invited",
      lastActive: "Pending Invite",
    }

    setUsers((prev) => [newUser, ...prev])
    setInviteModalOpen(false)
    setInviteEmail("")
    setToastMsg(`Invitation email sent to "${inviteEmail}" with role ${inviteRole}`)
    setTimeout(() => setToastMsg(null), 4000)
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
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs sm:text-sm font-semibold text-primary-foreground shadow-2xs hover:opacity-95 transition-all"
          >
            <UserPlus className="h-4 w-4" />
            <span>Invite Team Member</span>
          </button>
        }
      />

      {/* Toast Feedback */}
      {toastMsg && (
        <div className="p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
            <span>{toastMsg}</span>
          </div>
          <button type="button" onClick={() => setToastMsg(null)} className="cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* KPI Cards Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl border border-border/70 bg-card space-y-1 shadow-2xs">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            Total Team Members
          </span>
          <p className="text-2xl font-extrabold text-foreground">{users.length}</p>
        </div>

        <div className="p-4 rounded-2xl border border-border/70 bg-card space-y-1 shadow-2xs">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            Active Seat Licenses
          </span>
          <p className="text-2xl font-extrabold text-foreground">
            {users.filter((u) => u.status === "Active").length} / 10
          </p>
        </div>

        <div className="p-4 rounded-2xl border border-border/70 bg-card space-y-1 shadow-2xs">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            Admin Roles
          </span>
          <p className="text-2xl font-extrabold text-foreground">
            {users.filter((u) => u.role === "Workspace Owner" || u.role === "AI Admin").length}
          </p>
        </div>

        <div className="p-4 rounded-2xl border border-border/70 bg-card space-y-1 shadow-2xs">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            Department Teams
          </span>
          <p className="text-2xl font-extrabold text-foreground">4</p>
        </div>
      </div>

      {/* Filter & Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {["All Roles", "Workspace Owner", "AI Admin", "Operations Manager", "Agent"].map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setSelectedRole(role)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
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
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users, emails, teams..."
            className="w-full rounded-xl border border-border/70 bg-muted/40 pl-9 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Users Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className={selectedUser ? "lg:col-span-7" : "lg:col-span-12"}>
          <div className="rounded-3xl border border-border/70 bg-card shadow-xs overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/60 bg-muted/20 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="p-3.5">User</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5 hidden sm:table-cell">Team</th>
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
                      className={`transition-colors cursor-pointer ${
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
                            className="h-8 w-8 rounded-full object-cover border border-border"
                          />
                          <div>
                            <p className="font-bold text-foreground leading-tight">{u.name}</p>
                            <p className="text-xs text-muted-foreground">{u.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          u.role === "Workspace Owner"
                            ? "bg-primary/10 text-primary border-primary/20"
                            : "bg-muted text-foreground border-border/60"
                        }`}>
                          {u.role}
                        </span>
                      </td>

                      <td className="p-3.5 hidden sm:table-cell font-semibold text-muted-foreground">
                        {u.team}
                      </td>

                      <td className="p-3.5">
                        <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                          u.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                            : "bg-amber-500/10 text-amber-600 border border-amber-500/30"
                        }`}>
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
            className="lg:col-span-5 rounded-3xl border border-border/70 bg-card p-5 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                User Profile & Access
              </span>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="text-muted-foreground hover:text-foreground p-1 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="text-center space-y-2">
              <Image
                src={selectedUser.avatar}
                alt={selectedUser.name}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover mx-auto border-2 border-primary/20"
              />
              <h3 className="text-base font-bold text-foreground">{selectedUser.name}</h3>
              <p className="text-xs text-muted-foreground">{selectedUser.email}</p>
            </div>

            <div className="space-y-2 pt-2">
              <div className="p-3 rounded-2xl border border-border/60 bg-muted/20 flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium">Assigned Role:</span>
                <span className="font-bold text-primary">{selectedUser.role}</span>
              </div>

              <div className="p-3 rounded-2xl border border-border/60 bg-muted/20 flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium">Department Team:</span>
                <span className="font-bold text-foreground">{selectedUser.team}</span>
              </div>

              <div className="p-3 rounded-2xl border border-border/60 bg-muted/20 flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium">Status:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{selectedUser.status}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* INVITE USER MODAL DIALOG */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in-50">
          <div className="w-full max-w-md rounded-3xl border border-border bg-popover text-popover-foreground p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">Invite Team Member</h3>
              </div>
              <button
                type="button"
                onClick={() => setInviteModalOpen(false)}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSendInvite} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="e.g. sarah@aetherhealth.org"
                  className="w-full rounded-xl border border-border/70 bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">
                  Role Privilege
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as UserItem["role"])}
                  className="w-full rounded-xl border border-border/70 bg-background px-3 py-2.5 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
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
                  className="px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-primary text-primary-foreground shadow-2xs hover:opacity-95 transition-opacity cursor-pointer"
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
