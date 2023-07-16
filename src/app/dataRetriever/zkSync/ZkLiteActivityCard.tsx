import { FC, useEffect, useState } from 'react';
import getTimeAgo from '@/app/utils/timeAgo';

interface ZkLiteActivityCardProps {
    address: string;
    onZkLiteTxCountChange: (count: number) => void;
}

const ZkLiteActivityCard: FC<ZkLiteActivityCardProps> = ({ address,onZkLiteTxCountChange }) => {
    const [data, setData] = useState<any>(null);
    const [changePubKeyDate, setChangePubKeyDate] = useState<string | null>(null);
    const [nfts, setNfts] = useState<any[]>([]);
    const [zkLiteTxCount, setZkLiteTxCount] = useState<number>(0);
    const [totalFee, setTotalFee] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [accountResponse, transactionResponse] = await Promise.all([
                    fetch(`https://api.zksync.io/api/v0.2/accounts/${address}?stateType=finalized`),
                    fetch(`https://api.zksync.io/api/v0.2/accounts/${address}/transactions?from=latest&limit=100&direction=older`),
                ]);

                const [accountData, transactionData] = await Promise.all([
                    accountResponse.json(),
                    transactionResponse.json(),
                ]);

                const { result: accountResult } = accountData;
                const { result: transactionResult } = transactionData;

                if (
                    accountResult &&
                    accountResult.finalized &&
                    transactionResult &&
                    transactionResult.list.length > 0
                ) {
                    const { finalized } = accountResult;
                    const { nonce, balances, nfts } = finalized;

                    setData({
                        nonce,
                        tokenBalanceCount: Object.keys(balances).length,
                        tokenBalances: balances,
                        latestTransactionDate: transactionResult.list[0].createdAt,
                    });

                    const changePubKeyTransaction = transactionResult.list.find(
                        (transaction: any) => transaction.op.type === 'ChangePubKey',
                    );
                    if (changePubKeyTransaction) {
                        setChangePubKeyDate(changePubKeyTransaction.createdAt);
                    }

                    const nftArray = Object.values(nfts);
                    setNfts(nftArray);
                }

                if (transactionResult.pagination && transactionResult.pagination.count) {
                    const count = transactionResult.pagination.count;
                    setZkLiteTxCount(count);
                    onZkLiteTxCountChange(count);
                }

                let totalFee = 0;

                transactionResult.list.forEach((transaction: any) => {
                    totalFee += parseInt(transaction.op.fee);
                    console.log(transaction.op.fee);
                });

                setTotalFee(totalFee);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [address]);

    return (
        <>
            {/*{data && data.nonce !== null && `Interactions: ${data.nonce}`}*/}
            {data && zkLiteTxCount !== null && `Interactions: ${zkLiteTxCount}`}<br/>
            {data && data.latestTransactionDate !== null && `Last Activity: ${getTimeAgo(data.latestTransactionDate)}`}<br/>
            {changePubKeyDate !== null && `Activated On: ${getTimeAgo(changePubKeyDate)}`}<br/>
            {data && data.tokenBalances !== null && (
                <>
                    {Object.entries(data.tokenBalances).map(([token, balance]) => (
                        <div key={token} className="mr-2 bg-gray-700 p-1 text-sm rounded">
                            {token === 'ETH' ? (parseFloat(balance as string) * 1e-18).toFixed(5) : (parseFloat(balance as string) * 1e-6).toFixed(2)} {token}
                        </div>
                    ))}
                </>
            )}
            {nfts.map((nft) => (
                <div key={nft.id} className="mr-2 bg-gray-700 p-1 text-sm rounded">
                    {nft.symbol}
                </div>
            ))}
            {/*<div>Pagination Count: {zkLiteTxCount}</div>*/}
            {/*<div>Total Fee: {totalFee}</div>*/}
        </>
    );
};

export default ZkLiteActivityCard;




