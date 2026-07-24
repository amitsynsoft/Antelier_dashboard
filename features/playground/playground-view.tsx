"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { AppPage, PageHeader } from "@/components/layout/app-page"
import { playgroundScenariosMock, PlaygroundScenario } from "@/mock/dashboard-data"
import {
  Send,
  Sparkles,
  Search,
  FileText,
  Sliders,
  GitFork,
  Plug,
  ShieldCheck,
  Zap,
  Clock,
  RefreshCw,
  CheckCircle2,
  ChevronRight,
  Bot,
  User,
  Building2,
  Filter,
} from "lucide-react"

export function PlaygroundView() {
  const [selectedScenario, setSelectedScenario] = React.useState<PlaygroundScenario>(
    playgroundScenariosMock[0]
  )
  const [activeFilter, setActiveFilter] = React.useState<string>("All")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [messages, setMessages] = React.useState(selectedScenario.initialMessages)
  const [inputValue, setInputValue] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const chatEndRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setMessages(selectedScenario.initialMessages)
  }, [selectedScenario])

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const filteredScenarios = playgroundScenariosMock.filter((sc) => {
    const matchesFilter = activeFilter === "All" || sc.industry === activeFilter
    const matchesSearch =
      sc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sc.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue
    if (!text.trim()) return

    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    const newMsg = { sender: "user" as const, text, time: now }
    setMessages((prev) => [...prev, newMsg])
    if (!textToSend) setInputValue("")

    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const aiReply = {
        sender: "bot" as const,
        text: `Thank you for providing that detail. I've updated the ${selectedScenario.industry} intake record and validated compliance rules under Prompt ${selectedScenario.insights.promptVersion}.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
      setMessages((prev) => [...prev, aiReply])
    }, 1200)
  }

  return (
    <AppPage>
      {/* Standardized Page Header */}
      <PageHeader
        title="AI Playground & Simulation"
        subtitle="Simulate real-time conversations with your configured AI assistant across multiple industry scenarios."
        icon={<Bot className="h-5 w-5" />}
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live AI Agent Active
          </span>
        }
        actions={
          <button
            type="button"
            onClick={() => setMessages(selectedScenario.initialMessages)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground shadow-2xs hover:bg-muted transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset Chat</span>
          </button>
        }
      />

      {/* 3-Column Interactive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[720px] min-h-[640px]">
        {/* LEFT PANEL: Scenarios List (3 cols) */}
        <div className="lg:col-span-3 flex flex-col rounded-3xl border border-border/70 bg-card shadow-xs overflow-hidden">
          <div className="p-4 border-b border-border/60 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Demo Scenarios
              </h3>
              <span className="text-xs font-semibold text-muted-foreground">
                {filteredScenarios.length} Scenarios
              </span>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scenario..."
                className="w-full rounded-xl border border-border/70 bg-muted/40 pl-9 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-wrap gap-1 pt-1">
              {["All", "Healthcare", "Legal", "Dental", "Financial"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-colors cursor-pointer ${
                    activeFilter === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2 no-scrollbar">
            {filteredScenarios.map((sc) => {
              const isSelected = sc.id === selectedScenario.id
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setSelectedScenario(sc)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-primary/40 bg-primary/10 shadow-2xs"
                      : "border-border/50 bg-card hover:bg-muted/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <Image
                      src={sc.customerAvatar}
                      alt={sc.customerName}
                      width={28}
                      height={28}
                      className="h-7 w-7 rounded-full object-cover border border-border"
                    />
                    <div className="overflow-hidden flex-1">
                      <p className="text-xs font-bold text-foreground truncate">
                        {sc.customerName}
                      </p>
                      <p className="text-[10px] font-semibold text-primary">
                        {sc.industry}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-foreground line-clamp-2 leading-snug">
                    {sc.title}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* CENTER PANEL: Chat Interface (5 cols) */}
        <div className="lg:col-span-5 flex flex-col rounded-3xl border border-border/70 bg-card shadow-xs overflow-hidden">
          <div className="p-4 border-b border-border/60 flex items-center justify-between bg-muted/20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src={selectedScenario.customerAvatar}
                  alt={selectedScenario.customerName}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover border border-border"
                />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  {selectedScenario.customerName}
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  {selectedScenario.industry} Client Intake Simulation
                </p>
              </div>
            </div>

            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
              Live Session
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar bg-gradient-to-b from-card to-muted/20">
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => {
                const isUser = msg.sender === "user"
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[82%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-2xs ${
                        isUser
                          ? "bg-primary text-primary-foreground rounded-br-2xs"
                          : "bg-card border border-border/70 text-foreground rounded-bl-2xs"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 mb-1 text-[10px] opacity-80">
                        <span className="font-bold">
                          {isUser ? selectedScenario.customerName : "Ava (AI Assistant)"}
                        </span>
                        <span>{msg.time}</span>
                      </div>
                      <p className="font-medium">{msg.text}</p>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-border/70 bg-card p-3 rounded-bl-2xs flex items-center gap-1.5 text-muted-foreground text-xs">
                  <span className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                  <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                  <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] font-medium ml-1">Ava is processing RAG & Rules...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="px-4 py-2 bg-muted/20 border-t border-border/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold text-muted-foreground shrink-0 uppercase">Try:</span>
            {[
              "Check insurance copay",
              "Schedule 2:00 PM today",
              "Escalate to Supervisor"
            ].map((chip, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(chip)}
                className="shrink-0 px-2.5 py-1 text-[11px] font-semibold rounded-full border border-border bg-card hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          <div className="p-3 border-t border-border/60 bg-card flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a test prompt or customer response..."
              className="flex-1 rounded-xl border border-border/70 bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => handleSendMessage()}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-2xs hover:opacity-95 transition-opacity cursor-pointer shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: Live AI Insights Inspector (4 cols) */}
        <div className="lg:col-span-4 flex flex-col rounded-3xl border border-border/70 bg-card shadow-xs p-4 sm:p-5 space-y-4 overflow-y-auto no-scrollbar">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-primary" />
              <h3 className="text-sm font-bold text-foreground">
                Live AI Insights & RAG
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              {selectedScenario.insights.confidenceScore} Confidence
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded-2xl border border-border/60 bg-muted/20 space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Clock className="h-3 w-3 text-primary" /> Response Time
              </span>
              <p className="text-sm font-extrabold text-foreground">
                {selectedScenario.insights.responseTimeMs}ms
              </p>
            </div>

            <div className="p-2.5 rounded-2xl border border-border/60 bg-muted/20 space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Sliders className="h-3 w-3 text-primary" /> Prompt Version
              </span>
              <p className="text-xs font-bold text-foreground truncate">
                {selectedScenario.insights.promptVersion}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl border border-border/60 bg-muted/20 space-y-1.5">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-primary" /> RAG Knowledge Source
            </span>
            <p className="text-xs font-bold text-foreground leading-tight">
              {selectedScenario.insights.knowledgeSource}
            </p>
          </div>

          <div className="p-3 rounded-2xl border border-border/60 bg-muted/20 space-y-1.5">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <GitFork className="h-3.5 w-3.5 text-primary" /> Triggered Automation Workflow
            </span>
            <p className="text-xs font-bold text-foreground leading-tight">
              {selectedScenario.insights.workflowTriggered}
            </p>
          </div>

          <div className="p-3 rounded-2xl border border-border/60 bg-muted/20 space-y-1.5">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Plug className="h-3.5 w-3.5 text-primary" /> CRM & Integration Execution
            </span>
            <p className="text-xs font-semibold text-foreground leading-tight">
              {selectedScenario.insights.crmAction}
            </p>
          </div>

          <div className="p-3 rounded-2xl border border-border/60 bg-muted/20 space-y-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Extracted Intake Fields
            </span>
            <div className="space-y-1">
              {Object.entries(selectedScenario.insights.collectedFields).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between text-[11px] py-0.5 border-b border-border/30 last:border-0">
                  <span className="text-muted-foreground font-medium">{key}:</span>
                  <span className="font-bold text-foreground">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 space-y-1">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Escalation & Routing Status
            </span>
            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
              {selectedScenario.insights.escalationStatus}
            </p>
          </div>
        </div>
      </div>
    </AppPage>
  )
}
