import { Transaction } from "@/app/global/interfaces";
import { chainData } from "@/app/global/chainData";
import { useState, useEffect } from "react";
import ActivityData from "@/app/utils/activityData";
import moment from "moment";
import formatMonths from "@/app/utils/formatMonths";
import getTimeAgo from "@/app/utils/timeAgo";

function SummaryCard({ txList, selectedNetwork }: { txList: Transaction[], selectedNetwork: keyof typeof chainData }) {
    const [totalVolume, setTotalVolume] = useState(0);
    const [ethVolume, setETHVolume] = useState(0);
    const [totalFee, setTotalFee] = useState(0);
    const activityData = ActivityData({ transactionsList: txList });

    useEffect(() => {
        let volume = 0;
        let ethVolume = 0;
        let fees = 0;

        for (const transaction of txList) {
            volume += transaction.valueInUSD;
            if (transaction.value.includes("ETH")) {
                ethVolume += transaction.valueInUSD;
            }
            fees += transaction.fee;
        }
        setTotalVolume(volume);
        setETHVolume(ethVolume);
        setTotalFee(fees);
    }, [txList]);


    return (
        <>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <tbody>
                    <tr className="border-b border-gray-500">
                        <th scope="row" className="px-6 py-4">Interactions</th>
                        <td className="px-6 py-4">-</td>
                        <td className="px-6 py-4">{txList.length}</td>
                    </tr>
                    <tr className="border-b border-gray-500">
                        <th scope="row" className="px-6 py-4">Aggregate Value</th>
                        <td className="px-6 py-4">-</td>
                        <td className="px-6 py-4">
                            <tr className="">
                                <td scope="row" className="px-0 py-0">Total</td>
                                <td className="px-6 py-0">${totalVolume.toFixed(2)}</td>
                            </tr>
                            <tr className="">
                                <td scope="row" className="px-0 py-0">ETH</td>
                                <td className="px-6 py-0">${ethVolume.toFixed(2)}</td>
                            </tr>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-500">
                        <th scope="row" className="px-6 py-4">Bridge</th>
                        <td className="px-6 py-4">-</td>
                        <td className="px-6 py-4">#</td>
                    </tr>
                    <tr className="border-b border-gray-500">
                        <th scope="row" className="px-6 py-4">Fee</th>
                        <td className="px-6 py-4">-</td>
                        <td className="px-6 py-4">{totalFee.toFixed(5)} ETH</td>
                    </tr>
                    <tr className="border-b border-gray-500">
                        <th scope="row" className="px-6 py-4">Activity</th>
                        <td className="px-6 py-4">-</td>
                        <td className="px-6 py-4 leading-loose">
                            <tr className="">
                                <td scope="row" className="px-0 py-0">Last activity</td>
                                <td className="px-6 py-0">{getTimeAgo(activityData.lastTransactionDate)}</td>
                            </tr>
                            <tr className="">
                                <td scope="row" className="px-0 py-0">Active day(s)</td>
                                <td className="px-6 py-0">{activityData.uniqueDaysCount}</td>
                            </tr>
                            <tr className="">
                                <td scope="row" className="px-0 py-0">Active week(s)</td>
                                <td className="px-6 py-0">{activityData.uniqueWeeksCount}</td>
                            </tr>
                            <tr className="">
                                <td scope="row" className="px-0 py-0">Active months(s)</td>
                                <td className="px-6 py-0">
                                    {activityData.uniqueMonthsCount}
                                    {activityData.uniqueMonths.length > 0 && (
                                        <span className={"text-gray-400 text-xs mr-2 px-2.5 py-0.5"}>
                                        ({formatMonths(activityData.uniqueMonths)}) {moment(activityData.uniqueMonths[0]).format("YYYY")}
                                    </span>
                                    )}
                                </td>
                            </tr>

                            {/*First activity : {getTimeAgo(activityData.firstTransactionDate)} | {moment(activityData.firstTransactionDate).format("LL")}<br/>*/}
                        </td>
                    </tr>
                    <tr className="border-b border-gray-500">
                        <th scope="row" className="px-6 py-4">Balance</th>
                        <td className="px-6 py-4">-</td>
                        <td className="px-6 py-4">#</td>
                    </tr>
                    <tr className="border-b border-gray-500">
                        <th scope="row" className="px-6 py-4">Protocols</th>
                        <td className="px-6 py-4">-</td>
                        <td className="px-6 py-4">#</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            </>
    );
}

export default SummaryCard;


