'use client'

import React, {useState} from 'react';
import {chainData} from '@/app/global/chainData';
import Image from "next/image";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface Option {
    label: string;
    value: string;
    image: any;
}

interface CustomDropdownProps {
    onSelect: (value: string) => void;
    selectedNetwork : string;
}

const Dropdown: React.FC<CustomDropdownProps> = ({onSelect, selectedNetwork}) => {
    const options: Option[] = [];

    for (const key in chainData) {
        if (Object.prototype.hasOwnProperty.call(chainData, key)) {
            const chain = chainData[key as keyof typeof chainData]; // Type assertion
            options.push({
                label: chain.name,
                value: chain.value,
                image: chain.logo,
            });
        }
    }


    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(
        options.find(option => option.value === selectedNetwork) || options[0]
    );

    const handleOptionClick = (option: Option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option.value);
    };

    return (
        <>
            <main className="relative">
                <button onClick={() => setIsOpen(!isOpen)} type="button"
                    className="text-white rounded text-sm lg:w-40 md:w-40 w-fit px-1 py-2 text-center flex justify-center items-center bg-black border border-gray-500 hover:border-blue-700 hover:text-blue-500">
                    {selectedOption ? (
                        <div className={'flex items-center'}>
                            <Image src={selectedOption.image} alt={selectedOption.label} className="option-image w-7 mr-2" height={100} width={100}/>
                            <span className={'lg:block md:block hidden text-xs'}>{selectedOption.label}</span>
                            <span className={`ml-2 font-thin ${isOpen ? 'rotate-180 decoration-4' : ''}`}><FaChevronDown/></span>
                        </div>
                    ) : ('Select')}
                </button>

                {isOpen && (
                    <section className="absolute top-full mt-2 divide-y divide-gray-100 rounded-lg shadow bg-black border border-gray-400"
                        style={{left: '50%', transform: 'translateX(-50%)'}}>
                        <ul className="py-2 text-sm text-gray-200 w-40">
                            {options.map((option) => (
                                <li key={option.value}>
                                    <button onClick={() => handleOptionClick(option)}
                                        className="w-full px-4 py-2 hover:bg-blue-600  flex items-center gap-2">
                                        <div className={''}>
                                            <Image src={option.image} alt={option.label} className="option-image w-5 h-5 m-1 " height={100} width={100}/>
                                        </div>
                                        <span className={'text-xs'}>{option.label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </main>
        </>
    );
};

export {Dropdown};