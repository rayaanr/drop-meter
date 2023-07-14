'use client'

import { useEffect, useState } from "react";
import zksyncTxList from "@/app/dataRetriever/zksyncTxList";
import { TxListDataCard } from "@/app/components/TxListDataCard";
import FullDataCard from "@/app/components/FullDataCard";
import {Token, Transaction} from "@/app/global/interfaces";

interface PageProps {
    params: { address: string };
}

export default function Page({ params }: PageProps) {
    const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);
    const [balanceList, setBalanceList] = useState<Token[]>([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const retrievedTransactions = await zksyncTxList(params.address);
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
                <FullDataCard txList={transactionsList} selectedNetwork={'zksync'} balanceList={balanceList}/>
            </div>

            <div className={"p-5"}>
                <TxListDataCard txList={transactionsList} selectedNetwork={'zksync'} />
            </div>
        </div>
    );
}
