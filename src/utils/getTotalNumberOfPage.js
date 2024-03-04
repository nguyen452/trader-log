const getTotalNumberOfPage = (dataLength, limit) => {
    return Math.ceil(dataLength / limit);
};

export default getTotalNumberOfPage;
