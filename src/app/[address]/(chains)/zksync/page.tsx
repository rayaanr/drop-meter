'use client'

import { useEffect, useState } from "react";
import zkSyncTxnsFetch from "@/app/dataRetrieve/zksync/zkSyncTxnsFetch";
import {Token, Transaction} from "@/app/assets/interfaces";
import zkSyncBalancesFetch from "@/app/dataRetrieve/zksync/zkSyncBalancesFetch";
// import {getZkLiteData} from "@/app/dataRetriever/zkSync/ZkLiteData";
import {ResultsPage} from "@/app/[address]/resultsPage";

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
                const retrievedTransactions = await zkSyncTxnsFetch(params.address);
                setTransactionsList(retrievedTransactions);

                const retrievedBalance = await zkSyncBalancesFetch(params.address);
                setBalanceList(retrievedBalance);

                // const retrievedZkLiteData = await getZkLiteData(params.address);
                // setZkLiteData(retrievedZkLiteData);
                // console.log(retrievedZkLiteData);

            } catch (error) {
                console.log(error);
            }
        };
        fetchTransactions().then(r => console.log(r));
    }, [params.address]);

    return (
        <ResultsPage
            txList={transactionsList}
            selectedNetwork={'zksync'}
            balanceList={balanceList}
            address={params.address}/>
    );
}
