'use client'

import React, {useEffect, useState} from "react";
import { useRouter } from 'next/navigation';
import {Dropdown} from "@/app/components/customElements/Dropdown";

function Home() {

    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [selectedNetwork, setSelectedNetwork] = useState(null);
    const router = useRouter();

    const handleNetworkSelect = (value : any) => {
        setSelectedNetwork(value);
    };

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
      <>
    <main className={"flex justify-center items-center h-full text-center"} style={{height: "100dvh", width: "100dvw"}}>
      <div className={"lg:w-9/12 md:w-3/4 sm:w-full pt-10"}>
          <h1 className="title mb-14 pb-2.5 text-6xl font-bold leading-snug tracking-tight text-gray-900 ">
              Get Stats. Increase Points.<br/>Be Eligible.
          </h1>
        <form className={"flex justify-center"} onSubmit={handleSubmit}>
            <div className="flex justify-center items-center gap-2 lg:w-3/4 md:w-3/4 sm:w-full">
                <div className="lg:w-3/4 md:w-3/4 sm:">
                    <div className="relative">
                        <input type="text" id="address"
                               className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" " onChange={handleInputChange}/>
                        <label htmlFor="floating_outlined"
                               className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-black px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                            Address
                        </label>
                    </div>

                </div>
                <div className="">
                    <Dropdown onSelect={handleNetworkSelect} />
                </div>
            </div>

        </form>


          <button type="submit" onClick={handleSubmit}
              className="relative inline-flex items-center justify-center p-0.5 mt-10 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white ">
              <span
                  className="relative px-5 py-2.5 transition-all ease-in-out duration-300 bg-black rounded-md group-hover:bg-opacity-0">
                  &nbsp; View Stats &nbsp; &rarr; &nbsp;
              </span>
          </button>
          {error && <div id="warning" className="text-red-500 p-2 font-light">{error}</div>}
      </div>
    </main>
          </>
  )
}

export default Home;