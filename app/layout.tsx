import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Logout from "./logout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextAuth Credentials tutorial",
  description: "NextAuth Credentials tutorial",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-violet-500 h-12 text-white flex items-center p-4">
          {!!session && <Logout />}
          <div className="flex gap-x-4">
            {!session && <Link href="/login">Login</Link>}
            {!session && <Link href="/register">Register</Link>}
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
