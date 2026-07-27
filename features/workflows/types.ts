export type WorkflowActionType =
  | "crm"
  | "calendar"
  | "email"
  | "whatsapp"
  | "call"
  | "notification"
  | "ticket"
  | "finance"
  | "webhook"
  | "custom"

export type WorkflowAction = {
  id: string
  title: string
  description: string
  type: WorkflowActionType
  iconColor?: string
  config?: Record<string, string>
}

export type IntentCategory =
  | "Client & Sales"
  | "Scheduling"
  | "Support"
  | "Billing"
  | "Notifications"
  | "Custom"

export type IntentWorkflow = {
  id: string
  title: string
  intentName: string
  intentDescription: string
  description: string
  category: IntentCategory
  status: "Active" | "Inactive"
  executionsCount: number
  lastRun: string
  examplePhrases: string[]
  confidenceThreshold: number
  fallbackWorkflow: string
  actions: WorkflowAction[]
}
