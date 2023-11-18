const getFilteredDataBySelectedDay = (data, selectedDay) => {
    if (!data) {
        return [];
    }
    const filteredData = data.filter((trade) => {
        let tradeDate = new Date(trade.date);
        tradeDate = tradeDate.toISOString().slice(0, 10);
        selectedDay = new Date (selectedDay).toISOString().slice(0, 10);
        return tradeDate === selectedDay;
    });
    console.log(filteredData)
    return filteredData;

};
export default getFilteredDataBySelectedDay;
