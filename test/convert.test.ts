import { assert, describe, it } from 'vitest';
import { convertDate } from '../src';

describe('converts standard date formats properly', function () {
    const testValues = {
        // TODO: Change these dates to major historical dates
        isoDate: '2015-03-25',
        shortDate: '03/25/2015',
        longDate: 'Mar 25 2015',
        longDateReverse: '25 Mar 2015',
        fullDate: 'Wednesday March 25 2015',
    };

    it('converts an ISO Date string (2015-03-25)', function () {
        assert.equal(convertDate(testValues.isoDate), 'March twenty fifth, two thousand fifteen');
    });

    it('converts a short date string (03/25/2015)', function () {
        assert.equal(convertDate(testValues.shortDate), 'March twenty fifth, two thousand fifteen');
    });

    it('converts a long date string (Mar 25 2015)', function () {
        assert.equal(convertDate(testValues.longDate), 'March twenty fifth, two thousand fifteen');
    });

    it('converts a reversed long date string (25 Mar 2015)', function () {
        assert.equal(convertDate(testValues.longDateReverse), 'March twenty fifth, two thousand fifteen');
    });

    it('converts a full date string (Wednesday March 25 2015)', function () {
        assert.equal(convertDate(testValues.fullDate), 'March twenty fifth, two thousand fifteen');
    });

    it('converts an ISO date object', function () {
        assert.equal(convertDate(new Date('2015-03-25')), 'March twenty fifth, two thousand fifteen');
    });
});

describe('it also converts special case years', function () {
    const testValues = {
        kubrick: '01/01/2001',
        secondZero: '02/02/2010',
        thirdZero: '03/03/2103',
        century: '04/04/1900',
        millenium: '05/05/2000',
        nearFuture: '06/06/2045',
        farFuture: '07/07/2456',
        subThousand: '06/06/465',
    };

    it('converts a year with two zeros (01/01/2001)', function () {
        assert.equal(convertDate(testValues.kubrick), 'January first, two thousand one');
    });

    it('converts a year with a ten in the last pair (02/02/2010)', function () {
        assert.equal(convertDate(testValues.secondZero), 'February second, two thousand ten');
    });

    it('converts a year with a zero in the third place (03/03/2103)', function () {
        assert.equal(convertDate(testValues.thirdZero), 'March third, two thousand one hundred three');
    });

    it('converts a sub 1000 year', function () {
        assert.equal(convertDate(testValues.subThousand), 'June sixth, four hundred sixty five');
    });

    it('converts a centennial year (04/04/1900)', function () {
        assert.equal(convertDate(testValues.century), 'April fourth, nineteen hundred');
    });

    it('converts a millenium year (05/05/2000)', function () {
        assert.equal(convertDate(testValues.millenium), 'May fifth, two thousand');
    });

    it('converts a short date string (06/06/2045)', function () {
        assert.equal(convertDate(testValues.nearFuture), 'June sixth, two thousand forty five');
    });

    it('converts a short date string (07/07/2456)', function () {
        assert.equal(convertDate(testValues.farFuture), 'July seventh, two thousand four hundred fifty six');
    });
});
