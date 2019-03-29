<template>
  <div class="main">
    <!-- <button @click="displayInit();"></button> -->
    <ul
      v-for="deck in decks.slice(0,10)"
      :key="deck[deck.length-1].rank+ deck[deck.length-1].suit+deck[deck.length-1].deck"
      class="card_holder card"
      id="1"
    >
      <transition-group :name="list">
        <li
          v-for="card in deck"
          class="card card_stack"
          :key="card.rank+card.deck+card.suit+card.deck"
          :class="card.isDown?'down':card.suit"
          @click="selectCard(card)"
        >
          <div class="rank">{{card.rank}}</div>
          <div class="rank">{{symbols[`${card.suit}`]}}</div>
          <div class="rank bottom">{{symbols[`${card.suit}`]}}</div>
          <div class="rank bottom">{{card.rank}}</div>

        </li>
      </transition-group>

    </ul>
    <div
      class="card_holder_extra card down"
      id="12"
      @click="addCards()"
    >
    </div>
  </div>
</template>

<script>
import shuffle from "lodash.shuffle";
import uniq from "lodash.uniq";
import chunk from "lodash.chunk";
import { totalmem } from "os";
import { log } from "util";
export default {
  name: "main",
  selectedCard: {},
  data: function() {
    return {
      ranks: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
      suits: ["heart", "diamond", "spades", "clubs"],
      decks: [],
      cards: [],
      symbols: { heart: "♥", clubs: "♣", spades: "♠", diamond: "♦" }
    };
  },
  methods: {
    getImgUrl: function(suit) {
      return require("./assets/suits/" + suit + ".png");
    },
    displayInit: function() {
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
    },
    addCards: function() {
      this.decks.forEach(deck => {
        if (this.decks[10].length > 0) {
          var newCard = this.decks[10].pop();
          newCard.isDown = false;
          deck.push(newCard);
        }
      });
      this.$forceUpdate();
    },
    selectCard: function(cardSelected) {
      console.log("selected");

      cardSelected.selected = true;
      this.selectedCard = cardSelected;
    },
    processRank: function(rank) {
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
    }
  },
  created() {
    this.displayInit();
  },
  computed: {
    proccessedDecks: function() {
      var shownDeck = this.decks.slice(0, 9);
      try {
        // console.log(shownDeck);

        var processed = shownDeck.map(deck => {
          var currentSuit = deck[0].suit;
          var currentRank = this.processRank(deck[0].rank);
          var hand = [deck[0]];
          var finalArr = [];
          for (var i = 1; i < deck.length; i++) {
            if (
              deck[i].suit == currentSuit &&
              this.processRank(deck[i].rank) - currentRank == -1
            ) {
              currentRank = this.processRank(deck[i].rank);
              hand.push(deck[i]);
            } else {
              finalArr.push(hand);
              hand = [deck[i]];
              currentSuit = deck[i].suit;
              currentRank = this.processRank(deck[i].rank);
            }
          }
          return finalArr;
        });
        return processed;
      } catch (e) {
        console.log(e);
        return e.message;
      }
    }
  }
};
</script>
<style >
li {
  font-size: 25px;
}
.card.first {
  margin: 0% -3% !important;
}
.card.down {
  background: url("./assets/sl.png") rgb(182, 28, 28);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
  text-decoration: transparent;
}
.card.down > .rank {
  visibility: hidden;
}
.rank {
  margin-left: 2px;
}
.rank.bottom {
  /* position: absolute; */
  position: relative;
  top: 43px;
  text-align: left;
  /* transform: translate(50%, 50%); */
  transform: rotate(180deg);
  padding-left: 5px;
}
.card_stack.down {
  margin-bottom: -125px;
}
.card_stack {
  margin-bottom: -100px;
}
.card {
  box-shadow: 0px -1px 10px rgba(0, 0, 0, 0.5);
  width: 7vw;
  height: 140px;
  border-radius: 2px;
  border: 1px solid black;
  padding: 0;
}
.card_deck {
  border: 2px solid black;
  border-radius: 10%;
  width: 8vw;
  list-style: none;
  margin-left: none;
  margin-top: -150%;
  margin: 5% 0;
  padding: 0;
  height: 140px;
  background: rgb(124, 7, 7);
}
body {
  margin: 0px !important;
}
.main {
  display: flex;
  border: none;
  justify-content: space-evenly;
  height: 100vh;
  width: 100vw;
  padding: 0;
  background: green;
}
.card_holder {
  margin: 5% 0;
  list-style: none;
  background: rgba(0, 0, 0, 0.3);
}
.heart {
  background: url("./assets/suits/heart.png") rgb(255, 255, 255);
  font-size: 20px;
  color: red;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
}
.spades {
  background: url("./assets/suits/spades.png") rgb(255, 255, 255);
  font-size: 20px;
  color: black;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
}
.clubs {
  background: url("./assets/suits/clubs.png") rgb(255, 255, 255);
  font-size: 20px;
  color: black;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
}
.diamond {
  background: url("./assets/suits/diamond.png") rgb(255, 255, 255);
  font-size: 20px;
  color: red;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
}
.card_holder_extra {
  position: absolute;
  top: 65vh;
  left: 90vw;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>

