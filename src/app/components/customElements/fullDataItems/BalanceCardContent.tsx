import { Accordion, AccordionContent, AccordionHeader } from "@/app/components/customElements/Accordion";
import { Token } from "@/app/global/interfaces";

const BalanceCardContent = ({ balanceList }: { balanceList: Token[] }) => {
    return (
        <Accordion>
            <AccordionHeader>
                <table>
                    <tbody>
                    <tr className="">
                        <td scope="row" className="px-0 py-0">Total</td>
                        <td className="px-6 py-0">#</td>
                    </tr>
                    <tr className="">
                        <td scope="row" className="px-0 py-0">ETH</td>
                        <td className="px-6 py-0">#</td>
                    </tr>
                    </tbody>
                </table>
            </AccordionHeader>
            <AccordionContent>
                {balanceList.map((token, index) => {
                    return (
                        <div key={index} className="flex items-center leading-loose">
                            <p>{token.balance % 1 !== 0 ? token.balance.toFixed(2) : token.balance}</p>
                            <p>&nbsp;{token.symbol}</p>
                            <p className="text-gray-400 text-xs mr-1 px-1 rounded border border-gray-500">{token.type}</p>
                        </div>
                    );
                })}
            </AccordionContent>
        </Accordion>
    );
};

export { BalanceCardContent };
