'use client'

import { orpc } from "@/lib/orpc"
import UserCard from "./user-card"
import { Users } from "lucide-react"
import { useUserModal } from "../hooks/useUserModal"
import { DataGrid } from "@/components/data-grid"

import type { User } from '@/app/(server)/router/user'

const UsersList = () => {
    const { openCreate } = useUserModal()

    return (
        <DataGrid<User> 
            queryOptions={orpc.user.list.queryOptions() as any} 
            renderItem={(user) => <UserCard user={user} />} 
            emptyProps={{
                icon: Users,
                title: "No Operators Found",
                description: "It looks like you haven't added any system operators yet. Start by creating your first team member.",
                actionLabel: "Add Operator",
                onAction: openCreate
            }}
        />
    )
}

export default UsersList