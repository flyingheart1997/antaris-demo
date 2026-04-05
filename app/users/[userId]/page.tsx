'use client'

import { orpc } from '@/lib/orpc'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { Mail, Globe, User, Trash2, Edit3, Activity, ShieldCheck, Zap, Compass, Briefcase, ArrowRight, Hash } from 'lucide-react'
import { toast } from 'sonner'
import { useMemo } from 'react'
import Loader from '@/components/loader'
import Error from '@/components/error'
import { useUserModal } from '@/features/users'

const UserDetails = () => {
    const router = useRouter()
    const { userId } = useParams()
    const { openUpdate } = useUserModal()
    const queryClient = useQueryClient()

    const { data: user, isLoading, isError } = useQuery(
        orpc.user.details.queryOptions({ input: { userId: userId as string }, retry: false })
    )

    const deleteUserMutation = useMutation({
        ...orpc.user?.delete.mutationOptions(),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: orpc.user?.list.queryKey(),
            })
            toast.success('User deleted successfully')
            router.push("/users")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    const isPending = useMemo(() => deleteUserMutation.isPending, [deleteUserMutation.isPending])

    const onDelete = async () => {
        deleteUserMutation.mutate({
            userId: userId as string
        })
    }
    if (isError && !user) {
        return (
            <Error />
        )
    }
    else if (isPending || (isLoading)) {
        return (
            <Loader />
        )
    }

    const name = user?.name || '';
    const firstSpace = name.indexOf(' ');
    const firstName = name.substring(0, firstSpace);
    const remaining = name.substring(firstSpace + 1);

    return (
        <section key={`${user?._id}-${user?.name}`} className="relative container mx-auto px-6 max-w-7xl">
            {/* --- TOP ACTION BAR --- */}
            <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-slate-500 uppercase">
                    <Activity className="w-4 h-4 text-blue-500" />
                    System / Users / {user?.username}
                </div>
                <div className="flex gap-3 self-end">
                    <button
                        onClick={() => openUpdate(user!)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all"
                    >
                        <Edit3 className="w-4 h-4" /> Edit
                    </button>
                    <button
                        onClick={onDelete}
                        className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium transition-all"
                    >
                        <Trash2 className="w-4 h-4" /> Terminate
                    </button>
                </div>
            </div>

            {/* --- HERO SECTION --- */}
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">

                {/* Left: Avatar Visual */}
                <div className="lg:col-span-4 flex justify-center lg:justify-start">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-linear-to-tr from-blue-600 to-indigo-600 rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="relative w-64 h-64 rounded-full p-1 bg-linear-to-tr from-white/20 to-transparent">
                            <img
                                src={user?.avatar}
                                alt={user?.name}
                                className="w-full h-full rounded-full object-cover grayscale-30 group-hover:grayscale-0 transition-all duration-700 border-4 border-[#05070A]"
                            />
                        </div>
                        <div className="absolute bottom-4 right-4 bg-blue-600 p-3 rounded-2xl shadow-xl shadow-blue-900/40 border border-blue-400/50">
                            <ShieldCheck className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                {/* Right: Primary Identity */}
                <div className="lg:col-span-8 flex flex-col justify-center text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full w-fit mx-auto lg:mx-0 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Active Operator</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4 leading-none">
                        {firstName}<br />
                        <span className="text-slate-700">{remaining}</span>
                    </h1>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-slate-400 font-mono text-sm uppercase tracking-widest">
                        <div className="flex items-center gap-2"><Hash className="w-4 h-4 text-blue-500" /> {user?._id}</div>
                        <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-500" /> {user?.email}</div>
                    </div>
                </div>
            </div>

            {/* --- DATA MATRIX --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Communication Card */}
                <div className="bg-white/2 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-md hover:bg-white/4 transition-all">
                    <h3 className="flex items-center gap-3 text-white font-bold mb-8 uppercase tracking-widest text-xs">
                        <Zap className="w-4 h-4 text-yellow-500" /> Reach Out
                    </h3>
                    <div className="space-y-6">
                        <div className="group cursor-pointer">
                            <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Phone Link</p>
                            <p className="text-xl text-slate-200 group-hover:text-blue-400 transition-colors">{user?.phone}</p>
                        </div>
                        <div className="group cursor-pointer">
                            <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Network Node</p>
                            <p className="text-xl text-slate-200 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                                {user?.website} <Globe className="w-4 h-4 opacity-50" />
                            </p>
                        </div>
                    </div>
                </div>

                {/* Geo-Location Card */}
                <div className="bg-white/2 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-md">
                    <h3 className="flex items-center gap-3 text-white font-bold mb-8 uppercase tracking-widest text-xs">
                        <Compass className="w-4 h-4 text-blue-500" /> Deployment
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-2xl font-bold text-white leading-tight">{user?.address.street}</p>
                            <p className="text-slate-400 text-sm mt-1">{user?.address.suite} • {user?.address.city}</p>
                            <p className="text-slate-500 text-xs font-mono mt-1">{user?.address.zipcode}</p>
                        </div>
                        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-blue-500">
                            <span>COORD_X: {user?.address.geo.lat}</span>
                            <span>COORD_Y: {user?.address.geo.lng}</span>
                        </div>
                    </div>
                </div>

                {/* Professional Context */}
                <div className="bg-linear-to-br from-blue-600/10 to-transparent border border-blue-500/20 p-8 rounded-[2.5rem] backdrop-blur-md">
                    <h3 className="flex items-center gap-3 text-white font-bold mb-8 uppercase tracking-widest text-xs">
                        <Briefcase className="w-4 h-4 text-blue-400" /> Assignment
                    </h3>
                    <div className="space-y-2">
                        <p className="text-3xl font-black text-white">{user?.company.name}</p>
                        <p className="text-sm text-blue-400/80 italic font-serif">"{user?.company.catchPhrase}"</p>
                        <div className="pt-6">
                            <div className="inline-block px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[10px] font-bold text-slate-400 uppercase">
                                Core: {user?.company.bs}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* --- RECENT ACTIVITY / FOOTER --- */}
            <div className="mt-12 p-8 border border-white/5 bg-white/1 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                        <User className="text-slate-400" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white uppercase">Profile Integrity</p>
                        <p className="text-xs text-slate-500">All data nodes verified and synchronized via oRPC layer.</p>
                    </div>
                </div>
                <button className="text-xs font-bold text-blue-500 uppercase flex items-center gap-2 group">
                    View System Logs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

        </section>
    )
}

export default UserDetails
