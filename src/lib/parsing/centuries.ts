import { ONES } from '../constants';

export const parseCenturies = (year: string) => {
    if (parseInt(year, 10) % 1000 === 0) {
        // Then this is a year to be suffixed with thousand. EX: 2000, 5000, 17000, etc.
        const firstDigit = parseInt(year.charAt(0), 10);

        return `${ONES[firstDigit]} thousand`;
    }

    // Then this is a year that needs to be suffixed with hundred. EX: 1500, 1900, etc.
    const firstTwoDigits = parseInt(year.slice(0, 2), 10);

    return `${ONES[firstTwoDigits]} hundred`;
};
