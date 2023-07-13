import { useState, useEffect } from "react";
import {Transaction} from "@/app/global/interfaces";

const ActivityData = ({ transactionsList }: { transactionsList: Transaction[] }) => {
    const [uniqueDaysCount, setUniqueDaysCount] = useState(0);
    const [uniqueWeeksCount, setUniqueWeeksCount] = useState(0);
    const [uniqueMonthsCount, setUniqueMonthsCount] = useState(0);
    const [firstTransactionDate, setFirstTransactionDate] = useState<Date | null>(null);
    const [lastTransactionDate, setLastTransactionDate] = useState<Date | null>(null);
    const [uniqueMonths, setUniqueMonths] = useState<string[]>([]);

    useEffect(() => {
        const getWeekNumber = (date: Date): string => {
            const year = date.getFullYear();
            const oneJan = new Date(year, 0, 1);
            const dayIndex = (date.getDay() + 6) % 7;
            const daysSinceFirstDay = Math.floor((date.getTime() - oneJan.getTime()) / 86400000);
            const weekIndex = Math.floor((daysSinceFirstDay + oneJan.getDay() - dayIndex) / 7);

            return `${year}-${weekIndex}`;
        };

        // Calculate unique days, weeks, and months
        const uniqueDays = new Set<string>();
        const uniqueWeeks = new Set<string>();
        const months: string[] = [];
        let firstDate: Date | null = null;
        let lastDate: Date | null = null;

        transactionsList.forEach((transaction) => {
            const date = new Date(transaction.datetime);
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            const week = getWeekNumber(date);

            uniqueDays.add(`${year}-${month}-${day}`);
            uniqueWeeks.add(`${year}-${week}`);

            const monthYear = `${year}-${month}`;
            if (!months.includes(monthYear)) {
                months.push(monthYear);
            }

            if (!firstDate || date < firstDate) {
                firstDate = date;
            }
            if (!lastDate || date > lastDate) {
                lastDate = date;
            }
        });

        setUniqueDaysCount(uniqueDays.size);
        setUniqueWeeksCount(uniqueWeeks.size);
        setUniqueMonthsCount(months.length);
        setFirstTransactionDate(firstDate);
        setLastTransactionDate(lastDate);
        setUniqueMonths(months);
    }, [transactionsList]); // Update the counts when transactionsList changes

    const activityData = {
        uniqueDaysCount,
        uniqueWeeksCount,
        uniqueMonthsCount,
        uniqueMonths,
        firstTransactionDate,
        lastTransactionDate,
    };

    return activityData;
};

export default ActivityData;