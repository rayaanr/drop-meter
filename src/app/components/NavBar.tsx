import React from "react";

const TopNav = () => {
    return (
        <nav className="bg-black border-b border-gray-600 fixed w-full">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="" className="flex items-center">
                    <img src={"./DropMeterLogo.png"} alt={"DropMeterLogo"} className={"w-40"}></img>
                </a>
                <div className="flex md:order-2">
                    <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search"
                            aria-expanded="false"
                            className="md:hidden text-gray-500  hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 mr-1">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span className="sr-only">Search icon</span>
                        </div>
                        <input type="text" id="search-navbar"
                               className="block w-full p-2 pl-10 text-sm bg-opacity-20 bg-gray-400 border border-gray-600 text-white-900 focus:border-white rounded-lg "
                               placeholder="Search..."></input>
                    </div>
                    <button data-collapse-toggle="navbar-search" type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            aria-controls="navbar-search" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                     id="navbar-search">
                    <div className="relative mt-3 md:hidden">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="text" id="search-navbar"
                               className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                               placeholder="Search..."></input>
                    </div>
                    <ul className="flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0">
                        <li>
                            <a href="#"
                               className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                               aria-current="page">Analytics</a>
                        </li>
                        <li>
                            <a href="/sybil"
                               className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Sybil</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

)
};

export default TopNav;













// <nav className={"w-full border-b border-gray-600 fixed flex justify-between p-4"}>
//     <a href={""} className={"c-1 flex items-center"}>
//         <img src={"./DropMeterLogo.png"} alt={"DropMeterLogo"} className={"w-40"}></img>
//     </a>
//     <div className={"c-2 flex items-center"}>
//         <a href={""} className={"mr-4"}>Analytics</a>
//         <a href={""} className={"mr-4"}>Sybil Check</a>
//     </div>
//     <div className={"c-3 flex gap-1"}>
//         <input type={"text"} className={"p-2.5 rounded bg-gray-400 bg-opacity-20 text-sm  bg-opacity-20 bg-gray-400 text-white-90"} placeholder={"New Address"}/>
//         <a href={""} className={"p-2 rounded bg-gray-400 bg-opacity-20"}>Support 🤗️</a>
//     </div>
// </nav>