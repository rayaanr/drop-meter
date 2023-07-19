'use client'

import React from "react";
import SelectionForm from "@/app/components/SelectionForm";

function Home() {

    return (
        <>
            <main className="flex justify-center items-center h-full text-center" style={{ height: "100dvh", width: "100dvw" }}>
                <div className="lg:w-9/12 md:w-3/4 sm:w-full pt-10">
                    <h1 className="title mb-14 pb-2.5 lg:text-6xl md:text-6xl text-4xl font-bold leading-snug tracking-tight text-gray-900">
                        Get Stats. Increase Points.<br />Be Eligible.
                    </h1>
                    <SelectionForm closeModal={() => {}}/>
                </div>
            </main>
        </>
    );
}

export default Home;