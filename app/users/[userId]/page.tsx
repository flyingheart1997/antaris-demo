'use client'

import { useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { trpc } from '@/lib/trpc'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback, AvatarIndicator } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Mail, Globe, MapPin, Phone, Building2, Briefcase, Trash2, Edit2, ChevronLeft, Calendar, Shield, Zap } from 'lucide-react'
import Link from 'next/link'
import { ProfileSkeleton } from '@/components/skeletons'
import ErrorComponent from '@/components/error'
import { useUserModal } from '@/features/users'

const UserDetails = () => {
    const router = useRouter()
    const { userId } = useParams()
    const { openUpdate } = useUserModal()
    const queryClient = useQueryClient()

    const { data: user, isLoading, isError } = useQuery(
        trpc.user.details.queryOptions({ input: { userId: userId as string }, retry: false })
    )

    const deleteUserMutation = useMutation({
        ...trpc.user.delete.mutationOptions(),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: trpc.user.list.queryKey(),
            })
            toast.success('Operator terminated successfully')
            router.push("/users")
        },
        onError: (error: any) => {
            toast.error(error.message)
        }
    })
    const isPending = useMemo(() => deleteUserMutation.isPending, [deleteUserMutation.isPending])

    const onDelete = async () => {
        deleteUserMutation.mutate({
            userId: userId as string
        })
    }

    if (isError && !user) return <ErrorComponent />
    if (isPending || isLoading) return <ProfileSkeleton />

    return (
        <section className="container mx-auto px-6 max-w-7xl pt-16 pb-32">
            {/* Breadcrumb / Back Navigation */}
            <div className="flex items-center gap-6 mb-12">
                <Link href="/users">
                    <Button variant="ghost" color="neutral" size="lg" className="h-12 w-12 p-0 rounded-full hover:bg-surface-secondary">
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                </Link>
                <div className="flex flex-col">
                    <h2 className="text-sm font-bold text-text-secondary uppercase tracking-widest">Operators Library</h2>
                    <h1 className="text-2xl font-bold text-text-primary tracking-tight">Operator Profile</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                {/* Left Column: Profile Card - Scaled Up */}
                <div className="lg:col-span-4 space-y-8">
                    <Card size='4' className="bg-surface-primary border-stroke-primary/50 shadow-md rounded-3xl overflow-hidden text-center" stroke={true}>
                        <div className="flex justify-center mb-8">
                            <div className="relative h-56 w-56 rounded-full border-8 border-surface-bg shadow-xl">
                                <Avatar className="h-full w-full rounded-full">
                                    <AvatarImage src={user?.avatar} alt={user?.name} className="rounded-full object-cover" />
                                    <AvatarFallback className="text-4xl rounded-full">{user?.name.substring(0, 2)}</AvatarFallback>
                                    <AvatarIndicator color="green" size="5" position="bottom-right" className="border-surface-primary ring-4 ring-surface-primary" />
                                </Avatar>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-text-primary mb-2">{user?.name}</h2>
                        <p className="text-lg text-text-secondary font-medium mb-10">@{user?.username}</p>

                        <div className="flex flex-col gap-4">
                            <Button
                                onClick={() => openUpdate(user!)}
                                variant="surface"
                                color="accent"
                                className="w-full rounded-2xl font-bold text-base shadow-sm"
                                leadingIcon={<Edit2 className='h-4.5 w-4.5' />}
                            >
                                Modify Profile
                            </Button>
                            <Button
                                onClick={onDelete}
                                variant="soft"
                                color="error"
                                className="w-full rounded-2xl font-bold text-base"
                                leadingIcon={<Trash2 className='h-4.5 w-4.5' />}
                            >
                                Terminate Access
                            </Button>
                        </div>

                        {/* Visual verification as seen in screenshot footer */}
                        <div className="mt-12 pt-10 border-t border-stroke-primary/50 flex items-center justify-between px-2">
                            <div className="flex items-center gap-3">
                                <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[12px] font-bold text-text-secondary uppercase tracking-[0.2em]">Deployment Active</span>
                            </div>
                            <Shield className="text-text-disabled" />
                        </div>
                    </Card>

                    <Card size="4" className="bg-surface-primary border-stroke-primary/50 shadow-sm rounded-3xl" stroke={true}>
                        <h3 className="text-[12px] font-bold text-text-secondary uppercase tracking-[0.2em] mb-6">Core Metadata</h3>
                        <div className="space-y-5">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-text-disabled font-medium">Unique Identity</span>
                                <span className="font-mono text-text-secondary font-bold">{user?._id.substring(0, 16)}...</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-text-disabled font-medium">Joined System</span>
                                <span className="text-text-secondary flex items-center gap-2 font-bold">
                                    <Calendar className="opacity-70" /> August 2024
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Detailed Info Sections - Scaled Up Icons/Text */}
                <div className="lg:col-span-8 space-y-8 space-x-8">
                    {/* Information Grid Section */}
                    <Card className="bg-surface-primary border-stroke-primary/50 shadow-md rounded-3xl overflow-hidden" stroke={true}>
                        <CardHeader className="px-10 pt-10 pb-6 border-b border-stroke-primary">
                            <CardTitle className="text-xl font-bold text-text-primary">Contact & Communication</CardTitle>
                        </CardHeader>
                        <CardContent className="px-10 py-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black text-text-disabled uppercase tracking-[0.2em]">Verified Email</label>
                                    <div className="flex items-center gap-4 text-lg text-text-primary font-bold">
                                        <Mail className="h-4.5 w-4.5 text-blue-600" />

                                        {user?.email}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black text-text-disabled uppercase tracking-[0.2em]">Secure Terminal</label>
                                    <div className="flex items-center gap-4 text-lg text-text-primary font-bold">
                                        <Phone className="h-4.5 w-4.5 text-green-600" />

                                        {user?.phone}
                                    </div>
                                </div>
                                <div className="space-y-3 lg:col-span-2">
                                    <label className="text-[11px] font-black text-text-disabled uppercase tracking-[0.2em]">Digital Network</label>
                                    <div className="flex items-center gap-4 text-lg text-text-primary font-bold">

                                        <Globe className="h-4.5 w-4.5 text-purple-600" />
                                        {user?.website}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Deployment / Address Section */}
                    <Card className="bg-surface-primary border-stroke-primary/50 shadow-md rounded-3xl overflow-hidden" stroke={true}>
                        <CardHeader className="px-10 pt-10 pb-6 border-b border-stroke-primary">
                            <CardTitle className="text-xl font-bold text-text-primary">Operational Hub</CardTitle>
                        </CardHeader>
                        <CardContent className="px-10 py-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black text-text-disabled uppercase tracking-[0.2em]">Physical Street</label>
                                    <div className="flex items-center gap-4 text-lg text-text-primary font-bold">
                                        <MapPin className="h-4.5 w-4.5 text-red-600" />
                                        {user?.address.street}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black text-text-disabled uppercase tracking-[0.2em]">Location Data</label>
                                    <div className="text-lg text-text-primary font-bold pt-2 pl-16">
                                        {user?.address.city} · {user?.address.zipcode}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Association Section */}
                    <Card className="bg-surface-primary border-stroke-primary/50 shadow-md rounded-3xl overflow-hidden" stroke={true}>
                        <CardHeader className="px-10 pt-10 pb-6 border-b border-stroke-primary">
                            <CardTitle className="text-xl font-bold text-text-primary">Entity Association</CardTitle>
                        </CardHeader>
                        <CardContent className="px-10 py-10">
                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black text-text-disabled uppercase tracking-[0.2em]">Corporate Identity</label>
                                    <div className="flex items-center gap-5 text-2xl text-text-primary font-bold">
                                        <Building2 className="h-4.5 w-4.5 text-indigo-600" />
                                        {user?.company.name}
                                    </div>
                                </div>
                                <div className="bg-surface-secondary/50 rounded-3xl p-10 border-2 border-dashed border-stroke-primary/50">
                                    <p className="text-xl font-bold text-text-primary italic mb-6 leading-comfortable">
                                        "{user?.company.catchPhrase}"
                                    </p>
                                    <div className="flex items-center gap-3 text-sm font-black text-text-disabled uppercase tracking-widest">
                                        <Zap className="text-yellow-500 fill-yellow-500" /> Operational Model: <span className="text-text-secondary">{user?.company.bs}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </section>
    )
}

export default UserDetails
