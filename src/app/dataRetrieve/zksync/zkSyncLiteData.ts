import { useState } from "react";
import { ChainLiteData, Token } from "@/app/assets/interfaces";
import timeAgo from "@/app/utils/timeAgo";

const ZkSyncLiteData = async (selectedNetwork: string, address: string): Promise<ChainLiteData> => {
    let zkLiteTxCount = 0;
    let balance: Token[] = [];
    let volume = 0;
    let changePubKeyDate: string | undefined;
    let nfts: any[] = [];
    let latestActivity: string | undefined;
    let totalFee = 0;

    try {
        // Fetch account data
        const accountResponse = await fetch(`https://api.zksync.io/api/v0.2/accounts/${address}?stateType=finalized`);
        const accountData = await accountResponse.json();
        const { result: accountResult } = accountData;

        // Fetch transaction data
        const transactionResponse = await fetch(`https://api.zksync.io/api/v0.2/accounts/${address}/transactions?from=latest&limit=100&direction=older`);
        const transactionData = await transactionResponse.json();
        const { result: transactionResult } = transactionData;

        if (accountResult && accountResult.finalized && transactionResult && transactionResult.list.length > 0) {
            const { finalized } = accountResult;
            let { nonce, balances, nfts } = finalized;

            zkLiteTxCount = nonce;
            balance = balances;
            latestActivity = transactionResult.list[0].createdAt;

            const changePubKeyTransaction = transactionResult.list.find(
                (transaction: any) => transaction.op.type === 'ChangePubKey',
            );
            if (changePubKeyTransaction) {
                changePubKeyDate = changePubKeyTransaction.createdAt;
            }

            const nftArray = Object.values(nfts);
            nfts = nftArray;
        }

        if (transactionResult.pagination && transactionResult.pagination.count) {
            zkLiteTxCount = transactionResult.pagination.count;
        }

        transactionResult.list.forEach((transaction: any) => {
            totalFee += parseInt(transaction.op.fee);
        });

        const liteData: ChainLiteData = {
            type: 'main',
            interactions: zkLiteTxCount,
            balances: balance,
            fees: totalFee,
            activity: {
                latestActivity: latestActivity ? timeAgo(latestActivity) : '',
                activatedOn: changePubKeyDate,
            },
        };

        console.log('yow ', liteData);

        return liteData;
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            type: 'main',
            interactions: 0,
            balances: [],
            fees: 0,
            activity: {
                latestActivity: '',
                activatedOn: '',
            },
        };
    }
};

export default ZkSyncLiteData;




// import { FC, useEffect, useState } from 'react';
// import getTimeAgo from '@/app/utils/timeAgo';
// import {ChainLiteData, Transaction} from "@/app/assets/interfaces";
//
// const ZkSyncLiteData = ({ address }: { address: any }) => {
//     const [data, setData] = useState<any>(null);
//     const [changePubKeyDate, setChangePubKeyDate] = useState<string | null>(null);
//     const [nfts, setNfts] = useState<any[]>([]);
//     const [zkLiteTxCount, setZkLiteTxCount] = useState<number>(0);
//     const [totalFee, setTotalFee] = useState<number>(0);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [accountResponse, transactionResponse] = await Promise.all([
//                     fetch(`https://api.zksync.io/api/v0.2/accounts/${address}?stateType=finalized`),
//                     fetch(`https://api.zksync.io/api/v0.2/accounts/${address}/transactions?from=latest&limit=100&direction=older`),
//                 ]);
//
//                 const [accountData, transactionData] = await Promise.all([
//                     accountResponse.json(),
//                     transactionResponse.json(),
//                 ]);
//
//                 const { result: accountResult } = accountData;
//                 const { result: transactionResult } = transactionData;
//
//                 if (
//                     accountResult &&
//                     accountResult.finalized &&
//                     transactionResult &&
//                     transactionResult.list.length > 0
//                 ) {
//                     const { finalized } = accountResult;
//                     const { nonce, balances, nfts } = finalized;
//
//                     setData({
//                         nonce,
//                         tokenBalanceCount: Object.keys(balances).length,
//                         tokenBalances: balances,
//                         latestTransactionDate: transactionResult.list[0].createdAt,
//                     });
//
//                     const changePubKeyTransaction = transactionResult.list.find(
//                         (transaction: any) => transaction.op.type === 'ChangePubKey',
//                     );
//                     if (changePubKeyTransaction) {
//                         setChangePubKeyDate(changePubKeyTransaction.createdAt);
//                     }
//
//                     const nftArray = Object.values(nfts);
//                     setNfts(nftArray);
//                 }
//
//                 if (transactionResult.pagination && transactionResult.pagination.count) {
//                     const count = transactionResult.pagination.count;
//                     setZkLiteTxCount(count);
//                 }
//
//                 let totalFee = 0;
//
//                 transactionResult.list.forEach((transaction: any) => {
//                     totalFee += parseInt(transaction.op.fee);
//                     console.log(transaction.op.fee);
//                 });
//
//                 setTotalFee(totalFee);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };
//
//         fetchData();
//     }, [address]);
//
//     const zkSyncLiteData = {
//         type: 'main',
//         interactions: zkLiteTxCount,
//         latestActivity: getTimeAgo(data?.latestTransactionDate),
//         activatedOn: getTimeAgo(changePubKeyDate),
//         balances: data?.tokenBalances,
//         activity: {
//             totalFee,
//             nfts,
//         }
//     }
//
//     return zkSyncLiteData;
// }
//
// export default ZkSyncLiteData;