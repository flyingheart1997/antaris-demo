import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// Simple icon placeholder using inline SVG
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-text-secondary text-xs font-medium uppercase tracking-wider">{title}</h2>
      <div className="flex flex-col gap-8">
        {children}
      </div>
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-text-secondary text-md">{label}</span>
      <div className="flex flex-wrap items-start gap-6">
        {children}
      </div>
    </div>
  )
}

export default function TabsPreviewPage() {
  return (
    <div className="min-h-screen bg-surface-bg p-12 font-body">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-text-primary text-xxl font-medium font-heading">Tabs Component</h1>
          <p className="text-text-secondary text-lg">Antaris Design System · node-id=1268-22752</p>
        </div>

        {/* ── Variant: Surface ── */}
        <Section title="Variant: Surface">
          <Row label="Size: sm">
            <Tabs defaultValue="tab1">
              <TabsList variant="surface" size="sm">
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Analytics</TabsTrigger>
                <TabsTrigger value="tab3">Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </Row>
          <Row label="Size: md (default)">
            <Tabs defaultValue="tab1">
              <TabsList variant="surface" size="md">
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Analytics</TabsTrigger>
                <TabsTrigger value="tab3">Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </Row>
          <Row label="Size: lg">
            <Tabs defaultValue="tab1">
              <TabsList variant="surface" size="lg">
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Analytics</TabsTrigger>
                <TabsTrigger value="tab3">Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </Row>
          <Row label="With icons (md)">
            <Tabs defaultValue="tab1">
              <TabsList variant="surface" size="md">
                <TabsTrigger value="tab1" iconStart={<HomeIcon />}>Home</TabsTrigger>
                <TabsTrigger value="tab2" iconStart={<UserIcon />}>Profile</TabsTrigger>
                <TabsTrigger value="tab3" iconStart={<SettingsIcon />}>Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </Row>
          <Row label="With badge counts (md)">
            <Tabs defaultValue="tab1">
              <TabsList variant="surface" size="md">
                <TabsTrigger value="tab1" badge={12}>Inbox</TabsTrigger>
                <TabsTrigger value="tab2" badge={3}>Sent</TabsTrigger>
                <TabsTrigger value="tab3">Drafts</TabsTrigger>
              </TabsList>
            </Tabs>
          </Row>
          <Row label="With disabled tab (md)">
            <Tabs defaultValue="tab1">
              <TabsList variant="surface" size="md">
                <TabsTrigger value="tab1">Active</TabsTrigger>
                <TabsTrigger value="tab2">Default</TabsTrigger>
                <TabsTrigger value="tab3" disabled>Disabled</TabsTrigger>
              </TabsList>
            </Tabs>
          </Row>
        </Section>

        {/* ── Variant: Underline ── */}
        <Section title="Variant: Underline">
          <Row label="Size: sm">
            <Tabs defaultValue="tab1">
              <TabsList variant="underline" size="sm">
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Analytics</TabsTrigger>
                <TabsTrigger value="tab3">Reports</TabsTrigger>
                <TabsTrigger value="tab4">Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </Row>
          <Row label="Size: md (default)">
            <Tabs defaultValue="tab1">
              <TabsList variant="underline" size="md">
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Analytics</TabsTrigger>
                <TabsTrigger value="tab3">Reports</TabsTrigger>
                <TabsTrigger value="tab4">Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </Row>
          <Row label="Size: lg">
            <Tabs defaultValue="tab2">
              <TabsList variant="underline" size="lg">
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Analytics</TabsTrigger>
                <TabsTrigger value="tab3">Reports</TabsTrigger>
              </TabsList>
            </Tabs>
          </Row>
          <Row label="With icons (md)">
            <Tabs defaultValue="tab1">
              <TabsList variant="underline" size="md">
                <TabsTrigger value="tab1" iconStart={<HomeIcon />}>Home</TabsTrigger>
                <TabsTrigger value="tab2" iconStart={<UserIcon />}>Profile</TabsTrigger>
                <TabsTrigger value="tab3" iconStart={<SettingsIcon />} disabled>Disabled</TabsTrigger>
              </TabsList>
            </Tabs>
          </Row>
          <Row label="With badge counts (md)">
            <Tabs defaultValue="tab1">
              <TabsList variant="underline" size="md">
                <TabsTrigger value="tab1" badge={24}>All</TabsTrigger>
                <TabsTrigger value="tab2" badge={8}>Unread</TabsTrigger>
                <TabsTrigger value="tab3">Archived</TabsTrigger>
              </TabsList>
            </Tabs>
          </Row>
        </Section>

        {/* ── Variant: Soft ── */}
        <Section title="Variant: Soft">
          <Row label="Size: sm">
            <Tabs defaultValue="tab1">
              <TabsList variant="soft" size="sm">
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Analytics</TabsTrigger>
                <TabsTrigger value="tab3">Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </Row>
          <Row label="Size: md (default)">
            <Tabs defaultValue="tab1">
              <TabsList variant="soft" size="md">
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Analytics</TabsTrigger>
                <TabsTrigger value="tab3">Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </Row>
          <Row label="Size: lg">
            <Tabs defaultValue="tab2">
              <TabsList variant="soft" size="lg">
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Analytics</TabsTrigger>
                <TabsTrigger value="tab3">Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </Row>
          <Row label="With icons (md)">
            <Tabs defaultValue="tab1">
              <TabsList variant="soft" size="md">
                <TabsTrigger value="tab1" iconStart={<HomeIcon />}>Home</TabsTrigger>
                <TabsTrigger value="tab2" iconStart={<UserIcon />}>Profile</TabsTrigger>
                <TabsTrigger value="tab3" iconStart={<SettingsIcon />}>Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </Row>
        </Section>

        {/* ── Full working example with content ── */}
        <Section title="Functional Example (Surface + Content)">
          <Tabs defaultValue="overview">
            <TabsList variant="surface" size="md">
              <TabsTrigger value="overview" iconStart={<HomeIcon />}>Overview</TabsTrigger>
              <TabsTrigger value="analytics" badge={5}>Analytics</TabsTrigger>
              <TabsTrigger value="settings" iconStart={<SettingsIcon />}>Settings</TabsTrigger>
              <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="rounded-lg border border-stroke-primary bg-surface-primary/5 p-12 text-text-secondary text-md">
                Overview panel content — rendered when <code className="text-green-11 font-code text-sm px-4 py-1 bg-green-alpha-2 rounded-sm">overview</code> tab is active.
              </div>
            </TabsContent>
            <TabsContent value="analytics">
              <div className="rounded-lg border border-stroke-primary bg-surface-primary/5 p-12 text-text-secondary text-md">
                Analytics panel content — rendered when <code className="text-green-11 font-code text-sm px-4 py-1 bg-green-alpha-2 rounded-sm">analytics</code> tab is active.
              </div>
            </TabsContent>
            <TabsContent value="settings">
              <div className="rounded-lg border border-stroke-primary bg-surface-primary/5 p-12 text-text-secondary text-md">
                Settings panel content — rendered when <code className="text-green-11 font-code text-sm px-4 py-1 bg-green-alpha-2 rounded-sm">settings</code> tab is active.
              </div>
            </TabsContent>
          </Tabs>
        </Section>

        {/* ── Full working example with underline + content ── */}
        <Section title="Functional Example (Underline + Content)">
          <Tabs defaultValue="all">
            <TabsList variant="underline" size="md">
              <TabsTrigger value="all" badge={42}>All</TabsTrigger>
              <TabsTrigger value="active" badge={14}>Active</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
              <TabsTrigger value="draft" disabled>Draft</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="rounded-lg border border-stroke-primary bg-surface-primary/5 p-12 text-text-secondary text-md">
                All items panel.
              </div>
            </TabsContent>
            <TabsContent value="active">
              <div className="rounded-lg border border-stroke-primary bg-surface-primary/5 p-12 text-text-secondary text-md">
                Active items panel.
              </div>
            </TabsContent>
            <TabsContent value="archived">
              <div className="rounded-lg border border-stroke-primary bg-surface-primary/5 p-12 text-text-secondary text-md">
                Archived items panel.
              </div>
            </TabsContent>
          </Tabs>
        </Section>

      </div>
    </div>
  )
}
