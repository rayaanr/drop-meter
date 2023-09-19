import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from "react";
import { Providers } from "./providers";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DropMeter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <head>
        <link rel='icon' href='/favicon.svg'/>
    </head>
      <body className={inter.className}>
      <Providers>
          {children}
      </Providers>
      </body>
    </html>
  )
}
