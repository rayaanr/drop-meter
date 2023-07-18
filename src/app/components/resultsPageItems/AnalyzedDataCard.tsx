import {Token, Transaction} from "@/app/global/interfaces";
import {chainData} from "@/app/global/chainData";
import {useEffect, useState} from "react";
import ActivityData from "@/app/utils/activityData";
import 'react-circular-progressbar/dist/styles.css';
import ProgressBar from "@/app/components/customElements/ProgressBar";
import useEthPrice from "@/app/global/ethPrice";
import {BalanceCardContent} from "@/app/components/resultsPageItems/analyzeDataItems/BalanceCardContent";
import {ActivityCardContent} from "@/app/components/resultsPageItems/analyzeDataItems/ActivityCardContent";
import ZkLiteActivityCard from "@/app/dataRetriever/zkSync/ZkLiteActivityCard";
import { motion } from "framer-motion"

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
            if (transaction.status === "verified" && transaction.method !== "in") {
                count += 1;
                fees += transaction.fee;
            }

            if (transaction.status === "verified") {
                volume += transaction.valueInUSD;
            }

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
            <motion.div
                animate={{scale: [0.9, 1.01, 1], opacity: [0, 1],}}
                transition={{ duration: 1, delay: 0.2}}
            >
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left backdrop-blur">
                <tbody>
                <tr className="border-b border-gray-500">
                    <th scope="row" className="cell-style">Interactions</th>
                    <td className="px-2 py-2"><ProgressBar progress={interactionCount} type={"Interactions"}/></td>
                    <td className="cell-style font-bold tracking-wider">{interactionCount}</td>
                </tr>
                <tr className="border-b border-gray-500">
                    <th scope="row" className="cell-style">Aggregate Value</th>
                    <td className="px-2 py-2 "><ProgressBar progress={Math.floor(totalVolume)} type={"Volume"}/></td>
                    <td className="cell-style">
                        <table>
                            <tbody className="leading-loose">
                            <tr>
                                {selectedNetwork === 'zksync' ? (
                                    <>
                                        <td scope="row" className="px-0 py-0 font-light text-xs">Total</td>
                                        <td className="px-4 py-0 tracking-wider">
                                            ${totalVolume.toFixed(2)}{' '}
                                            {chainData[selectedNetwork].type === 'main' ?
                                            <span className="gray-text">
                                                ({(totalVolume / ethPrice).toFixed(4)} Ξ)
                                            </span>
                                                : <span className="gray-text">($0:testnet)</span> }
                                        </td>
                                    </>
                                ) : (
                                    <td></td>
                                )}
                            </tr>
                            <tr>
                                <td scope="row" className="px-0 py-0 font-light text-xs">ETH</td>
                                <td className="px-4 py-0 tracking-wider">{(ethVolume / ethPrice).toFixed(4)} Ξ
                                    {chainData[selectedNetwork].type === 'main' ?
                                        <span className="gray-text">(${ethVolume.toFixed(2)})</span>
                                        : <span className="gray-text">($0:testnet)</span> }
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr className="border-b border-gray-500">
                    <th scope="row" className="cell-style">Bridge</th>
                    <td className="px-2 py-2"><ProgressBar progress={bridgeInAmount} type={"Bridge"}/></td>
                    <td className="cell-style">
                        <table className={"leading-loose"}>
                            <tbody >
                            <tr className="">
                                <td scope="row" className="px-0 py-0 font-light text-xs">In</td>
                                <td className="px-4 py-0 tracking-wider">${bridgeInAmount.toFixed(2)}<span className={"gray-text"}>({(bridgeInAmount/ethPrice).toFixed(4)} Ξ)</span></td>
                            </tr>
                            <tr className="">
                                <td scope="row" className="px-0 py-0 font-light text-xs">Out</td>
                                <td className="px-4 py-0 tracking-wider">${bridgeOutAmount.toFixed(2)}<span className={"gray-text"}>({(bridgeOutAmount/ethPrice).toFixed(4)} Ξ)</span></td>
                            </tr>
                            <tr className="">
                                <td scope="row" className="px-0 py-0 font-light text-xs">Native</td>
                                <td className="px-4 py-0 tracking-wider"><span className={"gray-text"}></span></td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr className="border-b border-gray-500">
                    <th scope="row" className="cell-style">Fee</th>
                    <td className="px-6 py-4"></td>
                    <td className="cell-style">
                        {totalFee.toFixed(5)} Ξ
                        {chainData[selectedNetwork].type === 'main' ?
                        <span className={"gray-text"}>(${(totalFee*ethPrice).toFixed(2)})</span>
                            : <span className={"gray-text"}>($0:testnet)</span>
                        }
                    </td>
                </tr>
                <tr className="border-b border-gray-500">
                    <th scope="row" className="cell-style">Activity</th>
                    <td className="px-2 py-2"><ProgressBar progress={activityData.uniqueMonthsCount} type={"Activity"}/></td>
                    <td className="cell-style"><ActivityCardContent activityData={activityData}/></td>
                </tr>
                <tr className="border-b border-gray-500">
                    <th scope="row" className="cell-style">Balance</th>
                    <td className="px-2 py-2">
                        <ProgressBar
                            progress={
                                balanceList.reduce((progress, token) => {
                                    if (
                                        (token.contractAddress === "0x000000000000000000000000000000000000800a" || '0x0000000000000000000000000000000000000000' ||
                                            token.contractAddress === "0x000000000000000000000000000000000000800a".toUpperCase()) &&
                                        token.price !== undefined
                                    ) {
                                        return progress + Math.floor(token.balance * ethPrice);
                                    }
                                    return progress;
                                }, 0)
                            }
                            type={"Balance"}
                        />
                    </td>
                    <td className="cell-style"><BalanceCardContent balanceList={balanceList} selectedNetwork={selectedNetwork}/></td>
                </tr>
                <tr className="border-b border-gray-500">
                    <th scope="row" className="cell-style">Protocols</th>
                    <td className="px-6 py-4"></td>
                    <td className="cell-style">#</td>
                </tr>
                {selectedNetwork === 'zksync' && (

                    <tr className="border-b border-gray-500">
                        <th scope="row" className="cell-style">zkLite</th>
                        <td className="px-2 py-2 "><ProgressBar progress={zkLiteTxCount} type={"ZkLite"}/></td>
                        <td className="cell-style"><ZkLiteActivityCard address={address} onZkLiteTxCountChange={handleZkLiteTxCountChange}/></td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
                </motion.div>
        </>

    );
}

export default AnalyzedDataCard;