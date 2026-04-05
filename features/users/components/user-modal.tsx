'use client'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { useUserModal } from "../hooks/useUserModal"
import { UserForm } from "./user-form"
import { userFormSchema, UserType } from "../types/user-schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { orpc } from "@/lib/orpc"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo } from "react"
import { IconButton } from "@/components/ui/icon-button"

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
            <DialogContent className="max-w-3xl p-0 gap-0 overflow-hidden bg-surface-bg border-stroke-primary/50 shadow-2xl rounded-2xl">
                <DialogHeader className="flex items-center justify-between p-3 border-b border-stroke-primary/30">
                    <DialogTitle className="text-2xl w-auto font-bold text-text-primary tracking-tight">
                        {mode === 'create' ? 'Provision Operator' : 'Modify Operator Profile'}
                    </DialogTitle>
                    <DialogClose asChild className="shrink-0">
                        <IconButton variant="ghost" size="sm">
                            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="text-white" />
                        </IconButton>
                    </DialogClose>
                </DialogHeader>
                <div className="max-h-[80vh] overflow-y-auto p-[20px] custom-scrollbar">
                    <UserForm form={form} onSubmit={onSubmit} isPending={isPending} mode={mode} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UserModal