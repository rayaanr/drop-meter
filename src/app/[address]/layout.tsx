'use client'

import React, {useState} from "react";
import {Dropdown} from "@/app/components/customElements/Dropdown";
import { useRouter } from 'next/navigation';

interface PageProps {
    children: React.ReactNode;
    params: { address: string };
}

export default function AddressLayout({ children, params }: PageProps) {
    const router = useRouter();
    const [selectedNetwork, setSelectedNetwork] = useState('');

    const handleNetworkSelect = (value: string) => {
        setSelectedNetwork(value);
        router.push(`/${params.address}/${value}`);
    };

    return (
        <>
            <div className={'pb-5 flex justify-between'} style={{paddingTop:"80px"}}>
                <div>Address: {params.address.substring(0, 5)}...{params.address.substring(params.address.length - 5)}</div>
                <div className="fixed top-[72px] right-5 mt-3 lg:mr-50 md:mr-25 sm:mr-16 z-40">
                    <Dropdown onSelect={handleNetworkSelect} selectedNetwork={selectedNetwork} />
                </div>
            </div>
            {children}
        </>
    );
}
