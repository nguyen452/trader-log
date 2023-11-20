const filterLastTrades = (data, period) => {
    switch (period) {
        case "Last 10 trades":
            return data.slice(-10);
        case "Last 20 trades":
            return data.slice(-20);
        case "Last 30 trades":
            return data.slice(-30);
        default:
            return data;
    }
}

export default filterLastTrades;
