let assert = require('assert');
let lib = require('../convert.js');

describe('converts standard date formats properly', () => {
    let testValues = {
        // Change these dates to major historical dates
        isoDate: "2015-03-25",
        shortDate: "03/25/2015",
        longDate: "Mar 25 2015",
        longDateReverse: "25 Mar 2015",
        fullDate: "Wednesday March 25 2015",
    }

    it('converts an ISO Date string', () => {
        assert.equal('March twenty fifth twenty fifteen', lib.convertDate(testValues.isoDate));
    });

    it('converts a short date string', () => {
        assert.equal('March twenty fifth twenty fifteen', lib.convertDate(testValues.shortDate));
    });

    it('converts a long date string', () => {
        assert.equal('March twenty fifth twenty fifteen', lib.convertDate(testValues.longDate));
    });

    it('converts a long date string (reversed)', () => {
        assert.equal('March twenty fifth twenty fifteen', lib.convertDate(testValues.longDateReverse));
    });

    it('converts a full date string', () => {
        assert.equal('March twenty fifth twenty fifteen', lib.convertDate(testValues.fullDate));
    });
});

describe('it also converts special cases correctly', () => {
    let testValues = {
        kubrick: "01/01/2001",
        secondZero: "02/02/2010",
        thirdZero: "03/03/2103",
        century: "04/04/1900",
        millenium: "05/05/2000",
        random1: "06/06/2045"

    }

    it('converts a date string with two zeros', () => {
        assert.equal('January first two thousand and one', lib.convertDate(testValues.kubrick));
    });

    it('converts a short date string with a ten in the last pair', () => {
        assert.equal('February second twenty ten', lib.convertDate(testValues.secondZero));
    });

    it('converts a short date string with a zero in the third place', () => {
        assert.equal('March third twenty one o three', lib.convertDate(testValues.thirdZero));
    });

    it('converts a  date string ending in two zeros', () => {
        assert.equal('April fourth nineteen hundred', lib.convertDate(testValues.century));
    });

    it('converts a date string of a millenium', () => {
        assert.equal('May fifth two thousand', lib.convertDate(testValues.millenium));
    });

    it('converts a short date string', () => {
        assert.equal('June sixth twenty forty five', lib.convertDate(testValues.random1));
    });
})