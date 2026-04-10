'use client'

import { useAuth } from "@/hooks/use-auth";
import { useMemo } from "react";
import Link from "next/link";
import { Text } from "@/components/ui/text";
import { Drawer, DrawerTrigger, DrawerContainer, DrawerItem } from "@/components/ui/drawer"
import { Search, Settings, Sun, Thermometer, Rocket, Upload, Users } from "lucide-react"
import { CatalogNav } from "./catalog-nav";
import { AdcsIcon, BusIcon, CommsIcon, CustomIcon, EarthobservationIcon, EdgeIcon, EpsIcon, GpsIcon, PayloadIcon, ProcessorIcon, TempIcon, ThrusterIcon } from "@/icons";


interface CatalogLayoutProps {
    children: React.ReactNode
}

const CatalogLayout = ({ children }: CatalogLayoutProps) => {
    const { user } = useAuth()

    const name = useMemo(() => user ? user?.name?.split(' ')[0][0] + user?.name?.split(' ')[1][0] : 'KM', [user])

    return (
        <main className="flex flex-col h-full w-full">
            <CatalogNav />
            <section className="flex flex-1">
                <section className="flex flex-col px-6 gap-20">
                    <Drawer defaultOpen={true}>
                        <DrawerTrigger title="Payload">
                            <PayloadIcon />
                        </DrawerTrigger>
                        <DrawerContainer>
                            <DrawerItem active title="Earth Observation">
                                <EarthobservationIcon />
                            </DrawerItem>
                            <DrawerItem title="Comms">
                                <CommsIcon />
                            </DrawerItem>
                            <DrawerItem title="Edge">
                                <EdgeIcon />
                            </DrawerItem>
                            <DrawerItem title="Custom">
                                <CustomIcon />
                            </DrawerItem>
                        </DrawerContainer>
                    </Drawer>
                    <Drawer>
                        <DrawerTrigger title="Bus">
                            <BusIcon />
                        </DrawerTrigger>
                        <DrawerContainer>
                            <DrawerItem active title="Processor">
                                <ProcessorIcon />
                            </DrawerItem>
                            <DrawerItem title="Comms">
                                <CommsIcon />
                            </DrawerItem>
                            <DrawerItem title="EPS">
                                <EpsIcon />
                            </DrawerItem>
                            <DrawerItem title="ADCS">
                                <AdcsIcon />
                            </DrawerItem>
                            <DrawerItem title="GPS">
                                <GpsIcon />
                            </DrawerItem>
                            <DrawerItem title="Temperature">
                                <TempIcon />
                            </DrawerItem>
                            <DrawerItem title="Thruster">
                                <ThrusterIcon />
                            </DrawerItem>
                            <DrawerItem title="Custom">
                                <CustomIcon />
                            </DrawerItem>
                        </DrawerContainer>
                    </Drawer>
                </section>
                <section className="flex flex-1">
                    {children}
                </section>
            </section>
        </main>
    )
}

export default CatalogLayout