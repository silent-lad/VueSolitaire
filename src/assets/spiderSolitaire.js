import { shuffle, uniq, chunk } from "lodash";

export const processRank = function(rank) {
  if (rank == "K" || rank == "Q" || rank == "J" || rank == "A") {
    switch (rank) {
      case "K":
        return 13;
      case "Q":
        return 12;
      case "J":
        return 11;
      case "A":
        return 1;
    }
  } else {
    return parseInt(rank);
  }
};

export const spiderInit = function() {
  var initDeck = [];

  this.ranks.forEach(rank => {
    // this.suits.forEach(suit => {
    var suit = "spades";
    initDeck.push(
      { rank, isDown: true, suit, deck: 1 },
      { rank, isDown: true, suit, deck: 2 },
      { rank, isDown: true, suit, deck: 3 },
      { rank, isDown: true, suit, deck: 4 },
      { rank, isDown: true, suit, deck: 5 },
      { rank, isDown: true, suit, deck: 6 },
      { rank, isDown: true, suit, deck: 7 },
      { rank, isDown: true, suit, deck: 8 }
    );
    // });
  });
  var shuffledDeck = shuffle(initDeck);
  this.decks = chunk(shuffledDeck.slice(0, 50), 5);
  this.decks[10] = shuffledDeck.slice(50);
  this.decks.forEach((deck, index) => {
    if (index != 10) deck[deck.length - 1].isDown = false;
  });
};

export const checkMoveSpider = function(dropTarget, selectedCard) {
  if (
    dropTarget.suit == selectedCard.suit &&
    processRank(dropTarget.rank) - processRank(selectedCard.rank) == 1
  ) {
    return true;
  } else {
    return false;
  }
};

export const checkPile = function(pile) {
  var suitInConsideration = "";
  var rankInConsideration = "";
  var trailCount = 0;
  pile.forEach(card => {
    if (suitInConsideration == "") {
      suitInConsideration = card.suit;
      rankInConsideration = card.rank;
      trailCount = 1;
    } else if (suitInConsideration == card.suit) {
      if (processRank(rankInConsideration) - processRank(card.rank) == 1) {
        rankInConsideration = card.rank;
        trailCount++;
      } else {
        trailCount = 1;
        rankInConsideration = card.rank;
        suitInConsideration = card.suit;
      }
    }
  });
  if (trailCount == 13) {
    return true;
  }
  return false;
};
