"use client"

import * as React from "react"
import { notify } from "@/lib/toast"
import { AppPage } from "@/components/layout/app-page"
import { workflowsMock } from "@/mock/dashboard-data"
import {
  GitFork,
  Plus,
  Zap,
  Sliders,
  Play,
  Copy,
  Trash2,
  CheckCircle2,
  Sparkles,
} from "lucide-react"

import {
  IntentWorkflow,
  WorkflowAction,
  WorkflowActionType,
  IntentCategory,
} from "./types"
import { WORKFLOW_CATEGORIES, WorkflowCategoryFilter } from "./config"
import { WorkflowSidebar } from "./components/workflow-sidebar"
import { WorkflowIntentEditor } from "./components/workflow-intent-editor"
import { WorkflowActionsList } from "./components/workflow-actions-list"
import { AddWorkflowModal } from "./components/modals/add-workflow-modal"
import { AddActionModal } from "./components/modals/add-action-modal"
import { TestWorkflowModal } from "./components/modals/test-workflow-modal"
import { ImportWorkflowModal } from "./components/modals/import-workflow-modal"

export function WorkflowBuilderView() {
  // Main State
  const [workflows, setWorkflows] =
    React.useState<IntentWorkflow[]>(workflowsMock)
  const [selectedWorkflowId, setSelectedWorkflowId] = React.useState<string>(
    workflowsMock[0].id
  )
  const [activeCategory, setActiveCategory] =
    React.useState<WorkflowCategoryFilter>("All Workflows")
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [activeTab, setActiveTab] = React.useState<"actions" | "intent">(
    "actions"
  )

  // Modals state
  const [isAddWorkflowOpen, setIsAddWorkflowOpen] = React.useState(false)
  const [isAddActionOpen, setIsAddActionOpen] = React.useState(false)
  const [isTestModalOpen, setIsTestModalOpen] = React.useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = React.useState(false)

  // Selected workflow getter
  const selectedWorkflow = React.useMemo(() => {
    return workflows.find((w) => w.id === selectedWorkflowId) || workflows[0]
  }, [workflows, selectedWorkflowId])

  // Filtered workflows list
  const filteredWorkflows = React.useMemo(() => {
    return workflows.filter((wf) => {
      const matchesCategory =
        activeCategory === "All Workflows" || wf.category === activeCategory
      const matchesSearch =
        wf.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wf.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wf.intentName.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [workflows, activeCategory, searchQuery])

  // Helper: Global Toast message
  const showFeedback = (msg: string) => {
    notify.success(msg)
  }

  // Update selected workflow fields
  const updateSelectedWorkflow = (updates: Partial<IntentWorkflow>) => {
    setWorkflows((prev) =>
      prev.map((w) => (w.id === selectedWorkflow.id ? { ...w, ...updates } : w))
    )
  }

  // Status toggle
  const handleToggleStatus = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, status: w.status === "Active" ? "Inactive" : "Active" }
          : w
      )
    )
    notify.info("Workflow status updated.", {
      description: "Activation state changed for intent workflow.",
    })
  }

  // Example phrases actions
  const handleAddPhrase = (phrase: string) => {
    updateSelectedWorkflow({
      examplePhrases: [...selectedWorkflow.examplePhrases, phrase],
    })
    showFeedback("Example phrase added.")
  }

  const handleRemovePhrase = (index: number) => {
    updateSelectedWorkflow({
      examplePhrases: selectedWorkflow.examplePhrases.filter(
        (_, idx) => idx !== index
      ),
    })
  }

  // Action step controls
  const handleMoveAction = (index: number, direction: "up" | "down") => {
    const newActions = [...selectedWorkflow.actions]
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= newActions.length) return
    const temp = newActions[index]
    newActions[index] = newActions[targetIndex]
    newActions[targetIndex] = temp
    updateSelectedWorkflow({ actions: newActions })
  }

  const handleDeleteAction = (actionId: string) => {
    updateSelectedWorkflow({
      actions: selectedWorkflow.actions.filter((a) => a.id !== actionId),
    })
    notify.info("Action step removed.")
  }

  const handleAddActionStep = (
    actionType: WorkflowActionType,
    title: string,
    desc: string
  ) => {
    const newActionItem: WorkflowAction = {
      id: `act-${Date.now()}`,
      title,
      description: desc,
      type: actionType,
    }
    updateSelectedWorkflow({
      actions: [...selectedWorkflow.actions, newActionItem],
    })
    showFeedback(`Added "${title}" action step.`)
  }

  const handleCreateWorkflow = (
    title: string,
    category: IntentCategory,
    desc: string
  ) => {
    const newWf: IntentWorkflow = {
      id: `wf-${Date.now()}`,
      title,
      intentName: title,
      intentDescription: desc || `Automated intent handler for ${title}`,
      description: `When AI detects intent "${title}", trigger business actions.`,
      category,
      status: "Active",
      executionsCount: 0,
      lastRun: "Just now",
      examplePhrases: [
        `I need ${title.toLowerCase()}`,
        `Help with ${title.toLowerCase()}`,
      ],
      confidenceThreshold: 75,
      fallbackWorkflow: "General Inquiry",
      actions: [
        {
          id: `act-${Date.now()}`,
          title: "Notify Team",
          description: "Send alert to team channel",
          type: "notification",
        },
      ],
    }
    setWorkflows((prev) => [...prev, newWf])
    setSelectedWorkflowId(newWf.id)
    setActiveTab("actions")
    showFeedback(`Workflow "${newWf.title}" created successfully!`)
  }

  const handleDuplicateWorkflow = () => {
    const cloned: IntentWorkflow = {
      ...selectedWorkflow,
      id: `wf-${Date.now()}`,
      title: `${selectedWorkflow.title} (Copy)`,
      intentName: `${selectedWorkflow.intentName} Copy`,
      executionsCount: 0,
      lastRun: "Never",
      actions: selectedWorkflow.actions.map((a) => ({
        ...a,
        id: `act-${Math.random()}`,
      })),
    }
    setWorkflows((prev) => [...prev, cloned])
    setSelectedWorkflowId(cloned.id)
    showFeedback(`Duplicated workflow "${selectedWorkflow.title}".`)
  }

  const handleDeleteWorkflow = () => {
    if (workflows.length <= 1) {
      notify.error("Cannot delete the only workflow in library.")
      return
    }
    const remaining = workflows.filter((w) => w.id !== selectedWorkflow.id)
    setWorkflows(remaining)
    setSelectedWorkflowId(remaining[0].id)
    notify.info(`Deleted workflow "${selectedWorkflow.title}".`)
  }

  return (
    <AppPage>
      {/* Header Bar */}
      <div className="flex flex-col gap-4 border-b border-border/60 pt-1 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-orange-500 shadow-2xs">
              <GitFork className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                Workflow Builder
              </h1>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Create intent-driven workflows that automate how your AI
                responds and takes action.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsAddWorkflowOpen(true)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-orange-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-orange-500 sm:text-sm"
          >
            <Plus className="h-4 w-4" />
            <span>New Workflow</span>
          </button>
        </div>
      </div>

      {/* Categories & Search */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex scrollbar-none items-center gap-1.5 overflow-x-auto pb-1">
          {WORKFLOW_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`cursor-pointer rounded-xl px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-orange-600 text-white shadow-2xs"
                    : "border border-border/60 bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        <div className="relative min-w-[240px]">
          <input
            type="text"
            placeholder="Search workflows by intent or action..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-xl border border-border/70 bg-card px-3.5 text-xs text-foreground focus:border-orange-500 focus:outline-none"
          />
        </div>
      </div>

      {/* 2-Column Builder Layout */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Left Column: Workflows Sidebar List (4 cols) */}
        <div className="sticky top-6 lg:col-span-4">
          <WorkflowSidebar
            workflows={filteredWorkflows}
            selectedWorkflowId={selectedWorkflowId}
            onSelectWorkflow={setSelectedWorkflowId}
            onToggleStatus={handleToggleStatus}
            onOpenAddWorkflow={() => setIsAddWorkflowOpen(true)}
          />
        </div>

        {/* Right Column: Active Workflow Canvas Viewport (8 cols) */}
        <div className="space-y-4 lg:col-span-8">
          {selectedWorkflow ? (
            <div className="space-y-4">
              {/* Active Workflow Header Card */}
              <div className="space-y-4 rounded-3xl border border-border/70 bg-card p-5 shadow-xs">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-base font-extrabold text-orange-500 shadow-2xs">
                      ⚡
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-foreground">
                          {selectedWorkflow.title}
                        </h2>
                        <span className="rounded-lg border border-border bg-muted/40 px-2.5 py-0.5 font-mono text-[10px] font-bold text-muted-foreground">
                          {selectedWorkflow.category}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {selectedWorkflow.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsTestModalOpen(true)}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-orange-500/40 bg-orange-500/10 px-3 py-2 text-xs font-bold text-orange-600 shadow-2xs hover:bg-orange-500/20 dark:text-orange-400"
                    >
                      <Play className="h-3.5 w-3.5" />
                      <span>Test Run</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDuplicateWorkflow}
                      className="cursor-pointer rounded-xl border border-border bg-background p-2 text-muted-foreground hover:text-foreground"
                      title="Duplicate Workflow"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteWorkflow}
                      className="cursor-pointer rounded-xl border border-border bg-background p-2 text-muted-foreground hover:text-rose-500"
                      title="Delete Workflow"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Sub-Header Tab Switcher: Put Actions front & center! */}
                <div className="flex items-center justify-between border-t border-border/50 pt-3">
                  <div className="flex items-center gap-2 rounded-2xl border border-border/40 bg-muted/40 p-1">
                    <button
                      type="button"
                      onClick={() => setActiveTab("actions")}
                      className={`flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                        activeTab === "actions"
                          ? "border border-border/60 bg-card text-foreground shadow-2xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Zap className="h-3.5 w-3.5 text-orange-500" />
                      <span>
                        Actions & Flow ({selectedWorkflow.actions.length})
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("intent")}
                      className={`flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                        activeTab === "intent"
                          ? "border border-border/60 bg-card text-foreground shadow-2xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Sliders className="h-3.5 w-3.5 text-blue-500" />
                      <span>Trigger & Intent Rules</span>
                    </button>
                  </div>

                  <span className="hidden items-center gap-1.5 font-mono text-xs text-muted-foreground sm:inline-flex">
                    Confidence threshold:{" "}
                    <strong className="text-foreground">
                      {selectedWorkflow.confidenceThreshold}%
                    </strong>
                  </span>
                </div>
              </div>

              {/* Tab Content Display */}
              {activeTab === "actions" ? (
                <WorkflowActionsList
                  workflow={selectedWorkflow}
                  onMoveAction={handleMoveAction}
                  onDeleteAction={handleDeleteAction}
                  onOpenAddAction={() => setIsAddActionOpen(true)}
                  onQuickAddAction={handleAddActionStep}
                />
              ) : (
                <WorkflowIntentEditor
                  workflow={selectedWorkflow}
                  onUpdateWorkflow={updateSelectedWorkflow}
                  onAddPhrase={handleAddPhrase}
                  onRemovePhrase={handleRemovePhrase}
                />
              )}
            </div>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card p-6 text-center">
              <p className="text-sm font-semibold text-muted-foreground">
                No workflow selected or found matching filter.
              </p>
              <button
                type="button"
                onClick={() => setIsAddWorkflowOpen(true)}
                className="mt-3 rounded-xl bg-orange-600 px-4 py-2 text-xs font-bold text-white hover:bg-orange-500"
              >
                Create Workflow
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddWorkflowModal
        isOpen={isAddWorkflowOpen}
        onClose={() => setIsAddWorkflowOpen(false)}
        onCreateWorkflow={handleCreateWorkflow}
      />

      <AddActionModal
        isOpen={isAddActionOpen}
        onClose={() => setIsAddActionOpen(false)}
        onAddAction={handleAddActionStep}
      />

      <TestWorkflowModal
        isOpen={isTestModalOpen}
        workflow={selectedWorkflow}
        onClose={() => setIsTestModalOpen(false)}
      />

      <ImportWorkflowModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportSuccess={() => {
          showFeedback(`Imported workflow templates into workspace.`)
        }}
      />
    </AppPage>
  )
}
