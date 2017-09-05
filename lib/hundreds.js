const dateStrings = require('../core/dateStrings');

module.exports = (year) => {
    let frontPair = parseInt(year.slice(0, 2));
    let hundredDigit = parseInt(year.charAt(1));

    if (hundredDigit === 0) {
        // 1000
        return ``;
    } else if (frontPair < 20) {
        // 1900
        return `${dateStrings.ones[frontPair]} hundred `;
    }

    return `${dateStrings.ones[hundredDigit]} hundred `;
};
