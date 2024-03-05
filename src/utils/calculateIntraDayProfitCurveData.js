const calculateIntraDayProfitCurveData = (intraDayData) => {
    const copyIntraDayData = [...intraDayData];
    if(!intraDayData) return;
    if(intraDayData.length === 0) return;
    //sort data in ascending order
    copyIntraDayData.sort((a, b) => {
        return a.time_closed - b.time_closed
    }
    );
    const intraDayProfitCurveData = [];
    let accumulatedProfits = 0;

    intraDayData.forEach((trade) => {
        const tradeProfit = Number(trade['P&L']);
        accumulatedProfits += tradeProfit;
        intraDayProfitCurveData.push({time: trade.time_closed.slice(0,5), "Accumulated Profits": accumulatedProfits})

    })
    // add data point if there is no trade at the end of the day
    if (intraDayProfitCurveData[intraDayProfitCurveData.length - 1].time !== '16:00') {
        intraDayProfitCurveData.push({time: '16:00', "Accumulated Profits": accumulatedProfits})
    }
    // add data point if theres no trade before 9:30
    if (formatTime(intraDayProfitCurveData[0].time) > 930) {
        intraDayProfitCurveData.unshift({time: '09:30', "Accumulated Profits": 0})
    }
    return intraDayProfitCurveData;
}

// helper function to format date to numerical value
const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(':');
    return Number(hour + minute);
}
export default calculateIntraDayProfitCurveData;
