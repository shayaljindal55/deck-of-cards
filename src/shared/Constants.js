
export const suits = ["♣︎", "♠︎", "♥︎", "♦︎"]; // defaulted to required sort order
export const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
export const redSuits = ["♥︎", "♦︎"]
export const noDrawnCardSort = "There are no drawn cards to sort. Please draw cards from the deck."
export const noCardsInDeck = "No cards in the deck."
export const testSampleDrawnCards = `[
{"id":40,"cardValue":"3","suit":"♦︎","color":"red","suitIndex":3,"rankIndex":1},
{"id":35,"cardValue":"A","suit":"♥︎","color":"red","suitIndex":2,"rankIndex":9},
{"id":34,"cardValue":"10","suit":"♥︎","color":"red","suitIndex":2,"rankIndex":8},
{"id":13,"cardValue":"2","suit":"♠︎","color":"black","suitIndex":1,"rankIndex":0},
{"id":7,"cardValue":"9","suit":"♣︎","color":"black","suitIndex":0,"rankIndex":7}]`
export const testExpectedSortedDrawnCards = `[
    {"id":7,"cardValue":"9","suit":"♣︎","color":"black","suitIndex":0,"rankIndex":7},
    {"id":13,"cardValue":"2","suit":"♠︎","color":"black","suitIndex":1,"rankIndex":0},
    {"id":34,"cardValue":"10","suit":"♥︎","color":"red","suitIndex":2,"rankIndex":8},
    {"id":35,"cardValue":"A","suit":"♥︎","color":"red","suitIndex":2,"rankIndex":9},
    {"id":40,"cardValue":"3","suit":"♦︎","color":"red","suitIndex":3,"rankIndex":1}
   ]`
