const getFilteredDataByDateRange = (data, startDate, endDate) => {
    if (!data) {
        return [];
    }
    if (!startDate || !endDate) {
        return data;
    }
    if (startDate > endDate) {
        return data;
    }
    startDate = new Date(startDate).toISOString().slice(0, 10);
    endDate = new Date(endDate).toISOString().slice(0, 10);
    // make sure the data is sorted by date
    const sortedData = [...data].sort((a, b) => {
        return new Date(a.date_open) - new Date(b.date_open);  // sort by date ascending
    });
    // get the index of the first start date
   const filteredData = sortedData.filter((trade) => {
        let tradeDate = new Date(trade.date_open);
        tradeDate = tradeDate.toISOString().slice(0, 10);
        return tradeDate >= startDate && tradeDate <= endDate;

   });
   return filteredData

}

const fakeData = [
    { date_open: '2022-01-01', value: 100 },
    { date_open: '2022-01-02', value: 200 },
    { date_open: '2022-01-03', value: 300 },
    { date_open: '2022-01-04', value: 400 },
    { date_open: '2022-01-05', value: 500 },
];

export default getFilteredDataByDateRange;
