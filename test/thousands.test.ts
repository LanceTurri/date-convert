import { assert, describe, it } from 'vitest';
import { parseThousands } from '../src/lib/parsing/thousands';

describe('thousands', function () {
    it('converts thousands properly', function () {
        assert.equal(parseThousands('2000'), 'two thousand ');
        assert.equal(parseThousands('1900'), '');
    });
});
