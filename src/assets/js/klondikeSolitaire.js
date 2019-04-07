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

export const klondikeInit = function() {
  var initDeck = [];

  this.ranks.forEach(rank => {
    this.suits.forEach(suit => {
      if (suit == "spades" || suit == "clubs") {
        initDeck.push({ rank, isDown: true, suit, deck: 1, color: "black" });
      } else {
        initDeck.push({ rank, isDown: true, suit, deck: 1, color: "red" });
      }
    });
  });
  var shuffledDeck = shuffle(initDeck);
  for (let i = 0; i < 7; i++) {
    this.decks[i] = shuffledDeck.slice(
      (i * (i + 1)) / 2,
      (i * (i + 1)) / 2 + i + 1
    );
  }
  this.decks[7] = shuffledDeck.slice(28);
  this.decks.forEach((deck, index) => {
    if (index != 7) deck[deck.length - 1].isDown = false;
  });
};

export const isDroppable = function(dropTarget, selectedCard) {
  if (processRank(dropTarget.rank) - processRank(selectedCard.rank) == 1) {
    if (dropTarget.color != selectedCard.color) {
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
  var colors = movingCards.map(currCard => currCard.color);
  var currRank = processRank(card.rank);
  var currColor = card.color;
  for (var index = 1; index < ranks.length; index++) {
    if (currRank - ranks[index] != 1) {
      return false;
    }
    if (currColor == colors[index]) {
      return false;
    }
    currColor = colors[index];
    currRank = ranks[index];
  }
  return true;
};

export const checkFoundation = function(foundation, card) {
  if (foundation == "" && card.rank == "A") {
    return true;
  }
  if (
    foundation.suit == card.suit &&
    processRank(card.rank) - processRank(foundation.rank) == 1
  ) {
    return true;
  } else {
    return false;
  }
};
