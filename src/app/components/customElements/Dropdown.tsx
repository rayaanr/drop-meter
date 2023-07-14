import React, {useState} from 'react';
import {chainData} from '@/app/global/chainData';

interface Option {
    label: string;
    value: string;
    image: any;
}

interface CustomDropdownProps {
    onSelect: (value: string) => void;
}

const Dropdown: React.FC<CustomDropdownProps> = ({onSelect}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const options: Option[] = [
        {
            label: 'ZkSync',
            value: 'zksync',
            image: `${chainData.zkera.logo}`,
        },
        {
            label: 'Scroll',
            value: 'scroll',
            image: `${chainData.scroll.logo}`,
        },
        {
            label: 'Linea',
            value: 'linea',
            image: `${chainData.linea.logo}`,
        },
    ];

    const handleOptionClick = (option: Option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option.value);
    };

    return (
        <>
            <div className="relative">
                <button onClick={() => setIsOpen(!isOpen)} type="button"
                    className="text-white rounded text-sm w-24 py-2.5 text-center flex justify-center items-center bg-blue-600 hover:bg-blue-700 ">
                    {selectedOption ? (
                        <span className={'flex'}>
                            <img src={selectedOption.image} alt={selectedOption.label} className="option-image w-[1.1rem]"/>
                            {selectedOption.label}
                        </span>
                    ) : ('Select')}
                </button>

                {isOpen && (
                    <div className="absolute top-full z-10 mt-2 divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700 "
                        style={{left: '50%', transform: 'translateX(-50%)'}}>
                        <ul className="py-2 text-sm text-gray-200">
                            {options.map((option) => (
                                <li key={option.value}>
                                    <button onClick={() => handleOptionClick(option)}
                                        className="w-full px-4 py-2 hover:bg-gray-600 flex items-center gap-2">
                                        <div className={'rounded-full border border-white bg-black'}>
                                            <img src={option.image} alt={option.label} className="option-image w-5 h-5 m-1 "/>
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