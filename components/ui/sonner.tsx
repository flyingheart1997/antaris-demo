"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CheckCircle2, Info, AlertTriangle, XCircle, Loader2 } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      richColors
      className="toaster group"
      icons={{
        success: <CheckCircle2 className="size-14" strokeWidth={2} />,
        info: <Info className="size-14" strokeWidth={2} />,
        warning: <AlertTriangle className="size-14" strokeWidth={2} />,
        error: <XCircle className="size-14" strokeWidth={2} />,
        loading: <Loader2 className="size-14 animate-spin" strokeWidth={2} />,
      }}
      style={
        {
          // Base (plain / loading toasts)
          "--normal-bg": "var(--color-surface-overlay)",
          "--normal-text": "var(--color-text-primary)",
          "--normal-border": "var(--color-stroke-primary)",

          // Success — soft green
          "--success-bg": "var(--color-surface-success)",
          "--success-border": "var(--color-stroke-success)",
          "--success-text": "var(--color-text-primary)",

          // Info — soft blue
          "--info-bg": "var(--color-surface-info)",
          "--info-border": "var(--color-stroke-info)",
          "--info-text": "var(--color-text-primary)",

          // Warning — soft yellow (uses yellow-alpha-2 since surface-warning token is absent)
          "--warning-bg": "var(--color-yellow-alpha-2)",
          "--warning-border": "var(--color-stroke-warning)",
          "--warning-text": "var(--color-text-primary)",

          // Error — soft red
          "--error-bg": "var(--color-surface-error)",
          "--error-border": "var(--color-stroke-error)",
          "--error-text": "var(--color-text-primary)",

          "--border-radius": "var(--radius-lg)",
          zIndex: 99999,
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
