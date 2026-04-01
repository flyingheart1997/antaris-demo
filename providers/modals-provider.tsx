import UserModal from '@/features/users/user-modal'
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