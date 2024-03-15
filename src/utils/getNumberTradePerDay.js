const getNumberOfTradesPerDay = (day, data) => {
    const dayToCheck = new Date(day).toISOString().slice(0, 10);
    if (!data) {
        return 0;
    } else if (Object.keys(data.getNumberOfTradesPerDay).length === 0) {
        return 0;
    } else if (!(data.getNumberOfTradesPerDay[dayToCheck])) {
        return 0;
    } else {
        return data.getNumberOfTradesPerDay[dayToCheck];
    }
}

export default getNumberOfTradesPerDay;
