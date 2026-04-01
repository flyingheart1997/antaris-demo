import React from 'react'

const BackgroundProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="min-h-screen items-center justify-center flex bg-[#05070A] py-24 selection:bg-blue-500/30 font-sans">
            {/* --- PREMIUM BACKGROUND ENGINE --- */}
            <div className="fixed inset-0 pointer-events-none">
                {/* The Cyber Grid */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
                {/* Glow Blobs */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full" />
            </div>
            {children}
        </main>
    )
}

export default BackgroundProvider