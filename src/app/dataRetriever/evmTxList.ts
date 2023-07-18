import {chainData} from "@/app/global/chainData";
import {Transaction} from "@/app/global/interfaces";
import moment from "moment";

const evmTxList = async (selectedNetwork: keyof typeof chainData, address:string): Promise<Transaction[]> => {
    try {
        const transactionResponse = await fetch(`${chainData[selectedNetwork].txDataAPI}${address.toLowerCase()}`);
        const transactionResult = await transactionResponse.json();

        const tokenTransferResponse = await fetch(`${chainData[selectedNetwork].tokenTransferDataAPI}${address.toLowerCase()}`);
        const tokenTransferResult = await tokenTransferResponse.json();

        const transactionsList: Transaction[] = transactionResult.result.map((transaction: any) => {

            return {
                transactionHash: transaction.hash,
                datetime: moment(transaction.timeStamp * 1000).format(),
                value: transaction.value !== '0' ? `${(transaction.value / 1e18).toFixed(4)} ETH` :
                    tokenTransferResult.result.map((token: any) => {
                        if (token.hash === transaction.hash) {
                            return `${token.value / 10 ** token.tokenDecimal} ${token.tokenSymbol}`;
                        }}),
                valueInUSD: parseInt(String(((transaction.value) / 1e18)*1900)),
                initiatorAddress: transaction.from,
                status: transaction.isError === '0' ? 'verified' : 'failed',
                fee: (transaction.gasPrice * transaction.gasUsed)/1e18,
                isL1Originated: undefined,
                method: transaction.from === `${address.toLowerCase()}` ? 'out' : 'in',
                type: transaction.from === `${address.toLowerCase()}` ? 'out' : 'in',
                to: transaction.to,
                contractAddress: transaction.to,
            };
        });

        return transactionsList;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

export default evmTxList;