export const sortCards = (drawnCards) => {
    return drawnCards.sort(function (a, b) {
        if (a.suitIndex < b.suitIndex ||
            (a.suitIndex === b.suitIndex && a.rankIndex < b.rankIndex)) {
            return -1;
        }
        return 1;
    });
};