'use client'

import React from 'react'
import { useSuspenseQuery, UseSuspenseQueryOptions } from '@tanstack/react-query'
import { EmptyState } from './empty-state'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DataGridProps<T> {
    queryOptions: UseSuspenseQueryOptions<any, any, { success: boolean, data: T[] }>
    renderItem: (item: T) => React.ReactNode
    emptyProps: {
        icon: LucideIcon
        title: string
        description: string
        actionLabel?: string
        onAction?: () => void
    }
    gridClassName?: string
}

export function DataGrid<T>({
    queryOptions,
    renderItem,
    emptyProps,
    gridClassName
}: DataGridProps<T>) {
    // Use TanStack Query's suspense feature
    const { data: response } = useSuspenseQuery(queryOptions)
    
    // Check for success flag (oRPC pattern)
    if (!response.success) {
        throw new Error("Failed to load data")
    }

    const items = response.data

    // Handle Empty State
    if (!items || items.length === 0) {
        return <EmptyState {...emptyProps} />
    }

    return (
        <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-700", gridClassName)}>
            {items.map((item, index) => (
                <div key={index} className="flex">
                    {renderItem(item)}
                </div>
            ))}
        </div>
    )
}
