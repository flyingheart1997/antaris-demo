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
        <section className="container mx-auto px-6 max-w-7xl pt-16 pb-24">
            {/* Simple Modern Header */}
            <div className="flex items-center justify-between mb-16">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary tracking-tight">Operators</h1>
                    <p className="text-sm text-text-secondary mt-1">Manage all system operators and their profiles.</p>
                </div>
                <CreateUserButton />
            </div>

            {/* Simple Grid Layout */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {users.map((user) => (
                    <UserCard key={user._id} user={user} />
                ))}
            </div>
        </section>
    )
}

export default UsersList