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
      className={`group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-7 text-center transition-all ${
        isDragActive
          ? "border-primary bg-primary/10 ring-2 ring-primary/30"
          : disabled
          ? "border-border/40 bg-muted/10 opacity-50 cursor-not-allowed"
          : "border-border/80 bg-muted/20 hover:border-primary/50 hover:bg-muted/40"
      }`}
    >
      <input {...getInputProps()} />

      <div className="mb-3 rounded-2xl bg-primary/10 p-3.5 text-primary transition-transform group-hover:scale-110">
        <UploadCloud className="h-8 w-8" />
      </div>

      <span className="text-base font-bold text-foreground">
        {isDragActive
          ? "Drop your files here now"
          : mode === "single"
          ? "Click or drag & drop a file to upload"
          : "Click or drag & drop real files here"}
      </span>

      <span className="mt-1 text-xs text-muted-foreground">
        Supports {acceptTypesLabel}
      </span>

      <button
        type="button"
        tabIndex={-1}
        className="mt-3.5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-2xs transition-all hover:opacity-90 cursor-pointer pointer-events-none"
      >
        <FileCheck className="h-4 w-4" />
        <span>Browse Files</span>
      </button>
    </div>
  )
}
