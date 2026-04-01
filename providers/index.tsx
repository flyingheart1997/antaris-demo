import { TanstackQueryProvider } from "@/providers/tanstack-query-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import ModalsProvider from "./modals-provider"

export const AllProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
        >
            <TanstackQueryProvider>
                <ModalsProvider>
                    {children}
                </ModalsProvider>
            </TanstackQueryProvider>
        </ThemeProvider>
    )
}