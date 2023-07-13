'use client'

import { useEffect, useState } from "react";
import { TxListDataCard } from "@/app/components/TxListDataCard";
import SummaryCard from "@/app/components/SummaryCard";
import {Token, Transaction} from "@/app/global/interfaces";
import evmTxList from "@/app/dataRetriever/evmTxList";

interface PageProps {
    params: { address: string };
}

export default function Page({ params }: PageProps) {
    const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);
    const [tokenList, setTokenList] = useState<Token[]>([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const retrievedTransactions = await evmTxList("scroll", params.address);
                setTransactionsList(retrievedTransactions);

            } catch (error) {
                console.log(error);
            }
        };
        fetchTransactions().then(r => console.log(r));
    }, [params.address]);

    return (
        <div>
            <div className={"pt-5"}></div>

            <div className={"pt-5 w-1/2 block m-auto z-10"}>
                <SummaryCard txList={transactionsList} selectedNetwork={'scroll'}/>
            </div>
            
            <div className={"p-5"}>
                <TxListDataCard txList={transactionsList} selectedNetwork={'scroll'} />
            </div>
        </div>
    );
}
