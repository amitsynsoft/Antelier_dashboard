"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { AppPage, PageHeader } from "@/components/layout/app-page"
import { workflowsMock, WorkflowItem } from "@/mock/dashboard-data"
import {
  GitFork,
  Play,
  CheckCircle2,
  Sliders,
  Bot,
  Plug,
  MessageSquare,
  Clock,
  Zap,
  ArrowDown,
  X,
} from "lucide-react"

export function WorkflowBuilderView() {
  const [selectedWorkflow, setSelectedWorkflow] = React.useState<WorkflowItem>(
    workflowsMock[0]
  )
  const [selectedNode, setSelectedNode] = React.useState<WorkflowItem["nodes"][0] | null>(
    workflowsMock[0].nodes[0]
  )
  const [isSimulating, setIsSimulating] = React.useState(false)
  const [simResults, setSimResults] = React.useState<string | null>(null)

  const handleRunSimulation = () => {
    setIsSimulating(true)
    setSimResults(null)
    setTimeout(() => {
      setIsSimulating(false)
      setSimResults(`Workflow "${selectedWorkflow.title}" executed 4/4 nodes successfully in 420ms!`)
    }, 1500)
  }

  return (
    <AppPage>
      {/* Standardized Page Header */}
      <PageHeader
        title="Visual Workflow Builder"
        subtitle="Design visual automation triggers, business conditions, and integration action steps."
        icon={<GitFork className="h-5 w-5" />}
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Validated & Live (v3.2)
          </span>
        }
        actions={
          <button
            type="button"
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs sm:text-sm font-semibold text-primary-foreground shadow-2xs hover:opacity-95 transition-all disabled:opacity-50"
          >
            {isSimulating ? (
              <>
                <Zap className="h-4 w-4 animate-spin" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-current" />
                <span>Run Test Simulation</span>
              </>
            )}
          </button>
        }
      />

      {/* Simulation Feedback Toast */}
      {simResults && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-semibold shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
            <span>{simResults}</span>
          </div>
          <button
            type="button"
            onClick={() => setSimResults(null)}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}

      {/* Template Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {workflowsMock.map((wf) => {
          const isSelected = wf.id === selectedWorkflow.id
          return (
            <button
              key={wf.id}
              type="button"
              onClick={() => {
                setSelectedWorkflow(wf)
                setSelectedNode(wf.nodes[0])
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? "border-primary/40 bg-primary/10 shadow-2xs"
                  : "border-border/60 bg-card hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  {wf.category} Workflow
                </span>
                <span className="text-[10px] font-semibold text-muted-foreground">
                  {wf.executionsCount} Runs
                </span>
              </div>
              <h4 className="text-sm font-bold text-foreground leading-tight">
                {wf.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {wf.description}
              </p>
            </button>
          )
        })}
      </div>

      {/* Main Builder Grid: Canvas (8 cols) + Properties Panel (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[540px]">
        {/* VISUAL CANVAS (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl border border-border/70 bg-gradient-to-b from-card via-card to-muted/20 p-6 shadow-xs flex flex-col items-center justify-start space-y-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="w-full flex items-center justify-between z-10 border-b border-border/40 pb-3 mb-2">
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Canvas Diagram: {selectedWorkflow.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                Click any node to inspect its properties & integration mappings.
              </p>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground">
              4 Nodes Connected
            </span>
          </div>

          <div className="w-full max-w-xl space-y-4 z-10 flex flex-col items-center">
            {selectedWorkflow.nodes.map((node, index) => {
              const isSelected = selectedNode?.id === node.id

              let nodeBadgeColor = "bg-blue-500/10 text-blue-600 border-blue-500/30"
              if (node.type === "condition") {
                nodeBadgeColor = "bg-amber-500/10 text-amber-600 border-amber-500/30"
              } else if (node.type === "action") {
                nodeBadgeColor = "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
              }

              return (
                <React.Fragment key={node.id}>
                  {index > 0 && (
                    <div className="flex flex-col items-center my-1 text-primary">
                      <div className="h-4 w-0.5 bg-primary/40" />
                      <ArrowDown className="h-4 w-4 text-primary" />
                    </div>
                  )}

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedNode(node)}
                    className={`w-full p-4 rounded-2xl border transition-all cursor-pointer shadow-xs ${
                      isSelected
                        ? "border-primary/60 bg-card ring-2 ring-primary/20 shadow-md"
                        : "border-border/70 bg-card hover:bg-muted/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-bold ${nodeBadgeColor}`}>
                          {node.type === "trigger" ? "⚡" : node.type === "condition" ? "⚙️" : "🚀"}
                        </div>
                        <div>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${nodeBadgeColor}`}>
                            {node.type}
                          </span>
                          <h4 className="text-sm font-bold text-foreground mt-1">
                            {node.label}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {node.subtitle}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-semibold text-muted-foreground">
                        Configure →
                      </span>
                    </div>
                  </motion.div>
                </React.Fragment>
              )
            })}
          </div>
        </div>

        {/* NODE PROPERTIES PANEL (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl border border-border/70 bg-card p-5 shadow-xs space-y-4">
          {selectedNode ? (
            <>
              <div className="border-b border-border/60 pb-3">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                  Node Configuration
                </span>
                <h3 className="text-base font-bold text-foreground mt-0.5">
                  {selectedNode.label}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Node ID: <code className="font-mono text-foreground">{selectedNode.id}</code>
                </p>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    Node Title
                  </label>
                  <input
                    type="text"
                    value={selectedNode.label}
                    readOnly
                    className="w-full rounded-xl border border-border/70 bg-muted/30 px-3 py-2 text-xs font-semibold text-foreground focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    Execution Category
                  </label>
                  <input
                    type="text"
                    value={selectedNode.type.toUpperCase()}
                    readOnly
                    className="w-full rounded-xl border border-border/70 bg-muted/30 px-3 py-2 text-xs font-mono font-bold text-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    Target Integration Payload
                  </label>
                  <textarea
                    rows={3}
                    readOnly
                    value={JSON.stringify(
                      {
                        action: selectedNode.label,
                        payload: { client_id: "intake_982", status: "active" },
                        retry_policy: "exponential_backoff"
                      },
                      null,
                      2
                    )}
                    className="w-full rounded-xl border border-border/70 bg-muted/30 p-2.5 text-[11px] font-mono text-muted-foreground focus:outline-none"
                  />
                </div>

                <div className="p-3 rounded-2xl border border-border/60 bg-muted/20 space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Node Performance Metrics
                  </span>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-muted-foreground">Avg Latency:</span>
                    <span className="font-bold text-foreground">112ms</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Pass Rate:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">99.8%</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-xs text-muted-foreground">
              Select a node on the canvas to inspect properties.
            </div>
          )}
        </div>
      </div>
    </AppPage>
  )
}
