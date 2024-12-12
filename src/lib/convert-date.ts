import { MONTH_NAMES, ORDINALS } from './constants';
import { createDateMap } from './parsing/create-date-map';
import { parseDecades } from './parsing/decades';
import { parseHundreds } from './parsing/hundreds';
import { parseCenturies } from './parsing/centuries';
import { parseThousands } from './parsing/thousands';

export const convertDate = (date: string | number | Date) => {
    // We need to sanitize the date by first creating a new date and then
    // getting the individual values for day, month, & year.
    const dateMap = createDateMap(date);
    const stringifiedYear = dateMap.year.toString();

    // 10/23/1945 => October twenty third nineteen fourty five
    const month = MONTH_NAMES[dateMap.month];
    const day = ORDINALS[dateMap.day];
    let year = '';

    if (dateMap.year % 100 === 0) {
        // Then this is a year to be suffixed with thousand
        // (e.g. 2000) or with a hundred (e.g. 1900)
        year = parseCenturies(stringifiedYear);
    } else {
        if (dateMap.year >= 1000) {
            year += parseThousands(stringifiedYear);
        }

        if (dateMap.year >= 99) {
            year += parseHundreds(stringifiedYear);
        }

        year += parseDecades(stringifiedYear);
    }

    return `${month} ${day}, ${year}`;
};
