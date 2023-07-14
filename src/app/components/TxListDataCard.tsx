import {Transaction} from "@/app/global/interfaces";
import moment from "moment";
import timeAgo from "@/app/utils/timeAgo";
import {chainData} from "@/app/global/chainData";
import {AiOutlineFileDone} from "react-icons/ai";
import { MdOutlineErrorOutline, MdOutlinePending } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";


function shortenTx(hash: string, length: number) {
    const prefix = hash.slice(0, length / 2);
    const suffix = hash.slice(-length / 2);
    return `${prefix}...${suffix}`;
}

function TxListDataCard({ txList , selectedNetwork }: { txList: Transaction[] , selectedNetwork: keyof typeof chainData}) {

    return (
        <>
        <div className="relative h-[454px] overflow-x-auto rounded-lg border border-gray-400 p-5">
            <table className="w-full text-sm text-left text-white">
                <thead className="text-xs text-white uppercase bg-gray-400 bg-opacity-20 ">
                <tr className={""}>
                    <th scope="col" className="px-2 py-3"></th>
                    <th scope="col" className="px-6 py-3">Txn Hash</th>
                    <th scope="col" className="px-6 py-3 text-center">Method</th>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3">From &nbsp;&rarr;&nbsp; To</th>
                    <th scope="col" className="px-6 py-3">Amount</th>
                    <th scope="col" className="px-6 py-3">Fee</th>
                </tr>
                </thead>
                <tbody>
                {txList.map((transaction, index) => (
                    <tr key={index}
                        className="border-b border-b-gray-600">
                        <td className="px-2 py-4 text-xs text-gray-400">
                            {index + 1} &nbsp;
                        </td>
                        <td className="px-2 py-4 font-medium text-white whitespace-nowrap">
                            {transaction.status === "verified" ? <IoCheckmarkDoneCircleOutline className={"inline-block mr-2 text-green-500"}/> : transaction.status === "failed" ? <MdOutlineErrorOutline className={"inline-block mr-2 text-red-500"}/> :  <MdOutlinePending className={"inline-block mr-2 text-yellow-500"}/> }
                            <a href={`${chainData[selectedNetwork].hashLinkEndpoint}${transaction.transactionHash}`} className={"hover:text-blue-500 duration-200"}>
                                {shortenTx(transaction.transactionHash, 10)}
                            </a>
                        </td>
                        <td className="px-6 py-4 text-center">
                            <span className={"bg-blue-900 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-900"}>{transaction.type}</span>
                            {/*{transaction.method === "in" ? <span className={"text-green-600 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-400"}>in</span> : <span></span>}*/}
                        </td>
                        <td className="px-6 py-4">
                            {timeAgo(transaction.datetime)}
                            {/*{moment(transaction.datetime).format("lll")}*/}
                        </td>
                        <td className="px-6 py-4">
                            {shortenTx(transaction.initiatorAddress, 10)} &nbsp;&rarr;&nbsp; {shortenTx(transaction.contractAddress, 10)}
                        </td>
                        <td className="px-6 py-4 flex justify-between">
                            {(transaction.value === "") ? <span>-</span> : <span className={"text-gray-400 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-500"}>{transaction.value} </span>}
                            {transaction.valueInUSD === 0 ? <span>-</span> : <span>${transaction.valueInUSD} </span>}
                        </td>
                        <td className="px-6 py-4">
                            ${transaction.fee.toFixed(2)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export { TxListDataCard };
