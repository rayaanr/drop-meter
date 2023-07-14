'use client'

import React, {useState} from "react";
import Dropdown from "@/app/components/customElements/Dropdown";

interface PageProps {
    children: React.ReactNode;
    params: { address: string };
}

export default function addressLayout({ children, params }: PageProps) {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedNetwork, setSelectedNetwork] = useState(null);


    const handleNetworkSelect = (value : any) => {
        setSelectedNetwork(value);
    };

    return (
        <section>
            <div className={"p-24 pb-5 flex justify-between border-2 border-white"}>
                <div>Address : {params.address}</div>
                <div className="">
                    <Dropdown onSelect={handleNetworkSelect} />
                </div>
            </div>
            {children}
        </section>
    );
}
