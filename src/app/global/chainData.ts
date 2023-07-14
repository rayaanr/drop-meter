// import {addressList} from "@/app/[address]/addressList";

export const apiKeys = {
    etherscanAPIKey: 'Z6HSI4D6HAI5RBIP25IZRVTW7U8XIRUET9',
    arbiscanAPIKey : 'R9H7CPP13GFZQ94S1M41R47V6KTDAUDEC5',
    polygonscanAPIKey : 'W6Y4B8TZGQH5J83W56BTG45DK3UYBDSXWF',
    polygonzkEVMAPIKey : 'HXJXI87D85F6A5YC9MBM6PQKE9NFTYKSEC',
    optimismscanAPIKey : '6Y37BQAWDWZ293ZZQFAQ3NJTWUMVQCTYFF',
    bscscanAPIKey : 'JA1HCCZHAJPK1PKB457AWEJTGRYU2W7YEG',
    fantomscanAPIKey : 'WAR6UAJ6EC84VCQCRC612X983GNKW9PWWA',
    avaxscanAPIKey : 'N9267PJYVGZEZASDZZ83ZBYZ8TUR7GD84U',
};


const apiEndpoints = {
    etherscanAPIEndpoint: 'https://api.etherscan.io/api',
    scrollscanAPIEndpoint: 'https://blockscout.scroll.io/api',
    arbiscanAPIEndpoint : 'https://api.arbiscan.io/api',
    polygonscanAPIEndpoint : 'https://api.polygonscan.com/api',
    polygonzkEVMAPIEndpoint : 'https://api-zkevm.polygonscan.com/api',
    optimismscanAPIEndpoint : 'https://api-optimistic.etherscan.io/api',
    bscscanAPIEndpoint : 'https://api.bscscan.com/api',
    fantomscanAPIEndpoint : 'https://api.ftmscan.com/api',
    avaxscanAPIEndpoint : 'https://api.snowtrace.io/api',
    aptosscanAPIEndpoint : 'https://api.aptoscan.com/api',
    zksyncscanAPIEndpoint : 'https://zksync2-mainnet-explorer.zksync.io/',
}



export const chainData = {
    eth: {
        txDataAPI : `${apiEndpoints.etherscanAPIEndpoint}?module=account&action=txlist&startblock=0&endblock=latest&sort=desc&apikey=${apiKeys.etherscanAPIKey}&address=`,
        balanceDataAPI : `${apiEndpoints.etherscanAPIEndpoint}?module=account&action=balance&address=${``}&tag=latest&apikey=${apiKeys.etherscanAPIKey}`,
        hashLinkEndpoint : `https://etherscan.io/tx/`,
        tokenTransferDataAPI : ``,
        logo : './assets/chainLogos/ethereum.svg'
    },
    zkera: {
        txDataAPI : ``,
        balanceDataAPI : `https://zksync2-mainnet.zkscan.io/api?module=account&action=tokenlist&address=`,
        hashLinkEndpoint : `https://explorer.zksync.io/tx/`,
        tokenTransferDataAPI : ``,
        logo : '/img/zksync.svg'
    },
    zklite: {
        txDataAPI : `https://api.zksync.io/api/v0.2/accounts/${``}/transactions?from=latest&limit=100&direction=older`,
        balanceDataAPI : `https://api.zksync.io/api/v0.2/accounts/${``}?stateType=finalized`,
        hashLinkEndpoint : `https://explorer.zksync.io/tx/`,
        tokenTransferDataAPI : ``,
        logo : ''
    },
    scroll: {
        txDataAPI : `https://blockscout.scroll.io/api?module=account&action=txlist&startblock=0&endblock=latest&sort=desc&address=`,
        balanceDataAPI : `https://blockscout.scroll.io/api?module=account&action=tokenlist&address=`,
        hashLinkEndpoint : `https://blockscout.scroll.io/tx/`,
        tokenTransferDataAPI : `https://blockscout.scroll.io/api?module=account&action=tokentx&address=`,
        logo: '/img/scroll.png'
    },
    linea: {
        txDataAPI : `https://explorer.goerli.linea.build/api?module=account&action=txlist&address=`,
        balanceDataAPI : `https://explorer.goerli.linea.build/api?module=account&action=tokenlist&address=`,
        hashLinkEndpoint : `https://blockscout.scroll.io/tx/`,
        tokenTransferDataAPI : `https://explorer.goerli.linea.build/api?module=account&action=tokentx&address=`,
        logo: '/img/linea.svg'
    }
};