import { ONES } from '../constants';

export const parseHundreds = (year: string) => {
    let frontPair: number;
    let hundredDigit: number;

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
    }

    if (frontPair < 20) {
        // 1900
        return `${ONES[frontPair]} hundred `;
    }

    return `${ONES[hundredDigit]} hundred `;
};
