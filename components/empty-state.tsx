'use client'

import React from 'react'
import { LucideIcon, Plus } from 'lucide-react'
import { Button } from './ui/button'

interface EmptyStateProps {
    icon: LucideIcon
    title: string
    description: string
    actionLabel?: string
    onAction?: () => void
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    actionLabel,
    onAction
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-stroke-primary/30 rounded-[2.5rem] bg-surface-primary/20 backdrop-blur-sm animate-in fade-in zoom-in duration-500">
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-surface-secondary mb-6 shadow-sm border border-stroke-primary/10">
                <Icon className="h-10 w-10 text-text-disabled" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary tracking-tight mb-2">
                {title}
            </h3>
            <p className="text-text-secondary text-base max-w-sm mb-10 leading-relaxed">
                {description}
            </p>
            {actionLabel && onAction && (
                <Button 
                    onClick={onAction} 
                    variant="solid" 
                    color="accent"
                    size="lg" 
                    className="rounded-2xl px-8 font-bold text-sm uppercase tracking-widest shadow-lg shadow-green-500/20 active:scale-95 transition-all"
                >
                    <Plus className="mr-2 h-5 w-5" />
                    {actionLabel}
                </Button>
            )}
        </div>
    )
}
