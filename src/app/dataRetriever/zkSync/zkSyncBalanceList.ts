import axios from "axios";
import { Token } from "@/app/global/interfaces";

const getTokenList = async (address: string): Promise<Token[]> => {
    const maxRetryCount = 5;
    let retryCount = 0;

    while (retryCount < maxRetryCount) {
    try {
        const response = await axios.get(`https://zksync2-mainnet.zkscan.io/api?module=account&action=tokenlist&address=${address}`);
        const tokenPromises: Promise<Token | undefined>[] = response.data.result.map(async (token: any) => {
            if (
                token.contractAddress === "0x000000000000000000000000000000000000800a" ||
                token.contractAddress === "0x5aea5775959fbc2557cc8789bc1bf90a239d9a91"
            ) {
                token.contractAddress = "0x0000000000000000000000000000000000000000";
            }

            const pricePromise = token.type === "ERC-20" ? getTokenPrice(token.contractAddress) : undefined;

            const tokenData: Token = {
                address: token.contractAddress, // Add the 'address' property
                balance: token.balance / 10 ** token.decimals,
                decimals: token.decimals, // Add the 'decimals' property
                name: token.name,
                symbol: token.symbol,
                contractAddress: token.contractAddress,
                type: token.type,
                price: pricePromise ? await pricePromise : undefined,
            };

            return tokenData;
        });

        const tokenList: (Token | undefined)[] = await Promise.all(tokenPromises);

        const filteredTokenList: Token[] = tokenList.filter((token) => token !== undefined) as Token[];

        const tokenTypeOrder = ["ERC-20", "ERC-721", "ERC-1155"];
        filteredTokenList.sort((a, b) => {
            const typeA = tokenTypeOrder.indexOf(a.type);
            const typeB = tokenTypeOrder.indexOf(b.type);
            return typeA - typeB;
        });

        return filteredTokenList;
    } catch (error) {
        console.log(`Error loading token list. Retrying... (${retryCount + 1}/${maxRetryCount})`);
        retryCount++;
    }
    }
    throw new Error(`Failed to load token list after ${maxRetryCount} attempts.`);
};

const getTokenPrice = async (contractAddress: string): Promise<number> => {
    try {
        const response = await axios.post("https://mainnet.era.zksync.io/", {
            id: 42,
            jsonrpc: "2.0",
            method: "zks_getTokenPrice",
            params: [contractAddress],
        });

        return response.data.result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default getTokenList;

