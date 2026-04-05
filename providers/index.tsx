import { TanstackQueryProvider } from "@/providers/tanstack-query-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import { AuthProvider } from "./auth-provider"
import ModalsProvider from "./modals-provider"

export const AllProviders = ({ children, token }: { children: React.ReactNode, token: string | null }) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
        >
            <AuthProvider token={token}>
                <TanstackQueryProvider>
                    <ModalsProvider>
                        {children}
                    </ModalsProvider>
                </TanstackQueryProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}