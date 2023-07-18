import {Token, Transaction} from "@/app/global/interfaces";
import React from "react";
import {chainData} from "@/app/global/chainData";
import AnalyzedDataCard from "@/app/components/resultsPageItems/AnalyzedDataCard";
import {TxListDataCard} from "@/app/components/resultsPageItems/TxListDataCard";

interface ResultsPageProps {
    txList : Transaction[],
    selectedNetwork: keyof typeof chainData,
    balanceList: Token[],
    address: string,
}


const ResultsPage = ({ txList, selectedNetwork, balanceList, address }: ResultsPageProps) => {

    return (
        <>
            <div>
                <div className={"pt-5 p-5 block m-auto lg:w-1/2 md:w-3/4 sm:w-full"}>
                    <AnalyzedDataCard txList={txList} selectedNetwork={selectedNetwork} balanceList={balanceList} address={address}/>
                </div>

                <div className={"p-5"}>
                    <TxListDataCard txList={txList} selectedNetwork={selectedNetwork} />
                </div>
            </div>
        </>
    );
};

export { ResultsPage };