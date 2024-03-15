const getProfitForDay = (day, data) => {
    const dayToCheck = new Date(day).toISOString().slice(0, 10);
    if (!data) {
        return 0;
    } else if (Object.keys(data.profitsPerDay).length === 0) {
        return 0;
    } else if (!(data.profitsPerDay[dayToCheck])) {
        return 0;
    } else {
        return data.profitsPerDay[dayToCheck];
    }
}

export default getProfitForDay;;
