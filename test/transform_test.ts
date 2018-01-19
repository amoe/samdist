import sinon from 'sinon';
import barChart from '../src/bar-chart.js';
import {assert} from 'chai';
import transformer from '../src/transformer.js';

const dataSubset = [
    [
        "ZC [Grammatical Item]",
        52409
    ],
    [
        "NULL",
        29902
    ],
    [
        "ZF [Pronoun]",
        28680
    ]
];

it('can transform network data to displayable', function() {
    const result = transformer.transformFromNetwork(dataSubset)
    const expected = [52409, 29902, 28680];
    assert.equal(result, expected);
});
