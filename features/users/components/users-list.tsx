'use client'

import { orpc } from "@/lib/orpc"
import { useSuspenseQuery } from "@tanstack/react-query"
import CreateUserButton from "./create-user-button"
import UserCard from "./user-card"
import Error from "@/components/error"
import Loader from "@/components/loader"

const UsersList = () => {
    const { data: { success, data: users } } = useSuspenseQuery(orpc.user.list.queryOptions())

    if (!success) {
        return (
            <Error />
        )
    }
    else if (!users) {
        return (
            <Loader />
        )
    }
    return (
        <section className="container self-start mx-auto px-4 max-w-7xl pt-32 pb-24 font-body">
            {/* Header Area with Create Button */}
            <div className="flex items-center justify-between mb-16 border-b border-stroke-primary/50 pb-10">
                <div className="space-y-2">
                    <h2 className="text-4xl font-heading font-bold text-text-primary tracking-tight">System Operators</h2>
                    <p className="text-base text-text-secondary">Manage active users and access levels with precision</p>
                </div>
                <CreateUserButton />
            </div>

            {/* Modern Grid Layout */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {users.map((user) => (
                    <UserCard key={user._id} user={user} />
                ))}
            </div>
        </section>
    )
}

export default UsersList