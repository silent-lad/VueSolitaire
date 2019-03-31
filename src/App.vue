<template>
  <div class="green_table">
    <!-- <button @click="displayInit();"></button> -->
    <div
      v-for="(deck,index) in proccessedDecks"
      :key="deck[0][0].rank+deck[0][0].deck+deck[0][0].suit"
      class="card_holder card"
      id="1"
    >
      <transition-group name="list" tag="div">
        <div class="hand" v-for="hand in deck" :key="hand[0].rank+hand[0].deck+hand[0].suit">
          <Card
            v-for="card in hand"
            :key="card.rank+card.deck+card.suit"
            :card="card"
            @click.native="selectCard(card,hand)"
          ></Card>
        </div>
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
  checkMoveSpider
} from "./assets/spiderSolitaire.js";
import { normalInit } from "./assets/normalSolitaire.js";

export default {
  name: "main",
  components: { Card },
  data: function() {
    return {
      ranks,
      suits,
      symbols,
      decks: [],
      cards: [],
      selectedCard: ""
    };
  },
  methods: {
    normalInit,
    spiderInit,
    processRank,
    checkMoveSpider,
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
    selectCard: function(cardSelected, hand) {
      if (this.selectedCard == "") {
        this.selectedCard = cardSelected;
      } else {
        if (checkMoveSpider(cardSelected, this.selectedCard)) {
          console.log("yess");
          console.log("hi", hand);
        } else {
          console.log("nooooo");
          this.selectedCard = "";
        }
      }
    }
  },
  created() {
    // this.spiderInit.bind(this);
    // this.spiderInit();
    this.normalInit.bind(this);
    this.normalInit();
  },
  computed: {
    proccessedDecks: function() {
      var shownDeck = this.decks.slice(0, 10);
      try {
        var processed = shownDeck.map(deck => {
          var currentSuit = "";
          var currentRank = "";
          var hand = [];
          var finalArr = [];
          for (var i = 0; i < deck.length; i++) {
            if (deck[i].isDown == false) {
              if (
                deck[i].suit == currentSuit &&
                this.processRank(deck[i].rank) - currentRank == -1
              ) {
                currentRank = this.processRank(deck[i].rank);
                hand.push(deck[i]);
              } else {
                if (i == 0 || currentSuit == "") {
                  hand = [deck[i]];
                } else {
                  finalArr.push(hand);
                  hand = [deck[i]];
                }
                currentSuit = deck[i].suit;
                currentRank = this.processRank(deck[i].rank);
              }
            } else {
              // hand = ;
              finalArr.push([deck[i]]);
            }
          }
          // pushing the last hand
          finalArr.push(hand);
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
.card_stack.down {
  margin-bottom: -125px;
}
.card_stack {
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
.hand:hover .card {
  box-shadow: 4px 4px 10px rgb(247, 210, 0);
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

