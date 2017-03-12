let assert = require('assert');
let lib = require('../translate.js');

describe('converts specific year digits', () => {
    it('converts thousands digit properly', () => {
        assert.equal(lib._interpretThousands('2000'), 'two thousand ');
        assert.equal(lib._interpretThousands('1900'), '');
    });

    it('converts hundreds digit properly', () => {
        assert.equal(lib._interpretHundreds('1000'), '');
        assert.equal(lib._interpretHundreds('1800'), 'eighteen hundred ');
        assert.equal(lib._interpretHundreds('1900'), 'nineteen hundred ');
        assert.equal(lib._interpretHundreds('2100'), 'one hundred ');
    });

    it('converts decade digits properly', () => {
        assert.equal(lib._interpretDecade('2019'), 'nineteen');
        assert.equal(lib._interpretDecade('2010'), 'ten');
        assert.equal(lib._interpretDecade('2003'), 'three');
        assert.equal(lib._interpretDecade('2000'), '');
    });
});


describe('converts full dates to sentences', () => {
    describe('converts standard date formats properly', () => {
        const testValues = {
            // TODO: Change these dates to major historical dates
            isoDate: "2015-03-25",
            shortDate: "03/25/2015",
            longDate: "Mar 25 2015",
            longDateReverse: "25 Mar 2015",
            fullDate: "Wednesday March 25 2015",
        }

        it('converts an ISO Date string (2015-03-25)', () => {
            assert.equal(lib.convertDate(testValues.isoDate), 'March twenty fifth two thousand fifteen');
        });

        it('converts a short date string (03/25/2015)', () => {
            assert.equal(lib.convertDate(testValues.shortDate), 'March twenty fifth two thousand fifteen');
        });

        it('converts a long date string (Mar 25 2015)', () => {
            assert.equal(lib.convertDate(testValues.longDate), 'March twenty fifth two thousand fifteen');
        });

        it('converts a reversed long date string (25 Mar 2015)', () => {
            assert.equal(lib.convertDate(testValues.longDateReverse), 'March twenty fifth two thousand fifteen');
        });

        it('converts a full date string (Wednesday March 25 2015)', () => {
            assert.equal(lib.convertDate(testValues.fullDate), 'March twenty fifth two thousand fifteen');
        });
    });

    describe('it also converts special case years', () => {
        const testValues = {
            kubrick: "01/01/2001",
            secondZero: "02/02/2010",
            thirdZero: "03/03/2103",
            century: "04/04/1900",
            millenium: "05/05/2000",
            random1: "06/06/2045"
        }

        it('converts a year with two zeros (01/01/2001)', () => {
            assert.equal(lib.convertDate(testValues.kubrick), 'January first two thousand one');
        });

        it('converts a year with a ten in the last pair (02/02/2010)', () => {
            assert.equal(lib.convertDate(testValues.secondZero), 'February second two thousand ten');
        });

        it('converts a year with a zero in the third place (03/03/2103)', () => {
            assert.equal(lib.convertDate(testValues.thirdZero), 'March third two thousand one hundred three');
        });

        it('converts a centennial year (04/04/1900)', () => {
            assert.equal(lib.convertDate(testValues.century), 'April fourth nineteen hundred');
        });

        it('converts a millenium year (05/05/2000)', () => {
            assert.equal(lib.convertDate(testValues.millenium), 'May fifth two thousand');
        });

        it('converts a short date string (06/06/2045)', () => {
            assert.equal(lib.convertDate(testValues.random1), 'June sixth two thousand forty five');
        });
    });
});