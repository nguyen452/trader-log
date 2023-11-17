const getLastNumbersOfDayProfit = (data, days) => {
    // object into array
    if (data === undefined) {
        return [];
    };
    data = Object.entries(data);
    data = data.map((trade) => {
        return { date: trade[0], profits: trade[1] };
    });
    return data.splice(-days);
};
const data = {
    "2022-09-21": -19.14,
    "2023-10-02": -9.2,
    "2023-10-03": -2.76,
    "2023-10-06": 11,
    "2023-10-09": 1.03,
    "2023-10-10": 11.77,
    "2023-10-11": 62.69,
};

console.log(getLastNumbersOfDayProfit(data, 2));
module.exports = getLastNumbersOfDayProfit;
