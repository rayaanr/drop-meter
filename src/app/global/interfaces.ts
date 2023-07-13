export interface Token {
    address: string;
    symbol: string;
    price: number;
    contractAddress: string;
    decimals: number;
}

export interface Transfer {
    transactionHash: string;
    amount: number;
    token: Token;
    type: string;
    fields: {
        tokenId: string;
    };
}

export interface Transaction {
    transactionHash: string;
    datetime: string;
    initiatorAddress: string;
    value: string;  // in Token
    valueInUSD: number;
    status: "verified" | "failed" | "pending" | undefined;
    fee: number;    // in ETH
    isL1Originated: boolean;
    method: string;
    type: string | undefined;
    to: string;
    contractAddress: string;
}