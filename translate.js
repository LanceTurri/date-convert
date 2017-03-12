module.exports = {
    dateStrings: {
        months: [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ],
        ordinals: [
            '', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eigth', 'ninth', 'tenth', 'eleventh', 'twelvth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth', 'twentieth', 'twenty first', 'twenty second', 'twenty third', 'twenty fourth', 'twenty fifth', 'twenty sixth', 'twenty seventh', 'twenty eight', 'twenty nine', 'thirtieth', 'thirty first'
        ],
        tens: [
            '', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
        ],
        ones: [
            '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
        ]
    },

    convertDate(date) {
        // We need to sanitize the date by first creating a new date and then getting the individual values for day, month, & year.
        let dateMap = this._parseDate(date);
        let stringifiedYear = dateMap.year.toString();

        if (dateMap.constructor === Error) {
            return dateMap.message;
        }

        // 10/23/1945 => October twenty third nineteen fourty five
        let month = this.dateStrings.months[dateMap.month];
        let day = this.dateStrings.ordinals[dateMap.day];
        let year = '';

        if (dateMap.year % 100 === 0) {
            // Then this is a year to be suffixed with thousand (e.g. 2000) or with a hundred (e.g. 1900)
            year = this._interpretCenturiesAndMillenia(stringifiedYear);

        } else {
            if (dateMap.year >= 1000) {
                year += this._interpretThousands(stringifiedYear);
            }
            
            year += this._interpretHundreds(stringifiedYear);
            year += this._interpretDecade(stringifiedYear);
        }

        return `${month} ${day} ${year}`; 
    },

    convertDateWithTime (date) {
        throw new Error (`Not Implemented!`);
    },

    _parseDate(dateInput) {
        switch (typeof dateInput) {
            // String will be a standard input, number is most likely a UTC date.
            case 'string':
            case 'number':
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
    },

    _interpretCenturiesAndMillenia (year) {
        if (year % 1000 === 0) {
            // Then this is a year to be suffixed with thousand. EX: 2000, 5000, 17000, etc.
            let firstDigit = parseInt(year.charAt(0));
            
            return `${this.dateStrings.ones[firstDigit]} thousand`;
        } else {
            // Then this is a year that needs to be suffixed with hundred. EX: 1500, 1900, etc.
            let firstTwoDigits = parseInt(year.slice(0, 2));

            return `${this.dateStrings.ones[firstTwoDigits]} hundred`;
        }
    },

    _interpretThousands (year) {
        let frontPair = parseInt(year.slice(0, 2));
        let thousandDigit = parseInt(year.charAt(0));

        if (frontPair < 20) {
            return '';
        }

        return `${this.dateStrings.ones[thousandDigit]} thousand `;
    },

    _interpretHundreds (year) {
        let frontPair = parseInt(year.slice(0, 2));
        let hundredDigit = parseInt(year.charAt(1));

        if (hundredDigit === 0) {
            // 1000
            return ``;
        } else if (frontPair < 20) {
            // 1900
            return `${this.dateStrings.ones[frontPair]} hundred `;
        }

        return `${this.dateStrings.ones[hundredDigit]} hundred `;
    },

    _interpretDecade (year) {
        let decade = parseInt(year.slice(2));

        if (decade === 0) {
            // 1900
            return ``;
        } else if (decade < 20) {
            // 2019
            return `${this.dateStrings.ones[decade]}`;
        }

        // 29 / 10 => parseInt(2.9) => 2
        let tensDigit = parseInt(decade / 10);
        let onesDigit = decade % 10;
        
        return `${this.dateStrings.tens[tensDigit]} ${this.dateStrings.ones[onesDigit]}`;
    }
}