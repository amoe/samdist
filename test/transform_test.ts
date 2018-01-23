import barChart from '../src/bar-chart';
import {assert} from 'chai';
import transformer from '../src/transformer';
import {DiscreteStatistic} from '../src/interfaces';

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
    
    let expected: DiscreteStatistic = {
        category: "ZC [Grammatical Item]",
        value: 52409
    };

    assert.deepEqual(result[0], expected);
});
