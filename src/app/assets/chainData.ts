type ChainItem = {
    [key: string]: ChainItemData;
};

type ChainItemData = {
    name: string;
    value: string;
    type: string;
    logo: string;
    txDataAPI: string;
    internalTxDataAPI?: string;
    balanceDataAPI: string;
    ethBalanceAPI: string;
    hashLinkEndpoint: string;
    tokenTransferDataAPI: string;
    addresses: any;
    lite: {
        name: string,
        value: string,
        type: 'main' | 'test'
        logo : any,
        api?: any
    }
};

export const chainData: ChainItem = {
    zksync: {
        name: 'ZkSync',
        value: 'zksync',
        type: 'main',
        logo : '/img/zk.svg',
        txDataAPI : ``,
        balanceDataAPI : `https://zksync2-mainnet.zkscan.io/api?module=account&action=tokenlist&address=`,
        ethBalanceAPI : ``,
        hashLinkEndpoint : `https://explorer.zksync.io/tx/`,
        tokenTransferDataAPI : ``,
        addresses: '',
        lite: {
            name: 'ZkSync Lite',
            value: 'zksyncT',
            type: 'main',
            logo : '/img/zklite.svg',
        }
    },
    scroll: {
        name: 'Scroll',
        value: 'scroll',
        type: 'test',
        logo: '/img/scroll.svg',
        txDataAPI : `https://blockscout.scroll.io/api?module=account&action=txlist&startblock=0&endblock=latest&sort=desc&address=`,
        balanceDataAPI : `https://blockscout.scroll.io/api?module=account&action=tokenlist&address=`,
        ethBalanceAPI : `https://blockscout.scroll.io/api?module=account&action=eth_get_balance&address=`,
        hashLinkEndpoint : `https://blockscout.scroll.io/tx/`,
        tokenTransferDataAPI : `https://blockscout.scroll.io/api?module=account&action=tokentx&address=`,
        addresses: {
            nativeBridge : '',
            protocols: [{
                scrollBridgeIn : '',
                scrollBridgeOut : '0x6d79aa2e4fbf80cf8543ad97e294861853fb0649',
                scrollScanFaucet : '0xb8e0eBcea9418720192F0A88526854f02b1F77E6',
                orbiterBridgeIn : '0xa08606a85bf58afb7c3d464fc6cf78a159933dd1',
            }]
        },
        lite: {
            name: '',
            value: '',
            type: 'test',
            logo : '',
        }
    },
    linea: {
        name: 'Linea',
        value: 'linea',
        type: 'main',
        logo: '/img/linea1.svg',
        txDataAPI : `https://api.lineascan.build/api?module=account&action=txlist&startblock=1&endblock=99999999&sort=asc&address=`,
        internalTxDataAPI : `https://api.lineascan.build/api?module=account&action=txlistinternal&startblock=1&endblock=99999999&sort=asc&address=`,
        balanceDataAPI : `https://api.lineascan.build/api?module=account&action=balance&tag=latest&address=`,
        ethBalanceAPI : `https://api.lineascan.build/api?module=account&action=balance&tag=latest&address=`,
        hashLinkEndpoint : `https://lineascan.build/tx/`,
        tokenTransferDataAPI : `https://api.lineascan.build/api?module=account&action=tokentx&startblock=0&endblock=2500000&sort=asc&address=`,
        addresses: '',
        lite: {
            name: 'Linea Testnet',
            value: 'lineaT',
            type: 'test',
            logo: '/img/linea1.svg',
            api : {
                txDataAPI : `https://explorer.goerli.linea.build/api?module=account&action=txlist&address=`,
                balanceDataAPI : `https://explorer.goerli.linea.build/api?module=account&action=tokenlist&address=`,
                ethBalanceAPI : `https://explorer.goerli.linea.build/api?module=account&action=eth_get_balance&address=`,
                hashLinkEndpoint : `https://blockscout.scroll.io/tx/`,
                tokenTransferDataAPI : `https://explorer.goerli.linea.build/api?module=account&action=tokentx&address=`,
                addresses: '',
            }
        }
    },
    polygonZkEVM: {
        name: 'Polygon ZkEVM',
        value: 'polygonZkEVM',
        type: 'main',
        logo: '/img/pzk.svg',
        txDataAPI: `https://explorer.mainnet.zkevm-test.net/api?module=account&action=txlist&address=`,
        balanceDataAPI: `https://explorer.mainnet.zkevm-test.net/api?module=account&action=tokenlist&address=`,
        ethBalanceAPI : `https://explorer.mainnet.zkevm-test.net/api?module=account&action=eth_get_balance&address=`,
        hashLinkEndpoint: `https://explorer.mainnet.zkevm-test.net/tx/`,
        tokenTransferDataAPI: `https://explorer.mainnet.zkevm-test.net/api?module=account&action=tokentx&address=`,
        addresses: '',
        lite: {
            name: '',
            value: '',
            type: 'test',
            logo : '',
        }
    }
};