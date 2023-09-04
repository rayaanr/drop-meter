'use client'

import {NextUIProvider} from '@nextui-org/react';
import TopNav from './components/TopNav';
import React from "react";

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <main className="dark text-foreground bg-background" style={{minHeight:'100vh'}}>
                <TopNav />
                {children}
            </main>
        </NextUIProvider>
    )
}