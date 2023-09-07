'use client'

import Image from "next/image";
import SelectionForm from "@/app/components/selectionForm";
import React from "react";

function Home() {

    return (
        <>
            <main className='flex justify-center items-center'>
                <div className='w-3/4 flex flex-col justify-center items-center text-center'>
                    <Image src='logo.svg' alt='DropMeter' width={400} height={400} className={'mt-12 mb-4'} />
                    <h1 className={'text-5xl title'}>
                        Get Stats. Increase Points. Be Eligible.
                    </h1>
                    <SelectionForm />
                </div>
            </main>
        </>
    );
}

export default Home;