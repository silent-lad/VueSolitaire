import { shuffle, uniq, chunk } from "lodash";
var isEqual = require("lodash.isequal");

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

export const checkMoveSpider = function(dropTarget, deck, selectedCard) {
  if (
    dropTarget.suit == selectedCard.suit &&
    processRank(dropTarget.rank) - processRank(selectedCard.rank) == 1
  ) {
    if (deck.indexOf(dropTarget) == deck.length - 1) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const isMovable = function(card, deck) {
  var movingCards = deck.slice(deck.indexOf(card));
  var ranks = movingCards.map(currCard => processRank(currCard.rank));
  var currRank = processRank(card.rank);
  for (var index = 1; index < ranks.length; index++) {
    if (currRank - ranks[index] != 1) {
      return false;
    }
    currRank = ranks[index];
  }
  return true;
};

export const checkPile = function(pile) {
  var ranks = pile.map(card => {
    return processRank(card.rank);
  });
  var value = false;
  const checkArray = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  if (isEqual(checkArray, ranks.slice(-13))) {
    console.log("faad veere faad");
    value = ranks.length - 13;
  }
  return value;
};

export const moveCards = function(toDeck, fromDeck, fromCard) {
  var movedCards = fromDeck.splice(fromDeck.indexOf(fromCard));
  movedCards.forEach(newCard => {
    toDeck.push(newCard);
  });
  try {
    if (fromDeck[fromDeck.length - 1].isDown == true) {
      fromDeck[fromDeck.length - 1].isDown = false;
    }
  } catch (e) {
    console.log(e);
  }
};
