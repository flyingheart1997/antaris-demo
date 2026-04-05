'use client'

import Link from 'next/link'
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring' as const,
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export default function HeroSection() {
    return (
        <main className="overflow-hidden bg-surface-bg select-none">
            {/* Background elements with tokens */}
            <div
                aria-hidden
                className="absolute inset-0 isolate hidden opacity-85 contain-strict lg:block">
                <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(circle_at_center,var(--color-surface-brand),transparent_70%)] opacity-5 blur-3xl" />
            </div>

            <section>
                <div className="relative pt-24 md:pt-36">
                    <AnimatedGroup
                        variants={{
                            container: {
                                visible: {
                                    transition: {
                                        delayChildren: 0.5,
                                    },
                                },
                            },
                        }}
                        className="mask-b-from-35% mask-b-to-90% absolute inset-0 top-56 -z-20 lg:top-32">
                        <Image
                            src="/night-background.webp"
                            alt="background"
                            className="hidden size-full dark:block object-cover opacity-40 grayscale"
                            width="3276"
                            height="4095"
                        />
                    </AnimatedGroup>

                    <div
                        aria-hidden
                        className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-surface-bg)_75%)]"
                    />

                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                            <AnimatedGroup variants={transitionVariants}>
                                <Link
                                    href="/users"
                                    className="hover:bg-surface-secondary bg-surface-bg group mx-auto flex w-fit items-center gap-4 rounded-full border border-stroke-primary p-1 pl-4 shadow-xl shadow-surface-brand/5 transition-all duration-300">
                                    <Sparkles className="size-4 text-surface-brand" />
                                    <span className="text-text-secondary text-sm font-body">Introducing Support for AI Models</span>
                                    <span className="block h-4 w-px bg-stroke-primary"></span>

                                    <div className="bg-surface-brand size-6 overflow-hidden rounded-full duration-500">
                                        <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                            <span className="flex size-6">
                                                <ArrowRight className="m-auto size-3 text-black" />
                                            </span>
                                            <span className="flex size-6">
                                                <ArrowRight className="m-auto size-3 text-black" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </AnimatedGroup>

                            <TextEffect
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                as="h1"
                                className="mx-auto mt-8 max-w-4xl text-balance text-5xl font-heading font-bold text-text-primary md:text-7xl lg:mt-16 xl:text-[5rem] tracking-tight">
                                Modern Solutions for Customer Engagement
                            </TextEffect>
                            <TextEffect
                                per="line"
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                delay={0.3}
                                as="p"
                                className="mx-auto mt-8 max-w-2xl text-balance text-lg font-body text-text-secondary leading-relaxed">
                                Highly customizable components for building modern websites and applications that look and feel the way you mean it.
                            </TextEffect>

                            <AnimatedGroup
                                variants={{
                                    container: {
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05,
                                                delayChildren: 0.5,
                                            },
                                        },
                                    },
                                    ...transitionVariants,
                                }}
                                className="mt-12 flex flex-col items-center justify-center gap-6 md:flex-row">
                                <Button
                                    asChild
                                    size="lg"
                                    className="rounded-md px-10 py-4 text-base font-medium shadow-2xl shadow-surface-brand/30 hover:scale-105 active:scale-95 transition-all duration-300">
                                    <Link href="/users">
                                        <span className="text-nowrap">Get Started</span>
                                    </Link>
                                </Button>
                                <Link
                                    href="/docs/tech-stacks"
                                    className="text-text-secondary hover:text-text-primary flex items-center gap-2 text-sm font-medium transition-colors">
                                    <span>Learn more</span>
                                    <ChevronRight className="size-4" />
                                </Link>
                            </AnimatedGroup>
                        </div>
                    </div>

                    <AnimatedGroup
                        variants={{
                            container: {
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1,
                                        delayChildren: 0.4,
                                    },
                                },
                            },
                        }}>
                        <div className="mask-b-from-55% relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20 flex justify-center">
                            <div className="ring-stroke-primary bg-surface-secondary relative mx-auto max-w-6xl overflow-hidden rounded-md border border-stroke-primary p-4 shadow-2xl shadow-surface-brand/10 ring-1">
                                <Image
                                    className="aspect-15/8 relative rounded-md border border-stroke-primary/50"
                                    src="/mail2.webp"
                                    alt="app screen"
                                    width="2700"
                                    height="1440"
                                />
                            </div>
                        </div>
                    </AnimatedGroup>
                </div>
            </section>
        </main>
    )
}
