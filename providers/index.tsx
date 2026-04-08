import { TanstackQueryProvider } from "@/providers/tanstack-query-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import { AuthProvider } from "./auth-provider"
import ModalsProvider from "./modals-provider"
import { TooltipProvider } from "@/components/ui/tooltip"

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
                        <TooltipProvider>
                            {children}
                        </TooltipProvider>
                    </ModalsProvider>
                </TanstackQueryProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}