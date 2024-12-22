import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/theme";
import { UserProvider } from "@/context/user";
import NextTopLoader from "nextjs-toploader";
import { ReduxProvider } from "@/context/redux";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project Test eBuddy",
  description: "Project Test eBuddy with Next.js 15, Express, & Firebase",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextTopLoader color='#fffd00' height={3} showSpinner={false} />
        <ThemeProvider>
          <UserProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
