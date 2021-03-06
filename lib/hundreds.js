const dateStrings = require('../core/dateStrings');

module.exports = (year) => {
    let frontPair = null;
    let hundredDigit = null;

    if (year.length === 4) {
        frontPair = parseInt(year.slice(0, 2), 10);
        hundredDigit = parseInt(year.charAt(1), 10);
    } else {
        // Three digit year - 465
        frontPair = parseInt(year.slice(0, 1), 10);
        hundredDigit = parseInt(year.charAt(0), 10);
    }

    if (hundredDigit === 0) {
        // 1000
        return '';
    } else if (frontPair < 20) {
        // 1900
        return `${dateStrings.ones[frontPair]} hundred `;
    }

    return `${dateStrings.ones[hundredDigit]} hundred `;
};
