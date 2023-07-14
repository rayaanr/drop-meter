'use client'

import { useEffect, useState } from "react";
import { TxListDataCard } from "@/app/components/TxListDataCard";
import FullDataCard from "@/app/components/FullDataCard";
import {Token, Transaction} from "@/app/global/interfaces";
import evmTxList from "@/app/dataRetriever/evmTxList";
import tokenFetch from "@/app/dataRetriever/balanceList";

interface PageProps {
    params: { address: string };
}

function Page({ params }: PageProps) {
    const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);
    const [balanceList, setBalanceList] = useState<Token[]>([]);
    const thisNetwork = 'scroll';

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
        <div>
            <div className={"pt-5"}></div>

            <div className={"pt-5 w-1/2 block m-auto z-10"}>
                <FullDataCard txList={transactionsList} selectedNetwork={thisNetwork} balanceList={balanceList}/>
            </div>
            
            <div className={"p-5"}>
                <TxListDataCard txList={transactionsList} selectedNetwork={thisNetwork} />
            </div>
        </div>
    );
}

export default Page;