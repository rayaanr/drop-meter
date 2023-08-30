import { useEffect, useState } from "react";
import {Token, Transaction} from "@/app/global/interfaces";
import evmTxList from "@/app/dataRetriever/evmTxList";
import tokenFetch from "@/app/dataRetriever/balanceList";
import {ResultsPage} from "@/app/components/ResultsPage";
import {Anaheim} from "next/dist/compiled/@next/font/dist/google";
import AnalyzedDataCard from "@/app/components/resultsPageItems/AnalyzedDataCard";

interface PageProps {
    params: { address: string };
}

function LineaT({ params }: PageProps) {
    const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);
    const [balanceList, setBalanceList] = useState<Token[]>([]);
    const thisNetwork = 'lineaT';

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
        <>
            <AnalyzedDataCard txList={transactionsList} balanceList={balanceList} selectedNetwork={'lineaT'} address={params.address} />
        </>
    );
}

export default LineaT;