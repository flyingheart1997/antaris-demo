import BackgroundProvider from '@/providers/background-provider'
import React from 'react'

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <BackgroundProvider>
            {children}
        </BackgroundProvider>
    )
}

export default UserLayout