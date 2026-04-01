import React from 'react';
import { Database, RefreshCw, Zap, Server, Monitor, AlertCircle, TrendingUp, Layers, MousePointer2, LayoutPanelLeft } from 'lucide-react';

const ORPCDocumentation = () => {
    return (
        <div className="min-h-screen bg-[#020617] pt-20 text-slate-300 font-sans selection:bg-indigo-500/30">
            {/* Subtle Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative max-w-4xl mx-auto px-6 py-20">
                {/* Header Section */}
                <header className="mb-20 border-b border-slate-800 pb-12">
                    <div className="flex items-center gap-3 mb-6 text-indigo-400 font-mono text-sm tracking-widest uppercase">
                        <Database className="w-5 h-5" />
                        <span>State Management Architecture</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                        oRPC + TanStack <br />
                        <span className="text-slate-500">Query v5 Guide</span>
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                        The modern stack for Antaris-style systems. Powering live dashboards, telemetry, and mission-critical UIs with typed APIs and robust caching.
                    </p>
                </header>

                {/* Document Body */}
                <div className="space-y-28">

                    {/* 1. WHY ORPC + TANSTACK QUERY? */}
                    <section>
                        <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-6">
                            <span className="text-indigo-500 font-mono text-sm">01.</span> THE SYNERGY
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                                <h3 className="text-indigo-400 font-bold mb-2 flex items-center gap-2"><Zap className="w-4 h-4" /> oRPC</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">Type-safe backend, Zod validation, and auto-typed frontend hooks.</p>
                            </div>
                            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                                <h3 className="text-purple-400 font-bold mb-2 flex items-center gap-2"><RefreshCw className="w-4 h-4" /> TanStack</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">Server-state cache, mutation tracking, and background synchronization.</p>
                            </div>
                        </div>
                        <div className="bg-indigo-500/10 border-l-4 border-indigo-500 p-4 rounded-r-xl">
                            <span className="text-indigo-300 font-bold">KEY INSIGHT:</span> <span className="text-slate-300">oRPC handles the communication; TanStack Query is the "Brain" that keeps the UI in sync.</span>
                        </div>
                    </section>

                    {/* 2. HOW DATA FLOWS */}
                    <section>
                        <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-6">
                            <span className="text-indigo-500 font-mono text-sm">02.</span> HOW DATA FLOWS
                        </h2>
                        <div className="flex flex-col gap-4 font-mono text-sm">
                            <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-lg border border-slate-800">
                                <Server className="w-4 h-4 text-slate-500" /> <span>Backend (oRPC)</span>
                            </div>
                            <div className="ml-8 border-l-2 border-slate-800 pl-8 py-2 space-y-4">
                                <div className="text-slate-500">↓ Server Component (Prefetch)</div>
                                <div className="text-slate-500">↓ HydrationBoundary</div>
                                <div className="text-slate-500">↓ Client Component (useQuery)</div>
                            </div>
                            <div className="flex items-center gap-4 bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20 text-indigo-300">
                                <Monitor className="w-4 h-4" /> <span>Auto cache, refetch, revalidate</span>
                            </div>
                        </div>
                    </section>

                    {/* 3, 4, 5. CODE IMPLEMENTATION */}
                    <section className="space-y-12">
                        <div>
                            <h2 className="text-xl font-bold text-white mb-4">03. oRPC ROUTE (Backend)</h2>
                            <pre className="bg-black p-6 rounded-xl border border-slate-800 text-blue-300 text-sm overflow-x-auto leading-relaxed">
                                {`.input(z.void())
                                    .output(z.object({ success: z.boolean(), data: z.array(userSchema) }))
                                    .handler(async () => {
                                    const users = await db.users.find()
                                    return { success: true, data: users }
                                    })
                                `}
                            </pre>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-white mb-4">04. SERVER COMPONENT (Prefetch)</h2>
                            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl font-mono text-xs space-y-2">
                                <div className="text-indigo-400">await queryClient.prefetchQuery(orpc.user.list.queryOptions())</div>
                                <div className="text-slate-500 italic">// Data is fetched on server, sent to browser, cached before render.</div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-white mb-4">05. CLIENT COMPONENT (Read)</h2>
                            <p className="text-slate-400 mb-4">Instant render. No loading flicker because the data is hydrated from the server.</p>
                            <code className="text-indigo-300 font-bold bg-indigo-500/5 px-2 py-1 rounded">const {"{ data }"} = useQuery(orpc.user.list.queryOptions())</code>
                        </div>
                    </section>

                    {/* 6, 7, 8. REFRESH LOGIC */}
                    <section>
                        <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-8">
                            <span className="text-indigo-500 font-mono text-sm">06-08.</span> FRESHNESS & LIVE DATA
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="font-bold text-slate-200 uppercase text-xs tracking-widest">Stale Time Logic</h3>
                                <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-sm leading-relaxed">
                                    <span className="text-indigo-400 font-bold block mb-1">staleTime: 10_000</span>
                                    Data is fresh for 10s. No refetch during this window.
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-bold text-slate-200 uppercase text-xs tracking-widest">Live Mode (Telemetry)</h3>
                                <div className="p-4 bg-indigo-900/10 border border-indigo-500/20 rounded-lg text-sm leading-relaxed italic">
                                    refetchInterval: 3000, <br />
                                    refetchOnWindowFocus: true
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 p-6 bg-slate-900/30 rounded-xl border border-slate-800">
                            <h3 className="text-white font-bold mb-2 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /> Background Revalidation</h3>
                            <p className="text-sm text-slate-400">Shows cached data <strong>instantly</strong> while fetching new data in the background. UI updates seamlessly.</p>
                        </div>
                    </section>

                    {/* 9 & 10. MUTATIONS */}
                    <section>
                        <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-6">
                            <span className="text-indigo-500 font-mono text-sm">09.</span> MUTATIONS & INVALIDATION
                        </h2>
                        <div className="bg-[#0f172a] rounded-xl overflow-hidden border border-slate-800">
                            <div className="bg-slate-800/50 px-4 py-2 text-xs font-mono text-slate-400 border-b border-slate-800">Mutation Pattern</div>
                            <pre className="p-6 text-sm text-indigo-300 leading-relaxed overflow-x-auto">
                                {`onSuccess: () => {
                                    queryClient.invalidateQueries({
                                        queryKey: orpc.user.list.queryKey()
                                    })
                                    }
                                `}
                            </pre>
                        </div>
                        <p className="mt-4 text-sm text-slate-500">Points 09-10: Invalidation ensures the UI reflects changes (Create/Update/Delete) by marking the cache as "outdated".</p>
                    </section>

                    {/* 11 & 12. ERROR & RETRY */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-xl font-bold text-white mb-4">11. ERROR HANDLING</h2>
                            <p className="text-sm text-slate-400 mb-4">oRPC provides safe error messages (FORBIDDEN, NOT_FOUND) ready for UI toasts.</p>
                            <div className="flex items-center gap-2 text-red-400 bg-red-400/5 border border-red-400/10 p-3 rounded-lg text-xs font-mono">
                                <AlertCircle className="w-4 h-4" /> toast.error(error.message)
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white mb-4">12. RETRY STRATEGY</h2>
                            <p className="text-sm text-slate-400">Auto-retries on network failures. Critical for high-latency environments like Satellites or Cloud APIs.</p>
                            <div className="mt-2 text-xs font-mono text-indigo-400">retry: true</div>
                        </div>
                    </section>

                    {/* 13 & 14. QUERY LOGIC */}
                    <section className="space-y-8">
                        <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10"><MousePointer2 className="w-12 h-12" /></div>
                            <h2 className="text-white font-bold mb-4">13. DEPENDENT QUERIES</h2>
                            <p className="text-sm text-slate-400">Use <code className="text-indigo-400 font-bold">enabled: !!userId</code> to prevent queries from running until required data is ready.</p>
                        </div>
                        <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-2xl">
                            <h2 className="text-white font-bold mb-4">14. PAGINATION</h2>
                            <p className="text-sm text-slate-400">By including the <code className="text-indigo-400 font-bold">page</code> variable in the queryKey, TanStack Query caches each page individually.</p>
                        </div>
                    </section>

                    {/* 15 & 16. ENTERPRISE SCALE */}
                    <section>
                        <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-6">
                            <span className="text-indigo-500 font-mono text-sm">15.</span> ENTERPRISE SCALE
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {['Perfect SSR', 'No Duplicate Calls', 'Infinite Caching', 'Real-time Dashboards', 'Auto-Refetch', 'WebSocket Ready'].map((feature) => (
                                <div key={feature} className="px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold text-slate-400 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> {feature}
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 p-8 bg-linear-to-br from-indigo-900/20 to-transparent border border-indigo-500/20 rounded-2xl">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2"><LayoutPanelLeft className="w-5 h-5 text-indigo-400" /> 16. ANTARIS UI POWER</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Schedule, Presim, HWIL, and Telemetry all share the **same query engine**, **same cache**, and **same invalidation logic**, ensuring 100% data consistency across the mission UI.
                            </p>
                        </div>
                    </section>

                    {/* 17. MENTAL MODEL */}
                    <section className="pt-16 border-t border-slate-800 text-center">
                        <h2 className="text-3xl font-extrabold text-white mb-6 italic tracking-tight underline decoration-indigo-500 underline-offset-8">
                            17. MENTAL MODEL
                        </h2>
                        <div className="max-w-md mx-auto space-y-4">
                            <p className="text-lg font-mono text-indigo-400">oRPC = API</p>
                            <p className="text-lg font-mono text-purple-400">TanStack Query = Data OS</p>
                            <div className="pt-4 px-6 py-3 bg-slate-900 rounded-full border border-slate-800 inline-block text-sm font-bold text-white uppercase tracking-widest">
                                You don't “fetch” — You “subscribe”
                            </div>
                        </div>
                    </section>

                    <footer className="text-center text-slate-600 font-mono text-xs pt-20 uppercase tracking-[0.2em]">
                        End of Systems Documentation — Internal Production Build
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default ORPCDocumentation;