import { assert, describe, it } from 'vitest';
import { createDateMap } from '../src/lib/parsing/create-date-map';

describe('createDateMap', function () {
    it('converts a date to a date map', function () {
        assert.deepEqual(createDateMap('2000-01-01'), { day: 1, month: 0, year: 2000 });
    });

    it('converts a number to a date map', function () {
        assert.deepEqual(createDateMap(2000), { day: 1, month: 0, year: 2000 });
    });

    it('converts a date to a date map', function () {
        assert.deepEqual(createDateMap(new Date('2000-01-01')), { day: 1, month: 0, year: 2000 });
    });

    it('gracefully handles invalid dates', function () {
        assert.throws(function () {
            createDateMap('10000-01-01');
        }, Error);
    });
});
