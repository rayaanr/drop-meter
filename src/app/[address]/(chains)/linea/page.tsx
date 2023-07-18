'use client'

import { useEffect, useState } from "react";
import { TxListDataCard } from "@/app/components/resultsPageItems/TxListDataCard";
import AnalyzedDataCard from "@/app/components/resultsPageItems/AnalyzedDataCard";
import {Token, Transaction} from "@/app/global/interfaces";
import evmTxList from "@/app/dataRetriever/evmTxList";
import tokenFetch from "@/app/dataRetriever/balanceList";
import {ResultsPage} from "@/app/components/ResultsPage";

interface PageProps {
    params: { address: string };
}

function Page({ params }: PageProps) {
    const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);
    const [balanceList, setBalanceList] = useState<Token[]>([]);
    const thisNetwork = 'linea';

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const retrievedTransactions = await evmTxList(thisNetwork, params.address);
                setTransactionsList(retrievedTransactions);

                const retrievedTokenList = await tokenFetch(thisNetwork, params.address);
                setBalanceList(retrievedTokenList);

            } catch (error) {
                console.log(error);
            }
        };
        fetchTransactions().then(r => console.log(r));
    }, [params.address]);

    return (
        <ResultsPage
            txList={transactionsList}
            selectedNetwork={'linea'}
            balanceList={balanceList}
            address={params.address}/>
    );
}

export default Page;