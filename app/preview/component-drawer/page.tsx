import * as React from "react"
import { Drawer, DrawerTrigger, DrawerContainer, DrawerItem } from "@/components/ui/drawer"
import { IconButton } from "@/components/ui/icon-button"
import { Search, Settings, Sun, Thermometer, Rocket, Upload, Users } from "lucide-react"

export default function ComponentDrawerPreview() {
  return (
    <div className="flex flex-col items-center justify-center p-20 min-h-screen bg-gray-50 gap-20">
      <div className="text-center font-semibold text-xl mb-4 text-gray-900 border-b pb-2">
        Component Drawer Preview
      </div>

      <div className="flex gap-20 items-start">
        {/* Expanded Drawer */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-sm font-medium text-gray-500">Expanded (state="on")</span>
          <Drawer defaultOpen={true}>
            <DrawerTrigger>
              <Settings />
            </DrawerTrigger>
            <DrawerContainer>
              <DrawerItem active>
                <Search />
              </DrawerItem>
              <DrawerItem>
                <Sun />
              </DrawerItem>
              <DrawerItem>
                <Thermometer />
              </DrawerItem>
              <DrawerItem>
                <Rocket />
              </DrawerItem>
              <DrawerItem>
                <Upload />
              </DrawerItem>
              <DrawerItem>
                <Users />
              </DrawerItem>
            </DrawerContainer>
          </Drawer>
        </div>

        {/* Collapsed Drawer */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-sm font-medium text-gray-500">Collapsed (state="off")</span>
          <Drawer defaultOpen={false}>
            <DrawerTrigger>
              <Settings />
            </DrawerTrigger>
            <DrawerContainer>
              <DrawerItem active>
                <Search />
              </DrawerItem>
              <DrawerItem>
                <Sun />
              </DrawerItem>
              <DrawerItem>
                <Thermometer />
              </DrawerItem>
              <DrawerItem>
                <Rocket />
              </DrawerItem>
            </DrawerContainer>
          </Drawer>
        </div>
      </div>
    </div>
  )
}
