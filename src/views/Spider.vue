<template>
  <div>
    <div class="mobile_warn card-5">
      <h1 style="padding:10px;">
        Please keep your phone in
        <span style="color:orange;">Landscape</span> mode to play the game
      </h1>
    </div>
    <div class="green_table">
      <!-- <button @click="displayInit();"></button> -->
      <div
        class="card card_holder"
        v-for="deck in decks.slice(0, 10)"
        :key="decks.indexOf(deck) || 'null'"
        id="1"
      >
        <Holder
          v-if="deck.length == 0"
          @click.native="selectCard('', deck, true)"
        ></Holder>
        <transition-group name="list" tag="div">
          <Card
            v-for="card in deck"
            :key="card.rank + card.deck + card.suit"
            :card="card"
            :isSelected="card.isSelected"
            @click.native="selectCard(card, deck)"
          ></Card>
        </transition-group>
      </div>
      <div
        @click="dealCards()"
        class="pile card"
        :class="decks[10].length != 0 ? 'down' : 'card'"
      ></div>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import Holder from "../components/Holder.vue";
import { ranks, suits, symbols } from "../assets/gameInfo.json";
import {
  spiderInit,
  processRank,
  checkPile,
  checkMoveSpider,
  isMovable
} from "../assets/js/spiderSolitaire.js";
import { normalInit } from "../assets/js/normalSolitaire.js";
import { setTimeout } from "timers";
import flip from "../assets/audio/flip.wav";
import shuffle2 from "../assets/audio/shuffle2.wav";

export default {
  name: "Spider",
  components: { Card, Holder },
  props: { gameMode: String },
  data: function() {
    return {
      ranks,
      suits,
      symbols,
      decks: [],
      selectedCard: "",
      selectedDeck: "",
      selectedArray: [],
      completedHands: 0,
      flip,
      shuffle2
    };
  },
  methods: {
    normalInit,
    spiderInit,
    checkPile,
    processRank,
    checkMoveSpider,
    isMovable,
    gameOver: function() {
      console.log("GameOver");
    },
    handComplete: function() {
      console.log("complete");
      this.completedHands++;
      if (this.completedHands == 8) {
        this.gameOver();
      }
    },
    removeSelection: function() {
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
      this.playSound(true);
      this.decks.forEach(deck => {
        if (this.decks[10].length > 0) {
          var newCard = this.decks[10].pop();
          newCard.isDown = false;
          deck.push(newCard);
        }
      });
      this.$forceUpdate();
    },
    selectCard: function(cardSelected, deck, holder) {
      this.playSound();
      if (holder && this.selectedCard) {
        if (this.selectedCard.rank == "K") {
          if (isMovable(this.selectedCard, this.selectedDeck)) {
            var movedCards = this.selectedDeck.splice(
              this.selectedDeck.indexOf(this.selectedCard)
            );
            movedCards.forEach(newCard => {
              deck.push(newCard);
            });
            if (deck.lenght != 0) {
              if (
                this.selectedDeck[this.selectedDeck.length - 1].isDown == true
              ) {
                this.selectedDeck[this.selectedDeck.length - 1].isDown = false;
              }
            }
            this.removeSelection();
          } else {
            this.removeSelection();
          }
        }
      }
      if (this.selectedCard == "") {
        if (cardSelected.isDown) {
          return;
        }

        try {
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
        } catch (e) {
          console.log(e);
        }
      } else {
        if (checkMoveSpider(cardSelected, deck, this.selectedCard)) {
          if (isMovable(this.selectedCard, this.selectedDeck)) {
            var movedCards = this.selectedDeck.splice(
              this.selectedDeck.indexOf(this.selectedCard)
            );
            movedCards.forEach(newCard => {
              deck.push(newCard);
            });

            try {
              if (
                this.selectedDeck[this.selectedDeck.length - 1].isDown == true
              ) {
                this.selectedDeck[this.selectedDeck.length - 1].isDown = false;
              }
            } catch (e) {}

            var pileChecker = this.checkPile(deck);
            console.log(pileChecker, " pile");

            if (typeof pileChecker == "number") {
              deck.splice(pileChecker);
              this.playSound();

              this.handComplete();
              if (deck.length != 0) deck[deck.length - 1].isDown = false;
            }
            this.removeSelection();
          } else {
            this.removeSelection();
          }
        } else {
          this.removeSelection();
        }
      }
    },
    playSound(shuffle) {
      if (shuffle) {
        var audio = new Audio(shuffle2);
        audio.play();
      } else {
        var audio = new Audio(flip);
        audio.play();
      }
    }
  },
  created() {
    if (this.gameMode == "1") {
      this.spiderInit.bind(this);
      this.spiderInit();
    } else {
      this.normalInit.bind(this);
      this.normalInit();
    }
  }
};
</script>
<style >
</style>

