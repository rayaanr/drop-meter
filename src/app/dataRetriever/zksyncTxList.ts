import {Token, Transfer, Transaction} from "@/app/global/interfaces";
import moment from "moment";
import axios from "axios";

const fetchTransactions = async (address: string): Promise<Transaction[]> => {
    const limit = 100;
    let currentPageForTx = 1;
    let currentPageForTransfer = 1;
    const allTransactionData: Transaction[] = [];
    const allTransferData: Transfer[] = [];
    const tokenAddresses: any = [];

    const fetchTokenPrice = async (tokenAddress: string) => {
        if (tokenAddress === "0x000000000000000000000000000000000000800A" || tokenAddress === "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91") {
            tokenAddress = "0x0000000000000000000000000000000000000000";
        }
        const ethResponse = await axios.post("https://mainnet.era.zksync.io/", {
                id: 42,
                jsonrpc: "2.0",
                method: "zks_getTokenPrice",
                params: [tokenAddress],
            }
        );
        return ethResponse.data.result;
    };

    const fetchTransactionsPage = async () => {
        const transactionResponse = await axios.get(`https://block-explorer-api.mainnet.zksync.io/transactions?address=${address}&limit=${limit}&page=${currentPageForTx}`);
        const transactionResult = transactionResponse.data;
        console.log(transactionResult);

        const { items, meta } = transactionResult;
        allTransactionData.push(...items);

        if (currentPageForTx < meta.totalPages) {
            currentPageForTx++;
            await fetchTransactionsPage();
        }
    };

    const fetchTransfersPage = async () => {
        const transferResponse = await axios.get(`https://block-explorer-api.mainnet.zksync.io/address/${address}/transfers?limit=${limit}&page=${currentPageForTransfer}`);
        const transferResult = transferResponse.data;
        console.log(transferResult);

        const { items, meta } = transferResult;
        allTransferData.push(...items);

        await Promise.all(
            items.map(async (item: any) => {
                if (item.tokenAddress && !tokenAddresses.some(
                        (token: Token) => token.contractAddress === item.tokenAddress) && item.type !== "mint"
                ) {
                    const price = await fetchTokenPrice(item.tokenAddress);
                    tokenAddresses.push({
                        address: item.tokenAddress,
                        symbol: item.token.symbol,
                        price: price,
                    });
                }
            })
        );

        if (currentPageForTransfer < meta.totalPages) {
            currentPageForTransfer++;
            await fetchTransfersPage();
        }
    };

    try {
        await fetchTransactionsPage();
        await fetchTransfersPage();

        const transactionsList: Transaction[] = allTransactionData.map(
            (transaction: any) => {
                const transfer = allTransferData.find(
                    (transfer: any) => transfer.transactionHash === transaction.hash &&
                        transfer.type !== "mint" && transfer.token.symbol !== "ETH"
                );

                const mintTransfer = allTransferData.find(
                    (transfer: any) => transfer.transactionHash === transaction.hash && transfer.type === "mint");

                const value =
                    transaction.value !== "0"
                        ? `${(transaction.value / 1e18).toFixed(4)} ETH`
                        : transfer
                            ? `${(transfer.amount / 10 ** transfer.token.decimals).toFixed(2)} ${transfer.token.symbol}`
                            : mintTransfer ? `NFT (${mintTransfer.fields.tokenId})` : "";

                const types = allTransferData.map((transfer: any) => {
                    if (transfer.transactionHash === transaction.hash) {
                        if (transfer.type === "mint") {return "mint";}
                        else if (transaction.from === transaction.to && transaction.isL1Originated === true) {return "bridgeIn";}
                        else if (transfer.type === "withdrawal") {return "bridgeOut";}
                        else if (transfer.type === "deposit") {return "deposit";}
                        else if (transfer.type === "transfer") {return "transfer";}
                    }
                });

                const type =
                    types.includes("mint") ? "mint" : types.includes("bridgeIn") ? "bridgeIn" :
                            types.includes("bridgeOut") ? "bridgeOut" : types.includes("deposit") ? "deposit" :
                                    (transaction.amount === 0 && transaction.from.toLowerCase() === address.toLowerCase()) ? "approval" :
                                        (transaction.to.toLowerCase() === address.toLowerCase()) ? "deposit" :
                                            types.includes("transfer") ? "transfer" : "approval";

                return {
                    transactionHash: transaction.hash,
                    datetime: moment(transaction.receivedAt).format(),
                    initiatorAddress: transaction.from,
                    value,
                    valueInUSD: 0,
                    status: transaction.status === "verified" ? "verified" : transaction.status === "included" ? "pending" : "failed",
                    fee: (parseInt(transaction.fee) / 1e18),
                    isL1Originated: transaction.isL1Originated,
                    method: transaction.from.toLowerCase() === address.toLowerCase() ? "out" : "in",
                    type,
                    to: transaction.to,
                    contractAddress: transaction.to,
                };
            }
        );

        for (const transaction of transactionsList) {
            if (transaction.value !== "") {
                const symbol = transaction.value.split(" ")[1];
                const token = tokenAddresses.find((token: Token) => token.symbol === symbol);

                if (token) {
                    const value = parseFloat(transaction.value.split(" ")[0].replace(",", ""));
                    const price = parseFloat(token.price);
                    if (!isNaN(value) && !isNaN(price)) {
                        transaction.valueInUSD = Number((value * price).toFixed(2));
                    }
                }
            }
        }

        console.log(transactionsList);
        return transactionsList;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};

export default fetchTransactions;