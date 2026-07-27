"use client"

import * as React from "react"
import Image from "next/image"
import {
  Search,
  Filter,
  PhoneCall,
  MessageSquare,
  Mail,
  MessageCircle,
  Clock,
  ArrowUpRight,
  User,
  Sparkles,
  X,
  AlertTriangle,
} from "lucide-react"
import { recentIntakesMock, RecentIntakeRecord, ChannelType } from "@/mock/mock-intake-data"

const channelIconMap: Record<ChannelType, React.ElementType> = {
  voice: PhoneCall,
  chat: MessageSquare,
  email: Mail,
  whatsapp: MessageCircle,
}

const channelBadgeStyle: Record<ChannelType, string> = {
  voice: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  chat: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  email: "border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400",
  whatsapp: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
}

const statusBadgeStyle: Record<RecentIntakeRecord["status"], string> = {
  Qualified: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Scheduled: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "Urgent Escalation": "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
  "Auto-Resolved": "border-slate-500/30 bg-slate-500/10 text-slate-600 dark:text-slate-400",
  "Pending Review": "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
}

export function RecentIntakesTable() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedChannel, setSelectedChannel] = React.useState<string>("all")
  const [activeRecord, setActiveRecord] = React.useState<RecentIntakeRecord | null>(null)

  const filteredRecords = recentIntakesMock.filter((record) => {
    const matchesSearch =
      record.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.detectedIntent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.summary.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesChannel =
      selectedChannel === "all" || record.channel === selectedChannel
    return matchesSearch && matchesChannel
  })

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
      {/* Header with Search and Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/50 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold tracking-tight text-foreground">
              Recent AI Client Intakes
            </h3>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              Live Feed
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Operational log of incoming client calls, emails, web chats & messages
          </p>
        </div>

        {/* Search & Channel Filter Inputs */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search intakes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8.5 w-44 rounded-xl border border-input bg-muted/30 pl-8 pr-3 text-xs text-foreground focus:ring-2 focus:ring-ring focus:outline-none sm:w-52"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative flex items-center">
            <Filter className="absolute left-2.5 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="h-8.5 rounded-xl border border-input bg-muted/30 pl-7 pr-3 text-xs font-medium text-foreground focus:ring-2 focus:ring-ring focus:outline-none cursor-pointer"
            >
              <option value="all">All Channels</option>
              <option value="voice">Voice Calls</option>
              <option value="chat">Website Chat</option>
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Canvas */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border/60 text-muted-foreground font-mono uppercase tracking-wider text-[10px]">
              <th className="py-2.5 px-3">Customer</th>
              <th className="py-2.5 px-3">Source Channel</th>
              <th className="py-2.5 px-3">Detected Intent</th>
              <th className="py-2.5 px-3">Status / Outcome</th>
              <th className="py-2.5 px-3">Time</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-muted-foreground">
                  No intake logs match your search or filter criteria.
                </td>
              </tr>
            ) : (
              filteredRecords.map((record) => {
                const IconComponent = channelIconMap[record.channel] || MessageSquare

                return (
                  <tr
                    key={record.id}
                    onClick={() => setActiveRecord(record)}
                    className="group cursor-pointer transition-colors hover:bg-muted/40"
                  >
                    {/* Customer */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
                          {record.customerAvatar ? (
                            <Image
                              src={record.customerAvatar}
                              alt={record.customerName}
                              width={32}
                              height={32}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <User className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                            {record.customerName}
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate max-w-[140px]">
                            {record.customerEmail}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Source Channel */}
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-semibold ${
                          channelBadgeStyle[record.channel]
                        }`}
                      >
                        <IconComponent className="h-3.5 w-3.5" />
                        <span>{record.channelLabel}</span>
                      </span>
                    </td>

                    {/* Detected Intent */}
                    <td className="py-3 px-3">
                      <div>
                        <p className="font-semibold text-foreground">
                          {record.detectedIntent}
                        </p>
                        <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                          {record.confidenceScore}% AI confidence
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-bold ${
                          statusBadgeStyle[record.status]
                        }`}
                      >
                        {record.status === "Urgent Escalation" && (
                          <AlertTriangle className="h-3 w-3" />
                        )}
                        <span>{record.status}</span>
                      </span>
                    </td>

                    {/* Time */}
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {record.timestamp}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveRecord(record)
                        }}
                        className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-2xs hover:bg-muted"
                      >
                        <span>View Payload</span>
                        <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Record Details Modal */}
      {activeRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in-50">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-popover p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full overflow-hidden border border-border">
                  <Image
                    src={activeRecord.customerAvatar}
                    alt={activeRecord.customerName}
                    width={36}
                    height={36}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">
                    {activeRecord.customerName}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {activeRecord.customerEmail} • {activeRecord.customerPhone}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveRecord(null)}
                className="rounded-lg p-1 text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 rounded-xl border border-border/60 bg-muted/20 p-3">
                <div>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    Intake Channel
                  </span>
                  <p className="font-semibold text-foreground mt-0.5">
                    {activeRecord.channelLabel}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    Detected Intent
                  </span>
                  <p className="font-semibold text-foreground mt-0.5">
                    {activeRecord.detectedIntent} ({activeRecord.confidenceScore}% confidence)
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-foreground">
                  AI Intake Conversation Summary:
                </span>
                <p className="rounded-xl border border-border/40 bg-muted/30 p-3 text-muted-foreground leading-relaxed">
                  &quot;{activeRecord.summary}&quot;
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  Automated Action Executed:
                </span>
                <p className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl font-bold">
                  {activeRecord.actionTaken}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveRecord(null)}
                className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-2xs hover:opacity-90 cursor-pointer"
              >
                Close Payload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
