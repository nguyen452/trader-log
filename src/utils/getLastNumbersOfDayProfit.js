const getLastNumbersOfDayProfit = (data, days) => {
    for (let index = data.length - 1; index > data.length - days; index--) {
        const dataOfDays = [];
        dataOfDays.push(data[index]);
        return dataOfDays;
    }
};

module.exports = getLastNumbersOfDayProfit;
