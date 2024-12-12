const convertInputToDate = (input: string | number | Date) => {
    if (typeof input === 'string' || typeof input === 'number') {
        return new Date(input);
    }

    return input;
};

export const createDateMap = (maybeDate: string | number | Date) => {
    const date = convertInputToDate(maybeDate);

    const dateMap = {
        day: date.getUTCDate(),
        month: date.getUTCMonth(),
        year: date.getUTCFullYear(),
    };

    if (dateMap.year >= 9999) {
        throw new Error('9999 CE is the latest supported date.');
    }

    return dateMap;
};
