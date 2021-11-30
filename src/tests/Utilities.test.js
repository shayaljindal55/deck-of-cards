// import { bootstrap } from './App';
import * as utils from '../shared/Utilities';
import { testExpectedSortedDrawnCards, testSampleDrawnCards } from '../shared/Constants';

describe('Sort the given cards', () => {
    test("calls sortCards with input param (unsorted cards) & get fixed output (sorted cards)", () => {
        /*   trigger sortCard pure function to always return same output for a given input */
        const sortedCards = utils.sortCards(JSON.parse(testSampleDrawnCards));
        /* check for expected output */
        expect(sortedCards).toEqual(JSON.parse(testExpectedSortedDrawnCards));
    });
});