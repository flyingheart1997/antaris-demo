'use client'

import { Button } from '@/components/ui/button'
import { useUserModal } from '@/hooks/user/useUserModal'

const CreateuserButton = () => {
    const { openCreate } = useUserModal()
    return (
        <Button variant='outline' className='h-10' onClick={openCreate}>Create User</Button>
    )
}

export default CreateuserButton