'use client'

import React from 'react'

interface PageShellProps {
    title: string
    description?: string
    breadcrumbs?: React.ReactNode
    actions?: React.ReactNode
    children: React.ReactNode
}

export function PageShell({
    title,
    description,
    breadcrumbs,
    actions,
    children
}: PageShellProps) {
    return (
        <section className="container mx-auto px-6 max-w-7xl pt-16 pb-24 animate-in fade-in duration-500">
            {/* Breadcrumbs Slot (Best for future) */}
            {breadcrumbs && <div className="mb-6">{breadcrumbs}</div>}

            {/* Premium Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-16">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-text-primary tracking-tight md:text-4xl">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-base text-text-secondary font-medium">
                            {description}
                        </p>
                    ) }
                </div>
                {actions && (
                    <div className="flex items-center gap-3">
                        {actions}
                    </div>
                )}
            </div>

            {/* Page Content */}
            <div className="relative">
                {children}
            </div>
        </section>
    )
}
