'use client'

import { useState } from 'react';
import axios from 'axios';

async function fetchCSVData(fileUrl: string) {
    const response = await axios.get(fileUrl);
    return response.data;
}

export default function YourComponent() {
    const [enteredData, setEnteredData] = useState('');
    const [isDataInArbList, setIsDataInArbList] = useState(false);
    const [isDataInOpList, setIsDataInOpList] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDataCheck = async () => {
        try {
            setIsLoading(true);
            const arbSybilFile = await fetchCSVData('/sybilList/HopSybilList.csv');
            const opSybilFile = await fetchCSVData('/sybilList/OPSybilList.csv');

            setIsDataInArbList(arbSybilFile.includes(enteredData));
            setIsDataInOpList(opSybilFile.includes(enteredData));
        } catch (error) {
            console.error('Error occurred while checking data:', error);
        } finally {
            setIsLoading(false);
            setEnteredData(''); // Reset the enteredData state to an empty string
        }
    };

    return (
        <div>
            <input type="text" className={"m-20 bg-black"} value={enteredData} onChange={(e) => setEnteredData(e.target.value)} />
            <button onClick={handleDataCheck}>Check Data</button>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {isDataInArbList && <p>Available in ARB List</p>}
                    {isDataInOpList && <p>Available in OP List</p>}
                    {!isDataInArbList && !isDataInOpList && <p>Not Available</p>}
                </div>
            )}
        </div>
    );
}