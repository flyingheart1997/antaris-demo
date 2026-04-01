import { Shield } from 'lucide-react';

const DocumentationPage = () => {
  return (
    <div className="min-h-screen pt-20 bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/30">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-20">
        {/* Header Section */}
        <header className="mb-20 border-b border-slate-800 pb-12">
          <div className="flex items-center gap-3 mb-6 text-blue-400 font-mono text-sm tracking-widest uppercase">
            <Shield className="w-5 h-5" />
            <span>Security Engineering</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Arcjet + oRPC <br />
            <span className="text-slate-500">Production Guide</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
            This document explains how modern SaaS and mission-critical systems use Arcjet,
            Next.js App Router, and oRPC to secure APIs, Dashboards, and Telemetry.
          </p>
        </header>

        {/* Document Body */}
        <div className="space-y-24"> {/* Large gap between points */}

          {/* 1. WHAT IS ARCJET? */}
          <section className="scroll-mt-10">
            <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-6">
              <span className="text-blue-500 font-mono text-sm">01.</span> WHAT IS ARCJET?
            </h2>
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
              <p className="mb-4">Arcjet is a programmable security layer that sits in front of your app. It protects against:</p>
              <ul className="grid grid-cols-2 gap-3 text-sm text-slate-400">
                <li className="flex items-center gap-2"> <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Bots</li>
                <li className="flex items-center gap-2"> <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> SQL injection</li>
                <li className="flex items-center gap-2"> <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Abuse & scraping</li>
                <li className="flex items-center gap-2"> <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> AI crawlers</li>
              </ul>
              <p className="mt-6 italic text-slate-500">Cloudflare + WAF + Bot detection but controlled from your code.</p>
            </div>
          </section>

          {/* 2. HOW ARCJET WORKS */}
          <section>
            <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-6">
              <span className="text-blue-500 font-mono text-sm">02.</span> HOW ARCJET WORKS
            </h2>
            <div className="bg-slate-900/40 p-6 border-l-2 border-blue-600 font-mono text-sm flex flex-col gap-3">
              <div className="text-slate-200">Incoming Request</div>
              <div className="text-slate-500 px-4">↓ Arcjet rules (Shield, Bot, Rate Limit)</div>
              <div className="text-slate-200 underline decoration-blue-500/50 underline-offset-4 font-bold">Decision (Allow / Deny / Log)</div>
              <div className="text-slate-500 px-4">↓ Next.js / ORPC Handler</div>
            </div>
          </section>

          {/* 3. SHIELD (WAF) */}
          <section>
            <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-4">
              <span className="text-blue-500 font-mono text-sm">03.</span> SHIELD (WAF)
            </h2>
            <code className="block bg-black p-4 rounded-lg text-green-400 mb-6 font-mono text-sm border border-slate-800">
              shield({`{ mode: "LIVE" }`})
            </code>
            <p className="text-slate-400 mb-4">Protects against SQL injection, XSS, and Path traversal.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-slate-800 bg-slate-900/20">
                <span className="text-white font-bold block mb-1">DRY_RUN</span>
                <span className="text-sm text-slate-400">Detect only (log) for testing.</span>
              </div>
              <div className="p-4 rounded-lg border border-blue-900/30 bg-blue-900/10">
                <span className="text-blue-400 font-bold block mb-1">LIVE</span>
                <span className="text-sm text-slate-400">Block in production environments.</span>
              </div>
            </div>
          </section>

          {/* 4. BOT DETECTION */}
          <section>
            <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-6">
              <span className="text-blue-500 font-mono text-sm">04.</span> BOT DETECTION
            </h2>
            <div className="bg-[#0f172a] rounded-xl overflow-hidden border border-slate-800">
              <div className="bg-slate-800/50 px-4 py-2 text-xs font-mono text-slate-400 border-b border-slate-800">bot-config.ts</div>
              <pre className="p-6 text-sm text-blue-300 leading-relaxed overflow-x-auto">
                {`detectBot({
                    mode: "LIVE",
                    allow: [
                      "CATEGORY:SEARCH_ENGINE",
                      "CATEGORY:MONITOR",
                      "CATEGORY:PREVIEW"
                    ]
                  })
                `}
              </pre>
            </div>
          </section>

          {/* 5. WHY BOT BLOCKING MATTERS */}
          <section>
            <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-6">
              <span className="text-blue-500 font-mono text-sm">05.</span> WHY BOT BLOCKING MATTERS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Data Scraping', 'AI Model Training', 'API Abuse'].map((text) => (
                <div key={text} className="p-4 bg-red-900/10 border border-red-900/20 rounded-lg text-center">
                  <span className="text-xs text-red-400 font-bold uppercase tracking-tighter">Stops</span>
                  <div className="text-white font-medium">{text}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 6 & 7. LIVE VS DRY_RUN / ARCJET IN NEXT.JS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <h2 className="text-lg font-bold text-white mb-4">06. LIVE vs DRY_RUN</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                <strong className="text-blue-400">DRY_RUN:</strong> Logs what WOULD be blocked with no user impact.<br /><br />
                <strong className="text-red-400">LIVE:</strong> Enforced security for production.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-white mb-4">07. ARCJET IN NEXT.JS</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Arcjet must run <strong>before</strong> your route logic. It evaluates IP, Headers, and User-agent to return Allow or Deny.
              </p>
            </section>
          </div>

          {/* 8. ORPC MIDDLEWARE INTEGRATION */}
          <section>
            <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-6">
              <span className="text-blue-500 font-mono text-sm">08.</span> oRPC MIDDLEWARE
            </h2>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 font-mono text-sm text-slate-300">
              {`base
                .$context<{ request: Request }>()
                .middleware(async ({ context, next, errors }) => {
                  const decision = await aj.protect(context.request)
                  if (decision.isDenied()) {
                    throw errors.FORBIDDEN()
                  }
                  return next()
                })
              `}
            </div>
          </section>

          {/* 9 & 10. POWER & LAYERS */}
          <section className="bg-slate-900/30 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-4">09. WHY THIS IS POWERFUL</h2>
            <p className="text-slate-400 mb-8">
              Arcjet runs BEFORE Zod validation and DB queries. Attackers never reach your logic.
            </p>
            <hr className="border-slate-800 mb-8" />
            <h2 className="text-xl font-bold text-white mb-4">10. SECURITY LAYERS</h2>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {['WAF', 'Bot Control', 'Rate Limit', 'Abuse Detection', 'IP Reputation'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-800 rounded-full border border-slate-700 uppercase">{tag}</span>
              ))}
            </div>
          </section>

          {/* 11 & 12. USER LEVEL & USE CASES */}
          <section className="space-y-12">
            <div>
              <h2 className="text-xl font-bold text-white mb-4">11. USER-LEVEL PROTECTION</h2>
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-300 font-mono text-sm">
                aj.protect(request, {`{ userId: "123" }`})
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-4">12. REAL-WORLD USE CASES</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 italic text-sm text-slate-400">
                <span>• Telemetry streams</span>
                <span>• Admin APIs</span>
                <span>• Presim endpoints</span>
                <span>• Mission control</span>
              </div>
            </div>
          </section>

          {/* 13. WHY NOT CLOUDFLARE? */}
          <section>
            <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-6">
              <span className="text-blue-500 font-mono text-sm">13.</span> WHY NOT CLOUDFLARE?
            </h2>
            <p className="text-slate-400 leading-relaxed border-l-4 border-slate-800 pl-6">
              Cloudflare is external. Arcjet is <strong>internal</strong>. It knows your routes, your users,
              and your sessions. It allows for per-endpoint blocking logic that edge WAFs can't see.
            </p>
          </section>

          {/* 14, 15, 16. THE FINAL PHILOSOPHY */}
          <section className="space-y-16">
            <div className="bg-orange-500/10 border border-orange-500/20 p-6 rounded-xl">
              <h2 className="text-orange-400 font-bold mb-2">14. FAIL-SAFE DESIGN</h2>
              <p className="text-sm">If Arcjet fails: Request is blocked. Security &gt; Availability.</p>
            </div>

            <div>
              <h2 className="text-white font-bold mb-4">15. ANTARIS-STYLE SYSTEMS</h2>
              <p className="text-slate-400 text-sm">Every critical endpoint (Presim, Schedule, HWIL) is protected before execution.</p>
            </div>

            <div className="pt-12 border-t border-slate-800 text-center">
              <h2 className="text-2xl font-bold text-white mb-2 underline decoration-blue-500 underline-offset-8 italic">16. MENTAL MODEL</h2>
              <p className="text-slate-400 mt-6 max-w-md mx-auto">
                Arcjet is a programmable firewall <strong>inside</strong> your app. Not outside. Not after. Before everything.
              </p>
            </div>
          </section>

          <footer className="text-center text-slate-600 font-mono text-xs pt-20 uppercase tracking-[0.2em]">
            End of Documentation — Confidential Production Guide
          </footer>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;