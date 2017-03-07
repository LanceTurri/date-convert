module.exports = {
    convertDate(date) {
        let dateStrings = {
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            ordinals: ['zero', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eigth', 'ninth', 'tenth', 'eleventh', 'twelvth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth', 'twentieth', 'twenty first', 'twenty second', 'twenty third', 'twenty fourth', 'twenty fifth', 'twenty sixth', 'twenty seventh', 'twenty eight', 'twenty nine', 'thirtieth', 'thirty first'],
            
            tens: ['zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
            ones: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
        }

        // We need to sanitize the date by first creating a new date and then getting the individual values for day, month, & year.
        let dateMap = this._parseDate(date);

        if (dateMap.constructor === Error) {
            return dateMap.message;
        }

        // 10/23/1945 => October twenty third nineteen fourty five
        let month = dateStrings.months[dateMap.month];
        let day = dateStrings.ordinals[dateMap.day];
        let year = null;

        // 1901, 1910, 2001, 2010, 2022
        let tempYearArray = dateMap.year.toString().split('').map(Number);

        dateMap.year = {
            y1: tempYearArray[0],
            y2: tempYearArray[1],
            y3: tempYearArray[2],
            y4: tempYearArray[3],
            y12: (tempYearArray[0] * 10) + tempYearArray[1],
            y34: (tempYearArray[2] * 10) + tempYearArray[3],
            full: tempYearArray.join('')
        }

        // What do we do w/ 900? prefix a 0 to the array?

        if (dateMap.year.full % 1000 === 0) {
            // Then this is a year to be suffixed with thousand. EX: 2000, 5000, 17000, etc.
            year = `${dateStrings.ones[dateMap.year.y1 - 1]} thousand`;
        } else if (dateMap.year.full % 100 === 0) {
            // Then this is a year that needs to be suffixed with hundred. EX: 1500, 1900, etc.
            year = `${dateStrings.ones[dateMap.year.y12 - 1]} hundred`;
        } else if (dateMap.year.y12 > 19) {
            // If the second number is a 0, we might have a special case on our hands.
            if (dateMap.year.y2 === 0) {
                // If the second and third number is 0 (like in 2001) we need to interject a 'thousand' suffix
                if (dateMap.year.y3 === 0) {
                    year = `${dateStrings.ones[dateMap.year.y1 - 1]} thousand and ${dateStrings.ones[dateMap.year.y34 - 1]}`;
                } else if (dateMap.year.y34 > 19) {
                    // This is a year like 2045
                    year = `${dateStrings.tens[dateMap.year.y1]} ${dateStrings.tens[dateMap.year.y3]} ${dateStrings.ones[dateMap.year.y4 - 1]}`
                } else {
                    // This is a year like 2010 -> 'twenty ten'
                    year = `${dateStrings.tens[dateMap.year.y1]} ${dateStrings.ones[dateMap.year.y34 - 1]}`
                }
            } else {
                // We are looking at a number like 2145 or 2103
                if (dateMap.year.y3 === 0) {
                    // This is a year like 2103 -> 'twenty one o three'
                    year = `${dateStrings.tens[dateMap.year.y1]} ${dateStrings.ones[dateMap.year.y3]} o ${dateStrings.ones[dateMap.year.y4 - 1]}`;
                } else {
                    // This is a year like 2145 -> 'twenty one forty five'
                    year = `${dateStrings.tens[dateMap.year.y1]} ${dateStrings.ones[dateMap.year.y34 - 1]}`
                }
            }
        } else {
            console.error(`Something went horribly wrong.`);
        }

        return `${month} ${day} ${year}`; 
    },

    convertDateWithTime (date) {
        throw new Error (`Not Implemented!`);
    },

    _parseDate(dateInput) {
        switch (typeof dateInput) {
            case 'string':
                dateInput = new Date(dateInput);
                break;

            case 'number':
                // This is most likely a UTC date.
                dateInput = new Date(dateInput);
                break;

            default:
                // We assume this is already a Date object.
                break;
        }

        let dateMap = {
            "day": dateInput.getUTCDate(),
            "month": dateInput.getUTCMonth(),
            "year": dateInput.getUTCFullYear()
        };

        if (parseInt(dateMap.year) >= 9999) {
            return new Error (`9999 CE is the latest supported date.`);
        }

        return dateMap;
    }
}