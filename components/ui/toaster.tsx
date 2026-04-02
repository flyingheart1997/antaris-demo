'use client';

import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
    return (
        <Sonner
            theme="dark"
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        'group toast group-[.toaster]:bg-surface-bg group-[.toaster]:text-text-primary group-[.toaster]:border-stroke-primary group-[.toaster]:shadow-2xl group-[.toaster]:backdrop-blur-xl group-[.toaster]:rounded-xl font-sans',
                    description: 'group-[.toast]:text-text-secondary',
                    actionButton:
                        'group-[.toast]:bg-surface-focus group-[.toast]:text-white',
                    cancelButton:
                        'group-[.toast]:bg-surface-hover group-[.toast]:text-text-secondary',
                    success: 'group-[.toast]:text-text-success group-[.toast]:border-stroke-success/30',
                    error: 'group-[.toast]:text-text-error group-[.toast]:border-stroke-error/30',
                    warning: 'group-[.toast]:text-text-warning group-[.toast]:border-stroke-warning/30',
                    info: 'group-[.toast]:text-text-info group-[.toast]:border-stroke-info/30',
                },
            }}
            {...props}
        />
    );
};

export { Toaster };
