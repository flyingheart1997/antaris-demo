'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from '@/components/ui/input'
import { UserType } from '../types/user-schema'
import { useMemo } from 'react'
import { Loader2 } from 'lucide-react'

interface UserFormProps {
    form: ReturnType<typeof useForm<UserType>>
    onSubmit: (data: UserType) => void
    isPending: boolean,
    mode: 'create' | 'update'
}

export function UserForm({ onSubmit, isPending, form, mode }: UserFormProps) {

    const buttonText = useMemo(() => isPending ? mode === 'create' ? 'Creating' : 'Updating' : mode === 'create' ? 'Create' : 'Update', [isPending, mode])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-20 flex flex-col items-stretch">

                {/* Section: Identity */}
                <div className="space-y-10">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-bold text-text-primary tracking-tight">Identity Details</h3>
                        <p className="text-sm text-text-secondary font-medium">Core identification and contact details for the operator.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem><FormLabel className="text-text-secondary text-[12px] font-black uppercase tracking-[0.2em]">Full Legal Name</FormLabel><FormControl><Input className="bg-surface-secondary border-stroke-primary/50 rounded-2xl  px-6 text-base font-medium focus-visible:ring-accent/20 transition-all" placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="username" render={({ field }) => (
                            <FormItem><FormLabel className="text-text-secondary text-[12px] font-black uppercase tracking-[0.2em]">System Username</FormLabel><FormControl><Input className="bg-surface-secondary border-stroke-primary/50 rounded-2xl  px-6 text-base font-medium focus-visible:ring-accent/20 transition-all" placeholder="johndoe" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel className="text-text-secondary text-[12px] font-black uppercase tracking-[0.2em]">Verified Email Address</FormLabel><FormControl><Input className="bg-surface-secondary border-stroke-primary/50 rounded-2xl  px-6 text-base font-medium focus-visible:ring-accent/20 transition-all" placeholder="john@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="gender" render={({ field }) => (
                            <FormItem><FormLabel className="text-text-secondary text-[12px] font-black uppercase tracking-[0.2em]">Gender Identity</FormLabel><FormControl><Input className="bg-surface-secondary border-stroke-primary/50 rounded-2xl  px-6 text-base font-medium focus-visible:ring-accent/20 transition-all" placeholder="Male / Female" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                            <FormItem><FormLabel className="text-text-secondary text-[12px] font-black uppercase tracking-[0.2em]">Phone Terminal</FormLabel><FormControl><Input className="bg-surface-secondary border-stroke-primary/50 rounded-2xl  px-6 text-base font-medium focus-visible:ring-accent/20 transition-all" placeholder="+123..." {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="website" render={({ field }) => (
                            <FormItem><FormLabel className="text-text-secondary text-[12px] font-black uppercase tracking-[0.2em]">Digital Hub / Website</FormLabel><FormControl><Input className="bg-surface-secondary border-stroke-primary/50 rounded-2xl  px-6 text-base font-medium focus-visible:ring-accent/20 transition-all" placeholder="example.com" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </div>

                {/* Section: Deployment */}
                <div className="space-y-10">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-bold text-text-primary tracking-tight">Deployment</h3>
                        <p className="text-sm text-text-secondary font-medium">Physical location and operational hub metadata.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <FormField control={form.control} name="address.street" render={({ field }) => (
                            <FormItem className="md:col-span-2"><FormLabel className="text-text-secondary text-[12px] font-black uppercase tracking-[0.2em]">Physical Street Address</FormLabel><FormControl><Input className="bg-surface-secondary border-stroke-primary/50 rounded-2xl  px-6 text-base font-medium focus-visible:ring-accent/20 transition-all" placeholder="123 Main St" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="address.city" render={({ field }) => (
                            <FormItem><FormLabel className="text-text-secondary text-[12px] font-black uppercase tracking-[0.2em]">City Hub</FormLabel><FormControl><Input className="bg-surface-secondary border-stroke-primary/50 rounded-2xl  px-6 text-base font-medium focus-visible:ring-accent/20 transition-all" placeholder="Metropolis" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="address.zipcode" render={({ field }) => (
                            <FormItem><FormLabel className="text-text-secondary text-[12px] font-black uppercase tracking-[0.2em]">Area Zip Code</FormLabel><FormControl><Input className="bg-surface-secondary border-stroke-primary/50 rounded-2xl  px-6 text-base font-medium focus-visible:ring-accent/20 transition-all" placeholder="12345" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </div>

                {/* Section: Organization */}
                <div className="space-y-10">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-bold text-text-primary tracking-tight">Organization</h3>
                        <p className="text-sm text-text-secondary font-medium">Corporate association and institutional context.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-10">
                        <FormField control={form.control} name="company.name" render={({ field }) => (
                            <FormItem><FormLabel className="text-text-secondary text-[12px] font-black uppercase tracking-[0.2em]">Authorized Organization Name</FormLabel><FormControl><Input className="bg-surface-secondary border-stroke-primary/50 rounded-2xl  px-6 text-base font-medium focus-visible:ring-accent/20 transition-all" placeholder="Acme Corp" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </div>

                {/* Simplified Submit Area */}
                <div className="pt-12 border-t border-stroke-primary/30 flex justify-end">
                    <Button
                        disabled={isPending}
                        variant="solid"
                        color="accent"
                        className="px-12 rounded-2xl font-bold text-lg shadow-xl shadow-accent/20 hover:shadow-accent/30 transition-all"
                        type="submit"
                    >
                        {buttonText}
                        {isPending && <Loader2 className="animate-spin ml-4" />}
                    </Button>
                </div>
            </form>
        </Form>
    )
}