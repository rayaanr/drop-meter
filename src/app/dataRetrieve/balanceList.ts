import { chainData} from "@/app/assets/chainData";
import { Token } from "@/app/assets/interfaces";

const tokenFetch = async (selectedNetwork: keyof typeof chainData, address: string): Promise<Token[]> => {
    try {
        const response = await fetch(`${chainData[selectedNetwork].balanceDataAPI}${address}`);
        const data = await response.json();

        const ethBalanceResponse = await fetch(`${chainData[selectedNetwork].ethBalanceAPI}${address}`);
        const ethData = await ethBalanceResponse.json();
        if (ethData.error) {
            throw new Error("Ethereum balance not found.");
        }

        const ethBalance = ethData.result ? ethData.result : 0;

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

        const ethToken: Token = {
            balance: (parseInt(ethBalance)/10 ** 18), // Assuming Ethereum has 18 decimals
            name: "Ethereum",
            symbol: "ETH",
            contractAddress: "0x000000000000000000000000000000000000800a", // Ethereum does not have a contract address
            type: "ETH",
            address: "0x000000000000000000000000000000000000800a", // Ethereum does not have an address
            decimals: 18, // Assuming Ethereum has 18 decimals
            price: undefined,
        };

        tokenList.push(ethToken);

        const tokenTypeOrder = ["ETH", "ERC-20", "ERC-721", "ERC-1155"];
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
