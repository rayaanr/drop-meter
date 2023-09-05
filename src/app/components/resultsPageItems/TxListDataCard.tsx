import { Transaction } from "@/app/assets/interfaces";
import timeAgo from "@/app/utils/timeAgo";
import { chainData } from "@/app/assets/chainData";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Chip } from "@nextui-org/react";
import { MdOutlineErrorOutline, MdOutlinePending } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import useEthPrice from "@/app/utils/ethPrice";
import React from "react";

function shortenTx(hash: string, length: number) {
    const prefix = hash.slice(0, length / 2);
    const suffix = hash.slice(-length / 2);
    return `${prefix}...${suffix}`;
}

function TxListDataCard({ txList, selectedNetwork }: { txList: Transaction[], selectedNetwork: keyof typeof chainData }) {
    const ethPrice = useEthPrice();

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(txList.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return txList.slice(start, end);
    }, [page, txList]);

    return (
        <>
            <Table aria-label="Balance Table"
                   bottomContent={
                       <div className="flex w-full justify-center">
                           <Pagination
                               isCompact
                               showControls
                               showShadow
                               color="secondary"
                               page={page}
                               total={pages}
                               onChange={(page) => setPage(page)}
                           />
                       </div>
                   }
                   classNames={{
                       wrapper: "min-h-[222px]",
                   }}>
                <TableHeader>
                    <TableColumn>&nbsp;</TableColumn>
                    <TableColumn>Txn Hash</TableColumn>
                    <TableColumn>Method</TableColumn>
                    <TableColumn>Date</TableColumn>
                    <TableColumn>From &nbsp;&rarr;&nbsp; To</TableColumn>
                    <TableColumn>Amount</TableColumn>
                    <TableColumn>Fee</TableColumn>
                </TableHeader>
                <TableBody>
                    {items.map((transaction, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {(page - 1) * rowsPerPage + index + 1}
                            </TableCell>
                            <TableCell>
                                    {transaction.status === "verified" ? <IoCheckmarkDoneCircleOutline className={"inline-block mr-2 text-green-500"} /> : transaction.status === "failed" ? <MdOutlineErrorOutline className={"inline-block mr-2 text-red-500"} /> : <MdOutlinePending className={"inline-block mr-2 text-yellow-500"} />}
                                    <a href={`${chainData[selectedNetwork].hashLinkEndpoint}${transaction.transactionHash}`} className={"hover:text-blue-500 duration-200"}>
                                        {shortenTx(transaction.transactionHash, 10)}
                                    </a>
                            </TableCell>
                            <TableCell className={'flex justify-center'}>
                                <Chip size={'sm'} color={'primary'} className={'text-xs'}>{transaction.type}</Chip>
                            </TableCell>
                            <TableCell>
                                {timeAgo(transaction.datetime)}
                            </TableCell>
                            <TableCell>
                                {shortenTx(transaction.initiatorAddress, 10)} &nbsp;&rarr;&nbsp; {shortenTx(transaction.contractAddress, 10)}
                            </TableCell>
                            <TableCell>
                                {(transaction.value === "") ? <span>-</span> : <span className={"gray-badge"}>{transaction.value} </span>}
                                {transaction.valueInUSD === 0 ? <span>-</span> : <span>${transaction.valueInUSD} </span>}
                            </TableCell>
                            <TableCell>
                                ${(transaction.fee * ethPrice).toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export { TxListDataCard };

