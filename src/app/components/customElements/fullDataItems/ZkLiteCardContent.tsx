import { Accordion, AccordionContent, AccordionHeader } from "@/app/components/customElements/Accordion";

const ZkLiteCardContent = ({ activityData }: { activityData : any }) => {
    return (
        <Accordion>
            <AccordionHeader>
                <table>
                    <tbody>
                    <tr className="">
                        <td scope="row" className="px-0 py-0">Total Tx</td>
                        <td className="px-6 py-0">#</td>
                    </tr>
                    </tbody>
                </table>
            </AccordionHeader>
            <AccordionContent>
                <table>
                    <tbody>
                    <tr className="">
                        <td scope="row" className="px-0 py-0">Total Tx</td>
                        <td className="px-6 py-0">#</td>
                    </tr>
                    <tr className="">
                        <td scope="row" className="px-0 py-0">Activity</td>
                        <td className="px-6 py-0">#</td>
                    </tr>
                    <tr className="">
                        <td scope="row" className="px-0 py-0">ETH Volume</td>
                        <td className="px-6 py-0">#</td>
                    </tr>
                    <tr className="">
                        <td scope="row" className="px-0 py-0">ETH Balance</td>
                        <td className="px-6 py-0">#</td>
                    </tr>
                    <tr className="">
                        <td scope="row" className="px-0 py-0">Gas</td>
                        <td className="px-6 py-0">#</td>
                    </tr>
                    </tbody>
                </table>
            </AccordionContent>
        </Accordion>
    );
};

export { ZkLiteCardContent };