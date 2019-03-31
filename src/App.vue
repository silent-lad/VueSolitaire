<template>
  <div class="green_table">
    <!-- <button @click="displayInit();"></button> -->
    <div
      v-for="deck in decks.slice(0,10)"
      :key="deck[0].rank+deck[0].deck+deck[0].suit"
      class="card_holder card"
      id="1"
    >
      <transition-group name="list" tag="div">
        <Card
          v-for="card in deck"
          :key="card.rank+card.deck+card.suit"
          :card="card"
          :isSelected="card.isSelected"
          @click.native="selectCard(card,deck)"
        ></Card>
      </transition-group>
    </div>
    <div @click="dealCards()" class="pile card down"></div>
  </div>
</template>

<script>
import Card from "./components/Card.vue";
import { ranks, suits, symbols } from "./assets/gameInfo.json";
import {
  spiderInit,
  processRank,
  checkPile,
  checkMoveSpider,
  isMovable
} from "./assets/spiderSolitaire.js";
import { normalInit } from "./assets/normalSolitaire.js";
import { setTimeout } from "timers";

export default {
  name: "mainTable",
  components: { Card },
  data: function() {
    return {
      ranks,
      suits,
      symbols,
      decks: [],
      cards: [],
      selectedCard: "",
      selectedDeck: "",
      selectedArray: []
    };
  },
  methods: {
    normalInit,
    spiderInit,
    checkPile,
    processRank,
    checkMoveSpider,
    isMovable,
    handComplete: function() {
      console.log("complete");
    },
    removeSelection: function() {
      console.log("hig");
      if (this.selectedCard != "") {
        this.selectedArray.forEach(element => {
          element.isSelected = false;
        });
        this.selectedArray = [];
        this.selectedCard.isSelected = false;
        this.selectedCard = "";
        this.selectedDeck = "";
        this.$forceUpdate();
      } else {
        return;
      }
    },
    dealCards: function() {
      this.decks.forEach(deck => {
        if (this.decks[10].length > 0) {
          var newCard = this.decks[10].pop();
          newCard.isDown = false;
          deck.push(newCard);
        }
      });
      this.$forceUpdate();
    },
    selectCard: function(cardSelected, deck) {
      if (this.selectedCard == "") {
        if (cardSelected.isDown) {
          return;
        }
        this.selectedCard = cardSelected;
        this.selectedDeck = deck;
        this.selectedCard.isSelected = true;
        if (isMovable(this.selectedCard, this.selectedDeck)) {
          this.selectedArray = this.selectedDeck.slice(
            this.selectedDeck.indexOf(this.selectedCard)
          );
          this.selectedArray.forEach(element => {
            element.isSelected = true;
          });
        }
        this.$forceUpdate();
      } else {
        if (checkMoveSpider(cardSelected, deck, this.selectedCard)) {
          if (isMovable(this.selectedCard, this.selectedDeck)) {
            var movedCards = this.selectedDeck.splice(
              this.selectedDeck.indexOf(this.selectedCard)
            );
            movedCards.forEach(newCard => {
              deck.push(newCard);
            });
            if (
              this.selectedDeck[this.selectedDeck.length - 1].isDown == true
            ) {
              this.selectedDeck[this.selectedDeck.length - 1].isDown = false;
            }
            var pileChecker = this.checkPile(deck);
            console.log("pile", pileChecker);
            if (pileChecker) {
              setTimeout(() => {
                deck.splice(pileChecker);
                this.handComplete();
              }, 700);
            }
            this.removeSelection();
            console.log("hi", deck);
          } else {
            this.removeSelection();
          }
        } else {
          this.removeSelection();
        }
      }
    }
  },
  created() {
    this.spiderInit.bind(this);
    this.spiderInit();
    // this.normalInit.bind(this);
    // this.normsalInit();
  }
};
</script>
<style >
.card_stack.down {
  margin-bottom: -125px;
}
.card_stack {
  transition: all 0.2s linear;
  position: relative;
  margin-bottom: -100px;
}
.card {
  box-shadow: 0px -1px 10px rgba(0, 0, 0, 0.5);
  width: 7vw;
  height: 140px;
  border-radius: 4px;
  border: 1px solid black;
  padding: 0;
}
.card_stack:hover {
  box-shadow: 4px 4px 10px rgb(247, 210, 0);
}
.card_stack.selected {
  box-shadow: 5px 5px 10px blue;
  border: 3px solid blue;
  transform: translate(10px, 10px);
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
html {
  background: green;
}
body {
  margin: 0px !important;
}
.green_table {
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
.pile {
  position: absolute;
  top: 75vh;
  left: 89.4vw;
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

