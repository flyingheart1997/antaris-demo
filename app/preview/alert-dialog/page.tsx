"use client"

import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader,
  AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2, AlertTriangle, Info } from "lucide-react"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-16">
      <h2 className="text-xl font-semibold text-text-secondary border-b border-stroke-primary pb-8">{title}</h2>
      <div className="flex flex-wrap gap-12">{children}</div>
    </div>
  )
}

export default function AlertDialogPreview() {
  return (
    <div className="p-40 space-y-40 bg-surface-bg min-h-screen">
      <h1 className="text-xxxl font-bold text-text-primary">Alert Dialog</h1>

      <Section title="Destructive Confirmation">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="soft" color="error">
              <Trash2 className="size-14" />
              Delete Satellite
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <Trash2 className="size-16 text-red-9" />
                Delete Satellite?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. All telemetry data, mission history, and configuration will be permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="solid" color="error">
                Delete Permanently
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Section>

      <Section title="Warning Confirmation">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="soft" color="warning">
              <AlertTriangle className="size-14" />
              Override Configuration
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <AlertTriangle className="text-yellow-9 size-16" />
                Override Active Configuration?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will overwrite the current mission parameters. The satellite will need to re-sync on next pass.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Current</AlertDialogCancel>
              <AlertDialogAction variant="solid" color="warning">
                Override
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Section>

      <Section title="Acknowledgement (No Cancel)">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="surface" color="info">
              <Info className="size-14" />
              System Notice
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <Info className="text-blue-9 size-16" />
                Maintenance Window
              </AlertDialogTitle>
              <AlertDialogDescription>
                Scheduled maintenance begins in 30 minutes. Save your work before the window starts.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction variant="surface" color="neutral">
                Acknowledged
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Section>
    </div>
  )
}
