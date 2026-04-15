'use client'

import { Button } from '@/components/ui/button'
import { useUserModal } from '../hooks/useUserModal'
import { Plus } from 'lucide-react'

const CreateUserButton = () => {
    const { openCreate } = useUserModal()
    return (
        <Button
            variant="solid"
            color="accent"
            size="lg"
            className='rounded-2xl px-10 font-bold text-base shadow-xl shadow-accent/20 hover:shadow-accent/30 transition-all uppercase tracking-widest'
            onClick={openCreate}
        >
            <Plus />
            Provision Operator
        </Button>
    )
}

export default CreateUserButton