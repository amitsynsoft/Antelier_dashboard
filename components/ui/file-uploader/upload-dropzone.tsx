"use client"

import * as React from "react"
import { useDropzone, Accept, FileRejection } from "react-dropzone"
import { UploadCloud, FileCheck } from "lucide-react"

interface UploadDropzoneProps {
  mode: "single" | "multiple"
  accept?: Accept
  acceptTypesLabel: string
  maxSizeMB: number
  disabled?: boolean
  onDropAccepted: (files: File[]) => void
  onDropRejected: (rejections: FileRejection[]) => void
}

export function UploadDropzone({
  mode,
  accept,
  acceptTypesLabel,
  maxSizeMB,
  disabled = false,
  onDropAccepted,
  onDropRejected,
}: UploadDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    onDropRejected,
    accept,
    multiple: mode === "multiple",
    maxSize: maxSizeMB * 1024 * 1024,
    disabled,
  })

  return (
    <div
      {...getRootProps()}
      className={`group flex cursor-pointer flex-col items-center justify-center rounded-xl sm:rounded-2xl border-2 border-dashed p-4 sm:p-7 text-center transition-all ${
        isDragActive
          ? "border-primary bg-primary/10 ring-2 ring-primary/30"
          : disabled
          ? "border-border/40 bg-muted/10 opacity-50 cursor-not-allowed"
          : "border-border/80 bg-muted/20 hover:border-primary/50 hover:bg-muted/40"
      }`}
    >
      <input {...getInputProps()} />

      <div className="mb-2 sm:mb-3 rounded-xl sm:rounded-2xl bg-primary/10 p-2.5 sm:p-3.5 text-primary transition-transform group-hover:scale-110">
        <UploadCloud className="h-6 w-6 sm:h-8 sm:w-8" />
      </div>

      <span className="text-sm sm:text-base font-bold text-foreground">
        {isDragActive
          ? "Drop your files here now"
          : mode === "single"
          ? "Click or drag & drop a file to upload"
          : "Click or drag & drop real files here"}
      </span>

      <span className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-muted-foreground">
        Supports {acceptTypesLabel}
      </span>

      <button
        type="button"
        tabIndex={-1}
        className="mt-2.5 sm:mt-3.5 inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-primary px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold text-primary-foreground shadow-2xs transition-all hover:opacity-90 cursor-pointer pointer-events-none"
      >
        <FileCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span>Browse Files</span>
      </button>
    </div>
  )
}
