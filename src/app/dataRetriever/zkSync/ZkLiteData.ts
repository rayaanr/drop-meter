export const getZkLiteData = async (address: string): Promise<any[]> => {
    try {
        const data: any[] = [];

        const accountState = await fetch(`https://api.zksync.io/api/v0.2/accounts/${address}/finalized`);
        const accountData = await accountState.json();
        console.log('acData', accountData);

        const transactionResponse = await fetch(
            `https://api.zksync.io/api/v0.2/accounts/${address}/transactions?from=latest&limit=100&direction=older`,
        );
        const transactionData = await transactionResponse.json();
        console.log('acData', transactionData);

        // if (
        //     accountData.result &&
        //     accountData.result.finalized &&
        //     transactionData.result &&
        //     transactionData.result.list.length > 0
        // ) {
        //     data.push({
        //         totalTx: transactionData.result.pagination.count,
        //         verifiedTx: accountData.result.nonce,
        //         balance: accountData.result.balances,
        //         nfts: accountData.result.nfts,
        //         lastTxDate: transactionData.result.list[0].createdAt,
        //         totalFee: transactionData.result.list
        //             .map((tx: any) => tx.op.fee)
        //             .reduce((a: number, b: number) => a + b, 0),
        //         activatedAt: transactionData.result.list.find(
        //             (transaction: any) => transaction.op.type === 'ChangePubKey',
        //         ).createdAt,
        //
        //     });
        // }

        return accountData;
    } catch (error) {
        console.log(error);
        throw error;
    }
};



