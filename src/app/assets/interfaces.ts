export interface Token {
    name: string;
    address: string;
    symbol: string;
    price: number | undefined;
    contractAddress: string;
    decimals: number;
    balance: number;
    type: string;
}

export interface Transfer {
    transactionHash: string;
    amount: number;
    token: Token;
    type: 'main' | 'test';
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
    method: "out" | "in" | undefined;
    type: string | undefined;
    to: string;
    contractAddress: string;
}

export interface ChainLiteData {
    type: 'main' | 'test' ;
    interactions: number;
    balances: Token[];
    fees: number;
    activity: {
        latestActivity?: string;
        activatedOn?: string;
    }
}

export interface ProtocolsData {
    name: string;
    id: string;
    logo: string;
    url: string;
    addresses: string[];
}