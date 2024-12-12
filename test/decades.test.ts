import { assert, describe, it } from 'vitest';
import { parseDecades } from '../src/lib/parsing/decades';

describe('decades', function () {
    it('converts decades properly', function () {
        assert.equal(parseDecades('2019'), 'nineteen');
        assert.equal(parseDecades('2010'), 'ten');
        assert.equal(parseDecades('2003'), 'three');
        assert.equal(parseDecades('2000'), '');
    });

    it('converts sub-decades properly', function () {
        assert.equal(parseDecades('2015'), 'fifteen');
        assert.equal(parseDecades('2010'), 'ten');
        assert.equal(parseDecades('2003'), 'three');
        assert.equal(parseDecades('2000'), '');
    });
});
