"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Info, AlertTriangle, Loader2 } from "lucide-react"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-16">
      <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">{title}</h2>
      <div className="flex flex-wrap gap-10">{children}</div>
    </div>
  )
}

export default function ToastPreview() {
  const handleLoading = () => {
    const id = toast.loading("Uploading firmware...")
    setTimeout(() => {
      toast.success("Firmware uploaded successfully", { id })
    }, 2500)
  }

  const handleLoadingError = () => {
    const id = toast.loading("Connecting to satellite...")
    setTimeout(() => {
      toast.error("Connection timeout — satellite unreachable", { id })
    }, 2000)
  }

  return (
    <div className="p-40 space-y-40 bg-surface-bg min-h-screen">
      <h1 className="text-xxxl font-bold text-text-primary">Toast</h1>
      <p className="text-text-secondary text-sm -mt-20">
        Toasts appear in the corner. Trigger them with the buttons below.
        The Toaster is already mounted in AllProviders.
      </p>

      <Section title="Toast Types">
        <Button
          variant="soft"
          color="accent"
          onClick={() => toast.success("Operator created successfully")}
        >
          <CheckCircle2 className="size-14" />
          Success
        </Button>

        <Button
          variant="soft"
          color="error"
          onClick={() => toast.error("Failed to connect to satellite")}
        >
          <XCircle className="size-14" />
          Error
        </Button>

        <Button
          variant="soft"
          color="info"
          onClick={() => toast.info("Mission Alpha entered eclipse phase")}
        >
          <Info className="size-14" />
          Info
        </Button>

        <Button
          variant="soft"
          color="warning"
          onClick={() => toast.warning("Battery level below 20% — charge recommended")}
        >
          <AlertTriangle className="size-14" />
          Warning
        </Button>
      </Section>

      <Section title="Loading → Resolve">
        <Button
          variant="surface"
          color="accent"
          onClick={handleLoading}
        >
          <Loader2 className="size-14" />
          Loading → Success
        </Button>

        <Button
          variant="surface"
          color="error"
          onClick={handleLoadingError}
        >
          <Loader2 className="size-14" />
          Loading → Error
        </Button>
      </Section>

      <Section title="Rich Content">
        <Button
          variant="surface"
          color="neutral"
          onClick={() =>
            toast.info(
              <span>
                Satellite <strong>ATMS-007</strong> completed its{" "}
                <strong>orbit #142</strong>
              </span>
            )
          }
        >
          Rich Content Toast
        </Button>

        <Button
          variant="surface"
          color="neutral"
          onClick={() =>
            toast.success("Telemetry uploaded", {
              description: "847 data points synced to ground station",
            })
          }
        >
          With Description
        </Button>

        <Button
          variant="surface"
          color="neutral"
          onClick={() =>
            toast("Mission update", {
              description: "Orbital parameters adjusted",
              action: { label: "View", onClick: () => { } },
            })
          }
        >
          With Action Button
        </Button>
      </Section>

      <Section title="Manual Dismiss">
        <Button
          variant="surface"
          color="neutral"
          onClick={() => {
            const id = toast.info("Click dismiss to close this toast", { duration: Infinity })
            setTimeout(() => toast.dismiss(id), 4000)
          }}
        >
          Auto-dismiss in 4s
        </Button>
      </Section>
    </div>
  )
}
