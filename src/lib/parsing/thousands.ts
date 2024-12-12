import { ONES } from '../constants';

export const parseThousands = (year: string) => {
    let frontPair = parseInt(year.slice(0, 2));
    let thousandDigit = parseInt(year.charAt(0));

    if (frontPair < 20) {
        return '';
    }

    return `${ONES[thousandDigit]} thousand `;
};
