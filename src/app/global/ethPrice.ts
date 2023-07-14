import { useState, useEffect } from 'react';

let ethPrice = null;

const useEthPrice = () => {
    const [price, setPrice] = useState(ethPrice);

    useEffect(() => {
        const fetchEthPrice = async () => {
            try {
                const response = await fetch('https://api.coinbase.com/v2/prices/ETH-USD/buy');
                const data = await response.json();
                ethPrice = data.data.amount;
                setPrice(ethPrice);
            } catch (error) {
                console.error('Error fetching ETH price:', error);
            }
        };

        fetchEthPrice();
    }, []);

    return price;
};

export default useEthPrice;
