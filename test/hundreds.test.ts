import { assert, describe, it } from 'vitest';
import { parseHundreds } from '../src/lib/parsing/hundreds';

describe('hundreds', function () {
    it('converts hundreds properly', function () {
        assert.equal(parseHundreds('1000'), '');
        assert.equal(parseHundreds('1800'), 'eighteen hundred ');
        assert.equal(parseHundreds('1900'), 'nineteen hundred ');
        assert.equal(parseHundreds('2100'), 'one hundred ');
    });
});
