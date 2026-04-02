import Error from '@/components/error'
import Loader from '@/components/loader'
import { UsersList } from '@/features/users'
import { orpc } from '@/lib/orpc'
import { getQueryClient, HydrateClient } from '@/lib/query/hydration'

const Users = async () => {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(orpc.user.list.queryOptions())

    // const { success, data: users } = await queryClient.fetchQuery(orpc.user.list.queryOptions())

    // if (!success) {
    //     return (
    //         <Error />
    //     )
    // }
    // else if (!users) {
    //     return (
    //         <Loader />
    //     )
    // }
    // return (
    //     <section className="container mx-auto px-4 max-w-7xl">
    //         {/* Header Area with Create Button */}
    //         <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
    //             <div>
    //                 <h2 className="text-2xl font-bold text-white tracking-tight">System Operators</h2>
    //                 <p className="text-sm text-slate-500 mt-1">Manage active users and access levels</p>
    //             </div>
    //             <CreateuserButton />
    //         </div>

    //         {/* Modern Grid Layout */}
    //         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    //             {users.map((user) => (
    //                 <UserCard key={user._id} user={user} />
    //             ))}
    //         </div>
    //     </section>
    // )

    return (
        <HydrateClient client={queryClient}>
            <UsersList />
        </HydrateClient>
    )
}

export default Users