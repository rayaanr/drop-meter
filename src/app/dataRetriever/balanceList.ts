import {chainData} from "@/app/global/chainData";
import {Token} from "@/app/global/interfaces";


const tokenFetch = async (selectedNetwork: keyof typeof chainData, address: string): Promise<Token[]> => {
    try {
        const response = await fetch(`${chainData[selectedNetwork].balanceDataAPI}${address}`);
        const data = await response.json();

        if (data.status !== "1") {
            throw new Error("Token data retrieval failed.");
        }

        const tokenList: Token[] = data.result.map((token: any) => {
            return {
                balance: token.balance / 10 ** token.decimals,
                name: token.name,
                symbol: token.symbol,
                contractAddress: token.contractAddress,
                type: token.type,
                price: undefined,
            };
        });

        const tokenTypeOrder = ["ERC-20", "ERC-721", "ERC-1155"];
        tokenList.sort((a, b) => {
            const typeA = tokenTypeOrder.indexOf(a.type);
            const typeB = tokenTypeOrder.indexOf(b.type);
            return typeA - typeB;
        });
        
        console.log(tokenList);
        return tokenList;

    } catch (error) {
        console.error("Error fetching token data:", error);
        throw error;
    }
};

export default tokenFetch;