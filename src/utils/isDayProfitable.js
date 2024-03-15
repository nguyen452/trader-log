const isDayProfitable = (day, data, displayProfitableDays) => {
    if (!data || !displayProfitableDays) {
        return "no data";
    }
    // take day and parse it using isoString and to get the date only
    const dayToCheck = new Date(day).toISOString().slice(0, 10);
    //write condition to check if the day is profitable
    if (!(dayToCheck in data.profitsPerDay)) {
        return "no data";
    } else if (data.profitsPerDay[dayToCheck] > 0) {
        return "profitable";
    } else if (data.profitsPerDay[dayToCheck] < 0) {
        return "not profitable";
    } else {
        return "no data";
    }
};

export default isDayProfitable;
