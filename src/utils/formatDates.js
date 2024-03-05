function formatDate(dateString) {
    // Parse the input date string manually
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);

    // Options for toLocaleDateString to display day of week, month, day, and year
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };

    // Convert to desired format
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
}

export default formatDate;

// Example usage:
// console.log(formatDate('2024-03-20')); // Output: "Wed, March 20, 2024"
