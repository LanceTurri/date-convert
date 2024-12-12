import { ONES, TENS } from '../constants';

export const parseDecades = (year: string) => {
    const decade = year.length === 4 ? parseInt(year.slice(2), 10) : parseInt(year.slice(1), 10);

    if (decade === 0) {
        // 1900
        return '';
    }

    if (decade < 20) {
        // 2019
        return `${ONES[decade]}`;
    }

    // 29 / 10 => Math.floor(2.9) => 2
    const tensDigit = Math.floor(decade / 10);
    const onesDigit = decade % 10;

    return `${TENS[tensDigit]} ${ONES[onesDigit]}`;
};
