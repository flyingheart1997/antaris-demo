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
        // <Link
        //     href={link}
        //     className="group overflow-hidden shadow-sm bg-card rounded-md hover:rounded-xl">
        //     <img
        //         className="h-72 w-full bg-foreground/10 rounded-md object-cover object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:h-70 group-hover:rounded-xl"
        //         src={avatar}
        //         alt="team member"
        //         width="826"
        //         height="1239"
        //     />
        //     <div className="px-4 sm:pt-4 pb-2">
        //         <div className='flex items-center justify-between'>
        //             <h3 className="text-base font-medium w-80 truncate transition-all duration-500 group-hover:tracking-wider">{name}</h3>
        //             <Badge className='capitalize'>{gender}</Badge>
        //         </div>
        //         <span className="text-muted-foreground inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">{email}</span>
        //     </div>
        // </Link>

        <Link
            href={link}
            className="group relative flex flex-col bg-[#0B0F1A] border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(79,70,229,0.15)]"
        >
            {/* Top Right "View" Indicator */}
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20">
                    <ArrowUpRight className="w-4 h-4 text-white" />
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
                <div className="absolute inset-0 bg-linear-to-t from-[#0B0F1A] via-transparent to-transparent opacity-60" />
            </div>

            {/* Content Area */}
            <div className="relative p-5 pt-2 flex flex-col grow">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-slate-100 truncate group-hover:text-indigo-400 transition-colors duration-300">
                        {name}
                    </h3>
                    <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-[10px] uppercase tracking-widest font-bold px-2 py-0.5">
                        {gender}
                    </Badge>
                </div>

                <div className="flex items-center gap-2 text-slate-500 mb-4">
                    <Mail className="w-3.5 h-3.5" />
                    <span className="text-xs truncate">{email}</span>
                </div>

                {/* New Footer Detail (Optional but Modern) */}
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-[10px] text-slate-500 uppercase font-mono tracking-tighter">Verified User</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                </div>
            </div>
        </Link>
    )
}

export default UserCard