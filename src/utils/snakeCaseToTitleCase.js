const snakeCaseToTitleCase = (str) => {
    const array = str.split("_");
    const newArray = array.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return newArray.join(" ");

}

export default snakeCaseToTitleCase;
