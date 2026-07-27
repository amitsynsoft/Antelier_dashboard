import * as React from "react"
import {
  Building2,
  Calendar,
  Mail,
  MessageSquare,
  PhoneCall,
  Users,
  LifeBuoy,
  CreditCard,
  Globe,
  FileCode,
} from "lucide-react"
import { WorkflowActionType, IntentCategory } from "./types"

export const WORKFLOW_CATEGORIES = [
  "All Workflows",
  "Client & Sales",
  "Scheduling",
  "Support",
  "Billing",
  "Notifications",
  "Custom",
] as const

export type WorkflowCategoryFilter = (typeof WORKFLOW_CATEGORIES)[number]

export const ACTION_TYPE_META: Record<
  WorkflowActionType,
  { label: string; icon: React.ElementType; colorClass: string }
> = {
  crm: {
    label: "CRM Lead",
    icon: Building2,
    colorClass: "bg-orange-500/10 text-orange-600 border-orange-500/30 dark:text-orange-400",
  },
  calendar: {
    label: "Calendar",
    icon: Calendar,
    colorClass: "bg-blue-500/10 text-blue-600 border-blue-500/30 dark:text-blue-400",
  },
  email: {
    label: "Send Email",
    icon: Mail,
    colorClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400",
  },
  whatsapp: {
    label: "WhatsApp",
    icon: MessageSquare,
    colorClass: "bg-green-500/10 text-green-600 border-green-500/30 dark:text-green-400",
  },
  call: {
    label: "Call Staff",
    icon: PhoneCall,
    colorClass: "bg-rose-500/10 text-rose-600 border-rose-500/30 dark:text-rose-400",
  },
  notification: {
    label: "Team Alert",
    icon: Users,
    colorClass: "bg-purple-500/10 text-purple-600 border-purple-500/30 dark:text-purple-400",
  },
  ticket: {
    label: "Support Ticket",
    icon: LifeBuoy,
    colorClass: "bg-sky-500/10 text-sky-600 border-sky-500/30 dark:text-sky-400",
  },
  finance: {
    label: "Finance Route",
    icon: CreditCard,
    colorClass: "bg-amber-500/10 text-amber-600 border-amber-500/30 dark:text-amber-400",
  },
  webhook: {
    label: "Webhook",
    icon: Globe,
    colorClass: "bg-indigo-500/10 text-indigo-600 border-indigo-500/30 dark:text-indigo-400",
  },
  custom: {
    label: "Custom Action",
    icon: FileCode,
    colorClass: "bg-violet-500/10 text-violet-600 border-violet-500/30 dark:text-violet-400",
  },
}

export const PREDEFINED_INTEGRATIONS: {
  type: WorkflowActionType
  title: string
  description: string
}[] = [
  { type: "crm", title: "Create CRM Lead", description: "Create a new lead in HubSpot or Salesforce" },
  { type: "calendar", title: "Check Calendar", description: "Query calendar availability for open booking slots" },
  { type: "email", title: "Send Email", description: "Send automated email notification or welcome message" },
  { type: "whatsapp", title: "Send WhatsApp", description: "Dispatch instant WhatsApp chat message" },
  { type: "call", title: "Call Staff", description: "Trigger automated phone call to on-call duty staff" },
  { type: "notification", title: "Notify Team", description: "Ping Slack channel or assign team member" },
  { type: "ticket", title: "Create Ticket", description: "Generate new support ticket in Zendesk or Jira" },
  { type: "finance", title: "Route to Finance", description: "Route invoice/billing query to finance team" },
  { type: "webhook", title: "Trigger Webhook", description: "Send custom HTTP POST payload to external API" },
  { type: "custom", title: "Run Custom Action", description: "Execute custom Javascript/python cloud function" },
]
