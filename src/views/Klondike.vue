<template>
  <div>
    <div class="mobile_warn card-5">
      <h1 style="padding:10px;">
        Please keep your phone in
        <span style="color:orange;">Landscape</span> mode to play the game
      </h1>
    </div>
    <div class="main_table">
      <div class="upper_table">
        <div
          style="position:absolute;top:-10px;left:6%;"
          @click="dealCards()"
          class="card_holder card"
          :class="decks[7].length == 0 ? '' : 'down'"
        ></div>
        <div
          style="position:absolute;top:-10px;left:16%;"
          @click="selectCard()"
          class="card_holder card "
        >
          <Card
            v-if="dealtCards.length != 0"
            :card="dealtCards[dealtCards.length - 1]"
            :isSelected="dealtCards[dealtCards.length - 1].isSelected"
          ></Card>
        </div>
        <div
          class="card card_holder"
          style="margin:5% 60px 0px 0px;cursor:pointer;"
          v-for="(card, index) in foundation"
          :key="index"
          id="1"
          @click="selectCard(card, deck)"
        >
          <Holder v-if="(card = '')"></Holder>
          <transition-group name="list" tag="div">
            <Card
              v-if="card != ''"
              :key="card.rank + card.suit"
              :card="card"
              :isSelected="card.isSelected"
            ></Card>
          </transition-group>
        </div>
      </div>
      <div class="bottom_table">
        <div
          class="card card_holder"
          v-for="deck in decks.slice(0, 7)"
          :key="decks.indexOf(deck) || 'null'"
          id="1"
        >
          <Holder
            v-if="deck.length == 0"
            @click.native="selectCard('', deck, 'holder')"
          ></Holder>
          <transition-group name="list" tag="div">
            <Card
              v-for="card in deck"
              :key="card.rank + card.suit"
              :card="card"
              :isSelected="card.isSelected"
              @click.native="selectCard(card, deck)"
            ></Card>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import Holder from "../components/Holder.vue";
import { ranks, suits, symbols } from "../assets/gameInfo.json";
import {
  klondikeInit,
  processRank,
  checkFoundation,
  isDroppable,
  isMovable
} from "../assets/js/klondikeSolitaire.js";
import flip from "../assets/audio/flip.wav";
import shuffle2 from "../assets/audio/shuffle2.wav";

export default {
  name: "Klondike",
  components: { Card, Holder },
  props: { gameMode: Number },
  data: function() {
    return {
      ranks,
      suits,
      symbols,
      decks: [],
      foundation: ["", "", "", ""],
      selectedCard: "",
      selectedDeck: "",
      selectedArray: [],
      completedHands: 0,
      flip,
      dealtCards: [],
      shuffle2
    };
  },
  methods: {
    klondikeInit,
    processRank,
    checkFoundation,
    isDroppable,
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
      this.playSound();
      if (this.decks[7].length == 0) {
        this.refillDealingCards();
        return;
      }
      var newCard = this.decks[7].pop();
      newCard.isDown = false;
      this.dealtCards.push(newCard);
      this.$forceUpdate();
    },
    refillDealingCards: function(params) {
      this.decks[7] = this.dealtCards;
      this.dealtCards = [];
    },
    selectCard: function(cardSelected, deck, type) {
      this.playSound();
      console.log(1);

      if (type == "foundation" && this.selectedCard) {
        console.log("asaksdn");

        if (this.selectedCard != "") {
          if (
            this.selectedDeck[this.selectedDeck.length - 1] ==
              this.selectedCard ||
            processRank(this.selectedCard) - processRank(cardSelected) == 1
          ) {
            console.log("akhri");
            if (checkFoundation(deck, this.selectedCard)) {
              console.log("akhri2");
              deck = this.selectedCard;
            }
            this.removeSelection();
          }
          this.removeSelection();
        } else {
          this.removeSelection();
          return;
        }
      }
      if (type == "holder" && this.selectedCard) {
        if (this.selectedCard.rank == "K") {
          if (isMovable(this.selectedCard, this.selectedDeck)) {
            var movedCards = this.selectedDeck.splice(
              this.selectedDeck.indexOf(this.selectedCard)
            );
            movedCards.forEach(newCard => {
              deck.push(newCard);
            });
            if (deck.length != 0) {
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
        console.log(1);
        if (cardSelected.isDown) {
          console.log(1);
          return;
        }
        this.selectedCard = cardSelected;
        this.selectedDeck = deck;
        this.selectedCard.isSelected = true;
        if (isMovable(this.selectedCard, this.selectedDeck)) {
          console.log(1);
          this.selectedArray = this.selectedDeck.slice(
            this.selectedDeck.indexOf(this.selectedCard)
          );
          console.log(1);
          this.selectedArray.forEach(element => {
            element.isSelected = true;
          });
        }
        this.$forceUpdate();
      } else {
        console.log(2);
        console.log(isDroppable(cardSelected, this.selectedCard));
        if (isDroppable(cardSelected, this.selectedCard)) {
          console.log(2);
          if (isMovable(this.selectedCard, this.selectedDeck)) {
            console.log(2);
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
              console.log(
                this.selectedDeck[this.selectedDeck.length - 1].isDown
              );
              this.$forceUpdate();
              console.log("sdkjfa");
            } catch (e) {
              console.log(e);
            }
            this.removeSelection();
            console.log("hi", deck);
          } else {
            console.log(3);
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
        audio
          .play()
          .then(_ => {
            console.log(_);
          })
          .catch(error => {
            console.log(error.message);
          });
      } else {
        var audio = new Audio(flip);
        audio.play();
      }
    }
  },
  watch: {
    foundation: function(array) {
      ranks = array.map(el => el.rank);
      if (ranks == ["K", "K", "K", "K"]) {
        this.gameOver();
      }
    }
  },
  created() {
    this.klondikeInit.bind(this);
    this.klondikeInit();
  }
};
</script>
<style >
</style>

