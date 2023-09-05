'use client'

import {Token, Transaction} from "@/app/assets/interfaces";
import React, {useState} from "react";
import {chainData} from "@/app/assets/chainData";
import AnalyzedDataCard from "@/app/components/resultsPageItems/AnalyzedDataCard";
import {TxListDataCard} from "@/app/components/resultsPageItems/TxListDataCard";
// import {Dropdown} from "@/app/components/customElements/Dropdown";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {Snippet} from "@nextui-org/react";
// import LineaT from "@/app/components/lineaTnet";

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
            <header className={'w-full flex justify-center '}>
                <div className={'mt-3'}>
                    <div className='flex justify-center items-center gap-4'>
                        <Image src={chainData[selectedNet].logo} alt={chainData[selectedNet].name} className="w-[56px]" height={500} width={500}/>
                        <h1 className={"text-4xl font-semibold"} >{chainData[selectedNet].name}</h1>
                    </div>
                    <Snippet size={'sm'} className={'text-xs m-3'}>{address}</Snippet>
                </div>
            </header>
            {/*<header className={'p-5 flex lg:justify-center md:justify-center justify-start'} style={{paddingTop:"90px"}}>*/}
            {/*    <div className={"flex"}>*/}
            {/*        <Image src={chainData[selectedNet].logo} alt={chainData[selectedNet].name} className="w-[56px] mr-4" height={500} width={500}/>*/}
            {/*        <div>*/}
            {/*            <h1 className={"text-4xl font-semibold"} >{chainData[selectedNet].name}</h1>*/}
            {/*            <Snippet className={'w-full'}>{address.substring(0, 6)}...{address.substring(address.length - 6)}</Snippet>*/}
            {/*            /!*<p className='text-sm'>{address.substring(0, 6)}...{address.substring(address.length - 6)}</p>*!/*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*    /!*<div className="fixed top-[72px] right-5 mt-3 lg:mr-50 md:mr-25 mr-8 z-40">*!/*/}
            {/*    /!*    <Dropdown onSelect={handleNetworkSelect} selectedNetwork={selectedNetwork} />*!/*/}
            {/*    /!*</div>*!/*/}
            {/*</header>*/}
            <main>
                <section className={""}>
                    <AnalyzedDataCard txList={txList} selectedNetwork={selectedNetwork} balanceList={balanceList} address={address}/>
                </section>

                {/*{selectedNetwork === 'linea' ? (*/}
                {/*    <>*/}
                {/*        <section className={"pt-5 p-1 block m-auto lg:w-1/2 md:w-3/4 w-full border border-gray-500 mt-24"}>*/}
                {/*            <h1 className={'flex w-100 justify-center font-bold m-2 text-2xl'}>Linea Testnet</h1>*/}
                {/*            <LineaT params={{address: address}} />*/}
                {/*        </section>*/}
                {/*    </>*/}
                {/*): null}*/}

            </main>
        </>
    );
};

export { ResultsPage };