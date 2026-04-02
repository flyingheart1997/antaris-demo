'use client'

import Link from 'next/link'
import type { User } from '@/app/(server)/router/user'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, Mail } from 'lucide-react'

const UserCard = ({ user }: { user: User }) => {
    const name = user.name
    const email = user.email
    const avatar = user.avatar
    const link = `/users/${user._id}`
    const gender = user.gender

    return (
        <Link
            href={link}
            className="group relative flex flex-col bg-surface-secondary border border-stroke-primary rounded-md overflow-hidden transition-all duration-500 hover:border-surface-brand/50 hover:shadow-xl hover:shadow-surface-brand/10"
        >
            {/* Top Right "View" Indicator */}
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-surface-bg/60 backdrop-blur-md p-2 rounded-full border border-stroke-primary">
                    <ArrowUpRight className="w-4 h-4 text-text-primary" />
                </div>
            </div>

            {/* Image Wrapper */}
            <div className="relative h-64 w-full overflow-hidden">
                <img
                    className="absolute inset-0 h-full w-full object-cover object-top grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-110"
                    src={avatar}
                    alt={name}
                />
                {/* Subtle Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-surface-secondary via-transparent to-transparent opacity-60" />
            </div>

            {/* Content Area */}
            <div className="relative p-5 pt-2 flex flex-col grow">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-lg font-heading font-semibold text-text-primary truncate group-hover:text-text-selected transition-colors duration-300">
                        {name}
                    </h3>
                    <Badge className="bg-surface-brand/10 text-text-selected border-surface-brand/20 text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-xs">
                        {gender}
                    </Badge>
                </div>

                <div className="flex items-center gap-2 text-text-secondary mb-4 font-body">
                    <Mail className="w-3.5 h-3.5" />
                    <span className="text-xs truncate">{email}</span>
                </div>

                {/* Footer Detail */}
                <div className="mt-auto pt-4 border-t border-stroke-primary flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-[10px] text-text-secondary uppercase font-body tracking-tighter">Verified User</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-surface-brand shadow-[0_0_8px_var(--color-surface-brand)]" />
                </div>
            </div>
        </Link>
    )
}

export default UserCard