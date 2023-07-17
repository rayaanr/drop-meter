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
                <div className="fixed top-[72px] right-7 m-3" style={{zIndex:999}}>
                    <Dropdown onSelect={handleNetworkSelect} />
                </div>
            </div>
            {children}
        </>
    );
}
