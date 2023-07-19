'use client'

import {Token, Transaction} from "@/app/global/interfaces";
import React, {useState} from "react";
import {chainData} from "@/app/global/chainData";
import AnalyzedDataCard from "@/app/components/resultsPageItems/AnalyzedDataCard";
import {TxListDataCard} from "@/app/components/resultsPageItems/TxListDataCard";
import {Dropdown} from "@/app/components/customElements/Dropdown";
import {useRouter} from "next/navigation";
import Image from "next/image";

interface ResultsPageProps {
    txList : Transaction[],
    selectedNetwork: keyof typeof chainData,
    balanceList: Token[],
    address: string,
}


const ResultsPage = ({ txList, selectedNetwork, balanceList, address }: ResultsPageProps) => {
    const router = useRouter();
    const [selectedNet, setSelectedNet] = useState(selectedNetwork);

    const handleNetworkSelect = (value: any) => {
        setSelectedNet(value);
        router.push(`/${address}/${value}`);
    };

    return (
        <>
            <header className={'p-5 flex justify-center'} style={{paddingTop:"90px"}}>
                <div className={"flex"}>
                    <Image src={chainData[selectedNet].logo} alt={chainData[selectedNet].name} className="w-[56px] mr-4" height={500} width={500}/>
                    <div>
                        <h1 className={"text-4xl font-semibold"} >{chainData[selectedNet].name}</h1>
                        <p className='text-sm'>{address.substring(0, 6)}...{address.substring(address.length - 6)}</p>
                    </div>

                </div>
                <div className="fixed top-[72px] right-5 mt-3 lg:mr-50 md:mr-25 mr-8 z-40">
                    <Dropdown onSelect={handleNetworkSelect} selectedNetwork={selectedNetwork} />
                </div>
            </header>
            <main>
                <section className={"pt-5 p-5 block m-auto lg:w-1/2 md:w-3/4 sm:w-full"}>
                    <AnalyzedDataCard txList={txList} selectedNetwork={selectedNetwork} balanceList={balanceList} address={address}/>
                </section>

                <section className={"p-5"}>
                    <TxListDataCard txList={txList} selectedNetwork={selectedNetwork} />
                </section>
            </main>
        </>
    );
};

export { ResultsPage };