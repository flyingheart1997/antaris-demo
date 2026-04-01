'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useUserModal } from "@/hooks/user/useUserModal"
import { UserForm } from "./user-form"
import { userFormSchema, UserType } from "@/form-schema/user-schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { orpc } from "@/lib/orpc"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo } from "react"

const UserModal = () => {
    const queryClient = useQueryClient()
    const { open, mode, data, userId, close } = useUserModal()

    const form = useForm<UserType, any, UserType>({
        resolver: zodResolver(userFormSchema as any),
        defaultValues: data,
    })

    const createUserMutation = useMutation({
        ...orpc.user.create.mutationOptions(),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: orpc.user.list.queryKey(),
            })
            form.reset()
            toast.success('User created successfully')
            close()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const updateUserMutation = useMutation({
        ...orpc.user.update.mutationOptions(),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: orpc.user.list.queryKey()
            })
            await queryClient.invalidateQueries({
                queryKey: orpc.user.details.queryKey({ input: { userId: userId! } }),
                exact: true
            })

            form.reset()
            toast.success('User updated successfully')
            close()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const onSubmit = async (data: UserType) => {
        if (mode === 'create') {
            createUserMutation.mutate(data)
        } else {
            if (!userId) return
            updateUserMutation.mutate({ userId, data })
        }
    }

    useEffect(() => {
        if (!open) return
        form.reset(data)
    }, [data, open])

    const isPending = useMemo(() => createUserMutation.isPending || updateUserMutation.isPending, [createUserMutation.isPending, updateUserMutation.isPending])

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent>
                <DialogHeader className="border-b pb-2">
                    <DialogTitle>
                        {mode === 'create' ? 'Create User' : 'Update User'}
                    </DialogTitle>
                </DialogHeader>
                <UserForm form={form} onSubmit={onSubmit} isPending={isPending} mode={mode} />
            </DialogContent>
        </Dialog>
    )
}

export default UserModal