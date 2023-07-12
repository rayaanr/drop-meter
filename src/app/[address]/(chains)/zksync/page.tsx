'use client'

import { useEffect, useState } from "react";
import zksyncTxList from "@/app/dataRetriever/zksyncTxList";
import { TxListDataCard } from "@/app/components/TxListDataCard";

interface PageProps {
    params: { address: string };
}

export default function Page({ params }: PageProps) {
    const [transactionsList, setTransactionsList] = useState<any[]>([]);
    const [tokenList, setTokenList] = useState<any[]>([]);
    const [totalVolume, setTotalVolume] = useState<number>(0);
    const [totalFee, setTotalFee] = useState<number>(0);
    const [ETHVolume, setETHVolume] = useState<number>(0);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const retrievedTransactions = await zksyncTxList(params.address);
                setTransactionsList(retrievedTransactions);

                let totalVolume = 0;
                for (const transaction of retrievedTransactions) {
                    totalVolume += transaction.valueInUSD;
                }
                setTotalVolume(totalVolume);

                let ethVolume = 0;
                for (const transaction of retrievedTransactions) {
                    if (transaction.value.includes("ETH")) {
                        ethVolume += transaction.valueInUSD;
                    }
                }
                setETHVolume(ethVolume);

                let fee = 0;
                for (const transaction of retrievedTransactions) {
                    fee += transaction.fee;
                }
                setTotalFee(fee);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTransactions().then(r => console.log(r));
    }, [params.address]);

    return (
        <div>
            <div className={"pt-5"}></div>
            {/*<TableComponent*/}
            {/*    address={params.address}*/}
            {/*    transactionsList={transactionsList}*/}
            {/*    tokenList={[]}*/}
            {/*    totalVolume={totalVolume}*/}
            {/*    ethVolume={ETHVolume}*/}
            {/*    totalFee={totalFee}*/}
            {/*/>*/}

            {/*<HeadCard />*/}
            {/*<TokenCard tokenList={tokenList} />*/}
            {/*<ActivityPeriods transactionsList={transactionsList} />*/}

            <div className={"p-5"}>
                <TxListDataCard txList={transactionsList} chain={'zkera'} />
            </div>
        </div>
    );
}
