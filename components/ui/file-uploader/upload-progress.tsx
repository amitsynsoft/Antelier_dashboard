"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { UploadStage } from "./types"

interface UploadProgressProps {
  progress: number
  stage: UploadStage
}

export function UploadProgress({ progress, stage }: UploadProgressProps) {
  const getStageLabel = () => {
    switch (stage) {
      case "uploading":
        return `Uploading... ${progress}%`
      case "processing":
        return "Processing document..."
      case "indexing":
        return "Indexing Knowledge..."
      case "success":
        return "Completed"
      default:
        return "Uploading..."
    }
  }

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between font-mono text-xs">
        <span className="font-semibold text-primary animate-pulse">
          {getStageLabel()}
        </span>
        <span className="font-bold text-foreground">{progress}%</span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-primary"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  )
}
