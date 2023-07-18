'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

async function fetchCSVData(fileUrl:string) {
    const response = await axios.get(fileUrl);
    return response.data;
}

export default function YourComponent() {
    const [enteredData, setEnteredData] = useState('');
    const [addressError, setAddressError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sybilStatus, setSybilStatus] = useState('');

    useEffect(() => {
        if (enteredData.length >= 1 && !isValidEthereumAddress(enteredData)) {
            setAddressError('Not a valid address');
        } else {
            setAddressError('');
        }
    }, [enteredData]);

    const isValidEthereumAddress = (address:string) => {
        return /^0x[0-9A-Fa-f]{40}$/.test(address);
    };

    const handleDataCheck = async () => {
        if (isValidEthereumAddress(enteredData)) {
            try {
                setIsLoading(true);
                const arbSybilFile = await fetchCSVData('/sybilList/HopSybilList.csv');
                const opSybilFile = await fetchCSVData('/sybilList/OPSybilList.csv');

                const isDataInArbList = arbSybilFile.includes(enteredData.toLowerCase());
                const isDataInOpList = opSybilFile.includes(enteredData.toLowerCase());

                if (isDataInArbList && isDataInOpList) {
                    setSybilStatus('Available in both lists');
                } else if (isDataInArbList) {
                    setSybilStatus('Available in ARB List');
                } else if (isDataInOpList) {
                    setSybilStatus('Available in OP List');
                } else {
                    setSybilStatus('Not available in both ARB and OP lists');
                }
            } catch (error) {
                console.error('Error occurred while checking data:', error);
            } finally {
                setIsLoading(false);
                setEnteredData('');
            }
        } else {
            setAddressError('Please enter a valid address');
        }
    };

    return (
        <main className="flex justify-center items-center" style={{ height: '100vh', width: '100vw' }}>
            <div className="w-1/2 flex flex-col items-center">
                <form className="w-3/4 relative">
                    <input type="text" id="address"
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="" value={enteredData} onChange={(e) => setEnteredData(e.target.value)}
                    />
                    <label htmlFor="floating_outlined"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-black px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                        Address
                    </label>
                </form>
                <button type="button" onClick={handleDataCheck}
                    className="relative inline-flex items-center justify-center p-0.5 mt-10 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white">
          <span className="relative px-5 py-2.5 transition-all ease-in-out duration-300 bg-black rounded-md group-hover:bg-opacity-0">
            &nbsp; Check Sybil &nbsp; &rarr; &nbsp;
          </span>
                </button>
                {addressError && <div id="warning" className="text-red-500 p-2 font-light">{addressError}</div>}
                {isLoading
                    ? <p>Loading...</p>
                    : sybilStatus && <p>{sybilStatus}</p>}
            </div>
        </main>
    );
}
