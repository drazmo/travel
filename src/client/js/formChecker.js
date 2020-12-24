export function checkForCity(inputText) {
    if (inputText === '' || inputText.length < 1) {
        return false;
    }

    return true;
}

// Snippet found at: https://stackoverflow.com/questions/276479/javascript-how-to-validate-dates-in-format-mm-dd-yyyy by Adam Leggett
export function checkValidDate(date) {
    const isLeapYear = (yearNum) => {
        return ((yearNum % 100 === 0) ? (yearNum % 400 === 0) : (yearNum % 4 === 0)) ?
            1 :
            0;
    }

    const match = date.match(/^(\d\d)\/(\d\d)\/(\d{4})$/) || [];
    const month = (match[1] | 0) - 1;
    const day = match[2] | 0;
    const year = match[3] | 0;

    const dateEval = !(
        month < 0 || // Before January
        month > 11 || // After December
        day < 1 || // Before the 1st of the month
        day - 30 > (2773 >> month & 1) || // Day is 28 or 29, month is 02, year is leap year ==> true
        month === 1 && day - 28 > isLeapYear(year)

    );

    return dateEval;
}