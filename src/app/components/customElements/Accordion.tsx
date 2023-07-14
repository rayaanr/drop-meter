import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Accordion = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion">
            <div className="accordion-header flex justify-between items-center" onClick={toggleAccordion}>
                {children.filter(child => child.type === AccordionHeader)}
                <div className="accordion-icon">{isOpen ? <FaChevronUp /> : <FaChevronDown />}</div>
            </div>
            {isOpen && (
                <div className="accordion-content overflow-scroll" style={{ maxHeight: "25vh" }}>
                    {children.filter(child => child.type === AccordionContent)}
                </div>
            )}
        </div>
    );
};

const AccordionHeader = ({ children }) => {
    return <>{children}</>;
};

const AccordionContent = ({ children }) => {
    return <>{children}</>;
};

export { Accordion, AccordionHeader, AccordionContent };
