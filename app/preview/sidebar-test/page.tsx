import * as React from "react"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
  SidebarItem,
} from "@/components/ui/sidebar"
import {
  Rocket,
  Target,
  Layers,
  Satellite,
  Antenna,
  Book,
  Bell,
  Users,
  Settings
} from "lucide-react"

export default function SidebarPreview() {
  return (
    <div className="flex bg-surface-overlay h-screen w-full">
      <Sidebar>
        <SidebarHeader>
          <div className="text-text-primary font-bold tracking-wider px-8 w-full flex items-center gap-2">
            <Rocket className="w-[24px] h-[24px]" /> {/* Mocking ANTARIS Logo Star */}
            <span className="text-[17px]">ANTARIS</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarItem leadingIcon={<Rocket className="w-[20px] h-[20px]" />}>
            Dashboard
          </SidebarItem>
          <SidebarItem leadingIcon={<Target className="w-[20px] h-[20px]" />}>
            Mission Objective
          </SidebarItem>
          <SidebarItem leadingIcon={<Layers className="w-[20px] h-[20px]" />}>
            Mission Modelling
          </SidebarItem>
          <SidebarItem leadingIcon={<Satellite className="w-[20px] h-[20px]" />}>
            Satellites
          </SidebarItem>
          <SidebarItem leadingIcon={<Antenna className="w-[20px] h-[20px]" />}>
            Ground Station
          </SidebarItem>
          <SidebarItem leadingIcon={<Book className="w-[20px] h-[20px]" />}>
            Catalog
          </SidebarItem>
        </SidebarContent>

        <SidebarSeparator />

        <SidebarFooter>
          <SidebarItem
            leadingIcon={
              <div className="relative">
                <Bell className="w-[20px] h-[20px]" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full border-[1.5px] border-surface-bg" />
              </div>
            }
          >
            Notification
          </SidebarItem>
          <SidebarItem leadingIcon={<Users className="w-[20px] h-[20px]" />}>
            User Management
          </SidebarItem>
          <SidebarItem leadingIcon={<Settings className="w-[20px] h-[20px]" />}>
            Settings
          </SidebarItem>
        </SidebarFooter>
      </Sidebar>

      <div className="flex-1 p-10 flex flex-col justify-center items-center text-text-primary">
        <h1 className="text-2xl font-semibold opacity-50">Content Area</h1>
        <p className="opacity-40">The Sidebar is active on the left with properly sized icons and correctly shaped curved toggle tab.</p>
      </div>
    </div>
  )
}
