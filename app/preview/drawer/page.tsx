import { Drawer, DrawerTrigger, DrawerContainer, DrawerItem } from "@/components/ui/drawer"
import { Search, Settings, Sun, Thermometer, Rocket, Upload, Users } from "lucide-react"

export default function ComponentDrawerPreview() {
  return (
    <div className="flex flex-col items-center justify-center p-20 min-h-screen bg-gray-50 gap-20">
      <div className="text-center font-semibold text-xl mb-4 text-gray-900 border-b pb-2">
        Drawer Preview
      </div>

      <div className="flex gap-20 items-start">
        {/* Expanded Drawer */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-sm font-medium text-gray-500">Expanded (state="on")</span>
          <Drawer defaultOpen={true}>
            <DrawerTrigger title="Settings">
              <Settings />
            </DrawerTrigger>
            <DrawerContainer>
              <DrawerItem active title="Search">
                <Search />
              </DrawerItem>
              <DrawerItem title="Sun">
                <Sun />
              </DrawerItem>
              <DrawerItem title="Thermometer">
                <Thermometer />
              </DrawerItem>
              <DrawerItem title="Rocket">
                <Rocket />
              </DrawerItem>
              <DrawerItem title="Upload">
                <Upload />
              </DrawerItem>
              <DrawerItem title="Users">
                <Users />
              </DrawerItem>
            </DrawerContainer>
          </Drawer>
        </div>

        {/* Collapsed Drawer */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-sm font-medium text-gray-500">Collapsed (state="off")</span>
          <Drawer defaultOpen={false}>
            <DrawerTrigger title="Settings">
              <Settings />
            </DrawerTrigger>
            <DrawerContainer>
              <DrawerItem active title="Search">
                <Search />
              </DrawerItem>
              <DrawerItem title="Sun">
                <Sun />
              </DrawerItem>
              <DrawerItem title="Thermometer">
                <Thermometer />
              </DrawerItem>
              <DrawerItem title="Rocket">
                <Rocket />
              </DrawerItem>
            </DrawerContainer>
          </Drawer>
        </div>
      </div>
    </div>
  )
}
