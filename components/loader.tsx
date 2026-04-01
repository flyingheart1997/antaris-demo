
const Loader = () => {

    return (
        <main className="text-center container flex gap-2 flex-col mx-auto max-w-3xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-2xl bg-linear-to-l from-purple-600 bg-clip-text text-transparent to-cyan-500">Loading users...</p>
        </main>
    )
}

export default Loader