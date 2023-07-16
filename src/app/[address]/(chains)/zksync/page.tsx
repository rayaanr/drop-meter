'use client'

import { useEffect, useState } from "react";
import zksyncTxList from "@/app/dataRetriever/zkSync/zksyncTxList";
import { TxListDataCard } from "@/app/components/TxListDataCard";
import FullDataCard from "@/app/components/FullDataCard";
import {Token, Transaction} from "@/app/global/interfaces";
import zkSyncBalanceList from "@/app/dataRetriever/zkSync/zkSyncBalanceList";
import {getZkLiteData} from "@/app/dataRetriever/zkSync/ZkLiteData";

interface PageProps {
    params: { address: string };
}

export default function Page({ params }: PageProps) {
    const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);
    const [balanceList, setBalanceList] = useState<Token[]>([]);
    const [zkLiteData, setZkLiteData] = useState<any>({});

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const retrievedTransactions = await zksyncTxList(params.address);
                setTransactionsList(retrievedTransactions);

                const retrievedBalance = await zkSyncBalanceList(params.address);
                setBalanceList(retrievedBalance);

                const retrievedZkLiteData = await getZkLiteData(params.address);
                setZkLiteData(retrievedZkLiteData);
                console.log(retrievedZkLiteData);

            } catch (error) {
                console.log(error);
            }
        };
        fetchTransactions().then(r => console.log(r));
    }, [params.address]);

    return (
        <div>
            <div className={"pt-5 p-5 block m-auto z-10 lg:w-1/2 md:w-3/4 sm:w-full"}>
                <FullDataCard txList={transactionsList} selectedNetwork={'zksync'} balanceList={balanceList} address={params.address}/>
            </div>

            <div className={"p-5"}>
                <TxListDataCard txList={transactionsList} selectedNetwork={'zksync'} />
            </div>
        </div>
    );
}
