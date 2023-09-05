import {Token, Transaction} from "@/app/assets/interfaces";
import {chainData} from "@/app/assets/chainData";
import React, {useEffect, useState} from "react";
import ActivityData from "@/app/utils/activityData";
// import 'react-circular-progressbar/dist/styles.css';
// import ProgressBar from "@/app/components/customElements/ProgressBar";
import useEthPrice from "@/app/utils/ethPrice";
import {BalanceCardContent} from "@/app/components/resultsPageItems/BalanceCardContent";
// import ZkLiteActivityCard from "@/app/dataRetriever/zkSync/ZkLiteActivityCard";
import { motion } from "framer-motion"
import {Card, CardHeader, CardBody, CardFooter, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import {BsArrowRightShort} from 'react-icons/bs'
import getTimeAgo from "@/app/utils/timeAgo";
import formatMonths from "@/app/utils/formatMonths";
import moment from "moment";
import {TxListDataCard} from "@/app/components/resultsPageItems/TxListDataCard";

function AnalyzedDataCard({txList, balanceList, selectedNetwork, address}: {
    txList: Transaction[],
    balanceList: Token[],
    selectedNetwork: keyof typeof chainData,
    address: string,
}) {
    const [interactionCount, setInteractionCount] = useState(0);
    const [totalVolume, setTotalVolume] = useState(0);
    const [ethVolume, setETHVolume] = useState(0);
    const [totalFee, setTotalFee] = useState(0);
    const activityData = ActivityData({transactionsList: txList});
    const [bridgeInAmount, setBridgeInAmount] = useState(0);
    const [bridgeOutAmount, setBridgeOutAmount] = useState(0);
    const ethPrice = useEthPrice();
    const [zkLiteTxCount, setZkLiteTxCount] = useState<number>(0);
    const [lineaTestnetTxCount, setLineaTestnetTxCount] = useState<number>(0);

    const handleZkLiteTxCountChange = (count: number) => {
        setZkLiteTxCount(count);
    };

    useEffect(() => {
        let count = 0;
        let volume = 0;
        let ethVolume = 0;
        let fees = 0;
        let bridgeInAmount = 0;
        let bridgeOutAmount = 0;

        for (const transaction of txList) {
            if (transaction.status !== "failed") {
                count += 1;
                fees += transaction.fee;
                volume += transaction.valueInUSD;
            }

            // if (transaction.status === "verified") {
            //
            // }

            if (transaction.value.includes("ETH")) {
                ethVolume += transaction.valueInUSD;
            }


            if (transaction.type === 'bridgeIn') {
                bridgeInAmount += transaction.valueInUSD;
            } else if (transaction.type === 'bridgeOut') {
                bridgeOutAmount += transaction.valueInUSD;
            }

        }
        setInteractionCount(count);
        setTotalVolume(volume);
        setETHVolume(ethVolume);
        setTotalFee(fees);
        setBridgeInAmount(bridgeInAmount);
        setBridgeOutAmount(bridgeOutAmount);
    }, [txList]);


    return (
        <>
            <section className={`gap-8 grid grid-cols-2 sm:grid-cols-4`}>
                <Card>
                    <CardBody>
                        <h1 className={'text-sm'}>Interactions</h1>
                        <h3 className={'text-3xl'}>{interactionCount}</h3>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <h1 className={'text-sm'}>Aggregate Value</h1>
                        <h3 className={'text-3xl'}>
                            {selectedNetwork === 'zksync' ? totalVolume.toFixed(2) : ethVolume.toFixed(2)}
                            <span className={'text-sm text-gray-400'}>
                            {chainData[selectedNetwork].type === 'main' ? (
                                selectedNetwork === 'zksync' ? `(${(totalVolume / ethPrice).toFixed(4)}Ξ)` : `(${(ethVolume / ethPrice).toFixed(4)}Ξ)`
                            ) : (
                                '($0:testnet)'
                            )}
                          </span>
                        </h3>
                        {selectedNetwork === 'zksync' ? (
                                <p className={'flex items-center text-xs mt-5'}>ETH <BsArrowRightShort/>
                                    {chainData[selectedNetwork].type === 'main' ?
                                        <p>${ethVolume.toFixed(2)}
                                            <span> ({(ethVolume / ethPrice).toFixed(4)} Ξ)</span>
                                        </p>
                                        : `($0:testnet)`}
                                </p>
                            ) : null
                        }
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                                <h1 className={'text-sm'}>Bridge</h1>
                                <h3 className={'text-3xl'}>${bridgeInAmount.toFixed(2)}
                                    <span className={'text-sm text-gray-400'}>({(bridgeInAmount/ethPrice).toFixed(4)}Ξ)</span>
                                </h3>
                                <p className={'flex items-center text-xs mt-5'}>out <BsArrowRightShort/>
                                    {chainData[selectedNetwork].type === 'main' ?
                                        <p>${bridgeOutAmount.toFixed(2)}
                                            <span> ({(bridgeOutAmount/ethPrice).toFixed(4)}Ξ)</span>
                                        </p>
                                        : `($0:testnet)`}
                                </p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <h1 className={'text-sm'}>Fee</h1>
                        <h3 className={'text-3xl'}>
                            {chainData[selectedNetwork].type === 'main' ? (
                                <>
                                    {`$${(totalFee * ethPrice).toFixed(2)}`}{' '}
                                    <span className={'text-sm text-gray-400'}>({totalFee.toFixed(5)} Ξ)</span>
                                </>
                            ) : (`${totalFee.toFixed(5)} Ξ`)}
                        </h3>
                    </CardBody>
                </Card>
            </section>
            <section className={`mt-8 gap-8 grid grid-cols-1 sm:grid-cols-2`}>

                <BalanceCardContent balanceList={balanceList} selectedNetwork={selectedNetwork}/>

                <Table isStriped hideHeader aria-label="activity">
                    <TableHeader>
                        <TableColumn>Title</TableColumn>
                        <TableColumn>Data</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>Last Activity</TableCell>
                            <TableCell>{getTimeAgo(activityData.lastTransactionDate)}</TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell>Active Day(s)</TableCell>
                            <TableCell>{activityData.uniqueDaysCount}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>Active Week(s)</TableCell>
                            <TableCell>{activityData.uniqueWeeksCount}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>Active Months(s)</TableCell>
                            <TableCell>
                                <p>{activityData.uniqueMonthsCount}
                                    {activityData.uniqueMonths.length > 0 && (
                                        <span className={"text-xs text-gray-400"}>
                                            &nbsp;&nbsp;({formatMonths(activityData.uniqueMonths)}) {moment(activityData.uniqueMonths[0]).format("YYYY")}
                                    </span>
                                    )}
                                </p>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>
            <section className={'mt-8'}>
                <TxListDataCard txList={txList} selectedNetwork={selectedNetwork} />
            </section>
        </>
    );
}

export default AnalyzedDataCard;