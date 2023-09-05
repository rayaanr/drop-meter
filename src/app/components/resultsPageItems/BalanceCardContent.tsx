import { Token } from "@/app/assets/interfaces";
import React from "react";
import {chainData} from "@/app/assets/chainData";
import {
    Card,
    CardBody,
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    CardHeader, Divider
} from "@nextui-org/react";


const BalanceCardContent = ({ balanceList, selectedNetwork }: { balanceList: Token[], selectedNetwork: keyof typeof chainData }) => {
    const calculateTotalBalance = (): number => {
        let totalBalance = 0;
        for (const token of balanceList) {
            token.price !== undefined ? totalBalance += (token.balance * token.price) : undefined;
        }
        return totalBalance;
    };

    const calculateETHBalance = (): number | undefined => {
        const ethToken = balanceList.find((token) => token.symbol === "ETH");
        return ethToken ? (ethToken.balance) : undefined;
    };

    const totalBalance = calculateTotalBalance();
    const ethBalance = calculateETHBalance();

    return (
        <>
            <Card>
                <CardBody>
                    <div className={'flex justify-between items-center'}>
                        <h1 className={'text-sm'}>Balance</h1>
                        <h3 className={'text-2xl'}>${totalBalance.toFixed(2)}</h3>
                    </div>
                    <Divider/>
                    <Table aria-label="Balance Table" removeWrapper hideHeader
                           classNames={{
                               base: "max-h-[100px] overflow-scroll",
                               table: "min-h-[100px]",
                           }}>
                        <TableHeader>
                            <TableColumn>NAME</TableColumn>
                            <TableColumn>ROLE</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {balanceList.filter(token => token.name).map((token, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {token.symbol}
                                        {token.type === 'ERC-721' || token.type === 'ERC-1155' ? <span className="gray-text">(NFT)</span> : null}
                                        <p className={'text-xs text-gray-400'}>{token.name.length > 20 ? `${token.name.substring(0, 20)}...` : token.name}</p>

                                    </TableCell>
                                    <TableCell>
                                        {token.balance % 1 !== 0 ? token.balance.toFixed(3) : token.balance}
                                        {token.price !== undefined && token.type==='ERC-20'
                                            ? <p className="text-gray-400 text-xs">${(token.price * token.balance).toFixed(2)}</p>
                                            : null
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>
        </>
    );
};

export { BalanceCardContent };

