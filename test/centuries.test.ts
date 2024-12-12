import { assert, describe, it } from 'vitest';
import { parseCenturies } from '../src/lib/parsing/centuries';

describe('centuries', function () {
    it('converts centuries properly', function () {
        assert.equal(parseCenturies('2000'), 'two thousand ');
        assert.equal(parseCenturies('1900'), 'nineteen hundred ');
    });
});
