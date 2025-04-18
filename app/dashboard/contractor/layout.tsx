"use client"

import type React from "react"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { ContractorAnchorBar } from "@/components/dashboard/contractor-anchor-bar"

export default function ContractorDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This would typically come from an API or context
  const [pendingJobsCount, setPendingJobsCount] = useState(3)

  return (
    <DashboardSidebar userType="contractor">
      <div className="pb-20">{children}</div>
      <ContractorAnchorBar pendingJobsCount={pendingJobsCount} />
    </DashboardSidebar>
  )
}
