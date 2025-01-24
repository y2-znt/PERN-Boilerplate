import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "./context/authContext";
import "./globals.css";
import TanstackProvider from "./provider/tanstack-provider";

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
    <html lang="en">
      <body className={`${inter.className} mx-7 max-w-7xl md:mx-auto`}>
        <TanstackProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
