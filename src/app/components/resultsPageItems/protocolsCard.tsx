import { Transaction } from "@/app/assets/interfaces";
import { zksyncProt } from "@/app/protocols/zksyncProt";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar} from "@nextui-org/react";
import ActivityData from "@/app/utils/activityData";
import timeAgo from "@/app/utils/timeAgo";
import Image from "next/image";


const protocolsCard = ({ transactionsList }: { transactionsList: Transaction[] }) => {
    const protocols: { [key: string]: { name: string, transactionList: Transaction[], volume: number, txCount: number, uniqueDaysCount: number, latestActivity: string } } = {};

    transactionsList.forEach((transaction) => {
        zksyncProt.forEach((protocol) => {
            protocol.addresses.forEach((address) => {
                if (address.toLowerCase() === transaction.to.toLowerCase()) {
                    if (!protocols[protocol.id]) {
                        protocols[protocol.id] = {
                            name: protocol.name,
                            transactionList: [],
                            volume: 0,
                            txCount: 0,
                            uniqueDaysCount: 0,
                            latestActivity: ''
                        };
                    }
                    protocols[protocol.id].transactionList.push(transaction);
                    protocols[protocol.id].volume += transaction.valueInUSD;
                    protocols[protocol.id].txCount++;
                }
            });
        });
    });

    // Calculate uniqueDaysCount and latestActivity using the ActivityData component
    Object.keys(protocols).forEach((protocolId) => {
        const protocol = protocols[protocolId];
        const activityData = ActivityData({ transactionsList: protocol.transactionList });

        // Update the protocol object with the calculated values
        protocol.uniqueDaysCount = activityData.uniqueDaysCount;
        protocol.latestActivity = timeAgo(activityData.lastTransactionDate) || ''; // Use the lastTransactionDate, or an empty string if it's null
    });

    // console.log(protocols);
    return (
        <>
            <Table aria-label="Protocols">
                <TableHeader>
                    <TableColumn>Image</TableColumn>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>Interactions</TableColumn>
                    <TableColumn>Last Activity</TableColumn>
                    <TableColumn>Unique Days</TableColumn>
                    <TableColumn>Volume</TableColumn>
                </TableHeader>
                <TableBody>
                    {Object.keys(protocols).map((protocol) => (
                        <TableRow key={protocol}>
                            <TableCell>
                                <Avatar src={zksyncProt.find((prot) => prot.id === protocol)?.logo as string} />
                                    {/*<Image*/}
                                    {/*    src={zksyncProt.find((prot) => prot.id === protocol)?.logo as string}*/}
                                    {/*    alt={'Protocol Logo'}*/}
                                    {/*    width={50}*/}
                                    {/*    height={50}*/}
                                    {/*/>*/}
                            </TableCell>


                            <TableCell>
                                <a href={zksyncProt.find((prot) => prot.id === protocol)?.url}>
                                    {zksyncProt.find((prot) => prot.id === protocol)?.name}
                                </a>
                            </TableCell>
                            {/*<TableCell>{protocols[protocol].name}</TableCell>*/}
                            <TableCell>{protocols[protocol].txCount}</TableCell>
                            <TableCell>{protocols[protocol].latestActivity}</TableCell>
                            <TableCell>{protocols[protocol].uniqueDaysCount}</TableCell>
                            <TableCell>{protocols[protocol].volume}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
};

export default protocolsCard;