import getTimeAgo from "@/app/utils/timeAgo";
import formatMonths from "@/app/utils/formatMonths";
import moment from "moment/moment";

const ActivityCardContent = ({ activityData }: { activityData : any }) => {
    return (
        <table>
            <tbody className={"leading-loose"}>
            <tr className="">
                <td scope="row" className="px-0 py-0 font-light text-xs">Latest</td>
                <td className="cell-style pt-0 pb-0">{getTimeAgo(activityData.lastTransactionDate)}</td>
            </tr>
            <tr className="">
                <td scope="row" className="px-0 py-0 font-light text-xs">Day(s)</td>
                <td className="cell-style pt-0 pb-0">{activityData.uniqueDaysCount}</td>
            </tr>
            <tr className="">
                <td scope="row" className="px-0 py-0 font-light text-xs">Week(s)</td>
                <td className="cell-style pt-0 pb-0">{activityData.uniqueWeeksCount}</td>
            </tr>
            <tr className="">
                <td scope="row" className="px-0 py-0 font-light text-xs">Months(s)</td>
                <td className="cell-style pt-0 pb-0">
                    {activityData.uniqueMonthsCount}
                    {activityData.uniqueMonths.length > 0 && (
                        <span className={"gray-text"}>
                                            ({formatMonths(activityData.uniqueMonths)}) {moment(activityData.uniqueMonths[0]).format("YYYY")}
                                        </span>
                    )}
                </td>
            </tr>
            </tbody>
        </table>
    );
};

export { ActivityCardContent };