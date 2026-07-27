import { Accept } from "react-dropzone"

export type UploadStage = "uploading" | "processing" | "indexing" | "success" | "error"

export interface UploadFileItem {
  id: string
  file?: File
  name: string
  size?: number
  formattedSize?: string
  progress: number // 0 to 100
  stage: UploadStage
  errorMessage?: string
}

export interface FileUploaderProps {
  mode?: "single" | "multiple"
  accept?: Accept
  acceptTypesLabel?: string
  maxSizeMB?: number // Default 50 MB
  maxFiles?: number // Default 10 files
  value?: string[] // Existing file names list
  onFilesChange?: (fileNames: string[], filesInfo: UploadFileItem[]) => void
  onUploadComplete?: (fileName: string) => void
  disabled?: boolean
  className?: string
}
