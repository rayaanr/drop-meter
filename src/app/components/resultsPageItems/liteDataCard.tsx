import {Card, CardBody, CardHeader, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import React from "react";
import {chainData} from "@/app/assets/chainData";
import Image from "next/image";
import {ChainLiteData} from "@/app/assets/interfaces";
import timeAgo from "@/app/utils/timeAgo";

function LiteDataCard ({selectedNetwork, liteData }: {selectedNetwork: keyof typeof chainData, liteData?: ChainLiteData }){
    return (
        <>
            <main className={`gap-8 grid grid-cols-1 sm:grid-cols-1`}>
                <Card>
                    <CardHeader className={'flex justify-center'}>
                            {chainData[selectedNetwork].lite.logo?
                                <Image src={chainData[selectedNetwork].lite.logo} height={130} width={130} alt={chainData[selectedNetwork].lite.name} className={' w-36 h-auto mr-2'}/>
                                : chainData[selectedNetwork].lite.name}
                    </CardHeader>
                    <Divider/>
                    <CardBody className={`gap-8 grid grid-cols-2 sm:grid-cols-4`}>
                        <section className={'border-r-1 border-gray-400'}>
                            <h1 className={'text-sm'}>Interactions</h1>
                            <h3 className={'text-3xl'}>{liteData?.interactions}</h3>
                        </section>
                        <section className={'border-r-1 border-gray-400'}>
                            <h1 className={'text-sm'}>Aggregate Value</h1>
                            <h3 className={'text-3xl'}></h3>
                        </section>
                        <section className={'border-r-1 border-gray-400'}>
                            <h1 className={'text-sm'}>Activity</h1>
                            <table>
                                <tbody className={'text-xs'}>
                                    <tr>
                                        <td className={'pr-3'}>Latest Activity</td>
                                        <td>{liteData?.activity?.latestActivity || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td className={'pr-3'}>Activated</td>
                                        <td>{timeAgo(liteData?.activity?.activatedOn || 'N/A')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <section>
                            <h1 className={'text-sm'}>Balance</h1>
                            <h3 className={'text-3xl'}></h3>
                        </section>
                    </CardBody>
                </Card>
            </main>
        </>
    )
}

export default LiteDataCard