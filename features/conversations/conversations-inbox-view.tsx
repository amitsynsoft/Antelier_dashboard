"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { AppPage, PageHeader } from "@/components/layout/app-page"
import { conversationsInboxMock, InboxConversation } from "@/mock/dashboard-data"
import {
  MessageSquare,
  Search,
  UserCheck,
  Bot,
  User,
  Send,
  Phone,
  Mail,
} from "lucide-react"

export function ConversationsInboxView() {
  const [selectedConv, setSelectedConv] = React.useState<InboxConversation>(
    conversationsInboxMock[0]
  )
  const [activeChannel, setActiveChannel] = React.useState<string>("All")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [messages, setMessages] = React.useState(selectedConv.messages)
  const [inputValue, setInputValue] = React.useState("")
  const [aiStatus, setAiStatus] = React.useState(selectedConv.aiStatus)

  React.useEffect(() => {
    setMessages(selectedConv.messages)
    setAiStatus(selectedConv.aiStatus)
  }, [selectedConv])

  const filteredConversations = conversationsInboxMock.filter((c) => {
    const matchesChannel = activeChannel === "All" || c.channel === activeChannel
    const matchesSearch =
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesChannel && matchesSearch
  })

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    const newMsg = {
      id: `m-${Date.now()}`,
      sender: "human" as const,
      senderName: "Alexandra (Staff)",
      text: inputValue,
      timestamp: now,
    }
    setMessages((prev) => [...prev, newMsg])
    setInputValue("")
    setAiStatus("Human Took Over")
  }

  const toggleHandoff = () => {
    if (aiStatus === "Human Took Over") {
      setAiStatus("AI Handling")
    } else {
      setAiStatus("Human Took Over")
    }
  }

  return (
    <AppPage>
      {/* Standardized Page Header */}
      <PageHeader
        title="Unified Conversation Inbox"
        subtitle="Manage AI and human interactions across Web Chat, WhatsApp, SMS, Voice, and Email."
        icon={<MessageSquare className="h-5 w-5" />}
        actions={
          <div className="flex items-center gap-2">
            {["Web", "WhatsApp", "SMS", "Email"].map((ch) => (
              <span key={ch} className="px-2.5 py-1 text-[11px] font-semibold rounded-full border border-border bg-card text-muted-foreground">
                {ch} Live
              </span>
            ))}
          </div>
        }
      />

      {/* 3-Column Layout: Inbox List (4 cols) + Active Chat (5 cols) + Customer Profile (3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[720px] min-h-[640px]">
        {/* INBOX LIST (4 cols) */}
        <div className="lg:col-span-4 flex flex-col rounded-3xl border border-border/70 bg-card shadow-xs overflow-hidden">
          <div className="p-4 border-b border-border/60 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by customer name or email..."
                className="w-full rounded-xl border border-border/70 bg-muted/40 pl-9 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-wrap gap-1">
              {["All", "Website Chat", "WhatsApp", "SMS", "Email"].map((ch) => (
                <button
                  key={ch}
                  type="button"
                  onClick={() => setActiveChannel(ch)}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition-colors cursor-pointer ${
                    activeChannel === ch
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2 no-scrollbar">
            {filteredConversations.map((c) => {
              const isSelected = c.id === selectedConv.id
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedConv(c)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-primary/40 bg-primary/10 shadow-2xs"
                      : "border-border/50 bg-card hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Image
                        src={c.customerAvatar}
                        alt={c.customerName}
                        width={28}
                        height={28}
                        className="h-7 w-7 rounded-full object-cover border border-border"
                      />
                      <span className="text-xs font-bold text-foreground truncate">
                        {c.customerName}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {c.lastActivityTime}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="font-semibold text-primary">
                      {c.channel}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.aiStatus === "Human Took Over"
                        ? "bg-amber-500/10 text-amber-600 border border-amber-500/30"
                        : "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                    }`}>
                      {c.aiStatus}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ACTIVE CHAT FEED (5 cols) */}
        <div className="lg:col-span-5 flex flex-col rounded-3xl border border-border/70 bg-card shadow-xs overflow-hidden">
          <div className="p-4 border-b border-border/60 flex items-center justify-between bg-muted/20">
            <div className="flex items-center gap-3">
              <Image
                src={selectedConv.customerAvatar}
                alt={selectedConv.customerName}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover border border-border"
              />
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  {selectedConv.customerName}
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Via {selectedConv.channel} • {selectedConv.assignedStaff}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleHandoff}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1.5 ${
                aiStatus === "Human Took Over"
                  ? "bg-amber-500 text-white"
                  : "border border-border bg-card text-foreground hover:bg-muted"
              }`}
            >
              {aiStatus === "Human Took Over" ? (
                <>
                  <UserCheck className="h-3.5 w-3.5" />
                  <span>Human Active (Return to AI)</span>
                </>
              ) : (
                <>
                  <Bot className="h-3.5 w-3.5 text-primary" />
                  <span>Take Over Chat</span>
                </>
              )}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar bg-gradient-to-b from-card to-muted/20">
            {messages.map((m) => {
              const isCust = m.sender === "customer"
              const isHuman = m.sender === "human"
              return (
                <div
                  key={m.id}
                  className={`flex ${isCust ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-2xs ${
                      isCust
                        ? "bg-card border border-border/70 text-foreground rounded-bl-2xs"
                        : isHuman
                        ? "bg-amber-500 text-white rounded-br-2xs"
                        : "bg-primary text-primary-foreground rounded-br-2xs"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-1 text-[10px] opacity-80">
                      <span className="font-bold">{m.senderName}</span>
                      <span>{m.timestamp}</span>
                    </div>
                    <p className="font-medium">{m.text}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="p-3 border-t border-border/60 bg-card flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={
                aiStatus === "Human Took Over"
                  ? "Reply as human staff operator..."
                  : "Type to intervene & take over conversation..."
              }
              className="flex-1 rounded-xl border border-border/70 bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              onClick={handleSendMessage}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-2xs hover:opacity-95 transition-opacity cursor-pointer shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* CUSTOMER PROFILE SIDEBAR (3 cols) */}
        <div className="lg:col-span-3 rounded-3xl border border-border/70 bg-card p-4 sm:p-5 shadow-xs space-y-4 overflow-y-auto no-scrollbar">
          <div className="text-center border-b border-border/60 pb-4">
            <Image
              src={selectedConv.customerAvatar}
              alt={selectedConv.customerName}
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover mx-auto border-2 border-primary/20 mb-2"
            />
            <h3 className="text-sm font-bold text-foreground">
              {selectedConv.customerName}
            </h3>
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 mt-1">
              Lead Score: 92 (High Priority)
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="truncate">{selectedConv.customerEmail}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>{selectedConv.customerPhone}</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl border border-border/60 bg-muted/20 space-y-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Assigned Representative
            </span>
            <p className="text-xs font-bold text-foreground">
              {selectedConv.assignedStaff}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
              AI Event Timeline
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>RAG Verified:</span>
                <span className="font-bold text-foreground">10:14 AM</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Salesforce Sync:</span>
                <span className="font-bold text-foreground">10:15 AM</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>SMS Dispatched:</span>
                <span className="font-bold text-foreground">10:16 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppPage>
  )
}
