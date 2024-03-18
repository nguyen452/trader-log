const convertDateToTimeInSecond = (date) => {
    const dateInMilliSeconds = new Date(date).getTime();
    return Math.floor(dateInMilliSeconds / 1000);
}
