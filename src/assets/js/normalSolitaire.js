import { shuffle, uniq, chunk } from "lodash";
export const normalInit = function() {
  var initDeck = [];
  this.ranks.forEach(rank => {
    this.suits.forEach(suit => {
      initDeck.push(
        { rank, isDown: true, suit, deck: 1 },
        { rank, isDown: true, suit, deck: 2 }
      );
    });
  });

  var shuffledDeck = shuffle(initDeck);
  this.decks = chunk(shuffledDeck.slice(0, 50), 5);
  this.decks[10] = shuffledDeck.slice(50);
  this.decks.forEach((deck, index) => {
    if (index != 10) deck[deck.length - 1].isDown = false;
  });
};
