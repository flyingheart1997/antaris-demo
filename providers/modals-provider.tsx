"use client"

import { UploadModal } from "@/components/modals/upload-modal"
import { UserModal } from '@/features/users'
import React, { Fragment } from 'react'

const ModalsProvider = ({ children }: { children: React.ReactNode }) => {

    return (
        <Fragment>
            <UserModal />
            <UploadModal />
            {children}
        </Fragment>
    )
}

export default ModalsProvider
