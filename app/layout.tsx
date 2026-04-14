import '@/lib/orpc.server' // for pre-rendering ssr

import type { Metadata } from "next";
import "./globals.css";
import { AllProviders } from '@/providers';
import { Toaster } from '@/components/ui/sonner';
import { getAccessToken } from "@/lib/auth/session";
import { fonts } from "@/styles/src/fonts.generated";
import { SplashScreen } from '@/features/splash-screen';

export const metadata: Metadata = {
  title: "Antaris — Mission Operations Platform",
  description: "Frontend architecture for the Antaris satellite operations suite",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getAccessToken();

  return (
    <html
      lang="en"
      className={Object.values(fonts).join(' ')}
      suppressHydrationWarning
    >
      <head />
      <body suppressHydrationWarning className="antialiased bg-surface-bg">
        <AllProviders token={token ?? null}>
          <SplashScreen />
          <Toaster />
          {children}
        </AllProviders>
      </body>
    </html>
  );
}
