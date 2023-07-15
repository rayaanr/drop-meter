import {Token, Transaction} from "@/app/global/interfaces";
import {chainData} from "@/app/global/chainData";
import {useEffect, useState} from "react";
import ActivityData from "@/app/utils/activityData";
import 'react-circular-progressbar/dist/styles.css';
import ProgressBar from "@/app/components/customElements/ProgressBar";
import useEthPrice from "@/app/global/ethPrice";
import {BalanceCardContent} from "@/app/components/customElements/fullDataItems/BalanceCardContent";
import {ActivityCardContent} from "@/app/components/customElements/fullDataItems/ActivityCardContent";


function FullDataCard({txList, balanceList, selectedNetwork}: {
    txList: Transaction[],
    balanceList: Token[],
    selectedNetwork: keyof typeof chainData
}) {
    const [interactionCount, setInteractionCount] = useState(0);
    const [totalVolume, setTotalVolume] = useState(0);
    const [ethVolume, setETHVolume] = useState(0);
    const [totalFee, setTotalFee] = useState(0);
    const activityData = ActivityData({transactionsList: txList});
    const ethPrice = useEthPrice();

    useEffect(() => {
        let count = 0;
        let volume = 0;
        let ethVolume = 0;
        let fees = 0;

        for (const transaction of txList) {
            if (transaction.status === "verified" && transaction.method !== "in") {
                count += 1;
            }
            volume += transaction.valueInUSD;
            if (transaction.value.includes("ETH")) {
                ethVolume += transaction.valueInUSD;
            }
            fees += transaction.fee;
        }
        setInteractionCount(count);
        setTotalVolume(volume);
        setETHVolume(ethVolume);
        setTotalFee(fees);
    }, [txList]);


    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
                <tbody>
                <tr className="border-b border-gray-500">
                    <th scope="row" className="px-6 py-4">Interactions</th>
                    <td className="px-2 py-2 "><ProgressBar progress={interactionCount} type={"Interactions"}/></td>
                    <td className="px-6 py-4">{interactionCount}</td>
                </tr>
                <tr className="border-b border-gray-500">
                    <th scope="row" className="px-6 py-4">Aggregate Value</th>
                    <td className="px-2 py-2 "><ProgressBar progress={Math.floor(totalVolume)} type={"Volume"}/></td>
                    <td className="px-6 py-4 leading-relaxed">
                        <table>
                            <tbody>
                            <tr className="">
                                <td scope="row" className="px-0 py-0">Total</td>
                                <td className="px-6 py-0">${totalVolume.toFixed(2)} ( {(totalVolume/ethPrice).toFixed(4)} Ξ )</td>
                            </tr>
                            <tr className="">
                                <td scope="row" className="px-0 py-0">ETH</td>
                                <td className="px-6 py-0">${ethVolume.toFixed(2)} ( {(ethVolume/ethPrice).toFixed(4)} Ξ )</td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr className="border-b border-gray-500">
                    <th scope="row" className="px-6 py-4">Bridge</th>
                    <td className="px-6 py-4">-</td>
                    <td className="px-6 py-4">#</td>
                </tr>
                <tr className="border-b border-gray-500">
                    <th scope="row" className="px-6 py-4">Fee</th>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4">{totalFee.toFixed(5)} ETH (${(totalFee*ethPrice).toFixed(2)})</td>
                </tr>
                <tr className="border-b border-gray-500">
                    <th scope="row" className="px-6 py-4">Activity</th>
                    <td className="px-2 py-2 "><ProgressBar progress={activityData.uniqueMonthsCount} type={"Activity"}/></td>
                    <td className="px-6 py-4 leading-loose"><ActivityCardContent activityData={activityData}/></td>
                </tr>
                <tr className="border-b border-gray-500">
                    <th scope="row" className="px-6 py-4">Balance</th>
                    <td className="px-2 py-2">
                        <ProgressBar
                            progress={
                                balanceList.reduce((progress, token) => {
                                    if (
                                        (token.contractAddress === "0x000000000000000000000000000000000000800a" || '0x0000000000000000000000000000000000000000' ||
                                            token.contractAddress === "0x000000000000000000000000000000000000800a".toUpperCase()) &&
                                        token.price !== undefined
                                    ) {
                                        console.log('prop', progress + Math.floor(token.balance * ethPrice));
                                        return progress + Math.floor(token.balance * ethPrice);
                                    }
                                    return progress;
                                }, 0)
                            }
                            type={"Balance"}
                        />
                    </td>
                    <td className="px-6 py-4"><BalanceCardContent balanceList={balanceList}/></td>
                </tr>
                <tr className="border-b border-gray-500">
                    <th scope="row" className="px-6 py-4">Protocols</th>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4">#</td>
                </tr>
                {selectedNetwork === 'zksync' && (
                    <tr className="border-b border-gray-500">
                        <th scope="row" className="px-6 py-4">zkLite</th>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4">-</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default FullDataCard;