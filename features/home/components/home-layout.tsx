'use client'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarLogo,
    SidebarDashboard,
} from "@/components/ui/sidebar";
import { CatalogIcon, DashboardIcon, GroundStationIcon, MissionDesignIcon, MissionIcon, NotificationsIcon, SatelliteIcon, UsersIcon } from "@/icons";
import { Separator } from "@/components/ui/separator";
import { iconButtonVariants } from "@/components/ui/icon-button";
import { useAuth } from "@/hooks/use-auth";
import { useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface HomeLayoutProps {
    children: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
    const { user } = useAuth()

    const name = useMemo(() => user ? user?.name?.split(' ')[0][0] + user?.name?.split(' ')[1][0] : 'KM', [user])

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon">
                <SidebarLogo />
                <SidebarContent>
                    {/* Section 1 - Top Navigation */}
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton disabled asChild tooltip="Dashboard">
                                        <Link href="/dashboard">
                                            <DashboardIcon />
                                            <span>Dashboard</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <Separator className="opacity-40" />
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton disabled asChild tooltip="Mission Objective">
                                        <Link href="/mission-objective">
                                            <MissionIcon />
                                            <span>Mission Objective</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton disabled asChild tooltip="Mission Modelling">
                                        <Link href="/mission-modelling">
                                            <MissionDesignIcon />
                                            <span>Mission Modelling</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <Separator className="opacity-40" />

                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton disabled asChild tooltip="Satellites">
                                        <Link href="/satellites">
                                            <SatelliteIcon />
                                            <span>Satellites</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton disabled asChild tooltip="Ground Station">
                                        <Link href="/ground-station">
                                            <GroundStationIcon />
                                            <span>Ground Station</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <Separator className="opacity-40" />

                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton selected asChild tooltip="Catalog">
                                        <Link href="/catalog">
                                            <CatalogIcon />
                                            <span>Catalog</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                {/* Section 2 - Bottom Navigation */}
                <SidebarFooter>
                    <Separator className="opacity-40" />
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton disabled asChild tooltip="Notification">
                                        <Link href="/notification">
                                            <NotificationsIcon />
                                            <span>Notification</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton disabled asChild tooltip="User Management">
                                        <Link href="/user-management">
                                            <UsersIcon />
                                            <span>User Management</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip="Settings" className="hover:bg-transparent">
                                        <Link href="/settings">
                                            <div className={cn(iconButtonVariants({
                                                size: "sm",
                                                variant: "outline",
                                                color: "accent",
                                            }))}>{name}</div>
                                            <span>Settings</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarFooter>
            </Sidebar>
            <SidebarDashboard>
                {children}
            </SidebarDashboard>
        </SidebarProvider>
    )
}

export default HomeLayout