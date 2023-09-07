'use client'

import {NextUIProvider} from '@nextui-org/react';
import TopNav from './components/topNav';
import React from "react";

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <main className="dark text-foreground " style={{minHeight:'100vh'}}>
                <TopNav />
                {children}
            </main>
        </NextUIProvider>
    )
}