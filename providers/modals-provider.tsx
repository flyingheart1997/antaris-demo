import { UserModal } from '@/features/users'
import React, { Fragment } from 'react'

const ModalsProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Fragment>
            <UserModal />
            {children}
        </Fragment>
    )
}

export default ModalsProvider