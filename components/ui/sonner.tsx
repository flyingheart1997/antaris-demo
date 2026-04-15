"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CheckCircle2, Info, AlertTriangle, XCircle, Loader2 } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CheckCircle2 className="size-4" strokeWidth={2} />,
        info: <Info className="size-4" strokeWidth={2} />,
        warning: <AlertTriangle className="size-4" strokeWidth={2} />,
        error: <XCircle className="size-4" strokeWidth={2} />,
        loading: <Loader2 className="size-4 animate-spin" strokeWidth={2} />,
      }}
      style={
        {
          "--normal-bg": "var(--color-surface-overlay)",
          "--normal-text": "var(--color-text-primary)",
          "--normal-border": "var(--color-stroke-primary)",
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
