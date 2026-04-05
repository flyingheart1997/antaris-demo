import React from 'react'
import { Skeleton } from './ui/skeleton'
import { cn } from '@/lib/utils'

interface SkeletonGridProps {
    count?: number
    className?: string
}

export function CardGridSkeleton({ count = 8, className }: SkeletonGridProps) {
    return (
        <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
            {Array.from({ length: count }).map((_, i) => (
                <div 
                    key={i} 
                    className="flex flex-col items-center bg-surface-primary/30 border border-stroke-primary/10 rounded-4xl pt-14 pb-10 px-8 animate-pulse"
                >
                    {/* Circle Avatar Skeleton */}
                    <Skeleton className="h-32 w-32 rounded-full mb-8" />
                    
                    {/* Content Skeletons */}
                    <Skeleton className="h-8 w-3/4 mb-4 rounded-xl" />
                    <Skeleton className="h-5 w-1/2 mb-10 rounded-lg" />
                    
                    {/* Button Skeleton */}
                    <Skeleton className="h-12 w-full rounded-2xl" />
                </div>
            ))}
        </div>
    )
}

export function RowListSkeleton({ count = 5, className }: SkeletonGridProps) {
    return (
        <div className={cn("flex flex-col gap-4", className)}>
            {Array.from({ length: count }).map((_, i) => (
                <div 
                    key={i} 
                    className="flex items-center gap-4 p-4 bg-surface-primary/30 border border-stroke-primary/10 rounded-2xl animate-pulse"
                >
                    <Skeleton className="h-12 w-12 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-1/4 rounded-md" />
                        <Skeleton className="h-4 w-1/3 rounded-md" />
                    </div>
                </div>
            ))}
        </div>
    )
}
export function ProfileSkeleton() {
    return (
        <div className="container mx-auto px-6 max-w-7xl pt-16 pb-32 animate-pulse">
            <div className="flex items-center gap-6 mb-12">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24 rounded" />
                    <Skeleton className="h-8 w-48 rounded" />
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-surface-primary/30 border border-stroke-primary/10 rounded-3xl p-10 flex flex-col items-center">
                        <Skeleton className="h-56 w-56 rounded-full mb-8" />
                        <Skeleton className="h-10 w-3/4 mb-4 rounded-xl" />
                        <Skeleton className="h-6 w-1/2 mb-10 rounded-lg" />
                        <div className="w-full space-y-4 pt-4">
                            <Skeleton className="h-12 w-full rounded-2xl" />
                            <Skeleton className="h-12 w-full rounded-2xl" />
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-surface-primary/30 border border-stroke-primary/10 rounded-3xl h-64 w-full" />
                    <div className="bg-surface-primary/30 border border-stroke-primary/10 rounded-3xl h-64 w-full" />
                    <div className="bg-surface-primary/30 border border-stroke-primary/10 rounded-3xl h-64 w-full" />
                </div>
            </div>
        </div>
    )
}
