import "./globals.css";
import { Inter } from "next/font/google";

import { NextAuthProvider } from "./providers";

import HeaderNav from "@/components/navBar_components/headerNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sports App",
  description: "Sports App created by Joshua Vladia using Next JS",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <header className="container mx-auto p-4">
            <HeaderNav />
          </header>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
