const searchTrade = (data, search) => {
    // iterate through the trade array use the filter method. if the trade matches the search term, return the trade
    search = search.toLowerCase();
    const filteredTrade = data.filter((trade) => {
        return trade.symbol.toLowerCase().includes(search) || trade.date_open.includes(search) || trade.side.toLowerCase().includes(search)|| trade.duration.toLowerCase().includes(search) || trade.date_close.includes(search)
    })
    return filteredTrade;
}

export default searchTrade;
