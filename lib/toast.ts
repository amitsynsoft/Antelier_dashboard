import { toast as sonnerToast, ExternalToast } from "sonner"

export interface NotifyOptions extends ExternalToast {
  description?: string
}

export const notify = {
  success: (message: string, options?: NotifyOptions) => {
    return sonnerToast.success(message, options)
  },

  error: (message: string, options?: NotifyOptions) => {
    return sonnerToast.error(message, options)
  },

  warning: (message: string, options?: NotifyOptions) => {
    return sonnerToast.warning(message, options)
  },

  info: (message: string, options?: NotifyOptions) => {
    return sonnerToast.info(message, options)
  },

  loading: (message: string, options?: NotifyOptions) => {
    return sonnerToast.loading(message, options)
  },

  promise: <T>(
    promise: Promise<T>,
    data: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: any) => string)
    }
  ) => {
    return sonnerToast.promise(promise, data)
  },

  dismiss: (toastId?: string | number) => {
    sonnerToast.dismiss(toastId)
  },
}
