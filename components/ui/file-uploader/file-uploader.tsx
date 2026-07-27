"use client"

import * as React from "react"
import { FileRejection } from "react-dropzone"
import { FileUploaderProps, UploadFileItem } from "./types"
import { UploadDropzone } from "./upload-dropzone"
import { UploadQueue } from "./upload-queue"
import { UploadErrorState } from "./upload-error-state"

function formatBytes(bytes?: number): string {
  if (!bytes) return "Vectorized"
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function FileUploader({
  mode = "multiple",
  accept = {
    "application/pdf": [".pdf"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    "text/plain": [".txt"],
    "text/csv": [".csv"],
    "application/json": [".json"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    "image/png": [".png"],
    "image/jpeg": [".jpg", ".jpeg"],
    "image/svg+xml": [".svg"],
    "image/webp": [".webp"],
  },
  acceptTypesLabel = "PDF, DOCX, TXT, CSV, JSON, XLSX, Images (Up to 50MB)",
  maxSizeMB = 50,
  maxFiles = 10,
  value = [],
  onFilesChange,
  onUploadComplete,
  disabled = false,
}: FileUploaderProps) {
  const [fileItems, setFileItems] = React.useState<UploadFileItem[]>(() =>
    value.map((name) => ({
      id: name,
      name,
      progress: 100,
      stage: "success",
    }))
  )
  const [generalError, setGeneralError] = React.useState<string | null>(null)

  const fileItemsRef = React.useRef(fileItems)
  React.useEffect(() => {
    fileItemsRef.current = fileItems
  }, [fileItems])

  // Sync state if external value prop updates
  React.useEffect(() => {
    const valueJoined = (value || []).join(",")
    const currentSuccessJoined = fileItemsRef.current
      .filter((i) => i.stage === "success")
      .map((i) => i.name)
      .join(",")

    if (valueJoined !== currentSuccessJoined) {
      setFileItems((prev) => {
        const existingMap = new Map(prev.map((item) => [item.name, item]))
        return (value || []).map(
          (name) =>
            existingMap.get(name) || {
              id: name,
              name,
              progress: 100,
              stage: "success",
            }
        )
      })
    }
  }, [value])

  const notifyChange = (updated: UploadFileItem[]) => {
    setFileItems(updated)
    const successNames = updated
      .filter((i) => i.stage === "success")
      .map((i) => i.name)
    onFilesChange?.(successNames, updated)
  }

  // Simulate progress and multi-stage lifecycle without side-effects inside setState
  const simulateUploadLifecycle = (itemId: string) => {
    let progress = 15
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 20) + 15

      if (progress < 60) {
        setFileItems((prev) =>
          prev.map((item) =>
            item.id === itemId
              ? { ...item, progress, stage: "uploading" }
              : item
          )
        )
      } else if (progress < 85) {
        setFileItems((prev) =>
          prev.map((item) =>
            item.id === itemId
              ? { ...item, progress, stage: "processing" }
              : item
          )
        )
      } else if (progress < 100) {
        setFileItems((prev) =>
          prev.map((item) =>
            item.id === itemId
              ? { ...item, progress, stage: "indexing" }
              : item
          )
        )
      } else {
        clearInterval(interval)
        const currentList = fileItemsRef.current
        const targetItem = currentList.find((i) => i.id === itemId)

        const next = currentList.map((item) =>
          item.id === itemId
            ? { ...item, progress: 100, stage: "success" as const }
            : item
        )

        setFileItems(next)

        const successNames = next
          .filter((i) => i.stage === "success")
          .map((i) => i.name)
        onFilesChange?.(successNames, next)

        if (targetItem) {
          onUploadComplete?.(targetItem.name)
        }
      }
    }, 200)
  }

  const handleDropAccepted = (files: File[]) => {
    setGeneralError(null)

    if (mode === "single" && files.length > 1) {
      setGeneralError("Single file mode: only 1 file can be uploaded at a time.")
      files = [files[0]]
    }

    if (mode === "multiple" && fileItems.length + files.length > maxFiles) {
      setGeneralError(`Maximum limit of ${maxFiles} files exceeded.`)
      files = files.slice(0, maxFiles - fileItems.length)
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024
    const newItems: UploadFileItem[] = []

    files.forEach((file) => {
      const isOverSize = file.size > maxSizeBytes
      const item: UploadFileItem = {
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        file,
        name: file.name,
        size: file.size,
        formattedSize: formatBytes(file.size),
        progress: isOverSize ? 0 : 15,
        stage: isOverSize ? "error" : "uploading",
        errorMessage: isOverSize
          ? `File size (${formatBytes(file.size)}) exceeds ${maxSizeMB}MB limit`
          : undefined,
      }

      newItems.push(item)

      if (!isOverSize) {
        setTimeout(() => simulateUploadLifecycle(item.id), 50)
      }
    })

    const updated = mode === "single" ? newItems : [...fileItems, ...newItems]
    notifyChange(updated)
  }

  const handleDropRejected = (rejections: FileRejection[]) => {
    if (rejections.length > 0) {
      const firstError = rejections[0].errors[0]?.message || "File upload rejected"
      setGeneralError(`Upload rejected: ${firstError}`)
    }
  }

  const handleRemoveItem = (id: string) => {
    const updated = fileItems.filter((i) => i.id !== id && i.name !== id)
    notifyChange(updated)
  }

  const handleRetryItem = (id: string) => {
    const updated = fileItems.map((item) =>
      item.id === id
        ? {
            ...item,
            progress: 15,
            stage: "uploading" as const,
            errorMessage: undefined,
          }
        : item
    )
    setFileItems(updated)
    setTimeout(() => simulateUploadLifecycle(id), 50)
  }

  return (
    <div className="space-y-3.5">
      <UploadDropzone
        mode={mode}
        accept={accept}
        acceptTypesLabel={acceptTypesLabel}
        maxSizeMB={maxSizeMB}
        disabled={disabled}
        onDropAccepted={handleDropAccepted}
        onDropRejected={handleDropRejected}
      />

      {generalError && (
        <UploadErrorState
          errorMessage={generalError}
          onDismiss={() => setGeneralError(null)}
        />
      )}

      <UploadQueue
        items={fileItems}
        onRemoveItem={handleRemoveItem}
        onRetryItem={handleRetryItem}
      />
    </div>
  )
}
