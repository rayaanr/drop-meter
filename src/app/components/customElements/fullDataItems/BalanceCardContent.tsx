import { Accordion, AccordionContent, AccordionHeader } from "@/app/components/customElements/Accordion";
import { Token } from "@/app/global/interfaces";

const BalanceCardContent = ({ balanceList }: { balanceList: Token[] }) => {
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
                    <tbody>
                    <tr className="">
                        <td scope="row" className="px-0 py-0">Total</td>
                        <td className="px-6 py-0">{totalBalance.toFixed(2)}</td>
                    </tr>
                    <tr className="">
                        <td scope="row" className="px-0 py-0">ETH</td>
                        <td className="px-6 py-0">{ethBalance?.toFixed(4)}</td>
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
                            <p>{token.name}</p>
                            <p>{token.price !== undefined ? (token.price * token.balance ).toFixed(2) : undefined}</p>
                            <p className="text-gray-400 text-xs mr-1 px-1 rounded border border-gray-500">{token.type}</p>
                        </div>
                    );
                })}
            </AccordionContent>
        </Accordion>
    );
};

export { BalanceCardContent };

