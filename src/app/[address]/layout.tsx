import React from "react";

interface PageProps {
    children: React.ReactNode;
}

export default function AddressLayout({ children}: PageProps) {

    return (
        <>
            {children}
        </>
    );
}
