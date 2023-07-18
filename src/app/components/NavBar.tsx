'use client'

import React, { useState } from "react";
import Image from "next/image";
import { AiOutlineSearch, AiFillHeart } from "react-icons/ai";
import SelectionForm from "@/app/components/SelectionForm";
import {AiOutlineCloseCircle} from "react-icons/ai";

const TopNav = () => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNavbarToggle = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <nav className="backdrop-blur bg-black bg-opacity-75 border-b border-gray-600 fixed w-full z-50">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" className="flex items-center">
                        <Image src={"/DropMeterLogo.png"} alt={"DropMeterLogo"} width={120} height={50}/>
                    </a>
                    <div className="flex md:order-2 gap-4">
                        <button>
                            <AiOutlineSearch className={"text-2xl"} onClick={handleModalToggle}/>
                        </button>

                        <button type="button" className="text-white flex items-center gap-1 bg-gray-500 bg-opacity-50 hover:bg-gray-600 hover:bg-opacity-50 rounded text-sm px-2 py-1">
                            <span className="hidden sm:inline-block">Support</span> <AiFillHeart className="text-lg" />
                        </button>


                        <button onClick={handleNavbarToggle} type="button" aria-controls="navbar-search" aria-expanded={isNavbarOpen ? "true" : "false"}
                            className="inline-flex items-center p-1 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                    </div>
                    <div className={`items-center justify-between ${isNavbarOpen ? "flex" : "hidden"} w-full md:flex md:w-auto md:order-1`} id="navbar-search">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0">
                            <li>
                                <a href="/" aria-current="page" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0">
                                    Analytics
                                </a>
                            </li>
                            <li>
                                <a href="/sybil" className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
                                    Sybil
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
                                    Faucet
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
                                    Revoke
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                    <div className="lg:w-1/2 md:w-3/4 sm:w-full bg-black border border-gray-500 relative pt-20 pb-20">
                        <button onClick={handleModalToggle} className="absolute top-0 right-0 m-4 text-white text-2xl">
                            <AiOutlineCloseCircle/>
                        </button>
                        <div className="flex justify-center items-center h-full text-center">
                            <div className={"w-full"}>
                                <SelectionForm closeModal={closeModal} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TopNav;











                    {/*<div className="absolute z-50 h-1/2 w-1/2 bg-blue-500" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>*/}
                    {/*    <div className="relative">*/}
                    {/*        <button onClick={handleModalToggle} className="absolute top-0 right-0 m-4 text-white text-2xl">*/}
                    {/*            Close*/}
                    {/*        </button>*/}
                    {/*        <div className="p-8" onClick={handleModalToggle}>Hi</div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

