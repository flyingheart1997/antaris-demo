import React from 'react';
import { Zap, ShieldCheck, Database, CheckCircle2, Share2, Box, Layout, ArrowRight } from 'lucide-react';

const TechStackDocs = () => {
    return (
        <div className="min-h-screen pt-20 bg-[#05070A] text-slate-300 font-sans selection:bg-blue-500/30">
            {/* --- BACKGROUND ENGINE --- */}
            <div className="fixed inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
                <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-blue-500/5 via-transparent to-indigo-500/5" />
            </div>

            <div className="relative max-w-5xl mx-auto px-6 py-20">

                {/* --- MAIN TITLE --- */}
                <header className="mb-32 border-b border-white/5 pb-16">
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6">
                        TECH <span className="text-slate-800">STACK</span>
                    </h1>
                    <p className="text-lg font-mono text-blue-500 uppercase tracking-[0.4em]">Project Infrastructure Overview</p>
                </header>

                <div className="space-y-40">

                    {/* 1. NEXT.JS */}
                    <section id="nextjs">
                        <TechHeader icon={<Layout className="text-blue-500" />} title="01. Next.js" />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h4 className="text-white font-bold text-xl">What is Next.js?</h4>
                                <p className="leading-relaxed">
                                    Next.js is a <span className="text-white">React-based full-stack framework</span> that handles both frontend and backend within a single project. It comes with built-in server rendering, routing, and performance optimization.
                                </p>
                                <h4 className="text-white font-bold text-xl pt-4">Why we are using it?</h4>
                                <ul className="space-y-3 text-sm italic">
                                    <li className="flex gap-2"><span>•</span> High performance & SEO-friendly application requirements.</li>
                                    <li className="flex gap-2"><span>•</span> Managing Server + Client logic in a single codebase.</li>
                                    <li className="flex gap-2"><span>•</span> Fast development with production-ready features.</li>
                                </ul>
                            </div>

                            <div className="bg-white/2 border border-white/5 p-8 rounded-[2rem]">
                                <h4 className="text-xs font-black text-blue-500 uppercase tracking-widest mb-6">Key Features (Latest)</h4>
                                <div className="grid grid-cols-1 gap-4">
                                    <FeatureItem title="Server Components" desc="Default server rendering for reduced JS bundle size." />
                                    <FeatureItem title="App Router" desc="Advanced file-based routing with built-in layouts." />
                                    <FeatureItem title="Server Actions" desc="Direct server function calls without an extra API layer." />
                                    <FeatureItem title="Built-in Optimization" desc="Native Image, Font, and Script optimization." />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 2. ORPC */}
                    <section id="orpc">
                        <TechHeader icon={<Share2 className="text-indigo-400" />} title="02. oRPC" />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
                            <div className="space-y-6">
                                <h4 className="text-white font-bold text-xl">What is oRPC?</h4>
                                <p className="leading-relaxed">
                                    oRPC is a <span className="text-white">type-safe RPC framework</span> that allows direct function calls between frontend and backend—eliminating the complexity of REST or GraphQL.
                                </p>
                                <h4 className="text-white font-bold text-xl pt-4">Why we are using it?</h4>
                                <ul className="space-y-3 text-sm italic">
                                    <li className="flex gap-2"><span>•</span> End-to-end Type Safety.</li>
                                    <li className="flex gap-2"><span>•</span> Automatic synchronization of API contracts.</li>
                                    <li className="flex gap-2"><span>•</span> Less boilerplate and significantly faster development.</li>
                                </ul>
                            </div>
                            <div className="bg-indigo-500/5 border border-indigo-500/10 p-8 rounded-[2rem]">
                                <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-6">Capabilities</h4>
                                <div className="grid grid-cols-1 gap-4">
                                    <FeatureItem title="Auto Inference" desc="Automatic input and output typing." />
                                    <FeatureItem title="Next.js Native" desc="Perfect fit with Server Actions." />
                                    <FeatureItem title="Query Integration" desc="Seamless connection with TanStack Query." />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 3. TANSTACK QUERY */}
                    <section id="tanstack">
                        <TechHeader icon={<Zap className="text-yellow-500" />} title="03. TanStack Query" />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
                            <div className="space-y-6">
                                <h4 className="text-white font-bold text-xl">What is TanStack Query?</h4>
                                <p className="leading-relaxed">
                                    It is a <span className="text-white">data-fetching & caching library</span> that efficiently manages data coming from the server.
                                </p>
                                <h4 className="text-white font-bold text-xl pt-4">Why with oRPC?</h4>
                                <p className="text-sm italic leading-relaxed">
                                    While oRPC fetches the data, TanStack Query <span className="text-white">manages</span> it—handling auto-caching, refetching, and background synchronization to keep the UI fresh.
                                </p>
                            </div>
                            <div className="bg-yellow-500/5 border border-yellow-500/10 p-8 rounded-[2rem]">
                                <h4 className="text-xs font-black text-yellow-500 uppercase tracking-widest mb-6">Management Features</h4>
                                <div className="grid grid-cols-1 gap-4 text-xs space-y-2">
                                    <div className="flex gap-2 items-center"><CheckCircle2 className="w-3 h-3" /> Smart Caching & Refetching</div>
                                    <div className="flex gap-2 items-center"><CheckCircle2 className="w-3 h-3" /> Loading & Error State Handling</div>
                                    <div className="flex gap-2 items-center"><CheckCircle2 className="w-3 h-3" /> Optimistic Updates</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 4. ARCJET */}
                    <section id="arcjet">
                        <TechHeader icon={<ShieldCheck className="text-blue-400" />} title="04. Arcjet" />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
                            <div className="space-y-6">
                                <h4 className="text-white font-bold text-xl">What is Arcjet?</h4>
                                <p className="leading-relaxed">
                                    Arcjet is a <span className="text-white">security & protection layer</span> that safeguards your application against abuse, bots, and unwanted traffic.
                                </p>
                                <h4 className="text-white font-bold text-xl pt-4">Why we are using it?</h4>
                                <ul className="space-y-3 text-sm italic">
                                    <li className="flex gap-2"><span>•</span> To prevent API abuse.</li>
                                    <li className="flex gap-2"><span>•</span> Rate limiting and Bot protection features.</li>
                                    <li className="flex gap-2"><span>•</span> Production-grade security without extra infrastructure.</li>
                                </ul>
                            </div>
                            <div className="bg-blue-400/5 border border-blue-400/10 p-8 rounded-[2rem]">
                                <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-6">Security Layers</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-[10px] text-center">Rate Limiting</div>
                                    <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-[10px] text-center">Bot Detection</div>
                                    <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-[10px] text-center">Request Shield</div>
                                    <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-[10px] text-center">Next.js Native</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 5. ZOD */}
                    <section id="zod">
                        <TechHeader icon={<Database className="text-slate-400" />} title="05. Zod" />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
                            <div className="space-y-6">
                                <h4 className="text-white font-bold text-xl">What is Zod?</h4>
                                <p className="leading-relaxed">
                                    Zod is a <span className="text-white">TypeScript-first schema validation library</span> that provides runtime validation along with type safety.
                                </p>
                                <h4 className="text-white font-bold text-xl pt-4">Why we are using it?</h4>
                                <ul className="space-y-3 text-sm italic">
                                    <li className="flex gap-2"><span>•</span> Validating user input effectively.</li>
                                    <li className="flex gap-2"><span>•</span> Maintaining the same schema on both Backend and Frontend.</li>
                                    <li className="flex gap-2"><span>•</span> Catching errors at the earliest possible stage.</li>
                                </ul>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem]">
                                <div className="space-y-4">
                                    <p className="text-xs font-bold text-white uppercase tracking-tighter">Core Specs</p>
                                    <p className="text-xs text-slate-500 underline underline-offset-4 decoration-blue-500">Schema-based validation</p>
                                    <p className="text-xs text-slate-500 underline underline-offset-4 decoration-blue-500">Type inference</p>
                                    <p className="text-xs text-slate-500 underline underline-offset-4 decoration-blue-500">Readable error messages</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 6. ZUSTAND */}
                    <section id="zustand">
                        <TechHeader icon={<Box className="text-purple-500" />} title="06. Zustand" />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
                            <div className="space-y-6">
                                <h4 className="text-white font-bold text-xl">What is Zustand?</h4>
                                <p className="leading-relaxed">
                                    Zustand is a <span className="text-white">lightweight client-side state management library</span>.
                                </p>
                                <h4 className="text-white font-bold text-xl pt-4">Why we are using it?</h4>
                                <p className="text-sm italic leading-relaxed">
                                    We don't need heavy Redux for global state. Zustand is perfect for handling simple client-side interactions.
                                </p>
                                <div className="p-4 bg-purple-500/5 border-l-2 border-purple-500 text-xs text-slate-400">
                                    <strong>Note:</strong> Used only for client-side UI states (Modals, flags, temporary states).
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <ZustandItem label="Modal Control" />
                                <ZustandItem label="Local UI States" />
                                <ZustandItem label="Client Actions" />
                                <ZustandItem label="High Performance" />
                            </div>
                        </div>
                    </section>

                    {/* --- SUMMARY --- */}
                    <section className="pt-20 border-t border-white/5">
                        <div className="bg-linear-to-tr from-blue-600/20 to-indigo-600/20 p-12 rounded-[3rem] border border-white/10 text-center">
                            <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter">Final Summary</h2>
                            <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-slate-400">
                                <span>PERFORMANCE OPTIMIZED</span>
                                <span>TYPE-SAFE</span>
                                <span>SECURE</span>
                                <span>SCALABLE</span>
                            </div>
                            <p className="mt-8 text-slate-400 italic">"Developer experience + Production stability balanced perfectly."</p>
                        </div>
                    </section>

                </div>

                <footer className="mt-40 text-center text-[10px] font-mono tracking-[0.6em] text-slate-700 uppercase">
                    Build 2026 // System Blueprint
                </footer>
            </div>
        </div>
    );
};

// --- Sub Components ---
const TechHeader = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
    <div className="flex items-center gap-6">
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">{icon}</div>
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">{title}</h2>
    </div>
);

const FeatureItem = ({ title, desc }: { title: string, desc: string }) => (
    <div className="group cursor-default">
        <p className="text-xs font-bold text-white mb-1 flex items-center gap-2">
            <ArrowRight className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-all" /> {title}
        </p>
        <p className="text-[11px] text-slate-500">{desc}</p>
    </div>
);

const ZustandItem = ({ label }: { label: string }) => (
    <div className="p-4 bg-white/2 border border-white/5 rounded-2xl flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">
        {label}
    </div>
);

export default TechStackDocs;