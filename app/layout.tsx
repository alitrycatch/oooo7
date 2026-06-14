import type { Metadata } from "next";

import Navbar from "../components/layouts/Navbar";
import "./globals.css";
import { auth } from "@/auth";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";


const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <Navbar session={session} />
        {children}
      </body>
    </html>
  );
}
