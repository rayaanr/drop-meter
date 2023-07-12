'use client'

import {useEffect, useState} from "react";
import { useRouter } from 'next/navigation';

function Home() {

    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [selectedNetwork, setSelectedNetwork] = useState('zksync');
    const router = useRouter();

    function isValidEthereumAddress(address:string) {
        return /^0x[0-9A-Fa-f]{40}$/.test(address);
    }

    useEffect(() => {
        if (address.length >= 1 && !isValidEthereumAddress(address)) {
            setError('Not a valid address');
        } else {
            setError('\u00A0');
        }
    }, [address]);

    const handleInputChange = (event:any) => {
        setAddress(event.target.value);
    };

    const handleNetworkChange = (event:any) => {
        setSelectedNetwork(event.target.value);
    }

    const handleSubmit = (event:any) => {
        event.preventDefault();
        if (!address) {
            setError('Address cannot be empty');
            return;
        }
        if (!isValidEthereumAddress(address)) {
            setError('Not a valid address');
            return;
        } else {
            router.push(`/${address}/${selectedNetwork}`);
        }
    };

  return (
    <main className={"flex justify-center items-center h-full text-center"}>
      <div className={"w-1/2 md:w-3/4 sm:w-2/3"}>
          <h1 className="title mb-20 pb-2.5 text-5xl font-bold leading-snug tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Get Stats. Increase Points.<br/>Be Eligible.
          </h1>
        <form className={"flex justify-center"} onSubmit={handleSubmit}>
            <div className="flex justify-between gap-2 ">
                <div className="w-full">
                    <div className="relative">
                        <input type="text" id="address"
                               className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" " onChange={handleInputChange}/>
                        <label htmlFor="floating_outlined"
                               className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-black px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                            Address
                        </label>
                    </div>
                    {/*<input type="text" id="address" aria-describedby="helper-text-explanation"*/}
                    {/*       className={"p-2.5 bg-opacity-20 bg-gray-400 border border-gray-600 text-white-900 text-sm rounded focus:border-white"}*/}
                    {/*      />*/}
                    {error && <div id="warning" className="text-red-500 p-2 font-light">{error}</div>}

                </div>
                <div className="w-1/5">
                    <select name="network" id="selectedNetwork" onChange={handleNetworkChange} className={"p-2.5 bg-opacity-20 bg-gray-400 border border-gray-600 text-white-900 text-sm rounded"}>
                        <option value="zksync">ZKSYNC</option>
                        <option value="scroll">SCROLL</option>
                        <option value="linea">LINEA</option>
                    </select>
                </div>
            </div>
        </form>
          {/*<button type="submit" onClick={handleSubmit}*/}
          {/*        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">*/}
          {/*    &nbsp; View Stats &nbsp; &rarr; &nbsp;*/}
          {/*</button>*/}
          <button type="submit" onClick={handleSubmit}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200 ">
              <span
                  className="relative px-5 py-2.5 transition-all ease-in-out duration-300 bg-black rounded-md group-hover:bg-opacity-0">
                  &nbsp; View Stats &nbsp; &rarr; &nbsp;
              </span>
          </button>
          {/*<button type="submit" onClick={handleSubmit} className={"p-2 border rounded-lg mt-10"}>&nbsp; View Stats &nbsp; &rarr; &nbsp; </button>*/}
      </div>
    </main>
  )
}

export default Home;