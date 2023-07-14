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
        <section>
            <div className={'p-24 pb-5 flex justify-between border-2 border-white'}>
                <div>Address: {params.address}</div>
                <div className="">
                    <Dropdown onSelect={handleNetworkSelect} />
                </div>
            </div>
            {children}
        </section>
    );
}
