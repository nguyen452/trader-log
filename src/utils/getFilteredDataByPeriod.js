const getFilteredDataByPeriod = (data, period) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    // use filter method to check the date of each trade
    const filteredData = data.filter((trade) => {
        const tradeDate = new Date(trade.date);
        // if period is all time, return all trades
        if (period === "All time") {
            return trade;
        } else if (period === "Year-to-date") {
            return tradeDate.getFullYear() === currentYear;
        } else  {
            return tradeDate.getMonth() === currentMonth;
        }
    })
    return filteredData;
}
export default getFilteredDataByPeriod;
