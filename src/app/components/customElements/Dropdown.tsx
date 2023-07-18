'use client'

import React, {useState} from 'react';
import {chainData} from '@/app/global/chainData';
import Image from "next/image";
import { FaPlus } from 'react-icons/fa';

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
            <div className="relative">
                <button onClick={() => setIsOpen(!isOpen)} type="button"
                    className="text-white rounded text-sm w-24 py-2.5 text-center flex justify-center items-center bg-blue-600 hover:bg-blue-700">
                    {selectedOption ? (
                        <span className={'flex'}>
                            <Image src={selectedOption.image} alt={selectedOption.label} className="option-image w-[1.1rem]" height={100} width={100}/>
                            {selectedOption.label}
                        </span>
                    ) : ('Select')}
                </button>

                {isOpen && (
                    <div className="absolute top-full mt-2 divide-y divide-gray-100 rounded-lg shadow bg-gray-700 "
                        style={{left: '50%', transform: 'translateX(-50%)'}}>
                        <ul className="py-2 text-sm text-gray-200 w-32">
                            {options.map((option) => (
                                <li key={option.value}>
                                    <button onClick={() => handleOptionClick(option)}
                                        className="w-full px-4 py-2 hover:bg-gray-600 flex items-center gap-2">
                                        <div className={'rounded-full border border-white bg-black'}>
                                            <Image src={option.image} alt={option.label} className="option-image w-5 h-5 m-1 " height={100} width={100}/>
                                        </div>
                                        {option.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export {Dropdown};