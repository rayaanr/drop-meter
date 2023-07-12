'use client'

import React from "react";

interface PageProps {
    children: React.ReactNode;
    params: { address: string };
}

export default function addressLayout({ children, params }: PageProps) {
    return (
        <section>
            <div className={"p-24 pb-5 flex justify-between border-2 border-white"}>
                <div>Address : {params.address}</div>
                <div>
                    <select name="network" id="selectedNetwork" className={"p-2.5 bg-opacity-20 bg-gray-400 border border-gray-600 text-white-900 text-sm rounded"}>
                        <option value="zksync">ZKSYNC</option>
                        <option value="scroll">SCROLL</option>
                        <option value="linea">LINEA</option>
                    </select>
                </div>
            </div>
            {children}
        </section>
    );
}
