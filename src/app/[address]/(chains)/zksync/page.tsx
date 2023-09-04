'use client'

interface PageProps {
    params: { address: string };
}

export default function Page({ params }: PageProps) {

    return (
        <>
            <main className='flex justify-center items-center'>
                <div className='w-3/4 flex flex-col justify-center items-center text-center'>
                    <h1>
                        {params.address}
                    </h1>
                </div>
            </main>
        </>

    );
}
