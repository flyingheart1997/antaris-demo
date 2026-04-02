'use client'

import { Button } from '@/components/ui/button'
import { useUserModal } from '../hooks/useUserModal'
import { Plus } from 'lucide-react'

const CreateUserButton = () => {
    const { openCreate } = useUserModal()
    return (
        <Button 
            className='h-11 px-6 rounded-md font-heading font-semibold shadow-lg shadow-surface-brand/20 flex gap-2' 
            onClick={openCreate}
        >
            <Plus className="size-4" />
            <span>Create User</span>
        </Button>
    )
}

export default CreateUserButton