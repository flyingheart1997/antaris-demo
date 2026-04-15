import { defaultShouldDehydrateQuery, QueryClient } from '@tanstack/react-query'

export function createQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // Prevents immediate refetch on mount for SSR-prefetched data
                staleTime: 60 * 1000,
            },
            dehydrate: {
                // Also dehydrate pending (in-flight) queries so Suspense boundaries hydrate correctly
                shouldDehydrateQuery: query =>
                    defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
            },
        },
    })
}
