import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface AccordionProps {
    children: React.ReactNode;
}

const Accordion = ({ children }: AccordionProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const filteredChildren = React.Children.toArray(children).filter(
        (child) => React.isValidElement(child)
    );

    return (
        <div className="accordion">
            <div className="accordion-header flex justify-between items-center" onClick={toggleAccordion}>
                {filteredChildren.filter((child) => child.type === AccordionHeader)}
                <div className="accordion-icon">
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
            </div>
            {isOpen && (
                <div className="accordion-content overflow-scroll" style={{ maxHeight: "25vh" }}>
                    {filteredChildren.filter((child) => child.type === AccordionContent)}
                </div>
            )}
        </div>
    );
};

const AccordionHeader = ({ children }: AccordionProps) => {
    return <>{children}</>;
};

const AccordionContent = ({ children }: AccordionProps) => {
    return <>{children}</>;
};

export { Accordion, AccordionHeader, AccordionContent };
