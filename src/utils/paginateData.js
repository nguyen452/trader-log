const paginateData = (data, limit, page) => {
    if (!data) {
        return [];
    } else if (data.length <= limit) {
        return data;
    } else {
        const paginatedData = [];
        // figure out how many pages total
        const totalPages = Math.ceil(data.length / limit);
        const copyOfData = [...data];
        for (let i = 0; i < totalPages; i++) {
            paginatedData.push(copyOfData.splice(0, limit));
        }
        return paginatedData[page - 1]

    }
;
}

export default paginateData;
