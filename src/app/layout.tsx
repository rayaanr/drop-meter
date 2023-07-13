import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from "react";
import TopNav from "./components/NavBar";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DropMeter',
  description: 'Wallet Analytics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <TopNav />
      {children}
      </body>
    </html>
  )
}
