import {assert} from 'chai';
import utility from '../src/utility';

it('gets the correct sequence', function() {
    const ticks = utility.generateTicks(0, 100, 10);
    assert.deepEqual(ticks, [10, 20, 30, 40, 50, 60, 70, 80, 90]);
});
