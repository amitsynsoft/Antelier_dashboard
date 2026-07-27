"use client"

import * as React from "react"
import { AppPage, PageHeader } from "@/components/layout/app-page"
import { BusinessProfileForm } from "@/components/forms/business-profile-form"
import { Building2 } from "lucide-react"

export function BusinessProfileView() {
  return (
    <AppPage>
      <PageHeader
        title="Business Profile & Intake Positioning"
        subtitle="Manage your enterprise brand identity, target customer tier, and primary intake objectives."
        icon={<Building2 className="h-5 w-5" />}
      />

      <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-xs">
        <BusinessProfileForm />
      </div>
    </AppPage>
  )
}
