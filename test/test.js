let assert = require('assert');
let lib = require('../convert.js');

describe('converts dates properly', () => {
    let testValues = {
        // Change these dates to major historical dates
        isoDate: "2015-03-25",
        shortDate: "03/25/2015",
        longDate: "Mar 25 2015",
        longDateReverse: "25 Mar 2015",
        fullDate: "Wednesday March 25 2015",
        twoZeros: "03/25/2001",
        secondZero: "02/25/2010",
        thirdZero: "02/25/2103",
        evenYear: "02/25/1900"
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

    it('converts a date string with two zeros', () => {
        assert.equal('March twenty fifth two thousand and one', lib.convertDate(testValues.twoZeros));
    });

    it('converts a short date string with a ten in the last pair', () => {
        assert.equal('February twenty fifth twenty ten', lib.convertDate(testValues.secondZero));
    });

    it('converts a short date string with a zero in the third place', () => {
        assert.equal('February twenty fifth twenty one o three', lib.convertDate(testValues.thirdZero));
    });

    it('converts a short date string', () => {
        assert.equal('February twenty fifth nineteen hundred', lib.convertDate(testValues.evenYear));
    });
});