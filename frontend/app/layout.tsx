import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { AuthContextProvider } from "./context/authContext";
import "./globals.css";
import TanstackProvider from "./provider/tanstack-provider";
import { ThemeProvider } from "./provider/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "y2's Boilerplate",
  description: "Welcome to the y2's Boilerplate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} mx-7 max-w-7xl bg-background md:mx-auto`}
      >
        <TanstackProvider>
          <AuthContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster richColors position="bottom-left" />
              {children}
            </ThemeProvider>
          </AuthContextProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
