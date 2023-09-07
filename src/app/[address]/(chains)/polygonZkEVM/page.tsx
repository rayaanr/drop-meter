'use client'

import { useEffect, useState } from "react";
import {Token, Transaction} from "@/app/assets/interfaces";
import evmTxList from "@/app/dataRetrieve/evmTxList";
import tokenFetch from "@/app/dataRetrieve/balanceList";
import {ResultsPage} from "@/app/[address]/resultsPage";

interface PageProps {
    params: { address: string };
}

function Page({ params }: PageProps) {
    const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);
    const [balanceList, setBalanceList] = useState<Token[]>([]);
    const thisNetwork = 'polygonZkEVM';

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
            selectedNetwork={'polygonZkEVM'}
            balanceList={balanceList}
            address={params.address}/>
    );
}

export default Page;