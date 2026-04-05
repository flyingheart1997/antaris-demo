import '@/lib/orpc.server' // for pre-rendering ssr

import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { HeroHeader } from "@/features/home";
import { AllProviders } from '@/providers';
import { Toaster } from '@/components/ui/sonner';
import { getAccessToken } from "@/lib/auth/session";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Antaris — Mission Operations Platform",
  description: "Frontend architecture for the Antaris ATMOS satellite operations suite",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getAccessToken();

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AllProviders token={token ?? null}>
          <Toaster />
          {/* <HeroHeader /> */}
          {children}
        </AllProviders>
      </body>
    </html>
  );
}
