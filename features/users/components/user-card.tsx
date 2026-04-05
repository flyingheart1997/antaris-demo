'use client'

import Link from 'next/link'
import type { User } from '@/app/(server)/router/user'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback, AvatarIndicator } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Edit2, Trash2, Eye } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { useUserModal } from '../hooks/useUserModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orpc } from '@/lib/orpc'
import { toast } from 'sonner'

const UserCard = ({ user }: { user: User }) => {
    const { name, avatar, _id, username } = user
    const link = `/users/${_id}`
    const { openUpdate } = useUserModal()
    const queryClient = useQueryClient()

    const deleteUserMutation = useMutation({
        ...orpc.user.delete.mutationOptions(),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: orpc.user.list.queryKey(),
            })
            toast.success('User deleted successfully')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        deleteUserMutation.mutate({ userId: _id })
    }

    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        openUpdate(user)
    }

    return (
        <Card className="group relative flex flex-col items-center text-center bg-surface-primary border-stroke-primary/50 shadow-sm hover:shadow-md transition-all duration-300 rounded-3xl pt-14 pb-10 px-8 overflow-visible" stroke={true}>

            {/* Subtle Action Dropdown (Top Right) */}
            <div className="absolute top-5 right-5 z-20">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors outline-none">
                            <MoreHorizontal />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52 shadow-xl p-4">
                        <DropdownMenuItem onClick={handleEdit} className="cursor-pointer gap-3 py-3 text-sm rounded-lg">
                            <Edit2 className="h-4 w-4 opacity-70" />
                            <span>Modify Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-stroke-primary/50 my-1" />
                        <DropdownMenuItem onClick={handleDelete} className="cursor-pointer gap-3 py-3 text-sm text-red-500 focus:text-red-500 focus:bg-red-50 rounded-lg">
                            <Trash2 className="h-4 w-4 opacity-70" />
                            <span>Terminate Access</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Avatar Section (Centered) - Increased Size */}
            <div className="mb-8 relative">
                <div className="relative h-32 w-32 rounded-full border-4 border-surface-bg shadow-lg">
                    <Avatar className="h-full w-full rounded-full">
                        <AvatarImage src={avatar} alt={name} className="rounded-full object-cover" />
                        <AvatarFallback className="rounded-full text-2xl">{name.substring(0, 2)}</AvatarFallback>
                        <AvatarIndicator color="green" size="4" position="bottom-right" className="border-surface-primary ring-2 ring-surface-primary" />
                    </Avatar>
                </div>
            </div>

            {/* User Identity */}
            <CardContent className="p-0 mb-10 w-full">
                <h3 className="text-2xl font-bold text-text-primary tracking-tight mb-2">{name}</h3>
                <p className="text-base text-text-secondary font-medium mb-5 truncate">@{username || "operator"}</p>

                {/* Visual Rating Stars from Screenshot - Increased Size */}
                <div className="flex items-center justify-center gap-1 text-yellow-400">
                    {"★★★★".split("").map((s, i) => <span key={i} className="text-sm">{s}</span>)}
                    <span className="text-sm text-text-disabled">★</span>
                </div>
            </CardContent>

            {/* Primary Action Button (Centered) - More substantial */}
            <div className="mt-auto w-full px-2">
                <Link href={link} className="w-full">
                    <Button variant="outline" color="neutral" size="lg" className="w-full rounded-2xl border-stroke-primary/80 text-text-secondary hover:bg-surface-secondary hover:text-text-primary font-bold transition-all text-sm uppercase tracking-widest">
                        View Profile
                    </Button>
                </Link>
            </div>
        </Card>
    )
}

export default UserCard