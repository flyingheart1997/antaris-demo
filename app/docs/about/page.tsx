import {
    Database,
    LayoutPanelLeft,
    Shield, Lock, Bot, Cpu, AlertTriangle,
} from 'lucide-react';

const FullSystemDocs = () => {
    return (
        <div className="min-h-screen pt-20 bg-[#030712] text-slate-300 font-sans selection:bg-indigo-500/30">
            {/* Background Lighting */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-blue-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative max-w-5xl mx-auto px-6 py-20">

                {/* --- MAIN HEADER --- */}
                <header className="mb-24 border-b border-slate-800 pb-12">
                    <div className="flex items-center gap-3 mb-6 text-indigo-400 font-mono text-sm tracking-widest uppercase">
                        <Cpu className="w-5 h-5" />
                        <span>Infrastructure Design v2.0</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">
                        oRPC + TanStack <br />
                        <span className="text-slate-600">&</span> Arcjet Security
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
                        A comprehensive guide to building mission-critical UIs (Antaris-style) using type-safe API layers,
                        server-state synchronization, and programmable security.
                    </p>
                </header>

                <div className="space-y-32">
                    <section id="data-layer">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
                                <Database className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white tracking-tight uppercase">I. The Data OS Layer</h2>
                                <p className="text-slate-500 text-sm">Managing state and API communication</p>
                            </div>
                        </div>

                        <div className="space-y-24 ml-4 border-l border-slate-800 pl-10">

                            {/* 1. WHY ORPC + TANSTACK */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-6">01. Why oRPC + TanStack Query?</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
                                        <p className="text-indigo-400 font-bold mb-2">oRPC (The API)</p>
                                        <ul className="text-sm space-y-2 text-slate-400">
                                            <li>• Full TypeScript inference (End-to-End)</li>
                                            <li>• Zod validation on inputs/outputs</li>
                                            <li>• Auto-generated React Query hooks</li>
                                        </ul>
                                    </div>
                                    <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
                                        <p className="text-blue-400 font-bold mb-2">TanStack (The Brain)</p>
                                        <ul className="text-sm space-y-2 text-slate-400">
                                            <li>• Sophisticated caching and hydration</li>
                                            <li>• Background revalidation</li>
                                            <li>• Mutation tracking and auto-refetching</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* 2. DATA FLOW */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-6">02. The Hydration Data Flow</h3>
                                <div className="flex flex-col gap-3 font-mono text-sm max-w-md">
                                    <div className="bg-slate-900 p-4 border border-slate-800 rounded-lg">Backend (oRPC Route)</div>
                                    <div className="text-center text-slate-600">↓</div>
                                    <div className="bg-indigo-500/10 p-4 border border-indigo-500/20 rounded-lg text-indigo-300">Server Component (Prefetching)</div>
                                    <div className="text-center text-slate-600">↓</div>
                                    <div className="bg-slate-900 p-4 border border-slate-800 rounded-lg">HydrationBoundary (Dehydrated State)</div>
                                    <div className="text-center text-slate-600">↓</div>
                                    <div className="bg-slate-900 p-4 border border-slate-800 rounded-lg text-green-400">Client Component (useQuery)</div>
                                </div>
                                <p className="mt-6 text-sm text-slate-500 italic">No double fetching. No loading flickers. Data is ready before the JS bundles hit the browser.</p>
                            </div>

                            {/* 3, 4, 5. CODE EXAMPLES */}
                            <div className="space-y-8">
                                <h3 className="text-xl font-bold text-white mb-6">03-05. Implementation Example</h3>

                                {/* 3. Backend */}
                                <div className="space-y-3">
                                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">03. oRPC Route (Backend)</span>
                                    <pre className="bg-black p-6 rounded-xl border border-slate-800 text-indigo-300 text-sm overflow-x-auto leading-relaxed">
                                        {`export const listUsers = base.route({
                                            method: "GET", path: "/users"
                                            })
                                            .input(z.void())
                                            .output(z.object({ success: z.boolean(), data: z.array(userSchema) }))
                                            .handler(async () => {
                                            const users = await db.users.find()
                                            return { success: true, data: users }
                                            })
                                        `}
                                    </pre>
                                </div>

                                {/* 4. Server Component */}
                                <div className="space-y-3">
                                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">04. Server Component (Prefetch)</span>
                                    <pre className="bg-black p-6 rounded-xl border border-slate-800 text-indigo-300 text-sm overflow-x-auto">
                                        {`const queryClient = getQueryClient()
                                            await queryClient.prefetchQuery(orpc.user.list.queryOptions())

                                            return (
                                            <HydrationBoundary state={dehydrate(queryClient)}>
                                                <UsersClient />
                                            </HydrationBoundary>
                                            )
                                        `}
                                    </pre>
                                </div>

                                {/* 5. Client Component */}
                                <div className="space-y-3">
                                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">05. Client Component (Read)</span>
                                    <pre className="bg-black p-6 rounded-xl border border-slate-800 text-indigo-300 text-sm overflow-x-auto">
                                        {`const { data } = useQuery(orpc.user.list.queryOptions())
                                        // data.data is instantly available from server cache`}
                                    </pre>
                                </div>
                            </div>

                            {/* 6, 7, 8. STALE TIME & REFRESH */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-6">06-08. Data Freshness & Revalidation</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <p className="text-sm text-slate-400"><strong className="text-white">Stale Time:</strong> Defines when data is "old". If set to 10s, TanStack won't refetch for 10 seconds.</p>
                                        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono">
                                            staleTime: 10_000
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-sm text-slate-400"><strong className="text-white">Live Mode:</strong> Constant polling for Telemetry or Orbits.</p>
                                        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-xs font-mono">
                                            refetchInterval: 3000, <br />
                                            refetchOnWindowFocus: true
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 9 & 10. MUTATIONS */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-6">09-10. Mutations & Multiple Invalidation</h3>
                                <p className="text-sm text-slate-400 mb-6">When data changes, we manually "bust" the cache for all affected lists or details.</p>
                                <pre className="bg-black p-6 rounded-xl border border-slate-800 text-indigo-300 text-sm">
                                    {`const createUser = useMutation({
                                        ...orpc.user.create.mutationOptions(),
                                        onSuccess: () => {
                                            // Invalidate main list
                                            queryClient.invalidateQueries({ queryKey: orpc.user.list.queryKey() })
                                            // Invalidate specific detail cache
                                            queryClient.invalidateQueries({ queryKey: orpc.user.details.queryKey({ input: { id } }) })
                                        }
                                        })
                                    `}
                                </pre>
                            </div>

                            {/* 11 & 12. ERROR HANDLING & RETRY */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-6">11-12. Resilience (Error & Retry)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-6 bg-red-900/10 border border-red-900/20 rounded-xl">
                                        <h4 className="text-red-400 font-bold mb-2">Error Handling</h4>
                                        <p className="text-sm text-slate-400 mb-4">oRPC returns safe strings for UI:</p>
                                        <code className="text-xs text-red-200">toast.error(error.message)</code>
                                    </div>
                                    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
                                        <h4 className="text-white font-bold mb-2">Retry Logic</h4>
                                        <p className="text-sm text-slate-400 mb-4">Crucial for satellite/cloud APIs:</p>
                                        <code className="text-xs text-indigo-400 italic">retry: true (3 attempts default)</code>
                                    </div>
                                </div>
                            </div>

                            {/* 13 & 14. DEPENDENT & PAGINATION */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-4">13. Dependent Queries</h3>
                                    <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 text-xs text-indigo-300">
                                        {`enabled: !!userId // Only runs when ID exists`}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-4">14. Pagination</h3>
                                    <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 text-xs text-indigo-300">
                                        {`queryKey: ["users", page] // Unique cache per page`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="security-layer">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                                <Shield className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white tracking-tight uppercase">II. Programmable Security</h2>
                                <p className="text-slate-500 text-sm">Arcjet WAF & Bot Protection</p>
                            </div>
                        </div>

                        <div className="space-y-24 ml-4 border-l border-slate-800 pl-10">

                            {/* 1. WHAT IS ARCJET */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-6">01. What is Arcjet?</h3>
                                <p className="text-slate-400 max-w-2xl leading-relaxed">
                                    Arcjet is a programmable security layer that sits **inside** your app logic rather than being an external proxy. It gives you
                                    granular control over who accesses your API based on IP, Behavior, and Bot fingerprints.
                                </p>
                            </div>

                            {/* 2. HOW IT WORKS */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-6">02. How Arcjet Works</h3>
                                <div className="bg-slate-900/40 p-6 border-l-2 border-blue-600 font-mono text-sm flex flex-col gap-3">
                                    <div className="text-slate-200">Incoming Request (Next.js/oRPC)</div>
                                    <div className="text-slate-500 px-4">↓ Arcjet Protection Rules (Shield, Bot, Rate Limit)</div>
                                    <div className="text-slate-200 font-bold bg-blue-500/10 w-fit px-2">Decision (Allow / Deny / Log)</div>
                                    <div className="text-slate-500 px-4">↓ Handler Execution (Only if Allowed)</div>
                                </div>
                            </div>

                            {/* 3 & 4. SHIELD & BOT */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h4 className="text-white font-bold flex items-center gap-2"><Lock className="w-4 h-4 text-blue-400" /> 03. Shield (WAF)</h4>
                                    <pre className="bg-black p-4 rounded-lg text-blue-300 text-xs border border-slate-800">
                                        {`shield({ mode: "LIVE" })`}
                                    </pre>
                                    <p className="text-xs text-slate-500">Stops SQL injection, XSS, and Path Traversal.</p>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-white font-bold flex items-center gap-2"><Bot className="w-4 h-4 text-blue-400" /> 04. Bot Detection</h4>
                                    <pre className="bg-black p-4 rounded-lg text-blue-300 text-xs border border-slate-800">
                                        {`detectBot({
                                            mode: "LIVE",
                                            allow: ["CATEGORY:SEARCH_ENGINE"]
                                            })
                                        `}
                                    </pre>
                                    <p className="text-xs text-slate-500">Blocks AI scrapers while allowing Google/Bing.</p>
                                </div>
                            </div>

                            {/* 5. WHY BOT BLOCKING MATTERS */}
                            <div className="bg-blue-500/5 border border-blue-500/20 p-8 rounded-2xl">
                                <h3 className="text-white font-bold mb-4">05. Why Bot Blocking Matters</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-slate-400">
                                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Stops Data Scraping</div>
                                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Prevents AI Model Training</div>
                                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Blocks API Abuse</div>
                                </div>
                            </div>

                            {/* 8. MIDDLEWARE INTEGRATION (DETAILED) */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-6">08. oRPC Middleware Integration</h3>
                                <p className="text-sm text-slate-400 mb-6 italic">This is how you secure entire route procedures automatically.</p>
                                <pre className="bg-black p-6 rounded-xl border border-slate-800 text-blue-300 text-sm leading-relaxed overflow-x-auto">
                                    {`const protectedProcedure = base
                                        .$context<{ request: Request }>()
                                        .middleware(async ({ context, next, errors }) => {
                                        
                                        const decision = await aj.protect(context.request)

                                        if (decision.isDenied()) {
                                            throw errors.FORBIDDEN({ message: "Security Block: " + decision.reason })
                                        }

                                        return next()
                                        })
                                    `}
                                </pre>
                            </div>

                            {/* 11. USER LEVEL PROTECTION */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-6">11. User-Level Protection</h3>
                                <p className="text-sm text-slate-400 mb-6">You can pass user context to Arcjet for per-account throttling.</p>
                                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 text-xs text-blue-300 font-mono">
                                    {`aj.protect(request, { userId: "user_123" })`}
                                </div>
                            </div>

                            {/* 13 & 14. COMPARISONS */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800">
                                    <h4 className="text-white font-bold mb-2 text-sm">13. Why not just Cloudflare?</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">Cloudflare is a blind proxy. Arcjet lives in your code; it knows your routes, your specific users, and your active sessions.</p>
                                </div>
                                <div className="p-6 bg-orange-950/20 rounded-xl border border-orange-500/20">
                                    <h4 className="text-orange-400 font-bold mb-2 text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> 14. Fail-Safe Design</h4>
                                    <p className="text-xs text-slate-400 leading-relaxed italic underline">If Arcjet fails, the request is blocked. Security is prioritized over availability in mission-critical systems.</p>
                                </div>
                            </div>

                        </div>
                    </section>

                    <section id="unified-strategy">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20 text-green-400">
                                <LayoutPanelLeft className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white tracking-tight uppercase">III. Enterprise Architecture</h2>
                            </div>
                        </div>

                        <div className="ml-4 border-l border-slate-800 pl-10 space-y-20">
                            {/* 15 & 16. ANTARIS SCALE */}
                            <div className="bg-linear-to-br from-indigo-900/10 to-transparent p-10 rounded-3xl border border-indigo-500/10">
                                <h3 className="text-xl font-bold text-white mb-6 italic tracking-tight">How it powers Antaris Systems</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                    {['Presim', 'Telemetry', 'HWIL', 'Orbit Insights'].map(item => (
                                        <div key={item} className="p-4 bg-black/40 rounded-xl border border-slate-800 text-xs font-bold uppercase tracking-widest text-slate-400">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-8 text-sm text-slate-400 text-center max-w-2xl mx-auto leading-relaxed">
                                    Every critical satellite endpoint is protected by **Arcjet** before execution and synchronized via the **TanStack Query** OS for a zero-flicker UI.
                                </p>
                            </div>

                            {/* 17. CONSOLIDATED MENTAL MODEL */}
                            <div className="text-center pt-10">
                                <h2 className="text-4xl font-extrabold text-white mb-10 underline underline-offset-12 decoration-indigo-500">
                                    The Final Mental Model
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-4xl mx-auto font-mono">
                                    <div className="space-y-2">
                                        <p className="text-blue-400 font-bold text-xl uppercase tracking-tighter">Arcjet</p>
                                        <p className="text-xs text-slate-500">The Internal Firewall</p>
                                    </div>
                                    <div className="text-slate-700 text-3xl hidden md:block">+</div>
                                    <div className="space-y-2">
                                        <p className="text-indigo-400 font-bold text-xl uppercase tracking-tighter">oRPC</p>
                                        <p className="text-xs text-slate-500">The API Plumbing</p>
                                    </div>
                                    <div className="text-slate-700 text-3xl hidden md:block">+</div>
                                    <div className="space-y-2">
                                        <p className="text-purple-400 font-bold text-xl uppercase tracking-tighter">TanStack</p>
                                        <p className="text-xs text-slate-500">The Data OS</p>
                                    </div>
                                </div>
                                <div className="mt-16 inline-block px-10 py-5 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl">
                                    <p className="text-white font-bold italic">“You don’t fetch data; you subscribe to a secure, hydrated stream.”</p>
                                </div>
                            </div>

                        </div>
                    </section>

                    <footer className="text-center text-slate-600 font-mono text-xs pt-20 uppercase tracking-[0.4em] pb-20">
                        System Design Specification — Confidential Production Release
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default FullSystemDocs;