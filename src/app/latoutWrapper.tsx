'use client'

import { motion } from "framer-motion";
import React from "react";
import TopNav from "@/app/components/NavBar";
import ParticleBackground from "@/app/components/customElements/ParticleBackground";

export default function LayoutWrapper({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <motion.div>
                <ParticleBackground />
                <TopNav />
                {children}
            </motion.div>
        </>
        )
}
