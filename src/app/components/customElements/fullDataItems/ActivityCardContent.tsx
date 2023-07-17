import getTimeAgo from "@/app/utils/timeAgo";
import formatMonths from "@/app/utils/formatMonths";
import moment from "moment/moment";

const ActivityCardContent = ({ activityData }: { activityData : any }) => {
    return (
        <table>
            <tbody>
            <tr className="">
                <td scope="row" className="px-0 py-0">Latest</td>
                <td className="cell-style pt-0 pb-0">{getTimeAgo(activityData.lastTransactionDate)}</td>
            </tr>
            <tr className="">
                <td scope="row" className="px-0 py-0">Day(s)</td>
                <td className="cell-style pt-0 pb-0">{activityData.uniqueDaysCount}</td>
            </tr>
            <tr className="">
                <td scope="row" className="px-0 py-0">Week(s)</td>
                <td className="cell-style pt-0 pb-0">{activityData.uniqueWeeksCount}</td>
            </tr>
            <tr className="">
                <td scope="row" className="px-0 py-0">Months(s)</td>
                <td className="cell-style pt-0 pb-0">
                    {activityData.uniqueMonthsCount}
                    {activityData.uniqueMonths.length > 0 && (
                        <span className={"text-gray-400 text-xs mr-2 px-2.5 py-0.5"}>
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