import { Accordion, AccordionContent, AccordionHeader } from "@/app/components/customElements/Accordion";
import { Token } from "@/app/global/interfaces";
import React from "react";
import {chainData} from "@/app/global/chainData";


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
        <Accordion>
            <AccordionHeader>
                <table>
                    <tbody className="leading-loose">
                    <tr>
                        {selectedNetwork === 'zksync' ? (
                            <>
                                <td scope="row" className="px-0 py-0 font-light text-xs pb-2">Total</td>
                                <td className="px-6 py-0 leading-tight pb-2">${totalBalance.toFixed(2)}</td>
                            </>
                        ) : (
                            <td></td>
                        )}
                    </tr>
                    {/*<tr className="">*/}
                    {/*    <td scope="row" className="px-0 py-0 font-light text-xs pb-2">Total</td>*/}
                    {/*    <td className="px-6 py-0 leading-tight pb-2">${totalBalance.toFixed(2)}</td>*/}
                    {/*</tr>*/}
                    <tr className="">
                        <td scope="row" className="px-0 py-0 font-light text-xs">ETH</td>
                        <td className="px-6 py-0 leading-tight">{ethBalance?.toFixed(4)} Ξ</td>
                    </tr>
                    </tbody>
                </table>
            </AccordionHeader>
            <AccordionContent>
                        <>
                            <table className={"mt-2"}>
                                <tbody>
                                {balanceList.map((token, index) => {
                                    if (token.name) {
                                        return (
                                            <tr className="" key={index}>
                                                <td scope="row" className="px-0 py-0 font-light text-xs">
                                                    {token.name.length > 20 ? `${token.name.substring(0, 20)}...` : token.name}
                                                </td>
                                                <td className="px-3 py-0 leading-relaxed font-light text-xs">
                                                    {token.balance % 1 !== 0 ? token.balance.toFixed(2) : token.balance}
                                                    {token.price !== undefined && token.type==='ERC-20'
                                                        ? <span className="gray-text">(${(token.price * token.balance).toFixed(2)})</span>
                                                        :<span className="gray-text">(NFT)</span>
                                                    }
                                                </td>
                                            </tr>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                                </tbody>
                            </table>
                        </>
            </AccordionContent>
        </Accordion>
    );
};

export { BalanceCardContent };

