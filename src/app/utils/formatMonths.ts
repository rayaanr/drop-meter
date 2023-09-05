import moment from "moment/moment";

const formatMonths = (months: string[]) => {
    const formattedMonths = [];
    let currentMonth = null;

    for (const month of months) {
        const formattedMonth = moment(month).format("MMMM");

        if (currentMonth === null || currentMonth === formattedMonth) {
            currentMonth = formattedMonth;
        } else {
            formattedMonths.push(currentMonth);
            currentMonth = formattedMonth;
        }
    }

    if (currentMonth !== null) {
        formattedMonths.push(currentMonth);
    }

    return formattedMonths.reverse().join(", ");
};

export default formatMonths;